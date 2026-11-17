import React, { useState } from 'react';
import { PROCESS_STAGES } from '../../data/processSteps';
import { CheckCircle2, ShieldCheck, ArrowRight, Camera, FileCheck, Layers, Gauge, Archive } from 'lucide-react';

export const InteractiveProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const currentStage = PROCESS_STAGES.find(s => s.stepNumber === activeStep) || PROCESS_STAGES[0];

  const getStepIcon = (num: number) => {
    switch (num) {
      case 1: return <Layers className="w-4 h-4" />;
      case 2: return <Camera className="w-4 h-4" />;
      case 3: return <Gauge className="w-4 h-4" />;
      case 4: return <FileCheck className="w-4 h-4" />;
      case 5: return <Archive className="w-4 h-4" />;
      default: return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* 5-Step Horizontal Tab Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3" role="tablist" aria-label="Laboratory Testing Process Stages">
        {PROCESS_STAGES.map((stage) => {
          const isActive = stage.stepNumber === activeStep;
          return (
            <button
              key={stage.stepNumber}
              role="tab"
              aria-selected={isActive}
              aria-controls={`stage-panel-${stage.stepNumber}`}
              id={`stage-tab-${stage.stepNumber}`}
              onClick={() => setActiveStep(stage.stepNumber)}
              className={`p-3.5 sm:p-4 text-left border transition-all duration-200 flex flex-col justify-between relative group focus:outline-none focus:ring-2 focus:ring-industrial-orange ${
                isActive
                  ? 'bg-charcoal text-white border-charcoal shadow-md'
                  : 'bg-white text-charcoal-700 border-industrial-border hover:border-charcoal hover:bg-industrial-lightGray/60'
              }`}
            >
              {/* Active Orange Accent Line */}
              {isActive && (
                <span className="absolute top-0 left-0 right-0 h-1 bg-industrial-orange"></span>
              )}

              <div className="flex items-center justify-between w-full">
                <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded-none ${
                  isActive ? 'bg-industrial-orange text-white' : 'bg-charcoal text-white'
                }`}>
                  0{stage.stepNumber}
                </span>
                <span className={isActive ? 'text-industrial-orange' : 'text-charcoal-400 group-hover:text-charcoal-600'}>
                  {getStepIcon(stage.stepNumber)}
                </span>
              </div>

              <div className="mt-3">
                <div className={`text-xs font-bold font-sans line-clamp-1 ${
                  isActive ? 'text-white' : 'text-charcoal group-hover:text-industrial-orange'
                }`}>
                  {stage.title}
                </div>
                <div className={`text-[10px] font-mono mt-0.5 ${
                  isActive ? 'text-charcoal-300' : 'text-charcoal-500'
                }`}>
                  {stage.code}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Stage Deep-Dive Card */}
      <div 
        role="tabpanel"
        id={`stage-panel-${currentStage.stepNumber}`}
        aria-labelledby={`stage-tab-${currentStage.stepNumber}`}
        className="bg-white border-2 border-charcoal p-6 sm:p-10 shadow-lg relative animate-fadeIn"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Stage Overview & Reference */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-industrial-orange uppercase tracking-wider">
              <span>{currentStage.code}</span>
              <span className="text-charcoal-300">•</span>
              <span>Stage 0{currentStage.stepNumber} of 05</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-charcoal tracking-tight">
              {currentStage.title}
            </h3>

            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
              {currentStage.fullDesc}
            </p>

            <div className="p-3.5 bg-industrial-lightGray border-l-4 border-industrial-teal text-xs font-mono text-charcoal-800">
              <span className="text-[10px] uppercase font-bold text-charcoal-500 block mb-0.5">
                Authentic Procedure Reference
              </span>
              <span className="font-semibold text-charcoal-900">{currentStage.procedureReference}</span>
            </div>
          </div>

          {/* Right Column: Key Deliverables & Quality Controls */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-charcoal-50/50 p-5 sm:p-6 border border-industrial-border">
            {/* Deliverables */}
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal-900 flex items-center gap-1.5 pb-2 border-b border-charcoal-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Stage Deliverables</span>
              </span>
              <ul className="space-y-2 text-xs text-charcoal-700">
                {currentStage.keyDeliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0 mt-1.5"></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quality Controls */}
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal-900 flex items-center gap-1.5 pb-2 border-b border-charcoal-200">
                <ShieldCheck className="w-4 h-4 text-industrial-orange flex-shrink-0" />
                <span>Quality Gateways</span>
              </span>
              <ul className="space-y-2 text-xs text-charcoal-700">
                {currentStage.qualityControls.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-industrial-orange flex-shrink-0 mt-1.5"></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Navigation between stages */}
        <div className="mt-8 pt-4 border-t border-industrial-border flex items-center justify-between">
          <button
            onClick={() => setActiveStep(prev => (prev > 1 ? prev - 1 : PROCESS_STAGES.length))}
            className="text-xs font-mono font-bold text-charcoal-600 hover:text-charcoal uppercase tracking-wider flex items-center gap-1.5 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-industrial-orange min-h-[44px]"
          >
            <span>← Previous Stage</span>
          </button>
          <div className="flex items-center space-x-1.5 py-2">
            {PROCESS_STAGES.map((s) => (
              <button
                key={s.stepNumber}
                aria-label={`Go to stage ${s.stepNumber}`}
                onClick={() => setActiveStep(s.stepNumber)}
                className={`h-2.5 transition-all p-2 -m-1 focus:outline-none ${
                  s.stepNumber === activeStep ? 'w-6 bg-industrial-orange' : 'w-2.5 bg-charcoal-300 hover:bg-charcoal'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setActiveStep(prev => (prev < PROCESS_STAGES.length ? prev + 1 : 1))}
            className="text-xs font-mono font-bold text-industrial-darkOrange hover:text-industrial-orange uppercase tracking-wider flex items-center gap-1.5 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-industrial-orange min-h-[44px]"
          >
            <span>Next Stage →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
