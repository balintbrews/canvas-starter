import { cn, FormattedText } from 'drupal-canvas';
import type { ComponentPropsWithoutRef } from 'react';

export interface FaqItemProps extends Omit<
  ComponentPropsWithoutRef<'details'>,
  'children' | 'open'
> {
  answer: string;
  question: string;
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-5 group-open:rotate-45 motion-safe:transition-transform motion-safe:duration-200"
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
      strokeWidth="2.5"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

// Each item is a native disclosure, so it is collapsed by default, expands
// independently of its siblings, and works with the keyboard without any
// shared state in the container.
function FaqItem({ answer, className, question, ...props }: FaqItemProps) {
  return (
    <details
      className={cn('group border-b-2 border-line', className)}
      {...props}
    >
      <summary
        className={cn(
          'flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left font-sans text-lg leading-6 font-black tracking-[-0.02em] text-text md:py-6 md:text-xl md:leading-7',
          '[&::-webkit-details-marker]:hidden',
          'hover:text-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue motion-safe:transition-colors dark:hover:text-acid',
        )}
      >
        <span>{question}</span>
        <span
          className="mt-0.5 flex size-8 shrink-0 items-center justify-center bg-ink text-chalk group-open:bg-blue dark:bg-acid dark:text-ink dark:group-open:bg-chalk"
          aria-hidden="true"
        >
          <PlusIcon />
        </span>
      </summary>
      <FormattedText
        as="div"
        className="prose prose-base max-w-none pb-6 text-base leading-7 text-muted md:pr-14 md:pb-8 md:text-lg md:leading-8 prose-p:my-3 prose-a:text-blue prose-strong:text-text prose-li:my-1 prose-li:marker:text-ink"
      >
        {answer}
      </FormattedText>
    </details>
  );
}

export { FaqItem };
export default FaqItem;
