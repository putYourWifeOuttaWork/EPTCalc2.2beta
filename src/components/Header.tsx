import React from 'react';
import { Calculator } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow print:hidden">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Calculator className="h-8 w-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-900">
            EPT Effect on Productivity - Signature Business Value
          </h1>
        </div>
      </div>
    </header>
  );
}