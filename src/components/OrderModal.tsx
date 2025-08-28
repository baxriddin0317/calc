import React from "react";
import { IoClose } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa";

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
}

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  orderItems,
  userInfo,
  onUserInfoChange,
  onUpdateQuantity,
  onRemoveItem,
  onSubmit,
  formatPrice,
}) => {
  if (!isOpen) return null;

  const getOrderTotal = () => {
    return orderItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const handleClose = () => {
    onClose();
    onUserInfoChange({ name: "", email: "", phone: "+7" });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Ваш заказ:</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Order Items */}
        <div className="p-6">
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-xl">
                    {item.image}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600">({item.sku})</p>
                    <p className="text-sm text-gray-500">
                      {formatPrice(item.price)} за шт.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-black rounded-lg overflow-hidden">
                    <button
                      className="p-2 hover:bg-gray-100 disabled:opacity-50"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="px-3 py-1 min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      className="p-2 hover:bg-gray-100"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                  <div className="text-right min-w-[4rem]">
                    <p className="font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 p-2"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <IoClose size={16} />
                  </button>
                </div>
              </div>
            ))}

            {orderItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Корзина пуста</p>
                <p className="text-sm">Добавьте товары для оформления заказа</p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {orderItems.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Подытог заказа:</span>
                <span className="font-bold text-lg">
                  {formatPrice(getOrderTotal())}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* User Information */}
        <div className="p-6 border-t">
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
              <div className="flex">
                <div className="flex items-center border border-black rounded-l-lg px-3 bg-gray-50">
                  <span className="text-sm">🇷🇺</span>
                  <select
                    className="ml-2 bg-transparent border-none outline-none"
                    value={
                      userInfo.phone.startsWith("+7")
                        ? "+7"
                        : userInfo.phone.startsWith("+998")
                        ? "+998"
                        : "+1"
                    }
                    onChange={(e) => {
                      const countryCode = e.target.value;
                      const phoneNumber = userInfo.phone.replace(/^\+\d+/, "");
                      onUserInfoChange({
                        ...userInfo,
                        phone: countryCode + phoneNumber,
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
                  value={userInfo.phone.replace(/^\+\d+/, "")}
                  onChange={(e) => {
                    const countryCode = userInfo.phone.startsWith("+7")
                      ? "+7"
                      : userInfo.phone.startsWith("+998")
                      ? "+998"
                      : "+1";
                    onUserInfoChange({
                      ...userInfo,
                      phone: countryCode + e.target.value,
                    });
                  }}
                  placeholder="(000) 000-00-00"
                  className="flex-1 h-10 border border-black border-l-0 rounded-r-lg px-3 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Button */}
        <div className="p-6 border-t">
          <button
            onClick={onSubmit}
            disabled={orderItems.length === 0}
            className="w-full h-14 bg-custom-gradient cursor-pointer text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {orderItems.length === 0 ? "Корзина пуста" : "Заказать"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
