import { useState } from 'react';
import {
  buildTierDescriptions,
  buildTierNames,
  buildTierPrices,
  getCurrentPrice,
  TIER_NAMES,
} from '@/lib/pricing-utils';
import { cn } from 'drupal-canvas';
import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';
import type { TierName } from '@/lib/pricing-utils';

export interface PricingTableProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children'
> {
  advancedTierDescription: string;
  advancedTierIconNameFromLucide: string;
  advancedTierName: string;
  advancedTierPriceAnnual: number;
  advancedTierPriceMonthly: number;
  annualBadgeText: string;
  annualSelectedByDefault?: boolean;
  buttonLabel: string;
  buttonLink: string;
  defaultTier: TierName;
  entryTierDescription: string;
  entryTierIconNameFromLucide: string;
  entryTierName: string;
  entryTierPriceAnnual: number;
  entryTierPriceMonthly: number;
  intro?: ReactNode;
  midTierDescription: string;
  midTierIconNameFromLucide: string;
  midTierName: string;
  midTierPriceAnnual: number;
  midTierPriceMonthly: number;
}

const getIconMaskStyle = (iconName: string): CSSProperties => ({
  maskImage: `url(https://esm.sh/lucide-static@0.544.0/icons/${iconName}.svg)`,
  maskPosition: 'center',
  maskRepeat: 'no-repeat',
  maskSize: 'contain',
  WebkitMaskImage: `url(https://esm.sh/lucide-static@0.544.0/icons/${iconName}.svg)`,
  WebkitMaskPosition: 'center',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
});

function PricingTable({
  entryTierName,
  entryTierDescription,
  entryTierIconNameFromLucide,
  entryTierPriceMonthly,
  entryTierPriceAnnual,
  midTierName,
  midTierDescription,
  midTierIconNameFromLucide,
  midTierPriceMonthly,
  midTierPriceAnnual,
  advancedTierName,
  advancedTierDescription,
  advancedTierIconNameFromLucide,
  advancedTierPriceMonthly,
  advancedTierPriceAnnual,
  defaultTier,
  annualSelectedByDefault,
  annualBadgeText,
  buttonLabel,
  buttonLink,
  intro,
  className,
  ...props
}: PricingTableProps) {
  const [isAnnual, setIsAnnual] = useState(annualSelectedByDefault ?? false);
  const tier = defaultTier;

  const tierNames = buildTierNames({
    entryTierName,
    midTierName,
    advancedTierName,
  });
  const tierDescriptions = buildTierDescriptions({
    entryTierDescription,
    midTierDescription,
    advancedTierDescription,
  });
  const tierIcons: Record<TierName, string> = {
    entry: entryTierIconNameFromLucide,
    mid: midTierIconNameFromLucide,
    advanced: advancedTierIconNameFromLucide,
  };
  const tierPrices = buildTierPrices({
    entryTierPriceMonthly,
    entryTierPriceAnnual,
    midTierPriceMonthly,
    midTierPriceAnnual,
    advancedTierPriceMonthly,
    advancedTierPriceAnnual,
  });

  return (
    <div className={cn('w-full', className)} {...props}>
      {intro && (
        <div className="mx-auto mb-10 w-full max-w-6xl border-y-2 border-line py-8 md:mb-12 md:py-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center *:max-w-3xl">
            {intro}
          </div>
        </div>
      )}

      {/* Billing toggle */}
      <div className="mb-8 flex items-center justify-center md:mb-10">
        <div className="w-24 text-right font-mono text-xs font-bold tracking-[0.12em] uppercase">
          <span className={cn('text-muted', !isAnnual && 'text-text')}>
            Monthly
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsAnnual(!isAnnual)}
          className="relative mx-4 h-8 w-16 cursor-pointer border-2 border-ink bg-paper p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue dark:border-chalk dark:bg-ink dark:focus-visible:outline-acid"
          aria-label="Toggle annual billing"
        >
          <div
            className={cn(
              'absolute top-1 size-5 bg-ink motion-safe:transition-[left,background-color] motion-safe:duration-200 dark:bg-chalk',
              isAnnual ? 'left-8 bg-blue dark:bg-acid' : 'left-1',
            )}
          />
        </button>
        <div className="flex w-36 items-center font-mono text-xs font-bold tracking-[0.12em] uppercase">
          <span className={cn('text-muted', isAnnual && 'text-text')}>
            Annual
          </span>
          <span className="ml-3 border-2 border-ink bg-acid px-2 py-1 text-[10px] leading-none font-bold whitespace-nowrap text-ink">
            {annualBadgeText}
          </span>
        </div>
      </div>

      {/* Pricing tiers */}
      <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
        {TIER_NAMES.map((planName) => {
          const isSelected = tier === planName;
          const price = getCurrentPrice({
            tierPrices,
            tierName: planName,
            isAnnual,
          });

          return (
            <div
              key={planName}
              data-state={isSelected ? 'selected' : undefined}
              className="relative mr-2.5 mb-2.5"
            >
              {/* Offset print layer beneath the card: ink, or grainy acid for the selected tier. */}
              <div
                className={cn(
                  'absolute inset-0 translate-x-2.5 translate-y-2.5 bg-ink',
                  isSelected && 'grain-multiply bg-acid',
                )}
                aria-hidden="true"
              />
              <div
                className={cn(
                  'light relative flex h-full flex-col border-2 border-ink bg-paper p-6 text-ink',
                )}
              >
                <div className="mb-5 flex min-h-6 justify-start">
                  {planName === 'mid' && (
                    <div className="inline-flex h-6 items-center bg-ink px-2 font-mono text-[10px] leading-none font-bold tracking-[0.16em] text-acid uppercase">
                      Most popular
                    </div>
                  )}
                </div>

                <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-5">
                  <div className="flex size-14 shrink-0 items-center justify-center bg-ink">
                    <span
                      aria-hidden="true"
                      className="size-7 bg-acid"
                      style={getIconMaskStyle(tierIcons[planName])}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg leading-6 font-black tracking-[-0.02em] uppercase">
                      {tierNames[planName]}
                    </h3>
                    <div className="mt-3 font-mono text-3xl leading-none font-bold tracking-[-0.04em] tabular-nums md:text-2xl lg:text-3xl xl:text-4xl">
                      ${price.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mb-6 min-h-12 text-sm leading-6 text-muted">
                  {tierDescriptions[planName]}
                </div>

                <a
                  href={buttonLink}
                  className={cn(
                    'mt-auto inline-flex min-h-12 items-center justify-center border-2 border-ink px-5 text-center font-mono text-xs font-bold tracking-[0.12em] uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue motion-safe:transition-[transform,box-shadow,background-color,color]',
                    isSelected &&
                      'bg-ink text-chalk shadow-hard-blue-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--color-blue)]',
                    !isSelected && 'text-ink hover:bg-ink hover:text-chalk',
                  )}
                >
                  {buttonLabel.replace('{tier}', tierNames[planName])}
                </a>

                <span className="sr-only">
                  {isSelected ? 'Selected plan: ' : 'Plan: '}
                  {tierNames[planName]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { PricingTable };
export default PricingTable;
