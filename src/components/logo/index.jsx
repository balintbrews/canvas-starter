// SVG source: https://www.svgrepo.com/svg/200008/human-resources-search.

import { cn } from "drupal-canvas";

const Logo = ({ linkToFrontPage = true, className }) => {
  const Element = linkToFrontPage ? "a" : "div";
  return (
    <Element
      className={cn(
        "inline-flex h-12 max-h-16 items-center gap-2 md:h-16",
        className,
      )}
      {...(linkToFrontPage && { href: "/" })}
    >
      <span className="sr-only">Home</span>
      <svg
        className="mt-2 h-full w-auto shrink-0"
        viewBox="0 0 489.142 489.142"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            className="fill-sky/50 dark:fill-sky/25"
            d="M205.743,371.485V314.63h-89.803v-20c0-49.518,40.286-89.803,89.803-89.803v-18.169
		c-30.273,0-54.901-24.629-54.901-54.902s24.628-54.902,54.901-54.902V40C114.352,40,40,114.352,40,205.743
		C40,297.133,114.352,371.485,205.743,371.485z"
          />
          <path
            className="fill-sky/25 dark:fill-sky/50"
            d="M260.644,131.757c0,30.273-24.628,54.902-54.901,54.902v18.169
		c49.518,0,89.803,40.286,89.803,89.803v20h-89.803v56.855c91.391,0,165.742-74.352,165.742-165.743
		C371.485,114.352,297.133,40,205.743,40v36.855C236.016,76.855,260.644,101.484,260.644,131.757z"
          />
          <path
            className="fill-yellow/75 dark:fill-yellow/50"
            d="M150.841,131.757c0,30.273,24.628,54.902,54.901,54.902V76.855
		C175.47,76.855,150.841,101.484,150.841,131.757z"
          />
          <path
            className="fill-yellow/50 dark:fill-yellow/75"
            d="M260.644,131.757c0-30.273-24.628-54.902-54.901-54.902v109.803
		C236.016,186.658,260.644,162.029,260.644,131.757z"
          />
          <path
            className="fill-flamingo"
            d="M295.545,294.63c0-49.518-40.285-89.803-89.803-89.803s-89.803,40.286-89.803,89.803v20h179.606
		V294.63z"
          />
          <path
            className="fill-teal"
            d="M489.142,460.858L364.614,336.329c-8.494,10.315-17.97,19.791-28.285,28.285l124.528,124.528
		L489.142,460.858z"
          />
          <path
            className="fill-teal"
            d="M364.614,336.329c29.272-35.548,46.871-81.05,46.871-130.586C411.485,92.296,319.189,0,205.743,0
		C92.296,0,0,92.296,0,205.743c0,113.447,92.296,205.743,205.743,205.743c49.536,0,95.038-17.6,130.586-46.872
		C346.644,356.12,356.12,346.644,364.614,336.329z M205.743,40c91.391,0,165.742,74.352,165.742,165.743
		c0,91.391-74.352,165.743-165.742,165.743S40,297.133,40,205.743C40,114.352,114.352,40,205.743,40z"
          />
        </g>
      </svg>
      <span className="shrink-0 text-lg tracking-widest text-flamingo uppercase">
        Humanify
      </span>
    </Element>
  );
};

export default Logo;
