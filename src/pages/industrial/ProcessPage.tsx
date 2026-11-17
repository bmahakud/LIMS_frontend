import React from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { PROCESS_STAGES } from '../../data/processSteps';
import { CheckCircle2, ShieldCheck, AlertTriangle } from 'lucide-react';

export const ProcessPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-charcoal text-white pt-28 pb-16 lg:pt-36 lg:pb-20 border-b-4 border-industrial-orange relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-industrial-orange uppercase tracking-widest">
              <span className="w-5 h-[2px] bg-industrial-orange block"></span>
              <span>Procedure R-01 Reference</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Standard Testing Procedure R-01: End-to-End Governance.
            </h1>
            <p className="text-base sm:text-lg text-charcoal-300 leading-relaxed font-light">
              Danieli Corus documented methodology for refractory material sampling, chain-of-custody tracking, precision preparation, calibrated execution, and quality sign-off.
            </p>
          </div>
        </div>
      </section>

      {/* Process Deep Dive */}
      <section className="py-20 bg-white border-b border-industrial-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeader
            eyebrow="The 5-Stage Governance Sequence"
            title="Rigorous Quality Gateways at Every Step"
            description="Procedure R-01 establishes transparent, reproducible standards from the moment refractory pallets are sampled at the manufacturing kiln until the official Certificate of Analysis is issued."
          />

          <div className="space-y-12">
            {PROCESS_STAGES.map((stage) => (
              <div 
                key={stage.stepNumber}
                className="border border-industrial-border bg-white p-6 sm:p-10 shadow-sm hover:border-charcoal transition-all relative"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Step Badge & Timing */}
                  <div className="lg:col-span-3 space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm font-extrabold px-2.5 py-1 bg-charcoal text-white">
                        STAGE 0{stage.stepNumber}
                      </span>
                      <span className="font-mono text-xs font-bold text-industrial-orange">
                        {stage.code}
                      </span>
                    </div>

                    <div className="p-3 bg-industrial-lightGray border-l-2 border-industrial-teal text-xs font-mono">
                      <span className="text-charcoal-400 block text-[10px] uppercase">R-01 Procedure</span>
                      <strong className="text-charcoal-900">{stage.procedureReference}</strong>
                    </div>
                  </div>

                  {/* Main Description */}
                  <div className="lg:col-span-9 space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-charcoal">
                        {stage.title}
                      </h3>
                      <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed mt-2 font-light">
                        {stage.fullDesc}
                      </p>
                    </div>

                    {/* Key Deliverables & Controls Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-industrial-border text-xs">
                      <div className="space-y-2">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-charcoal-400 font-bold block">
                          Stage Deliverables
                        </span>
                        <ul className="space-y-1.5 font-sans">
                          {stage.keyDeliverables.map((item, i) => (
                            <li key={i} className="flex items-start space-x-2 text-charcoal-700">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-charcoal-400 font-bold block">
                          Quality Assurance Controls
                        </span>
                        <ul className="space-y-1.5 font-sans">
                          {stage.qualityControls.map((item, i) => (
                            <li key={i} className="flex items-start space-x-2 text-charcoal-700">
                              <ShieldCheck className="w-4 h-4 text-industrial-orange flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Root Cause Analysis & Non-Conformance Policy */}
          <div className="bg-charcoal text-white p-8 sm:p-10 border-l-4 border-industrial-orange space-y-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-industrial-orange flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white">
                  Procedure R-01 §8.0: Non-Conformance & Retesting Protocol
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-300 leading-relaxed font-light">
                  When a specimen fails to meet the specified Danieli Corus DC-SPEC acceptance threshold, an immediate re-test of duplicate archive specimens is triggered under secondary observer oversight. If non-conformance is confirmed, a formal Defect Notification is issued with macro/microstructural photographic evidence and root cause analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
