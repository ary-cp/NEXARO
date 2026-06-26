export type Currency = 'USD' | 'INR' | 'EUR';
export type Billing = 'monthly' | 'annual';

export interface TierFeature {
  text: string;
  included: boolean;
}

export interface Tier {
  id: string;
  name: string;
  baseUSD: number;
  description: string;
  highlighted: boolean;
  features: TierFeature[];
}

export interface RegionalTariff {
  symbol: string;
  code: Currency;
  multiplier: number;
  locale: string;
}

export interface PricingMatrixConfig {
  tiers: Tier[];
  billingMultipliers: Record<Billing, number>;
  regionalTariffs: Record<Currency, RegionalTariff>;
}

export const PRICING_MATRIX: PricingMatrixConfig = {
  tiers: [
    {
      id: 'starter',
      name: 'Starter',
      baseUSD: 29,
      description: 'Perfect for indie builders and early-stage teams automating their first workflows.',
      highlighted: false,
      features: [
        { text: '5 AI Agents', included: true },
        { text: '10,000 monthly executions', included: true },
        { text: 'Basic analytics dashboard', included: true },
        { text: 'Email support', included: true },
        { text: 'Custom integrations', included: false },
        { text: 'Priority inference routing', included: false },
        { text: 'SLA guarantee', included: false },
        { text: 'Dedicated account manager', included: false },
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      baseUSD: 79,
      description: 'For scaling teams that need advanced orchestration and full observability.',
      highlighted: true,
      features: [
        { text: '25 AI Agents', included: true },
        { text: '100,000 monthly executions', included: true },
        { text: 'Advanced analytics & telemetry', included: true },
        { text: 'Priority support (24h SLA)', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'Priority inference routing', included: true },
        { text: 'SLA guarantee', included: false },
        { text: 'Dedicated account manager', included: false },
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      baseUSD: 199,
      description: 'Full-scale deployment for mission-critical enterprise neural operations.',
      highlighted: false,
      features: [
        { text: 'Unlimited AI Agents', included: true },
        { text: 'Unlimited executions', included: true },
        { text: 'Full observability suite', included: true },
        { text: 'Dedicated Slack channel', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'Priority inference routing', included: true },
        { text: '99.99% SLA guarantee', included: true },
        { text: 'Dedicated account manager', included: true },
      ],
    },
  ],
  billingMultipliers: {
    monthly: 1.0,
    annual: 0.8, // 20% discount
  },
  regionalTariffs: {
    USD: { symbol: '$', code: 'USD', multiplier: 1.0, locale: 'en-US' },
    INR: { symbol: '₹', code: 'INR', multiplier: 83.5, locale: 'en-IN' },
    EUR: { symbol: '€', code: 'EUR', multiplier: 0.92, locale: 'de-DE' },
  },
};

export function computePrice(
  baseUSD: number,
  currency: Currency,
  billing: Billing
): string {
  const tariff = PRICING_MATRIX.regionalTariffs[currency];
  const multiplier = PRICING_MATRIX.billingMultipliers[billing];
  const raw = baseUSD * tariff.multiplier * multiplier;
  const rounded = Math.round(raw);
  return `${tariff.symbol}${rounded.toLocaleString(tariff.locale)}`;
}
