// All unknown owner-supplied values are collected here. Do not publish as facts.
export const site = {
  siteUrl: 'https://example.com', // [PLACEHOLDER: real domain]
  phoneDisplay: '07 7155 9900',
  phoneIntl: '+962771559900',
  whatsapp: '962771559900',
  email: '', // [PLACEHOLDER: optional email]
  facebook: 'https://www.facebook.com/quickdrycleanjo',
  instagram: '', // Optional; hidden until supplied.
  mapsLink: 'https://share.google/pVEZY1WdLjaEmwwD8',
  mapsEmbedUrl: '', // [PLACEHOLDER: Google Maps embed src]
  geo: { lat: 0, lng: 0 }, // [PLACEHOLDER: exact coordinates]
  currencyCode: 'JOD', // [PLACEHOLDER: confirm currency]
  delivery: false,
  placeholders: {
    ar: {
      city: '[PLACEHOLDER: المدينة]', // REVIEW: native speaker check
      address: '[PLACEHOLDER: العنوان]', // REVIEW: native speaker check
      nightPickupNote: '[PLACEHOLDER: أضف تفاصيل تسليم الملابس واستلامها ليلاً]', // REVIEW: native speaker check
      story: '[PLACEHOLDER: أضف نبذة قصيرة عن المحل وطريقتكم في العناية بالملابس.]', // REVIEW: native speaker check
      serviceDescriptions: [
        '[PLACEHOLDER: أضف أنواع الأقمشة والقطع المناسبة للغسيل الجاف.]', // REVIEW: native speaker check
        '[PLACEHOLDER: وضّح خدمة الغسيل وكيفية العناية بالملابس اليومية.]', // REVIEW: native speaker check
        '[PLACEHOLDER: أضف تفاصيل خدمة الكوي وتجهيز الملابس للاستلام.]', // REVIEW: native speaker check
      ],
    },
    en: {
      city: '[PLACEHOLDER: City]',
      address: '[PLACEHOLDER: Street address]',
      nightPickupNote: '[PLACEHOLDER: Explain how late-night drop-off and collection work.]',
      story: '[PLACEHOLDER: Add a short introduction to the shop and how you care for clothes.]',
      serviceDescriptions: [
        '[PLACEHOLDER: Describe the fabrics and garments you dry clean.]',
        '[PLACEHOLDER: Describe your laundry service and everyday garment care.]',
        '[PLACEHOLDER: Describe your pressing service and collection arrangements.]',
      ],
    },
    prices: [0, 0, 0], // [PLACEHOLDER: example values only; not actual quotes]
    priceRange: '[PLACEHOLDER: confirmed price range]',
    images: {
      before: '/images/placeholder-before.webp', // [PLACEHOLDER: real before photo]
      after: '/images/placeholder-after.webp', // [PLACEHOLDER: matching real after photo]
      shop: '/images/placeholder-shop.webp', // [PLACEHOLDER: real shop photo]
      social: '/images/og-image.png', // [PLACEHOLDER: approved social image]
    },
  },
};
