import React from 'react';
import { TestItem } from '../../types';
import { ArrowRight, ShieldCheck, Thermometer } from 'lucide-react';

interface TestCardProps {
  test: TestItem;
  onSelect?: (test: TestItem) => void;
}

export const TestCard: React.FC<TestCardProps> = ({ test, onSelect }) => {
  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'Physical Properties':
        return 'border-l-industrial-darkTeal text-industrial-darkTeal bg-industrial-teal/10';
      case 'Mechanical Strength':
        return 'border-l-industrial-darkOrange text-industrial-darkOrange bg-industrial-orange/10';
      case 'Thermal Performance':
        return 'border-l-amber-800 text-amber-800 bg-amber-500/10';
      case 'Chemical Composition':
        return 'border-l-indigo-800 text-indigo-800 bg-indigo-500/10';
      default:
        return 'border-l-charcoal text-charcoal bg-charcoal/10';
    }
  };

  return (
    <div className="bg-white border border-industrial-border hover:border-charcoal hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between p-6 shadow-sm hover:shadow-md relative group">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-charcoal text-white uppercase tracking-wider">
              {test.code}
            </span>
            <span className={`text-[11px] font-mono font-bold px-2 py-0.5 border-l-2 ${getCategoryBadge(test.category)}`}>
              {test.category}
            </span>
          </div>
          <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-industrial-lightGray text-charcoal-800 border border-charcoal-200">
            {test.unit}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-charcoal group-hover:text-industrial-orange transition-colors">
          {test.name}
        </h3>

        {/* Purpose */}
        <p className="text-xs sm:text-sm text-charcoal-700 mt-2 leading-relaxed line-clamp-3 font-light">
          {test.purpose}
        </p>
      </div>

      {/* Meta Specs */}
      <div className="mt-6 pt-4 border-t border-industrial-border space-y-2.5 text-xs">
        <div className="flex items-start space-x-2 text-charcoal-700">
          <ShieldCheck className="w-4 h-4 text-industrial-darkTeal flex-shrink-0 mt-0.5" />
          <div className="flex flex-wrap gap-1">
            {test.applicableStandards.map((std, i) => (
              <span key={i} className="font-mono text-[11px] bg-charcoal-50 px-1.5 py-0.5 border border-charcoal-200 text-charcoal-800 font-medium">
                {std}
              </span>
            ))}
          </div>
        </div>

        {test.temperatureRange && (
          <div className="flex items-center space-x-2 text-charcoal-700 font-mono text-[11px]">
            <Thermometer className="w-4 h-4 text-industrial-darkOrange flex-shrink-0" />
            <span>Range: {test.temperatureRange}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] font-mono text-charcoal-500">
            Specimen: {test.testSpecimen.split(' ')[0]}
          </span>
          {onSelect && (
            <button
              onClick={() => onSelect(test)}
              className="inline-flex items-center space-x-1 py-1.5 px-2 -my-1 -mr-2 text-xs font-mono font-bold text-industrial-darkOrange hover:text-industrial-orange uppercase tracking-wider group/btn focus:outline-none focus:underline"
            >
              <span>Protocol Specs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
