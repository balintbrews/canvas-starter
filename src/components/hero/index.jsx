import FormattedText from "@/lib/FormattedText";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import clsx from "clsx"; // eslint-disable-line no-unused-vars
import { motion } from "motion/react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const Hero = ({
  title,
  description,
  buttonLabel,
  buttonLink,
  image,
  darkVariant,
  backgroundColor,
}) => {
  const heroVariants = cva("", {
    variants: {
      colorScheme: {
        light: "",
        dark: "dark",
      },
      backgroundColor: {
        base: "bg-base",
        mantle: "bg-mantle",
        crust: "bg-crust",
      },
    },
    defaultVariants: {
      colorScheme: "light",
      backgroundColor: "base",
    },
  });
  const { width, height } = useWindowSize();
  return (
    <section
      className={heroVariants({
        colorScheme: darkVariant ? "dark" : "light",
        backgroundColor,
      })}
    >
      <Confetti width={width} height={height} />
      <div className="mx-auto max-w-screen-xl sm:grid sm:grid-cols-2 sm:items-center">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="flex max-w-xl flex-col gap-8">
            <h2 className="tracking-relaxed bg-gradient-to-r from-peach to-mauve bg-clip-text text-2xl font-extrabold text-balance text-transparent md:text-4xl">
              {title}
            </h2>
            <FormattedText
              as="p"
              className="leading-relaxed text-balance text-text"
            >
              {description}
            </FormattedText>
            <div>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={buttonLink}
                className={cn(
                  "inline-block rounded-sm bg-mauve px-12 py-3 text-sm font-medium text-inverted-text transition hover:bg-mauve/75",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red",
                )}
              >
                {buttonLabel}
              </motion.a>
            </div>
          </div>
        </div>
        <div className="h-full w-full overflow-hidden rounded-3xl py-6 md:py-8 lg:py-14">
          <img
            alt={image.alt}
            src={image.src}
            width={image.width}
            height={image.height}
            className="h-full w-full object-cover object-right shadow-lg sm:rounded-l-4xl xl:rounded-r-xl dark:border dark:border-surface-0 dark:shadow-none"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
