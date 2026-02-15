import { useState } from "react";
import { cn } from "drupal-canvas";

const PricingTable = ({
  entryTierName,
  entryTierDescription,
  entryTierPriceMonthly,
  entryTierPriceAnnual,
  midTierName,
  midTierDescription,
  midTierPriceMonthly,
  midTierPriceAnnual,
  advancedTierName,
  advancedTierDescription,
  advancedTierPriceMonthly,
  advancedTierPriceAnnual,
  defaultTier,
  annualSelectedByDefault,
  annualBadgeText,
  buttonLabel,
  buttonLink,
}) => {
  const [isAnnual, setIsAnnual] = useState(annualSelectedByDefault);
  const [tier, setTier] = useState(defaultTier);

  const tierNames = {
    entry: entryTierName,
    mid: midTierName,
    advanced: advancedTierName,
  };
  const tierDescriptions = {
    entry: entryTierDescription,
    mid: midTierDescription,
    advanced: advancedTierDescription,
  };
  const tierPrices = {
    entry: {
      monthly: entryTierPriceMonthly,
      annual: entryTierPriceAnnual,
    },
    mid: {
      monthly: midTierPriceMonthly,
      annual: midTierPriceAnnual,
    },
    advanced: {
      monthly: advancedTierPriceMonthly,
      annual: advancedTierPriceAnnual,
    },
  };

  // Calculate current price based on selections.
  const getCurrentPrice = (tierName) => {
    return tierPrices[tierName][isAnnual ? "annual" : "monthly"];
  };

  return (
    <div className="max-w-2xl">
      {/* Billing toggle */}
      <div className="mb-8 flex items-center justify-center">
        <div className="w-24 text-right">
          <span
            className={cn(
              "font-medium text-subtext-0/75",
              !isAnnual && "text-mauve",
            )}
          >
            Monthly
          </span>
        </div>

        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className="relative mx-3 h-7 w-14 cursor-pointer rounded-full border-0 bg-surface-1 p-0.5"
        >
          <div
            className={cn(
              "absolute top-0.5 h-6 w-6 rounded-full border-2 border-flamingo bg-inverted-text transition-all duration-200",
              isAnnual ? "left-7" : "left-0.5",
            )}
          />
        </button>
        <div className="flex w-36 items-center">
          <span
            className={cn(
              "font-medium text-subtext-0/75",
              isAnnual && "text-mauve",
            )}
          >
            Annual
          </span>
          <span
            className={cn(
              "ml-2 rounded-full bg-green px-2 py-1 text-xs leading-none font-medium whitespace-nowrap text-inverted-text transition-opacity duration-200",
              isAnnual ? "opacity-100" : "opacity-0",
            )}
          >
            {annualBadgeText}
          </span>
        </div>
      </div>

      {/* Pricing tiers */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        {["entry", "mid", "advanced"].map((planName) => {
          const isSelected = tier === planName;
          const price = getCurrentPrice(planName);

          return (
            <div
              key={planName}
              onClick={() => setTier(planName)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setTier(planName);
                }
              }}
              data-state={isSelected ? "selected" : undefined}
              role="button"
              tabIndex={0}
              className={cn(
                "group flex-1 cursor-pointer rounded-lg p-5 transition-all duration-200",
                "bg-surface-1",
                "data-[state=selected]:outline-2 data-[state=selected]:outline-offset-3 data-[state=selected]:outline-mauve",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red",
              )}
            >
              <h3 className="mb-3 text-lg font-bold text-text">
                {tierNames[planName]}
              </h3>

              <div className="mb-4">
                <div className="mb-1 text-2xl font-bold text-text">
                  ${price.toLocaleString()}
                </div>
              </div>

              <div className="text-sm leading-relaxed text-text">
                {tierDescriptions[planName]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Button */}
      <div>
        <a
          href={buttonLink}
          className={cn(
            "inline-block w-full rounded-sm bg-mauve px-12 py-3 text-center text-sm font-medium text-inverted-text transition hover:bg-mauve/75",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red",
          )}
        >
          {buttonLabel.replace("{tier}", tierNames[tier])}
        </a>
      </div>
    </div>
  );
};

export default PricingTable;
