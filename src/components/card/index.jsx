import { cva } from "class-variance-authority";
import { FormattedText } from "drupal-canvas";

const Card = ({ title, description, iconNameFromLucide, iconColor }) => {
  const cardVariants = cva("size-8", {
    variants: {
      iconColor: {
        text: "bg-text",
        rosewater: "bg-rosewater",
        flamingo: "bg-flamingo",
        pink: "bg-pink",
        mauve: "bg-mauve",
        red: "bg-red",
        maroon: "bg-maroon",
        peach: "bg-peach",
        yellow: "bg-yellow",
        green: "bg-green",
        teal: "bg-teal",
        sky: "bg-sky",
        sapphire: "bg-sapphire",
        blue: "bg-blue",
        lavender: "bg-lavender",
      },
    },
    defaultVariants: {
      iconColor: "teal",
    },
  });
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-surface-0 p-6">
      {iconNameFromLucide && (
        <div
          className={cardVariants({ iconColor })}
          style={{
            maskImage: `url(https://esm.sh/lucide-static@0.544.0/icons/${iconNameFromLucide}.svg)`,
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskImage: `url(https://esm.sh/lucide-static@0.544.0/icons/${iconNameFromLucide}.svg)`,
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
          }}
        />
      )}
      {title && <h3 className="text-lg font-semibold text-text">{title}</h3>}
      {description && (
        <FormattedText as="p" className="text-subtext-0">
          {description}
        </FormattedText>
      )}
    </div>
  );
};

export default Card;
