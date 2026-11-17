import React, { useState, useEffect } from 'react';
import { EQUIPMENT_CATALOGUE } from '../../data/equipment';
import { EquipmentItem, EquipmentCategory } from '../../types';
import { ShieldCheck, X, ZoomIn, CheckCircle2, ChevronRight, SlidersHorizontal } from 'lucide-react';

export const EquipmentGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<EquipmentItem | null>(null);

  const categories = [
    'All',
    'Sample Preparation',
    'Physical Testing',
    'Mechanical Testing',
    'High-Temperature Testing',
    'Chemical Analysis'
  ];

  const filteredItems = EQUIPMENT_CATALOGUE.filter(item => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxItem(null);
      }
    };
    if (activeLightboxItem) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeLightboxItem]);

  return (
    <div className="space-y-8">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-charcoal-800 pb-4">
        <span className="text-xs font-mono text-charcoal-400 uppercase tracking-wider mr-2 hidden sm:inline-flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-industrial-orange" />
          <span>Category:</span>
        </span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-industrial-orange text-white shadow-md'
                : 'bg-charcoal-900 text-charcoal-300 hover:bg-charcoal-800 hover:text-white border border-charcoal-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Equipment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-charcoal-900 border border-charcoal-800 hover:border-industrial-orange transition-all duration-300 flex flex-col justify-between group overflow-hidden shadow-lg"
          >
            {/* Image Preview with Hover Zoom */}
            <div 
              onClick={() => setActiveLightboxItem(item)}
              className="relative h-48 bg-charcoal-950 overflow-hidden cursor-pointer flex items-center justify-center p-3"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-charcoal-950/20 group-hover:bg-charcoal-950/0 transition-colors"></div>
              
              {/* Category Pill Over Image */}
              <div className="absolute top-3 left-3 bg-charcoal/90 text-white border border-charcoal-700 px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold tracking-wider">
                {item.category}
              </div>

              {/* Zoom Prompt */}
              <div className="absolute bottom-3 right-3 bg-charcoal/90 text-industrial-orange p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white group-hover:text-industrial-orange transition-colors leading-snug">
                  {item.name}
                </h4>
                <p className="text-xs text-charcoal-300 leading-relaxed font-light line-clamp-2">
                  {item.operation}
                </p>
              </div>

              {/* Supported Standards */}
              <div className="pt-3 border-t border-charcoal-800 flex items-center justify-between text-[11px] font-mono">
                <span className="text-charcoal-400">Standards:</span>
                <span className="text-industrial-teal font-semibold">
                  {item.standardsSupported.slice(0, 2).join(', ')}
                </span>
              </div>
            </div>

            {/* Inspect Lightbox CTA Button */}
            <button
              onClick={() => setActiveLightboxItem(item)}
              className="w-full py-2.5 bg-charcoal-950 hover:bg-industrial-orange text-charcoal-300 hover:text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors border-t border-charcoal-800 flex items-center justify-center space-x-1.5 focus:outline-none focus:ring-2 focus:ring-industrial-orange"
            >
              <span>View Machine Parameters</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Accessible Modal Lightbox */}
      {activeLightboxItem && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
        >
          <div className="relative bg-white w-full max-w-3xl border-t-4 border-industrial-orange shadow-2xl overflow-hidden text-charcoal max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-charcoal px-6 py-4 text-white flex items-center justify-between border-b border-charcoal-700">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-industrial-orange uppercase block font-bold">
                  {activeLightboxItem.category}
                </span>
                <h3 id="lightbox-title" className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {activeLightboxItem.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="text-charcoal-400 hover:text-white p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-industrial-orange"
                aria-label="Close machine inspection modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
              {/* Large Image Canvas */}
              <div className="h-64 sm:h-72 bg-charcoal-900 border border-charcoal-200 flex items-center justify-center p-4">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-500">
                  Laboratory Operation & Function
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-800 leading-relaxed font-light">
                  {activeLightboxItem.operation}
                </p>
                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light pt-1">
                  {activeLightboxItem.keyCapability}
                </p>
              </div>

              {/* Technical Specifications Table */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-500">
                  Verified Technical Parameters
                </h4>
                <div className="border border-industrial-border overflow-hidden">
                  <table className="w-full text-left text-xs font-mono divide-y divide-industrial-border">
                    <tbody className="divide-y divide-industrial-border">
                      {Object.entries(activeLightboxItem.specifications).map(([key, val], idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-industrial-lightGray/40' : 'bg-white'}>
                          <td className="py-2.5 px-3.5 font-bold text-charcoal-900 w-1/3">{key}</td>
                          <td className="py-2.5 px-3.5 text-charcoal-700">{val}</td>
                        </tr>
                      ))}
                      <tr>
                        <td className="py-2.5 px-3.5 font-bold text-charcoal-900">Referenced Standards</td>
                        <td className="py-2.5 px-3.5 text-industrial-teal font-semibold">
                          {activeLightboxItem.standardsSupported.join(', ')}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-industrial-lightGray px-6 py-3 border-t border-industrial-border flex justify-end">
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="px-5 py-2 bg-charcoal text-white hover:bg-industrial-orange transition-colors font-mono text-xs uppercase font-bold"
              >
                Close Parameters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
