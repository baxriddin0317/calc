import React, { useState } from 'react';
import useCalculatorStore from '../store/calculatorStore';
import { calculatorConfig } from '../data/products';
import RadioGuideTab from './RadioGuideTab';
import AudioGuideTab from './AudioGuideTab';
import HeadphonesTab from './HeadphonesTab';
import OrderModal from './OrderModal';
import WebhookModal from './WebhookModal';
import { TiArrowSortedDown } from 'react-icons/ti';

const Calculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [showWebhookForm, setShowWebhookForm] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '+7'
  });
  
  const {
    // inputs
    select_delivery,
    input_rc,
    input_tr,
    input_mic,
    select_headphones,
    qty_headphones,
    select_charger,
    promo,
    vatIncluded,
    vatRate,
    bundles,
    // totals
    total,
    subtotal,
    volumeDiscountAmount,
    promoDiscountAmount,
    shippingCost,
    vatAmount,
    // setters
    setDelivery,
    setReceivers,
    setTransmitters,
    setMicrophones,
    setHeadphonesType,
    setHeadphonesQty,
    setCharger,
    setPromo,
    setVatIncluded,
    setVatRate,
    setBundles,
    // actions
    clearCart,
    sendToWebhook,
    addToCart
  } = useCalculatorStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(price);
  };

  const handleWebhookSubmit = async () => {
    if (!webhookUrl.trim()) {
      alert('Пожалуйста, введите URL webhook');
      return;
    }

    try {
      await sendToWebhook(webhookUrl);
      alert('Заявка успешно отправлена!');
      setShowWebhookForm(false);
      setWebhookUrl('');
    } catch (error) {
      console.error('Webhook error:', error);
      alert('Произошла ошибка при отправке заявки.');
    }
  };

  const handleOrderSubmit = () => {
    if (!userInfo.name.trim()) {
      alert('Пожалуйста, введите ваше имя');
      return;
    }
    
    if (!userInfo.email.trim() || !userInfo.email.includes('@')) {
      alert('Пожалуйста, введите корректный email');
      return;
    }
    
    const phoneNumber = userInfo.phone.replace(/^\+\d+/, '');
    if (phoneNumber.length < 10) {
      alert('Пожалуйста, введите корректный номер телефона');
      return;
    }

    // Bu yerda buyurtmani yuborish logikasi
    console.log('Order submitted:', {
      userInfo,
      order: {
        delivery: select_delivery,
        receivers: input_rc,
        transmitters: input_tr,
        microphones: input_mic,
        headphones: { type: select_headphones, quantity: qty_headphones },
        charger: select_charger,
        total,
        bundles
      }
    });

    alert('Заказ успешно оформлен!');
    setShowOrderModal(false);
    setUserInfo({ name: '', email: '', phone: '+7' });
  };

  const handleAddToCart = () => {
    try {
      addToCart();
      setShowOrderModal(true);
    } catch (error) {
      console.error('Ошибка корзины:', error);
      alert('Произошла ошибка при добавлении в корзину');
    }
  };

  const getOrderItems = () => {
    const items = [];
    
    if (input_tr > 0) {
      items.push({
        id: 'transmitter',
        name: 'Передатчик',
        sku: 'radiosync-x',
        quantity: input_tr,
        price: calculatorConfig.sku.transmitter.unitPrice,
        image: '🔴'
      });
    }
    
    if (input_rc > 0) {
      items.push({
        id: 'receiver',
        name: 'Приёмник',
        sku: 'radiosync-r',
        quantity: input_rc,
        price: calculatorConfig.sku.receiver.unitPrice,
        image: '🔵'
      });
    }
    
    if (input_mic > 0) {
      items.push({
        id: 'microphone',
        name: 'Микрофон',
        sku: 'radiosync-m',
        quantity: input_mic,
        price: calculatorConfig.sku.microphone.unitPrice,
        image: '🎤'
      });
    }
    
    if (select_headphones && qty_headphones > 0) {
      items.push({
        id: 'headphones',
        name: `Наушники (${calculatorConfig.sku.headphones[select_headphones].name})`,
        sku: 'radiosync-h',
        quantity: qty_headphones,
        price: calculatorConfig.sku.headphones[select_headphones].unitPrice,
        image: '🎧'
      });
    }
    
    if (select_charger) {
      items.push({
        id: 'charger',
        name: `Зарядное устройство на ${select_charger}`,
        sku: 'radiosync-c',
        quantity: 1,
        price: calculatorConfig.sku.charger[select_charger].unitPrice,
        image: '🔌'
      });
    }
    
    return items;
  };

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 0) return;
    
    switch (itemId) {
      case 'transmitter':
        setTransmitters(newQuantity);
        break;
      case 'receiver':
        setReceivers(newQuantity);
        break;
      case 'microphone':
        setMicrophones(newQuantity);
        break;
      case 'headphones':
        setHeadphonesQty(newQuantity);
        break;
      case 'charger':
        // Зарядное устройство может быть только 1 штука
        break;
    }
  };

  const removeItem = (itemId: string) => {
    switch (itemId) {
      case 'transmitter':
        setTransmitters(0);
        break;
      case 'receiver':
        setReceivers(0);
        break;
      case 'microphone':
        setMicrophones(0);
        break;
      case 'headphones':
        setHeadphonesQty(0);
        setHeadphonesType(null);
        break;
      case 'charger':
        setCharger(null);
        break;
    }
  };



  const tabs = [
    {
      id: 0,
      name: 'Радиогид',
      component: (
        <RadioGuideTab
          input_rc={input_rc}
          input_tr={input_tr}
          input_mic={input_mic}
          select_headphones={select_headphones}
          qty_headphones={qty_headphones}
          select_charger={select_charger}
          setReceivers={setReceivers}
          setTransmitters={setTransmitters}
          setMicrophones={setMicrophones}
          setHeadphonesType={setHeadphonesType}
          setHeadphonesQty={setHeadphonesQty}
          setCharger={setCharger}
          calculatorConfig={calculatorConfig}
        />
      )
    },
    {
      id: 1,
      name: 'Аудиогид',
      component: (
        <AudioGuideTab
          input_rc={input_rc}
          select_headphones={select_headphones}
          setReceivers={setReceivers}
          setHeadphonesType={setHeadphonesType}
        />
      )
    },
    {
      id: 2,
      name: 'Наушники',
      component: (
        <HeadphonesTab
          select_headphones={select_headphones}
          qty_headphones={qty_headphones}
          setHeadphonesType={setHeadphonesType}
          setHeadphonesQty={setHeadphonesQty}
        />
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      <div className="flex justify-center items-center md:max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-8 text-center">
          Соберите свой комплект оборудования
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Левая форма */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Выберите продукт</h2>
            
            {/* Tab Navigation */}
            <nav className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 font-medium text-sm h-14 w-full xxs:max-w-[199px] rounded-2xl cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-custom-gradient text-white'
                      : 'bg-[#e5ebee]'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>

            {/* Tab Content */}
            <div className="mt-6">
              <div className=' mb-3'>
                <h3 className="md:text-lg font-semibold mb-3">Доставка</h3>
                <div className="relative w-full">
                  <select
                    value={select_delivery}
                    onChange={(e) => setDelivery(e.target.value as any)}
                    className="w-full h-12 rounded-lg outline-none border border-black px-3 appearance-none pr-10"
                  >
                    <option value="moscow">Москва</option>
                    <option value="rf">Другая РФ</option>
                    <option value="world">Другая страна</option>
                  </select>
                  {/* Custom arrow */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <TiArrowSortedDown />
                  </div>
                </div>
              </div>
              {tabs[activeTab].component}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <div className="md:text-lg font-semibold mb-1">Промокод</div>
              <div className="flex h-12 items-center border border-black rounded-lg overflow-hidden mt-2">
                <input 
                  type="text" 
                  value={promo} 
                  onChange={(e)=>setPromo(e.target.value)}
                  className="flex-1 border-none outline-none px-5" 
                  placeholder='0'
                />
              </div>
            </div>
            <div>
              <div className="md:text-lg font-semibold mb-1">НДС</div>
              <div className="flex items-center h-10 gap-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={vatIncluded} onChange={(e)=>setVatIncluded(e.target.checked)} />
                  <span className="text-sm">цены с НДС</span>
                </label>
                <input type="number" min={0} max={100} step={0.1} value={vatRate} onChange={(e)=>setVatRate(Number(e.target.value))} className="w-24 h-10 rounded-lg border border-black px-2" />
                <span className="text-sm">%</span>
              </div>
            </div>
            <div>
              <div className="md:text-lg font-semibold mb-1">Кол-во комплектов</div>
              <div className="flex h-12 items-center border border-black rounded-lg overflow-hidden mt-2">
                <input 
                  type="text" 
                  value={bundles === 0 ? '' : bundles} 
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only allow numbers
                    if (/^\d*$/.test(value)) {
                      setBundles(Number(e.target.value));
                    }
                  }}
                  className="flex-1 border-none outline-none px-5" 
                  placeholder='0'
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button onClick={() => setShowOrderModal(true)} className="h-12 px-6 rounded-lg bg-primary-600 text-white hover:bg-primary-700">
              Оформить заказ
            </button>
            <button onClick={() => setShowWebhookForm(true)} className="h-12 px-6 rounded-lg bg-custom-gradient cursor-pointer text-white ">
              Отправить заявку
            </button>
            <button onClick={clearCart} className="h-12 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer">
              Сбросить
            </button>
          </div>

          {/* Webhook Modal */}
          <WebhookModal
            isOpen={showWebhookForm}
            onClose={() => setShowWebhookForm(false)}
            webhookUrl={webhookUrl}
            onWebhookUrlChange={setWebhookUrl}
            onSubmit={handleWebhookSubmit}
          />

          {/* Order Modal */}
          <OrderModal
            isOpen={showOrderModal}
            onClose={() => setShowOrderModal(false)}
            orderItems={getOrderItems()}
            userInfo={userInfo}
            onUserInfoChange={setUserInfo}
            onUpdateQuantity={updateItemQuantity}
            onRemoveItem={removeItem}
            onSubmit={handleOrderSubmit}
            formatPrice={formatPrice}
          />
        </div>

        {/* Правая сводка */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-6 border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
            <div className="text-xl font-semibold mb-6 text-gray-800">Итого</div>
            
            {/* Price breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Подытог:</span>
                <span>{formatPrice(subtotal || 0)}</span>
              </div>
              
              {volumeDiscountAmount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Скидка за объём:</span>
                  <span>-{formatPrice(volumeDiscountAmount)}</span>
                </div>
              )}
              
              {promoDiscountAmount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Промокод:</span>
                  <span>-{formatPrice(promoDiscountAmount)}</span>
                </div>
              )}
              
              {shippingCost > 0 && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Доставка:</span>
                  <span>{formatPrice(shippingCost)}</span>
                </div>
              )}
              
              {vatAmount > 0 && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>НДС ({vatRate}%):</span>
                  <span>{formatPrice(vatAmount)}</span>
                </div>
              )}
              
              <hr className="border-gray-200" />
            </div>
            
            {/* Total */}
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-800">Итого</span>
                <span className="text-3xl font-bold text-primary-600">{formatPrice(total)}</span>
              </div>
              {bundles > 1 && (
                <div className="text-xs text-gray-500 mt-1">
                  За {bundles} комплект{bundles > 1 ? (bundles > 4 ? 'ов' : 'а') : ''}
                </div>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="space-y-3">
              <button 
                onClick={() => setShowOrderModal(true)}
                className="w-full h-12 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
              >
                ОФОРМИТЬ ЗАКАЗ
              </button>
              <button 
                onClick={handleAddToCart}
                className="w-full h-10 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition-colors"
              >
                В корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;