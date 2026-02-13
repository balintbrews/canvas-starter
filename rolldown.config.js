import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parse } from "@babel/parser";
import { defineConfig } from "rolldown";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const VENDOR_DIR = path.resolve(DIR, "dist/vendor");

// Clean `dist/vendor`.
if (fs.existsSync(VENDOR_DIR)) {
  fs.rmSync(VENDOR_DIR, { recursive: true, force: true });
}

// The following packages are bundled by Drupal Canvas, and are provided by
// default in its import map. We don't need to bundle them.
const external = [
  "react",
  "react-dom",
  "react-dom/client",
  "react/jsx-runtime",
  // Commenting these out helps with testing, because `class-variance-authority`
  // depends on `clsx`, so we can see how a shared chunk is generated.
  // "class-variance-authority",
  // "clsx",
  "next-image-standalone",
  "tailwind-merge",
  "@drupal-api-client/json-api-client",
  "drupal-jsonapi-params",
];

// Discover which third-party packages are imported by components.
const packages = Array.from(discoverImportedPackages()).filter(
  // Filter out externalized packages.
  (dep) => !external.includes(dep),
);

// Create entry points for packages to bundle.
const entries = packages.reduce((acc, dep) => {
  // Replace '/' with '-' to avoid nested directories for scoped packages.
  // For example: @radix-ui/react-switch → @radix-ui--react-switch
  const flatName = dep.replace(/\//g, "--");
  acc[flatName] = dep;
  return acc;
}, {});

export default defineConfig({
  input: entries,
  output: {
    dir: path.resolve(DIR, "dist/vendor"),
    format: "esm",
    entryFileNames: "[name]-[hash].js",
    chunkFileNames: "shared/[name]-[hash].js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  external,
  treeshake: true,
  platform: "browser",
});

/**
 * Discover which third-party packages are imported by components.
 */
function discoverImportedPackages() {
  const packages = new Set();
  const componentsDir = path.resolve(DIR, "src/components");

  // Scan all component files (src/components/*/index.jsx).
  if (fs.existsSync(componentsDir)) {
    const componentDirs = fs
      .readdirSync(componentsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && d.name !== "dist");

    for (const dir of componentDirs) {
      const componentFile = path.join(componentsDir, dir.name, "index.jsx");
      const filePackages = extractPackagesFromFile(componentFile);
      filePackages.forEach((pkg) => packages.add(pkg));
    }
  }
  return packages;
}

/**
 * Extract package names from import statements
 */
function extractPackagesFromFile(filePath) {
  const packages = new Set();
  if (!fs.existsSync(filePath)) return packages;

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const ast = parse(content, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    // Walk through all import declarations.
    for (const node of ast.program.body) {
      if (node.type === "ImportDeclaration") {
        const importPath = node.source.value;

        // Only include external packages (not relative or @/ aliases).
        if (!importPath.startsWith(".") && !importPath.startsWith("@/")) {
          // Extract base package name.
          const packageName = importPath.startsWith("@")
            ? importPath.split("/").slice(0, 2).join("/") // @scope/package
            : importPath.split("/")[0]; // regular package
          packages.add(packageName);
        }
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not parse ${filePath}:`, error.message);
  }
  return packages;
}
