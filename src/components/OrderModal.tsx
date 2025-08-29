import React from "react";

interface OrderItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  image: string;
}

interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  userInfo: UserInfo;
  onUserInfoChange: (userInfo: UserInfo) => void;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onSubmit: () => void;
  formatPrice: (price: number) => string;
  orderTotal: number;
}

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  orderItems,
  userInfo,
  onUserInfoChange,
  onSubmit,
  formatPrice,
  orderTotal,
}) => {
  if (!isOpen) return null;

  // Total is provided from the calculator store to ensure consistency

  const handleClose = () => {
    onClose();
    onUserInfoChange({ name: "", email: "", phone: "+7" });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div className="grid md:grid-cols-2 gap-4 bg-white rounded-xl max-w-[99%] lg:max-w-3/4 xl:max-w-[936px]  w-full sm:mx-4 max-h-[90vh] py-12 px-6 lg:px-12 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* User Information */}
        <div className="max-w-[349px] mx-auto md:mx-0 w-full">
          <h3 className="text-lg font-semibold mb-4">Контактная информация</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ваше имя
              </label>
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) =>
                  onUserInfoChange({ ...userInfo, name: e.target.value })
                }
                placeholder="Введите имя"
                className="w-full h-10 rounded-lg outline-none border border-black px-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ваш Email
              </label>
              <input
                type="email"
                value={userInfo.email}
                onChange={(e) =>
                  onUserInfoChange({ ...userInfo, email: e.target.value })
                }
                placeholder="Введите Email"
                className="w-full h-10 rounded-lg outline-none border border-black px-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ваш телефон
              </label>
              <div className="flex w-full">
                <div className="flex items-center border border-black rounded-l-lg px-3 bg-gray-50">
                  <span className="text-sm">🇷🇺</span>
                  <select
                    className="ml-2 bg-transparent border-none outline-none"
                    value={
                      userInfo.phone.startsWith("+998")
                        ? "+998"
                        : userInfo.phone.startsWith("+7")
                        ? "+7"
                        : "+1"
                    }
                    onChange={(e) => {
                      const newCountryCode = e.target.value;
                      const currentCountryCode = userInfo.phone.startsWith("+998")
                        ? "+998"
                        : userInfo.phone.startsWith("+7")
                        ? "+7"
                        : "+1";
                      const phoneNumber = userInfo.phone.replace(currentCountryCode, "");
                      onUserInfoChange({
                        ...userInfo,
                        phone: newCountryCode + phoneNumber,
                      });
                    }}
                  >
                    <option value="+7">+7</option>
                    <option value="+998">+998</option>
                    <option value="+1">+1</option>
                  </select>
                </div>
                <input
                  type="tel"
                  value={(() => {
                    const currentCountryCode = userInfo.phone.startsWith("+998")
                      ? "+998"
                      : userInfo.phone.startsWith("+7")
                      ? "+7"
                      : "+1";
                    return userInfo.phone.replace(currentCountryCode, "");
                  })()}
                  onChange={(e) => {
                    const countryCode = userInfo.phone.startsWith("+998")
                      ? "+998"
                      : userInfo.phone.startsWith("+7")
                      ? "+7"
                      : "+1";
                    onUserInfoChange({
                      ...userInfo,
                      phone: countryCode + e.target.value,
                    });
                  }}
                  placeholder="(000) 000-00-00"
                  className="flex-1 w-fit h-10 border border-black border-l-0 rounded-r-lg px-3 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        {/* items */}
        <div className="max-w-[346px] w-full mx-auto md:border rounded-2xl md:p-4">
          <div className="text-xl font-semibold mb-6 text-gray-800">Ваш комплект</div>
          {/* Selected items list */}
          <div className="space-y-6 mb-6">
            {orderItems.map((item, index) => (
              <div key={item.id} className="text-gray-800">
                <div className="text-sm text-gray-600">
                  {index + 1}. {item.name} x{item.quantity}:
                </div>
                <div className="pl-3 text-sm text-gray-600">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
          {/* Price breakdown */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Подытог:</span>
              <span>{formatPrice(orderTotal || 0)}</span>
            </div>
            
            <hr className="border-gray-200" />
          </div>
          <button
            onClick={onSubmit}
            disabled={orderItems.length === 0}
            className="w-full h-10 bg-custom-gradient cursor-pointer text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {orderItems.length === 0 ? "Корзина пуста" : "Отправить"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
