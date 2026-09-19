import { cn } from 'drupal-canvas';
import type { HTMLAttributes, ReactNode } from 'react';

export interface GridProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'content'
> {
  content?: ReactNode;
}

function Grid({ className, content, ...props }: GridProps) {
  return (
    <div className="relative mr-3 mb-3">
      {/* Cut-paper acid layer under the panel, offset like a second print pass. */}
      <div
        className="grain-multiply absolute inset-0 translate-x-3 translate-y-3 bg-acid"
        aria-hidden="true"
      />
      <div
        className={cn(
          'relative grid w-full grid-cols-1 overflow-hidden border-2 border-line bg-paper md:grid-cols-2 lg:grid-cols-3 dark:bg-ink',
          '*:border-line [&>*+*]:border-t-2',
          'md:[&>*+*]:border-t-0 md:[&>*:not(:nth-child(2n+1))]:border-l-2 md:[&>*:nth-child(n+3)]:border-t-2',
          'lg:[&>*+*]:border-t-0 lg:[&>*:not(:nth-child(2n+1))]:border-l-0 lg:[&>*:not(:nth-child(3n+1))]:border-l-2 lg:[&>*:nth-child(n+3)]:border-t-0 lg:[&>*:nth-child(n+4)]:border-t-2',
          className,
        )}
        {...props}
      >
        {content}
      </div>
    </div>
  );
}

export { Grid };
export default Grid;
