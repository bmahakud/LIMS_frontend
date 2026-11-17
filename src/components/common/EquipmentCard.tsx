import React from 'react';
import { EquipmentItem } from '../../types';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface EquipmentCardProps {
  equipment: EquipmentItem;
  onSelect?: (item: EquipmentItem) => void;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect && onSelect(equipment)}
      className={`bg-white border border-industrial-border hover:border-charcoal transition-all p-5 shadow-sm flex flex-col justify-between group ${onSelect ? 'cursor-pointer' : ''}`}
    >
      <div>
        {/* Machine image */}
        <div className="relative aspect-[4/3] bg-charcoal-50 overflow-hidden mb-4 border border-industrial-border">
          <img
            src={equipment.image}
            alt={equipment.name}
            loading="lazy"
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-2 left-2 text-[10px] font-mono uppercase tracking-wider bg-charcoal text-white px-2 py-0.5 font-bold">
            {equipment.category}
          </span>
        </div>

        {/* Header tags */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-mono text-industrial-teal font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Active Laboratory Asset
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-charcoal group-hover:text-industrial-orange transition-colors">
          {equipment.name}
        </h3>
        <p className="text-xs font-mono text-charcoal-500 mt-1">
          {equipment.operation}
        </p>

        {/* Key Capability Banner */}
        <div className="mt-3 p-2.5 bg-industrial-lightGray border-l-2 border-industrial-orange text-xs text-charcoal-800 font-mono">
          <span className="font-semibold text-charcoal-900 block text-[10px] uppercase tracking-wider text-charcoal-500">
            Key Capability
          </span>
          {equipment.keyCapability}
        </div>

        {/* Technical specs table */}
        <div className="mt-3 pt-3 border-t border-industrial-border space-y-1.5 text-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-400 font-bold block mb-1">
            Technical Parameters
          </span>
          {Object.entries(equipment.specifications).slice(0, 3).map(([key, val], idx) => (
            <div key={idx} className="flex justify-between items-baseline text-[11px] font-mono">
              <span className="text-charcoal-500 truncate max-w-[45%]">{key}:</span>
              <span className="text-charcoal-900 font-semibold text-right max-w-[55%] truncate">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer standards */}
      <div className="mt-5 pt-3 border-t border-industrial-border">
        <div className="flex items-center justify-between text-[11px] font-mono text-charcoal-500">
          <div className="flex items-center space-x-1 truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-industrial-teal shrink-0" />
            <span className="truncate">ISO: {equipment.standardsSupported.slice(0, 2).join(', ')}</span>
          </div>
          <span className="text-[11px] text-industrial-orange font-semibold shrink-0 group-hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
};
