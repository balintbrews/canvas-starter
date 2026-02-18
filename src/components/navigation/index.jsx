const Navigation = () => {
  // Data fetching is supported using SWR and @drupal-api-client/json-api-client.
  // @see https://project.pages.drupalcode.org/canvas/code-components/data-fetching
  const menu = [
    { title: "Home", url: "#" },
    { title: "Services", url: "#" },
    { title: "Blog", url: "#" },
    { title: "About", url: "#" },
    { title: "Careers", url: "#" },
  ];
  return (
    <div className="md:flex md:items-center md:gap-12">
      <nav aria-label="Global" className="hidden md:!block">
        <ul className="flex items-center gap-6 text-sm">
          {menu.map((item) => (
            <li key={item.title}>
              <a
                href={item.url}
                className="text-text transition-colors hover:text-text/75"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">
          <a
            className="rounded-md bg-teal px-5 py-2.5 text-sm font-medium text-inverted-text shadow-sm transition-colors hover:bg-teal/90"
            href="/"
          >
            Login
          </a>

          <div className="hidden sm:!flex">
            <a
              className="rounded-md bg-surface-0/75 px-5 py-2.5 text-sm font-medium text-text transition-colors hover:text-text/75"
              href="/"
            >
              Register
            </a>
          </div>
        </div>

        <div className="block md:hidden">
          <button className="rounded-sm bg-surface-2 p-2 text-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
