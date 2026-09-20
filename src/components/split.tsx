import { hasEmptySlotPlaceholder } from '@/lib/types';
import { cn } from 'drupal-canvas';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface SplitProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children' | 'content'
> {
  content?: ReactNode;
  media?: ReactNode;
  mediaBleed?: boolean;
}

function Split({
  className,
  content,
  media,
  mediaBleed = false,
  ...props
}: SplitProps) {
  const mediaHasPlaceholder = hasEmptySlotPlaceholder(media);

  return (
    <div
      className={cn(
        // Single column by default. The second column only appears once the
        // media slot actually renders a figure, so an image component that
        // returns nothing leaves the content at full width with no blank
        // column. The check is scoped to the media wrapper so figures inside
        // the content slot never trigger it.
        'grid grid-cols-1 gap-8 md:gap-12 md:has-[.split-media_figure]:grid-cols-2 md:has-[.split-media_figure]:items-center lg:gap-16',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'flex min-w-0 flex-col gap-8 md:gap-10',
          hasEmptySlotPlaceholder(content) && 'min-h-24',
        )}
      >
        {content}
      </div>
      <div
        className={cn(
          // Hidden until a figure renders, which also removes the row gap that
          // an empty grid item would otherwise leave under the content.
          'split-media hidden min-w-0 has-[figure]:block',
          // Tabloid bleed: the media column keeps its left edge and grows to
          // the right viewport edge. The grid is centered in the viewport, so
          // the distance from the column's right edge to the viewport edge is
          // half the viewport minus half the grid, which in terms of the
          // column's own width is 50vw minus 100% minus half the column gap.
          // The negative margin lets the stretched grid item absorb that
          // space. The `bleed-x` marker asks the enclosing section to clip the
          // few pixels that a classic scrollbar adds beyond the viewport.
          mediaBleed &&
            'bleed-x md:mr-[calc(100%+1.5rem-50vw)] lg:mr-[calc(100%+2rem-50vw)]',
          mediaHasPlaceholder && 'block min-h-24',
        )}
      >
        {media}
      </div>
    </div>
  );
}

export { Split };
export default Split;
