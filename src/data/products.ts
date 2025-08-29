import type { Product, CalculatorConfig } from '../types';

export const products: Product[] = [
  // Radiohidlar
  {
    id: 'rg-001',
    name: 'Radiohid Professional',
    price: 15000,
    category: 'radioguide',
    description: 'Professional radiohid 50 ta qurilma uchun',
    image: '/images/radioguide-pro.jpg'
  },
  {
    id: 'rg-002',
    name: 'Radiohid Standard',
    price: 12000,
    category: 'radioguide',
    description: 'Standard radiohid 30 ta qurilma uchun',
    image: '/images/radioguide-std.jpg'
  },
  {
    id: 'rg-003',
    name: 'Radiohid Mini',
    price: 8000,
    category: 'radioguide',
    description: 'Mini radiohid 15 ta qurilma uchun',
    image: '/images/radioguide-mini.jpg'
  },

  // Audiohidlar
  {
    id: 'ag-001',
    name: 'Audiohid Professional',
    price: 20000,
    category: 'audioguide',
    description: 'Professional audiohid 100 ta qurilma uchun',
    image: '/images/audioguide-pro.jpg'
  },
  {
    id: 'ag-002',
    name: 'Audiohid Standard',
    price: 15000,
    category: 'audioguide',
    description: 'Standard audiohid 50 ta qurilma uchun',
    image: '/images/audioguide-std.jpg'
  },
  {
    id: 'ag-003',
    name: 'Audiohid Basic',
    price: 10000,
    category: 'audioguide',
    description: 'Basic audiohid 25 ta qurilma uchun',
    image: '/images/audioguide-basic.jpg'
  },

  // Aksessuarlar
  {
    id: 'acc-001',
    name: 'Quloqchinlar Premium',
    price: 2500,
    category: 'accessory',
    description: 'Premium sifatli quloqchinlar',
    image: '/images/headphones-premium.jpg'
  },
  {
    id: 'acc-002',
    name: 'Quloqchinlar Standard',
    price: 1500,
    category: 'accessory',
    description: 'Standard sifatli quloqchinlar',
    image: '/images/headphones-std.jpg'
  },
  {
    id: 'acc-003',
    name: 'Batareya zaryadlovchi',
    price: 3000,
    category: 'accessory',
    description: 'Batareya zaryadlovchi qurilma',
    image: '/images/battery-charger.jpg'
  },
  {
    id: 'acc-004',
    name: 'Transport quti',
    price: 2000,
    category: 'accessory',
    description: 'Transport va saqlash uchun quti',
    image: '/images/transport-case.jpg'
  },
  {
    id: 'acc-005',
    name: 'Simsiz zaryadlovchi',
    price: 4000,
    category: 'accessory',
    description: 'Simsiz zaryadlovchi stansiya',
    image: '/images/wireless-charger.jpg'
  }
];

export const shippingOptions = [
  {
    type: 'standard' as const,
    name: 'Oddiy dostavka',
    price: 1000
  },
  {
    type: 'express' as const,
    name: 'Tezkor dostavka',
    price: 2500
  }
];

export const discountOptions = [
  {
    type: 'percentage' as const,
    value: 10,
    minAmount: 50000,
    name: '10% chegirma (50,000 so\'mdan ortiq)'
  },
  {
    type: 'percentage' as const,
    value: 15,
    minAmount: 100000,
    name: '15% chegirma (100,000 so\'mdan ortiq)'
  },
  {
    type: 'fixed' as const,
    value: 5000,
    minAmount: 30000,
    name: '5,000 so\'m chegirma (30,000 so\'mdan ortiq)'
  }
];

export const calculatorConfig: CalculatorConfig = {
  currency: 'RUB',
  vatRateDefault: 20,
  sku: {
    transmitter: { sku: 'TX', name: 'Передатчик', unitPrice: 10000 },
    receiver: { sku: 'RX', name: 'Приёмник', unitPrice: 3000 },
    microphone: { sku: 'MIC', name: 'Микрофон', unitPrice: 2000 },
    headphones: {
      in_ear: { sku: 'HP-IN', name: 'Наушники (вкладыши)', unitPrice: 700 },
      on_ear: { sku: 'HP-ON', name: 'Наушники (накладные)', unitPrice: 1200 },
      over_ear: { sku: 'HP-OV', name: 'Наушники (полноразмерные)', unitPrice: 2000 }
    },
    charger: {
      10: { sku: 'CH-10', name: 'Зарядное устройство на 10', unitPrice: 8000 },
      20: { sku: 'CH-20', name: 'Зарядное устройство на 20', unitPrice: 15000 },
      30: { sku: 'CH-30', name: 'Зарядное устройство на 30', unitPrice: 21000 }
    }
  },
  volumeDiscounts: [
    { thresholdQty: 20, percentage: 5 },
    { thresholdQty: 50, percentage: 10 },
    { thresholdQty: 100, percentage: 15 }
  ],
  shipping: {
    moscow: 0,
    rf: 0,
    world: 0
  },
  promos: [
    { code: 'WELCOME10', type: 'percentage', value: 10, stackWithVolume: true },
    { code: 'FIX5000', type: 'fixed', value: 5000, minAmount: 30000, stackWithVolume: false }
  ]
};
