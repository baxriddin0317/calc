// Widget uchun asosiy entry point
import './CalculatorWidget';

// Widget ni global o'zgaruvchiga qo'shish
export { CalculatorWidget } from './CalculatorWidget';

// Widget ni avtomatik ishga tushirish (agar kerak bo'lsa)
if (typeof window !== 'undefined') {
  // Widget ni global o'zgaruvchiga qo'shish
  (window as any).CalculatorWidget = (window as any).CalculatorWidget || {};
}
