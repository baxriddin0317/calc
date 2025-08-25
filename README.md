# Calculator Widget

Интерактивный калькулятор для формирования комплекта (радиогиды/аудиогиды и аксессуары) с подсчётом стоимости, учётом скидок/НДС/доставки и передачей собранного комплекта в корзину/заявку.

## Возможности

- **4 типа продуктов**: Радиогид, Аудиогид, Наушники, Мультигид DRA-210
- **Гибкая настройка**: Приёмники, передатчики, микрофоны, наушники, зарядные устройства
- **Расчёт стоимости**: Автоматический подсчёт с учётом скидок, НДС и доставки
- **Webhook интеграция**: Отправка заявок в CRM/Bitrix24
- **JS-API интеграция**: Добавление товаров в корзину сайта
- **Встраиваемый виджет**: Одна строка `<script>` + контейнер `<div>`

## Установка и запуск

### Разработка
```bash
npm install
npm run dev
```

### Сборка

#### Widget (встраиваемый виджет)
```bash
npm run build:widget
```

#### Standalone SPA
```bash
npm run build:standalone
```

#### Все варианты
```bash
npm run build:all
```

## Использование

### 1. Встраиваемый виджет

Добавьте на любую HTML страницу:

```html
<!-- React и ReactDOM (если не установлены) -->
<script crossorigin src="https://unpkg.com/react@19/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@19/umd/react-dom.production.min.js"></script>

<!-- Calculator widget -->
<script src="https://your-domain.com/calculator-widget.js"></script>

<!-- Widget container -->
<div id="calculator-widget"></div>
```

### 2. Standalone SPA

Откройте в браузере:
```
https://your-domain.com/calculator
```

## Webhook интеграция

### CRM/Bitrix24

Widget автоматически отправляет данные в следующем формате:

```json
{
  "delivery": "moscow",
  "receivers": 5,
  "transmitters": 3,
  "microphones": 2,
  "headphones": {
    "type": "in_ear",
    "quantity": 10
  },
  "charger": "20",
  "promo": "WELCOME10",
  "vatIncluded": false,
  "vatRate": 20,
  "bundles": 1,
  "total": 150000,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Специальный формат для Bitrix24

```json
{
  "title": "Заявка на комплект - 15.01.2024",
  "fields": {
    "UF_CRM_DELIVERY": "moscow",
    "UF_CRM_RECEIVERS": 5,
    "UF_CRM_TRANSMITTERS": 3,
    "UF_CRM_MICROPHONES": 2,
    "UF_CRM_HEADPHONES_TYPE": "in_ear",
    "UF_CRM_HEADPHONES_QTY": 10,
    "UF_CRM_CHARGER": "20",
    "UF_CRM_PROMO": "WELCOME10",
    "UF_CRM_VAT_INCLUDED": "Нет",
    "UF_CRM_VAT_RATE": 20,
    "UF_CRM_BUNDLES": 1,
    "UF_CRM_TOTAL": 150000,
    "UF_CRM_CURRENCY": "RUB"
  }
}
```

## JS-API интеграция

### Добавление товаров в корзину

Widget автоматически ищет следующие API:

#### 1. Общий API магазина

```javascript
window.shopAPI = {
  // Добавление товара в корзину
  addToCart: function(items) {
    console.log('Добавлено в корзину:', items);
    // Логика добавления в корзину
    // Открытие popup, обновление цены
  },
  
  // Удаление товара из корзины
  removeFromCart: function(itemId) {
    // Логика удаления
  },
  
  // Получение данных корзины
  getCart: function() {
    return []; // Данные корзины
  },
  
  // Очистка корзины
  clearCart: function() {
    // Логика очистки
  }
};
```

#### 2. Специальный API для Tilda

```javascript
window.TildaAPI = {
  cart: {
    // Добавление товара в корзину
    add: function(items) {
      console.log('Добавлено в корзину Tilda:', items);
      // Интеграция с корзиной Tilda
    },
    
    // Удаление товара из корзины
    remove: function(itemId) {
      // Удаление
    },
    
    // Получение данных корзины
    get: function() {
      return []; // Данные корзины
    }
  },
  
  popup: {
    // Открытие popup
    open: function(id) {
      // Логика открытия popup
    },
    
    // Закрытие popup
    close: function(id) {
      // Логика закрытия
    }
  }
};
```

#### 3. Для CRM систем

```javascript
window.crmAPI = {
  // Создание заказа
  createOrder: function(orderData) {
    return fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },
  
  // Добавление в корзину
  addToCart: function(items) {
    return fetch('/api/cart/add', {
      method: 'POST',
      body: JSON.stringify(items)
    });
  }
};
```

### Если API недоступен

Если никакой API не доступен, widget автоматически перенаправляет на страницу корзины с query-параметрами:

```
/cart?action=add_to_cart&delivery=moscow&receivers=5&transmitters=3&total=150000
```

## Структура проекта

```
src/
├── components/          # React компоненты
│   ├── Calculator.tsx  # Основной калькулятор
│   ├── RadioGuideTab.tsx
│   ├── AudioGuideTab.tsx
│   ├── HeadphonesTab.tsx
│   └── MultiguideTab.tsx
├── widget/             # Для виджета
│   ├── CalculatorWidget.ts
│   └── index.ts
├── store/              # Управление состоянием
│   └── calculatorStore.ts
├── data/               # Конфигурация
│   └── products.ts
└── types/              # TypeScript типы
    └── index.ts
```

## Настройка

### Цены и скидки

Измените в файле `src/data/products.ts`:

```typescript
export const calculatorConfig: CalculatorConfig = {
  currency: 'RUB',
  vatRateDefault: 20,
  sku: {
    transmitter: { sku: 'TX', name: 'Передатчик', unitPrice: 10000 },
    receiver: { sku: 'RX', name: 'Приёмник', unitPrice: 3000 },
    // ... другие SKU
  },
  volumeDiscounts: [
    { thresholdQty: 20, percentage: 5 },
    { thresholdQty: 50, percentage: 10 }
  ],
  shipping: {
    moscow: 0,
    rf: 1500,
    world: 4000
  }
};
```

### Webhook URL

Нажмите кнопку "Отправить заявку" в виджете и введите URL webhook.

### JS-API интеграция

Добавьте один из API в основной HTML файл:

```javascript
// Для обычного магазина
window.shopAPI = {
  addToCart: function(items) {
    // Ваша логика добавления в корзину
  }
};

// Для Tilda
window.TildaAPI = {
  cart: {
    add: function(items) {
      // Интеграция с Tilda
    }
  }
};
```

## Поддержка

- **Tilda**: Полностью поддерживается
- **WordPress**: Полностью поддерживается  
- **Обычный HTML**: Полностью поддерживается
- **React/Vue/Angular**: Полностью поддерживается

## Тестирование

### Основные тест-кейсы

1. **Базовый расчёт**: TX=1, RX=10, без НДС, Москва
2. **Объёмные скидки**: Применяются на корректных порогах
3. **Промокоды**: Процентные и фиксированные работают корректно
4. **Доставка**: Москва/РФ/Мир корректно меняют итог
5. **Корзина**: Товары добавляются или передаются параметры

### Проверка интеграции

1. **Webhook**: Отправка заявок в CRM
2. **JS-API**: Добавление в корзину сайта
3. **Tilda**: Работа без конфликтов с popup

## Лицензия

MIT License
