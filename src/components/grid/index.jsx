import { cn } from "drupal-canvas";

const Grid = ({ content, className }) => {
  return (
    <div
      className={cn(
        "grid w-full min-w-sm grid-cols-1 gap-6 md:grid-cols-3 md:gap-8",
        className,
      )}
    >
      {content}
    </div>
  );
};

export default Grid;
