import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';

const sectionVariants = cva('border-b-2 border-line', {
  variants: {
    backgroundColor: {
      chalk: 'bg-chalk',
      paper: 'bg-paper',
      acid: 'bg-acid',
      // Blue is an inverted surface: chalk type, periwinkle muted text, and a
      // deeper blue for surface fills.
      blue: 'dark blue bg-blue',
    },
  },
  defaultVariants: {
    backgroundColor: 'chalk',
  },
});

type SectionBackgroundColor = NonNullable<
  VariantProps<typeof sectionVariants>['backgroundColor']
>;

export interface SectionProps extends Omit<
  ComponentPropsWithoutRef<'section'>,
  'children' | 'content'
> {
  backgroundColor: SectionBackgroundColor;
  content?: ReactNode;
}

function Section({
  backgroundColor,
  className,
  content,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        sectionVariants({
          backgroundColor,
        }),
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-8 px-5 py-12 sm:px-8 md:gap-10 md:py-16 lg:px-16 lg:py-20">
        {content}
      </div>
    </section>
  );
}

export { Section };
export default Section;
