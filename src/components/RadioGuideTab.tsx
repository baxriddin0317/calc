import React from 'react';
import type { HeadphonesType, ChargerCapacity, CalculatorConfig } from '../types';
import { TiArrowSortedDown } from 'react-icons/ti';

interface RadioGuideTabProps {
  input_rc: number;
  input_tr: number;
  select_headphones: HeadphonesType | null;
  qty_headphones: number;
  select_charger: ChargerCapacity | null;
  setReceivers: (value: number) => void;
  setTransmitters: (value: number) => void;
  setHeadphonesType: (value: HeadphonesType | null) => void;
  setHeadphonesQty: (value: number) => void;
  setCharger: (value: ChargerCapacity | null) => void;
  calculatorConfig: CalculatorConfig;
}

const RadioGuideTab: React.FC<RadioGuideTabProps> = ({
  input_rc,
  input_tr,
  select_headphones,
  qty_headphones,
  select_charger,
  setReceivers,
  setTransmitters,
  setHeadphonesType,
  setHeadphonesQty,
  setCharger,
  calculatorConfig
}) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5">
          <div>
            <div className="md:text-lg font-semibold mb-1">Приёмники</div>
            <div className="flex h-10 items-center border border-black rounded-lg overflow-hidden">
              <input 
                type="text" 
                value={input_rc === 0 ? '' : input_rc} 
                onChange={(e) => {
                  const value = e.target.value;
                  // Only allow numbers
                  if (/^\d*$/.test(value)) {
                    setReceivers(Number(value));
                  }
                }}
                className="flex-1 text-xs px-5 border-none outline-none" 
                placeholder='0'
              />
            </div>
          </div>
          <div>
            <div className="md:text-lg font-semibold mb-1">Передатчики</div>
            <div className="flex h-10 items-center border border-black rounded-lg overflow-hidden">
              <input 
                type="text" 
                value={input_tr === 0 ? '' : input_tr} 
                onChange={(e) => {
                  const value = e.target.value;
                  // Only allow numbers
                  if (/^\d*$/.test(value)) {
                    setTransmitters(Number(value));
                  }
                }}
                className="flex-1 text-xs px-5 border-none outline-none" 
                placeholder='0'
              />
            </div>
          </div>
          {/* <div>
            <div className="md:text-lg font-semibold mb-1">Микрофон</div>
            <div className="flex h-10 items-center border border-black rounded-lg overflow-hidden">
              <input 
                type="text" 
                value={input_mic === 0 ? '' : input_mic} 
                onChange={(e) => {
                  const value = e.target.value;
                  // Only allow numbers
                  if (/^\d*$/.test(value)) {
                    setMicrophones(Number(value));
                  }
                }}
                className="flex-1 border-none outline-none px-5" 
                placeholder='0'
              />
            </div>
          </div> */}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5">
        <div>
          <div className="md:text-lg font-semibold mb-1">Наушники</div>
          <div className='relative w-full'>
            <select
              value={select_headphones ?? ''}
              onChange={(e) => setHeadphonesType(e.target.value ? (e.target.value as HeadphonesType) : null)}
              className="w-full text-xs h-10 rounded-lg outline-none border border-black px-3 appearance-none pr-10"
            >
              <option value="">Не выбрано</option>
              <option value="in_ear">Вкладыши</option>
              <option value="on_ear">Накладные</option>
              <option value="over_ear">Полноразмерные</option>
            </select>
            {/* Custom arrow */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <TiArrowSortedDown />
            </div>
          </div>
          {select_headphones && (
            <div className="flex h-10 items-center border border-black rounded-lg overflow-hidden mt-2">
              <input 
                type="text" 
                value={qty_headphones === 0 ? '' : qty_headphones} 
                onChange={(e) => {
                  const value = e.target.value;
                  // Only allow numbers
                  if (/^\d*$/.test(value)) {
                    setHeadphonesQty(Number(e.target.value));
                  }
                }}
                className="flex-1 border-none outline-none px-5" 
                placeholder='0'
              />
            </div>
          )}
        </div>
        <div>
          <div className="md:text-lg font-semibold mb-1">Аксессуары</div>
          <div className='relative w-full'>
            <select
              value={select_charger ?? ''}
              onChange={(e) => setCharger(e.target.value ? (Number(e.target.value) as ChargerCapacity) : null)}
              className="w-full text-xs h-10 rounded-lg outline-none border border-black px-3 appearance-none pr-10"
            >
              <option value="">Не выбрано</option>
              {Object.keys(calculatorConfig.sku.charger).map(key => (
                <option key={key} value={key}>
                  {calculatorConfig.sku.charger[Number(key) as ChargerCapacity].name}
                </option>
              ))}
            </select>
            {/* Custom arrow */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <TiArrowSortedDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioGuideTab;
