import { hasEmptySlotPlaceholder } from '@/lib/types';
import { cn } from 'drupal-canvas';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface TestimonialProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children'
> {
  intro?: ReactNode;
  items?: ReactNode;
}

// The container owns the intro and the card grid; each testimonial item owns
// its quote and attribution.
function Testimonial({ className, intro, items, ...props }: TestimonialProps) {
  return (
    <div className={cn('flex flex-col gap-8 md:gap-10', className)} {...props}>
      <div
        className={cn(
          'flex flex-col gap-4',
          hasEmptySlotPlaceholder(intro) && 'min-h-24',
        )}
      >
        {intro}
      </div>
      <div
        className={cn(
          'grid grid-cols-1 gap-8 xl:grid-cols-3 xl:gap-x-8 xl:gap-y-6',
          hasEmptySlotPlaceholder(items) && 'min-h-24',
        )}
      >
        {items}
      </div>
    </div>
  );
}

export { Testimonial };
export default Testimonial;
