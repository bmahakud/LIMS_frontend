import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../../components/common/SectionHeader';
import { ShieldCheck, Flame, ArrowRight, Factory, Users } from 'lucide-react';

export const AboutLab: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Editorial Header Banner */}
      <section className="bg-charcoal text-white pt-28 pb-16 lg:pt-36 lg:pb-20 border-b-4 border-industrial-orange relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80"
            alt="Industrial materials engineering laboratory"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-900/95 to-charcoal-900/80"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-industrial-orange uppercase tracking-widest">
              <span className="w-5 h-[2px] bg-industrial-orange block"></span>
              <span>About The Laboratory</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              A Heritage of Metallurgical Authority & Refractory Precision.
            </h1>
            <p className="text-base sm:text-lg text-charcoal-300 leading-relaxed font-light">
              Rooted in extensive blast furnace design, relining, and materials testing expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="py-20 bg-white border-b border-industrial-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 7 Cols: Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <SectionHeader
                eyebrow="Origins & Engineering Purpose"
                title="Engineered to Guarantee Blast Furnace Campaign Longevity"
              />

              <div className="space-y-4 text-sm sm:text-base text-charcoal-700 leading-relaxed font-light">
                <p>
                  Rooted in Danieli Corus's global blast furnace design and refractory engineering expertise, our testing operations follow rigorous empirical standards to guarantee refractory longevity.
                </p>
                <p>
                  The <strong>Danieli Corus Refractory Testing Laboratory</strong> was established to provide unequivocal empirical verification. Operating independently from refractory manufacturers, the facility tests raw materials, fired bricks, and monolithic castables prior to plant installation.
                </p>
                <p>
                  Governed by Danieli Corus India under Procedure R-01 (Doc No. 20210215), our testing program combines specialized instrumentation, proprietary Danieli Corus specifications (DC-SPEC), and senior refractory pyrometallurgists to ensure every manufactured lot meets stringent design criteria.
                </p>
              </div>

              {/* Three Pillars */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-4 border-l-2 border-industrial-orange bg-industrial-lightGray/50 space-y-1">
                  <div className="font-mono text-xs text-charcoal-400 uppercase">Pillar 01</div>
                  <strong className="text-charcoal-900 font-bold block text-sm">Empirical Rigor</strong>
                  <p className="text-xs text-charcoal-600">Zero assumptions. Measurements conducted strictly to ISO, ASTM, and EN standards.</p>
                </div>

                <div className="p-4 border-l-2 border-industrial-teal bg-industrial-lightGray/50 space-y-1">
                  <div className="font-mono text-xs text-charcoal-400 uppercase">Pillar 02</div>
                  <strong className="text-charcoal-900 font-bold block text-sm">Independence</strong>
                  <p className="text-xs text-charcoal-600">Completely unbiased third-party qualification for steelmakers and EPC contractors.</p>
                </div>

                <div className="p-4 border-l-2 border-charcoal bg-industrial-lightGray/50 space-y-1">
                  <div className="font-mono text-xs text-charcoal-400 uppercase">Pillar 03</div>
                  <strong className="text-charcoal-900 font-bold block text-sm">DC-SPEC Calibration</strong>
                  <p className="text-xs text-charcoal-600">Acceptance limits forged from real blast furnace autopsies and continuous campaign monitoring.</p>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Fact Box & Metallurgy Legacy */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-charcoal text-white p-8 border-t-4 border-industrial-orange space-y-6 shadow-xl">
                <h3 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  <Factory className="w-5 h-5 text-industrial-orange" />
                  <span>Facility Profile & Metrics</span>
                </h3>

                <div className="space-y-4 text-xs font-mono">
                  <div className="flex justify-between border-b border-charcoal-800 pb-2">
                    <span className="text-charcoal-400">Operating Entity:</span>
                    <span className="text-white font-semibold">Danieli Corus India</span>
                  </div>
                  <div className="flex justify-between border-b border-charcoal-800 pb-2">
                    <span className="text-charcoal-400">Max Test Temp:</span>
                    <span className="text-industrial-orange font-bold">1750°C (MoSi2 Element Furnaces)</span>
                  </div>
                  <div className="flex justify-between border-b border-charcoal-800 pb-2">
                    <span className="text-charcoal-400">Max Load Frame:</span>
                    <span className="text-white font-semibold">1000 kN Servo-Hydraulic (Class 0.5)</span>
                  </div>
                  <div className="flex justify-between border-b border-charcoal-800 pb-2">
                    <span className="text-charcoal-400">Quality Framework:</span>
                    <span className="text-industrial-teal font-semibold">ISO 9001:2015 & ISO/IEC 17025</span>
                  </div>
                  <div className="flex justify-between border-b border-charcoal-800 pb-2">
                    <span className="text-charcoal-400">Governing Procedure:</span>
                    <span className="text-white font-semibold">DC-PROC-R-01 Rev. 6</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-charcoal-400">Typical Turnaround:</span>
                    <span className="text-white font-semibold">5 - 7 Business Days</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/concepts/industrial/capabilities"
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-industrial-orange text-white hover:bg-industrial-darkOrange transition-colors font-mono font-bold text-xs uppercase tracking-wider"
                  >
                    <span>View Testing Capabilities</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Governance Section */}
      <section className="py-20 bg-industrial-lightGray/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            eyebrow="Technical Staff & Governance"
            title="Senior Materials Specialists & Pyrometallurgists"
            description="Our testing operations are directed by senior metallurgical engineers with extensive real-world experience in ironmaking furnace masonry and refractory failure analysis."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-industrial-border p-6 space-y-4">
              <div className="w-10 h-10 bg-industrial-orange/10 border border-industrial-orange/30 flex items-center justify-center text-industrial-orange">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-charcoal">
                Refractory Testing Technologists
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                Dedicated technicians certified in diamond specimen sectioning, vacuum hydrostatic pycnometry, and servo-hydraulic press operations.
              </p>
            </div>

            <div className="bg-white border border-industrial-border p-6 space-y-4">
              <div className="w-10 h-10 bg-industrial-teal/10 border border-industrial-teal/30 flex items-center justify-center text-industrial-teal">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-charcoal">
                High-Temperature Specialists
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                Thermal engineers monitoring multi-day creep, optical dilatometry, and refractoriness under load (RUL) cycles up to 1750°C.
              </p>
            </div>

            <div className="bg-white border border-industrial-border p-6 space-y-4">
              <div className="w-10 h-10 bg-charcoal/10 border border-charcoal/30 flex items-center justify-center text-charcoal">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-charcoal">
                Senior Quality Reviewers
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                Independent specialists responsible for four-eyes validation of test metrics against Danieli Corus DC-SPEC acceptance criteria.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
