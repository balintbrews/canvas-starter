import { cva } from 'class-variance-authority';
import { cn, FormattedText } from 'drupal-canvas';
import type { HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';

const paragraphVariants = cva('max-w-5xl text-balance', {
  variants: {
    variant: {
      body: 'text-base leading-7 text-muted md:text-lg md:leading-8',
      eyebrow:
        'font-mono text-xs leading-6 font-bold tracking-[0.2em] text-blue uppercase before:mr-3 before:inline-block before:size-2.5 before:bg-blue before:align-[-1px] dark:text-acid dark:before:bg-acid',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

type ParagraphVariant = NonNullable<
  VariantProps<typeof paragraphVariants>['variant']
>;

export interface ParagraphProps {
  className?: HTMLAttributes<HTMLDivElement>['className'];
  text: string;
  variant?: ParagraphVariant;
}

function Paragraph({ className, text, variant }: ParagraphProps) {
  return (
    <FormattedText
      as="div"
      className={cn(paragraphVariants({ variant }), className)}
    >
      {text}
    </FormattedText>
  );
}

export { Paragraph };
export default Paragraph;
