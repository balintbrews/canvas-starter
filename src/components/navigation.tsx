import { cn } from 'drupal-canvas';
import type { HTMLAttributes } from 'react';

interface MenuItem {
  title: string;
  url: string;
}

const menu: MenuItem[] = [
  { title: 'Home', url: '/home' },
  { title: 'Services', url: '/services' },
  { title: 'Blog', url: '/blog' },
  { title: 'About', url: '/about' },
  { title: 'Careers', url: '/careers' },
];

export interface NavigationProps extends HTMLAttributes<HTMLDivElement> {
  activeUrl?: string;
}

function Navigation({
  activeUrl = '/home',
  className,
  ...props
}: NavigationProps) {
  // Data fetching is supported using SWR and @drupal-api-client/json-api-client.
  // @see https://project.pages.drupalcode.org/canvas/code-components/data-fetching
  return (
    <div
      className={cn('flex items-center lg:gap-10 xl:gap-16', className)}
      {...props}
    >
      <nav aria-label="Global" className="hidden lg:block!">
        <ul className="flex items-center gap-5 font-mono text-xs font-bold tracking-[0.12em] uppercase xl:gap-8">
          {menu.map((item) => (
            <li key={item.title}>
              <a
                href={item.url}
                className={cn(
                  'inline-flex min-h-10 items-center border-b-[3px] border-transparent text-text hover:border-blue hover:text-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue dark:hover:border-acid dark:hover:text-acid',
                  'motion-safe:transition-colors',
                  item.url === activeUrl &&
                    'border-blue dark:border-acid dark:text-chalk',
                )}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex lg:items-center lg:gap-4 xl:gap-5">
          <a
            href="/login"
            className="inline-flex font-mono text-xs font-bold tracking-[0.12em] text-text uppercase hover:text-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue motion-safe:transition-colors dark:hover:text-acid"
          >
            Login
          </a>

          <div className="flex">
            <a
              href="/register"
              className={cn(
                'inline-flex min-h-12 items-center border-2 border-ink bg-ink px-5 font-mono text-xs font-bold tracking-[0.12em] text-chalk uppercase shadow-hard-blue-sm xl:px-6',
                'hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--color-blue)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue motion-safe:transition-[transform,box-shadow]',
                'dark:border-acid dark:bg-acid dark:text-ink',
              )}
            >
              Register
            </a>
          </div>
        </div>

        <div className="block lg:hidden">
          <button
            type="button"
            className="flex size-11 items-center justify-center border-2 border-line bg-transparent text-text hover:bg-acid hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue motion-safe:transition-colors dark:hover:border-acid"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export { Navigation };
export default Navigation;
