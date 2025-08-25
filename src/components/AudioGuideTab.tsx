import React from 'react';
import type { HeadphonesType } from '../types';
import { TiArrowSortedDown } from 'react-icons/ti';

interface AudioGuideTabProps {
  input_rc: number;
  select_headphones: HeadphonesType | null;
  setReceivers: (value: number) => void;
  setHeadphonesType: (value: HeadphonesType | null) => void;
}

const AudioGuideTab: React.FC<AudioGuideTabProps> = ({
  input_rc,
  select_headphones,
  setReceivers,
  setHeadphonesType
}) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className="md:text-lg font-semibold mb-1">Количество аудиогидов</div>
            <div className="flex h-12 items-center border border-black rounded-lg overflow-hidden">
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
                className="flex-1 border-none outline-none px-5" 
                placeholder='0'
              />
            </div>
          </div>
          <div>
            <div className="md:text-lg font-semibold mb-1">Наушники</div>
            <div className='relative w-full'>
              <select
                value={select_headphones ?? ''}
                onChange={(e) => setHeadphonesType(e.target.value ? (e.target.value as HeadphonesType) : null)}
                className="w-full h-12 rounded-lg outline-none border border-black px-3 appearance-none pr-10"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioGuideTab;
