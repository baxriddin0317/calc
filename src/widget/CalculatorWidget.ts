import React from 'react';
import ReactDOM from 'react-dom/client';
import Calculator from '../components/Calculator';
import '../index.css';

export class CalculatorWidget extends HTMLElement {
  private root: ReactDOM.Root | null = null;
  private container: HTMLDivElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.init();
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
    }
  }

  private async init() {
    try {
      // Shadow DOM ga container qo'shish
      this.container = document.createElement('div');
      this.container.id = 'calculator-widget-container';
      this.shadowRoot!.appendChild(this.container);

      // CSS ni shadow DOM ga qo'shish
      const style = document.createElement('style');
      style.textContent = this.getWidgetStyles();
      this.shadowRoot!.appendChild(style);

      // React app ni mount qilish
      this.root = ReactDOM.createRoot(this.container);
      this.root.render(React.createElement(Calculator));

    } catch (error) {
      console.error('Calculator widget initialization error:', error);
      this.showError();
    }
  }

  private getWidgetStyles(): string {
    return `
      /* Reset styles for widget */
      #calculator-widget-container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        line-height: 1.5;
        color: #333;
        box-sizing: border-box;
      }

      #calculator-widget-container *,
      #calculator-widget-container *::before,
      #calculator-widget-container *::after {
        box-sizing: border-box;
      }

      /* Widget specific styles */
      #calculator-widget-container {
        max-width: 100%;
        margin: 0 auto;
        padding: 0;
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        #calculator-widget-container {
          padding: 0 10px;
        }
      }
    `;
  }

  private showError() {
    if (this.container) {
      this.container.innerHTML = `
        <div style="
          padding: 20px;
          text-align: center;
          color: #e53e3e;
          border: 1px solid #fed7d7;
          border-radius: 8px;
          background: #fef5f5;
        ">
          <h3>Ошибка загрузки калькулятора</h3>
          <p>Пожалуйста, обновите страницу или попробуйте позже.</p>
        </div>
      `;
    }
  }
}

// Web Component ni ro'yxatdan o'tkazish
if (!customElements.get('calculator-widget')) {
  customElements.define('calculator-widget', CalculatorWidget);
}

// Widget ni global o'zgaruvchiga qo'shish (external use uchun)
declare global {
  interface Window {
    CalculatorWidget: typeof CalculatorWidget;
  }
}

window.CalculatorWidget = CalculatorWidget;
