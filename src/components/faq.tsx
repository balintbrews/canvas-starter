import { hasEmptySlotPlaceholder } from '@/lib/types';
import { cn } from 'drupal-canvas';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface FaqProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children'
> {
  intro?: ReactNode;
  items?: ReactNode;
}

// The container only lays out an intro column beside a ruled list of FAQ
// items. Each item owns its own open state, so nothing here is shared.
function Faq({ className, intro, items, ...props }: FaqProps) {
  return (
    <div
      className={cn(
        'grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'flex flex-col gap-4 self-start',
          hasEmptySlotPlaceholder(intro) && 'min-h-24',
        )}
      >
        {intro}
      </div>
      <div
        className={cn(
          'border-t-2 border-line',
          hasEmptySlotPlaceholder(items) && 'min-h-24',
        )}
      >
        {items}
      </div>
    </div>
  );
}

export { Faq };
export default Faq;
