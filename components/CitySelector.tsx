import React from 'react';
import { CITIES } from '../constants';
import { City } from '../types';

interface CitySelectorProps {
  selectedCity: City;
  onSelectCity: (city: City) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onSelectCity }) => {
  return (
    <div className="w-full bg-white border-b border-gray-200 py-4 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Select City
        </h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {CITIES.map((city) => {
            const isSelected = selectedCity.slug === city.slug;
            return (
              <button
                key={city.slug}
                onClick={() => onSelectCity(city)}
                className={`
                  flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                  ${isSelected 
                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-200 scale-105' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }
                `}
              >
                {city.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CitySelector;
