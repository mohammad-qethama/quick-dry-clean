import { ar } from './ar';
import { en } from './en';
import { site } from '../config/site';
export type Lang = 'ar' | 'en';
export const text = (lang: Lang) => lang === 'ar' ? ar : en;
export const home = (lang: Lang) => lang === 'ar' ? '/' : '/en/';
export const whatsappUrl = (lang: Lang) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text(lang).whatsappText)}`;
