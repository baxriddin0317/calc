export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'radioguide' | 'audioguide' | 'accessory';
  description?: string;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Discount {
  type: 'percentage' | 'fixed';
  value: number;
  minAmount?: number;
}

export interface Shipping {
  type: 'standard' | 'express';
  price: number;
  name: string;
}

export interface CalculatorState {
  // Legacy (product list) - kept for compatibility where needed
  selectedProducts: CartItem[];
  // New fields per spec
  select_delivery: DeliveryRegion;
  input_tr: number; // transmitters
  input_rc: number; // receivers
  input_mic: number; // microphones
  select_headphones: HeadphonesType | null;
  qty_headphones: number;
  select_charger: ChargerCapacity | null;
  // New fields for different tabs
  input_audioguide: number; // Количество аудиогидов
  input_triggers: number; // Количество триггеров
  promo: string;
  vatIncluded: boolean;
  vatRate: number;
  bundles: number;
  // Derived
  shipping: Shipping | null;
  discount: Discount | null;
  subtotal: number;
  // volumeDiscountAmount: number;
  promoDiscountAmount: number;
  discountAmount: number;
  vatAmount: number;
  shippingCost: number;
  total: number;
}

export interface CalculatorActions {
  // Legacy
  addProduct: (product: Product, quantity?: number) => void;
  removeProduct: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setShipping: (shipping: Shipping) => void;
  setDiscount: (discount: Discount | null) => void;
  // New field setters
  setDelivery: (region: DeliveryRegion) => void;
  setTransmitters: (qty: number) => void;
  setReceivers: (qty: number) => void;
  setMicrophones: (qty: number) => void;
  setHeadphonesType: (type: HeadphonesType | null) => void;
  setHeadphonesQty: (qty: number) => void;
  setCharger: (capacity: ChargerCapacity | null) => void;
  // New setters for different tabs
  setAudioguideQty: (qty: number) => void;
  setTriggersQty: (qty: number) => void;
  setPromo: (code: string) => void;
  setVatIncluded: (included: boolean) => void;
  setVatRate: (rate: number) => void;
  setBundles: (qty: number) => void;
  // Computation
  calculateTotal: () => void;
  clearCart: () => void;
  addToCart: () => void;
  sendToWebhook: (webhookUrl: string) => void;
}

// New types for configuration-driven calculator
export type DeliveryRegion = 'moscow' | 'rf' | 'world';

export type HeadphonesType = 'in_ear' | 'on_ear' | 'over_ear';

export type ChargerCapacity = 10 | 20 | 30;

export interface SkuPrice {
  sku: string;
  name: string;
  unitPrice: number; // base currency
}

export interface VolumeDiscountRule {
  // Apply by total devices count (TX + RX + MIC + headphones qty)
  thresholdQty: number;
  percentage: number; // e.g., 5 means 5%
}

export interface ShippingMatrix {
  moscow: number;
  rf: number;
  world: number;
}

export interface PromoRule {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minAmount?: number;
  stackWithVolume?: boolean;
  expiresAt?: string; // ISO date string
}

export interface CalculatorConfig {
  currency: string;
  vatRateDefault: number;
  sku: {
    transmitter: SkuPrice;
    receiver: SkuPrice;
    microphone: SkuPrice;
    headphones: Record<HeadphonesType, SkuPrice>;
    charger: Record<ChargerCapacity, SkuPrice>;
  };
  volumeDiscounts: VolumeDiscountRule[];
  shipping: ShippingMatrix;
  promos: PromoRule[];
}
