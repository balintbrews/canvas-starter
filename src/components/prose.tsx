import { cva } from 'class-variance-authority';
import { cn, FormattedText } from 'drupal-canvas';
import type { VariantProps } from 'class-variance-authority';

// The block keeps its readable measure and left-aligned text either way; the
// alignment only moves the whole block within its container.
const proseVariants = cva('prose', {
  variants: {
    blockAlignment: {
      start: '',
      center: 'mx-auto',
    },
  },
  defaultVariants: {
    blockAlignment: 'start',
  },
});

type ProseBlockAlignment = NonNullable<
  VariantProps<typeof proseVariants>['blockAlignment']
>;

export interface ProseProps {
  blockAlignment?: ProseBlockAlignment;
  className?: string;
  text?: string;
}

const Component = ({
  blockAlignment,
  className,
  text = 'Prose',
}: ProseProps) => {
  // @see `@plugin '@tailwindcss/typography'` in src/global.css.
  // (Global CSS tab in the Canvas code editor)
  return (
    <FormattedText className={cn(proseVariants({ blockAlignment }), className)}>
      {text}
    </FormattedText>
  );
};

export default Component;
