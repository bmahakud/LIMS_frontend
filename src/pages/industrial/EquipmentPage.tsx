import React, { useState } from 'react';
import { EquipmentCard } from '../../components/common/EquipmentCard';
import { EQUIPMENT_CATALOGUE } from '../../data/equipment';
import { EquipmentItem, EquipmentCategory } from '../../types';
import { ShieldCheck, Search, X, CheckCircle2 } from 'lucide-react';

export const EquipmentPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalItem, setActiveModalItem] = useState<EquipmentItem | null>(null);

  const categories = [
    'All',
    'Sample Preparation',
    'Physical Testing',
    'Mechanical Testing',
    'High-Temperature Testing',
    'Chemical Analysis'
  ];

  const filteredEquipment = EQUIPMENT_CATALOGUE.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.operation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.keyCapability.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-charcoal text-white pt-28 pb-16 lg:pt-36 lg:pb-20 border-b-4 border-industrial-orange relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-industrial-orange uppercase tracking-widest">
              <span className="w-5 h-[2px] bg-industrial-orange block"></span>
              <span>Laboratory Instrumentation & Machinery</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Calibrated Laboratory Equipment & High-Temperature Testing Rigs.
            </h1>
            <p className="text-base sm:text-lg text-charcoal-300 leading-relaxed font-light">
              Diamond diamond core saws, 3000 kN compression frames, 1700°C electric testing furnaces, RUL/Creep rigs, and WDXRF spectrometers sourced from our active laboratory inventory.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-industrial-border pb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
                    selectedCategory === cat
                      ? 'bg-charcoal text-white shadow-sm'
                      : 'bg-industrial-lightGray text-charcoal-600 hover:bg-charcoal-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[280px]">
              <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search equipment or operations..."
                value={searchQuery}
                aria-label="Search laboratory equipment inventory"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-industrial-border text-xs font-mono focus:outline-none focus:border-charcoal bg-industrial-lightGray/50"
              />
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs font-mono text-charcoal-500">
            <span>Showing {filteredEquipment.length} of {EQUIPMENT_CATALOGUE.length} documented laboratory assets</span>
            <span className="flex items-center gap-1.5 text-industrial-teal font-semibold">
              <ShieldCheck className="w-4 h-4" /> Traceable Calibration
            </span>
          </div>

          {/* Equipment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map(item => (
              <EquipmentCard 
                key={item.id} 
                equipment={item} 
                onSelect={(selected) => setActiveModalItem(selected)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal / Lightbox */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={activeModalItem.name}
        >
          <div className="bg-white max-w-3xl w-full border border-charcoal-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-charcoal text-white px-6 py-4 flex items-center justify-between border-b-2 border-industrial-orange">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider bg-industrial-orange text-white px-2 py-0.5 font-bold">
                  {activeModalItem.category}
                </span>
                <span className="font-mono text-xs text-charcoal-300">Documented Asset</span>
              </div>
              <button 
                onClick={() => setActiveModalItem(null)}
                aria-label="Close details"
                className="text-charcoal-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="aspect-[4/3] bg-charcoal-50 border border-industrial-border overflow-hidden flex items-center justify-center">
                  <img 
                    src={activeModalItem.image} 
                    alt={activeModalItem.name}
                    className="max-h-full max-w-full object-contain p-2"
                  />
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-charcoal">{activeModalItem.name}</h2>
                  <p className="text-xs font-mono text-charcoal-600 bg-industrial-lightGray p-2.5 border-l-2 border-industrial-teal">
                    {activeModalItem.operation}
                  </p>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-400 font-bold block">
                      Core Function
                    </span>
                    <p className="text-xs text-charcoal-700 mt-1 leading-relaxed">
                      {activeModalItem.keyCapability}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-industrial-border pt-4">
                <span className="text-xs font-mono uppercase tracking-wider text-charcoal-400 font-bold block mb-3">
                  Technical Specifications
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {Object.entries(activeModalItem.specifications).map(([k, v], i) => (
                    <div key={i} className="flex justify-between p-2 bg-industrial-lightGray border-b border-charcoal-200">
                      <span className="text-charcoal-500">{k}:</span>
                      <span className="text-charcoal-900 font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-industrial-border pt-4">
                <span className="text-xs font-mono uppercase tracking-wider text-charcoal-400 font-bold block mb-2">
                  Compliant Testing Standards
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeModalItem.standardsSupported.map((std, i) => (
                    <span key={i} className="px-2.5 py-1 bg-charcoal text-white font-mono text-xs font-semibold">
                      {std}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-industrial-lightGray px-6 py-3 border-t border-industrial-border flex justify-between items-center text-xs font-mono">
              <span className="flex items-center gap-1.5 text-industrial-teal font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Calibration Traceability Maintained
              </span>
              <button
                onClick={() => setActiveModalItem(null)}
                className="px-4 py-1.5 bg-charcoal text-white font-semibold hover:bg-industrial-orange transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
