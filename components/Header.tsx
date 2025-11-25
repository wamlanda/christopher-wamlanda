import React from 'react';
import { CalendarIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-red-600 p-2 rounded-lg text-white">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Tukio Kenya</h1>
            <p className="text-xs text-gray-500 font-medium hidden sm:block">Discover Events & Requirements</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-200 animate-pulse">
            Live Updates
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
