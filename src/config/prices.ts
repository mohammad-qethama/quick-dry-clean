import { site } from './site';
import { ar } from '../i18n/ar';
import { en } from '../i18n/en';
// [PLACEHOLDER] 0 is a deliberately fake value. Owner edits are centralized in site.ts.
export const prices = site.placeholders.prices.map((price, index) => ({
  category: { ar: ar.services[index], en: en.services[index] }, // REVIEW: native speaker check
  item: { ar: ar.priceItems[index], en: en.priceItems[index] }, // REVIEW: native speaker check
  price,
}));
