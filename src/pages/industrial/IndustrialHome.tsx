import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  ShieldCheck,
  Activity,
  ArrowRight,
  CheckCircle2,
  FileText,
  Cpu,
  Gauge,
  ChevronRight,
  Send,
  SlidersHorizontal,
  Layers,
  Sparkles
} from 'lucide-react';
import { TEST_CATALOGUE } from '../../data/testCatalogue';
import { SectionHeader } from '../../components/common/SectionHeader';
import { TestCard } from '../../components/common/TestCard';
import { ReportPreviewModal } from '../../components/common/ReportPreviewModal';
import { HeroVideoBackground } from '../../components/hero/HeroVideoBackground';
import { InteractiveProcessTimeline } from '../../components/common/InteractiveProcessTimeline';
import { EquipmentGallery } from '../../components/common/EquipmentGallery';
import { TestItem } from '../../types';

export const IndustrialHome: React.FC = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [selectedTestDetail, setSelectedTestDetail] = useState<TestItem | null>(null);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    testRequirement: 'Thermal & Mechanical Suite',
    sampleType: 'Dense Shaped Refractory Bricks',
    timeline: 'Standard Laboratory Schedule',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  // 6 Featured tests for homepage
  const featuredTests = TEST_CATALOGUE.filter(t => t.featured);

  // Scroll offset for dynamic glass card parallax and lighting
  const [scrollY, setScrollY] = useState<number>(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.organization || !formData.email || !formData.message) {
      setFormError('Please fill out all required fields marked with an asterisk (*).');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  return (
    <div className="bg-white">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center bg-charcoal text-white overflow-hidden border-b-4 border-industrial-orange">
        {/* Cinematic Video Background with Faststart & Accessible Controls */}
        <HeroVideoBackground
          videoSrc="/videos/laboratory-hero-opt.mp4"
          videoSrcFallback="/videos/laboratory-hero.mp4"
          posterSrc="/images/hero-poster.jpg"
          fallbackImageSrc="/images/hero-poster.jpg"
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-36 lg:pb-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 8 Cols: Main Pitch */}
            <div className="xl:col-span-8 space-y-6">
              {/* Eyebrow */}
              <div className="inline-flex items-center space-x-3 bg-charcoal-900/90 border border-charcoal-700/80 px-3.5 py-1.5 backdrop-blur-md shadow-sm">
                <span className="w-2.5 h-2.5 bg-industrial-orange block"></span>
                <span className="text-xs font-mono font-bold tracking-widest text-industrial-orange uppercase">
                  REFRACTORY TESTING LABORATORY
                </span>
                <span className="text-charcoal-400 font-mono text-xs">•</span>
                <span className="text-charcoal-200 font-mono text-xs">Quality & Materials Science</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Confidence in Every <br className="hidden sm:inline" />
                <span className="text-white relative">
                  Refractory Material.
                  <span className="absolute bottom-1 left-0 right-0 h-1 bg-industrial-orange/80"></span>
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg lg:text-xl text-charcoal-200 leading-relaxed max-w-2xl font-light">
                Physical, chemical and thermal testing for performance-critical refractory applications across blast furnaces, hot blast stoves, and ironmaking systems.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/concepts/industrial/capabilities"
                  className="inline-flex items-center justify-center space-x-2.5 px-7 py-4 bg-industrial-orange hover:bg-industrial-darkOrange text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-industrial-orange group"
                >
                  <span>Explore Testing Capabilities</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/concepts/industrial/process"
                  className="inline-flex items-center justify-center space-x-2.5 px-7 py-4 bg-charcoal-800/90 hover:bg-charcoal-700 text-white border border-charcoal-600 hover:border-white font-mono font-bold text-xs uppercase tracking-wider transition-all backdrop-blur-sm group"
                >
                  <Cpu className="w-4 h-4 text-industrial-teal" />
                  <span>Our Testing Procedure (R-01)</span>
                </Link>
              </div>
            </div>

            {/* Right 4 Cols: Live Specimen Snapshot Panel with Ultra-Refined Apple Vision Glassmorphism */}
            <div
              className="xl:col-span-4 hidden xl:block transition-transform duration-300 ease-out will-change-transform"
              style={{
                transform: `translateY(${Math.min(scrollY * 0.08, 48)}px)`
              }}
            >
              <div
                className="group/glass relative p-6 sm:p-7 space-y-5 rounded-2xl border transition-all duration-500 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.03) 45%, rgba(10, 10, 12, 0.5) 100%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.52)',
                  backdropFilter: 'blur(8px) saturate(20%)',
                  WebkitBackdropFilter: 'blur(8px) saturate(20%)',
                  borderColor: 'rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 32px 64px -16px rgba(0, 0, 0, 0.65), inset 0 1px 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.5)'
                }}
              >
                {/* Dynamic Specular Lens Flare Ray Reflection */}
                <div
                  className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/[0.09] to-transparent pointer-events-none transition-transform duration-1000 ease-out -rotate-45 group-hover/glass:translate-x-full"
                  style={{
                    transform: `translateX(${(scrollY % 600) * 0.7 - 120}px) rotate(-45deg)`
                  }}
                  aria-hidden="true"
                />

                {/* Ambient Top Specular Ray Highlight */}


                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5 relative z-10">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-industrial-orange font-bold flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-industrial-orange opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-industrial-orange shadow-[0_0_8px_rgba(215,93,54,0.9)]"></span>
                    </span>
                    Refractory Acceptance Scope
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/35 text-[10px] font-mono text-emerald-400 font-semibold backdrop-blur-xl shadow-[0_0_12px_rgba(52,211,153,0.18)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.9)]"></span>
                    <span>ACTIVE</span>
                  </span>
                </div>

                {/* Body Content */}
                <div className="space-y-4 text-xs font-mono relative z-10">
                  <div>
                    <span className="text-white/50 block text-[10px] uppercase font-semibold tracking-wider font-mono">
                      Standard Testing Package
                    </span>
                    <strong className="text-white text-[15px] block font-sans font-semibold mt-1 tracking-tight leading-snug group-hover/glass:text-industrial-orange transition-colors">
                      Blast Furnace & Stove Refractory Linings
                    </strong>
                  </div>

                  {/* Inner Frosted Glass Telemetry Pod */}
                  <div
                    className="p-3.5 sm:p-4 rounded-xl border border-white/10 space-y-2.5 text-xs transition-colors duration-300"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(0, 0, 0, 0.35) 100%)',
                      backgroundColor: 'rgba(0, 0, 0, 0.28)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.16), 0 4px 16px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-white/70 font-mono text-[11px] truncate">Creep in Compression</span>
                      <div className="flex items-baseline gap-1.5 text-right flex-shrink-0">
                        <span className="text-emerald-400 font-mono font-bold text-xs tracking-tight">&lt; 0.20%</span>
                        <span className="text-white/40 font-mono text-[10px]">(ISO 3187)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-white/70 font-mono text-[11px] truncate">RUL T(0.5%) Temp</span>
                      <div className="flex items-baseline gap-1.5 text-right flex-shrink-0">
                        <span className="text-emerald-400 font-mono font-bold text-xs tracking-tight">&gt; 1530°C</span>
                        <span className="text-white/40 font-mono text-[10px]">(ISO 1893)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-white/70 font-mono text-[11px] truncate">Cold Crushing (CCS)</span>
                      <div className="flex items-baseline gap-1.5 text-right flex-shrink-0">
                        <span className="text-emerald-400 font-mono font-bold text-xs tracking-tight">&gt; 20 MPa</span>
                        <span className="text-white/40 font-mono text-[10px]">(ISO 10059-1)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-white/75 text-[11.5px] leading-relaxed font-sans font-normal">
                    Incoming refractory deliveries undergo physical, thermal, mechanical, and chemical validation against Danieli Corus project specifications before installation clearance.
                  </p>

                  {/* Apple Style Glass Interactive Button */}
                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="w-full flex items-center justify-center space-x-2.5 py-3.5 px-4 rounded-xl text-white text-xs uppercase tracking-wider font-bold transition-all duration-300 relative overflow-hidden group/btn border border-white/20 hover:border-industrial-orange/60 shadow-lg active:scale-[0.99]"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      backgroundColor: 'rgba(28, 28, 30, 0.65)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: '0 10px 24px -4px rgba(0, 0, 0, 0.45), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-orange to-industrial-darkOrange opacity-0 group-hover/btn:opacity-95 transition-opacity duration-300" />
                    <FileText className="w-4 h-4 text-industrial-orange group-hover/btn:text-white transition-colors relative z-10" />
                    <span className="relative z-10 font-mono font-bold">View Inspection Certificate Sample</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TESTING EXPERTISE (FOUR DISCIPLINES OVERVIEW) */}
      <section id="expertise" className="py-20 lg:py-28 bg-white border-b border-industrial-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeader
            eyebrow="Core Competence"
            title="Comprehensive Refractory Characterization"
            description="Four specialized testing disciplines engineered specifically for high-temperature metallurgical refractories, insulating bricks, and castables."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Discipline 1: Physical Properties */}
            <div className="border border-industrial-border bg-white flex flex-col justify-between hover:border-charcoal hover:-translate-y-1 hover:shadow-lg transition-all duration-200 p-7 group">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-industrial-teal/10 border border-industrial-teal/30 flex items-center justify-center text-industrial-teal">
                  <Gauge className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-industrial-darkTeal font-bold">
                    Discipline 01
                  </span>
                  <h3 className="text-xl font-bold text-charcoal group-hover:text-industrial-orange transition-colors mt-1">
                    Physical Properties
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
                  Bulk Density (BD), Apparent Porosity (AP), particle size grading curves, and rheological flow consistency for castables.
                </p>
                <div className="pt-2 space-y-1.5 text-xs font-mono text-charcoal-600">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-industrial-teal rounded-full"></span>
                    <span>ISO 5017 Vacuum Porosimetry</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-industrial-teal rounded-full"></span>
                    <span>ISO 1927-3 Grain Size Analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-industrial-teal rounded-full"></span>
                    <span>ISO 1927-4 Vibrated Flow Spread</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-industrial-border">
                <Link
                  to="/concepts/industrial/capabilities"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-charcoal group-hover:text-industrial-darkOrange uppercase tracking-wider"
                >
                  <span>Explore Physical Tests</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Discipline 2: Mechanical Strength */}
            <div className="border border-industrial-border bg-white flex flex-col justify-between hover:border-charcoal hover:-translate-y-1 hover:shadow-lg transition-all duration-200 p-7 group">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-industrial-orange/10 border border-industrial-orange/30 flex items-center justify-center text-industrial-orange">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-industrial-darkOrange font-bold">
                    Discipline 02
                  </span>
                  <h3 className="text-xl font-bold text-charcoal group-hover:text-industrial-orange transition-colors mt-1">
                    Mechanical Strength
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
                  Cold Crushing Strength (CCS), Modulus of Rupture (MOR) in 3-point flexure, and ASTM C704 abrasion scouring resistance.
                </p>
                <div className="pt-2 space-y-1.5 text-xs font-mono text-charcoal-600">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-industrial-orange rounded-full"></span>
                    <span>ISO 10059-1 Compressive Load</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-industrial-orange rounded-full"></span>
                    <span>ISO 5013 Flexural MOR</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-industrial-orange rounded-full"></span>
                    <span>ISO 1927-8 Abrasion Scouring</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-industrial-border">
                <Link
                  to="/concepts/industrial/capabilities"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-charcoal group-hover:text-industrial-darkOrange uppercase tracking-wider"
                >
                  <span>Explore Mechanical Tests</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Discipline 3: Thermal Performance */}
            <div className="border border-industrial-border bg-white flex flex-col justify-between hover:border-charcoal hover:-translate-y-1 hover:shadow-lg transition-all duration-200 p-7 group">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-amber-800 font-bold">
                    Discipline 03
                  </span>
                  <h3 className="text-xl font-bold text-charcoal group-hover:text-industrial-orange transition-colors mt-1">
                    Thermal Performance
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
                  Permanent Linear Change (PLC), Creep in Compression up to 50 hours, Refractoriness Under Load (RUL), and Hot Wire Thermal Conductivity.
                </p>
                <div className="pt-2 space-y-1.5 text-xs font-mono text-charcoal-600">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-amber-700 rounded-full"></span>
                    <span>ISO 1893 Differential RUL</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-amber-700 rounded-full"></span>
                    <span>ISO 3187 Isothermal Creep</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-amber-700 rounded-full"></span>
                    <span>ISO 2478 Reheat Shrinkage / PLC</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-industrial-border">
                <Link
                  to="/concepts/industrial/capabilities"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-charcoal group-hover:text-industrial-darkOrange uppercase tracking-wider"
                >
                  <span>Explore Thermal Tests</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Discipline 4: Chemical Composition */}
            <div className="border border-industrial-border bg-white flex flex-col justify-between hover:border-charcoal hover:-translate-y-1 hover:shadow-lg transition-all duration-200 p-7 group">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-600">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-800 font-bold">
                    Discipline 04
                  </span>
                  <h3 className="text-xl font-bold text-charcoal group-hover:text-industrial-orange transition-colors mt-1">
                    Chemical Composition
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
                  Quantitative WD-XRF elemental oxide assays (SiO2, Al2O3, Fe2O3, CaO, MgO, alkalis) and programmed Loss on Ignition (LOI).
                </p>
                <div className="pt-2 space-y-1.5 text-xs font-mono text-charcoal-600">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-indigo-700 rounded-full"></span>
                    <span>ISO 12677 Fused Bead WD-XRF</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-indigo-700 rounded-full"></span>
                    <span>Loss on Ignition (LOI)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-indigo-700 rounded-full"></span>
                    <span>DIN 51903 Ash Content</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-industrial-border">
                <Link
                  to="/concepts/industrial/capabilities"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-charcoal group-hover:text-industrial-darkOrange uppercase tracking-wider"
                >
                  <span>Explore Chemical Tests</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE LABORATORY PROCESS (R-01 TIMELINE) */}
      <section id="process" className="py-20 lg:py-28 bg-industrial-lightGray/60 border-b border-industrial-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Workflow Architecture"
              title="Interactive Testing Procedure R-01"
              description="A transparent, five-stage quality governance chain ensuring complete sample traceability, photographic intake verification, calibrated execution, and counter sample retention."
            />
            <Link
              to="/concepts/industrial/process"
              className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-industrial-darkOrange hover:text-industrial-orange group"
            >
              <span>View Full R-01 Documentation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Interactive Stepper Component */}
          <InteractiveProcessTimeline />
        </div>
      </section>

      {/* 4. EQUIPMENT AND FACILITIES GALLERY (WITH ACCESSIBLE LIGHTBOX) */}
      <section id="equipment" className="py-20 lg:py-28 bg-charcoal text-white border-b-4 border-industrial-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Laboratory Instrumentation"
              title="Authentic Equipment & Testing Facilities"
              description="Calibrated specimen cutting machines, 110°C drying ovens, furnace lines, Creep/RUL apparatus, and WD-XRF spectrometers documented in the Danieli Corus instrument inventory."
              dark={true}
            />
            <Link
              to="/concepts/industrial/equipment"
              className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-industrial-orange hover:text-white group"
            >
              <span>View Complete Machinery Inventory</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Equipment Gallery with Lightbox */}
          <EquipmentGallery />
        </div>
      </section>

      {/* 5. FEATURED TESTING METHODS (6 CORE TESTS) */}
      <section id="methods" className="py-20 lg:py-28 bg-white border-b border-industrial-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Featured Methods"
              title="Primary Refractory Acceptance Protocols"
              description="Six essential empirical tests required for blast furnace, hot blast stove, and hot metal runner refractory acceptance."
            />
            <Link
              to="/concepts/industrial/capabilities"
              className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-industrial-darkOrange hover:text-industrial-orange group"
            >
              <span>View All 13 Tests in Catalogue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 6 Featured Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTests.map(test => (
              <TestCard
                key={test.id}
                test={test}
                onSelect={(selected) => setSelectedTestDetail(selected)}
              />
            ))}
          </div>

          {/* Deep link banner to complete catalogue */}
          <div className="bg-industrial-lightGray p-6 sm:p-8 border-l-4 border-industrial-orange flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="text-base font-bold text-charcoal">
                Explore the Complete 13-Test Refractory Catalogue
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-700 mt-1 font-light">
                Includes Modulus of Rupture (MOR), Abrasion Resistance, Reversible Thermal Expansion, Particle Size Distribution, and Flow Consistency.
              </p>
            </div>
            <Link
              to="/concepts/industrial/capabilities"
              className="px-6 py-3 bg-charcoal text-white hover:bg-industrial-orange font-mono text-xs uppercase tracking-wider font-bold transition-colors whitespace-nowrap shadow-sm"
            >
              Access Complete Catalogue →
            </Link>
          </div>
        </div>
      </section>

      {/* 6. QUALITY, SPECIFICATIONS & REPORTING */}
      <section id="quality" className="py-20 lg:py-28 bg-white border-b border-industrial-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 6 Cols */}
            <div className="lg:col-span-6 space-y-6">
              <SectionHeader
                eyebrow="Quality Assurance"
                title="Documented Against Danieli Corus Specifications"
                description="Testing is a rigorous compliance gateway verifying incoming materials against Danieli Corus DC-SPEC engineering thresholds for long campaign life."
              />

              <div className="space-y-4 pt-2 text-xs sm:text-sm text-charcoal-800 leading-relaxed font-light">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-industrial-orange/10 border border-industrial-orange/30 flex items-center justify-center text-industrial-orange flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-charcoal font-semibold block text-sm">DC-SPEC Acceptance Criteria</strong>
                    <span>Tolerances established through decades of blast furnace refractory autopsies and operational campaign monitoring worldwide.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-industrial-teal/10 border border-industrial-teal/30 flex items-center justify-center text-industrial-teal flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-charcoal font-semibold block text-sm">Four-Eyes Technical Governance</strong>
                    <span>Every data set undergoes verification by both the primary testing technologist and a senior refractory engineering specialist.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-charcoal/10 border border-charcoal/30 flex items-center justify-center text-charcoal flex-shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-charcoal font-semibold block text-sm">Official Registration Certificates</strong>
                    <span>Standardized test registration reports featuring physical parameters, thermal deformation traces, chemical assays, and explicit APPROVED verdicts.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="inline-flex items-center space-x-2 px-6 py-3.5 bg-charcoal hover:bg-industrial-orange text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>Preview Illustrative Registration Report</span>
                </button>
                <Link
                  to="/concepts/industrial/quality"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 border border-charcoal-300 hover:border-charcoal text-charcoal font-mono font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <span>Standards Matrix</span>
                </Link>
              </div>
            </div>

            {/* Right 6 Cols: Illustrative Certificate Card Teaser */}
            <div className="lg:col-span-6">
              <div
                onClick={() => setIsReportModalOpen(true)}
                className="bg-white border-2 border-charcoal p-6 sm:p-8 shadow-2xl relative cursor-pointer group hover:border-industrial-orange transition-all"
              >
                <div className="flex items-center justify-between border-b border-charcoal-200 pb-3">
                  <div className="flex items-center space-x-2 font-mono text-xs">
                    <span className="font-extrabold px-1.5 py-0.5 bg-charcoal text-white text-[10px]">DC</span>
                    <span className="text-charcoal-900 font-bold">DCL-DEMO-2024-REF-001</span>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 font-bold uppercase tracking-wider">
                    APPROVED
                  </span>
                </div>

                <div className="py-4 space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-charcoal-500 text-[10px] uppercase font-semibold block">Material Subject</span>
                    <span className="font-sans font-bold text-charcoal-950 text-sm">
                      High-Alumina Checker Brick (Demonstration Specimen)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="p-2.5 bg-industrial-lightGray">
                      <span className="text-charcoal-500 block text-[9px] font-semibold">Bulk Density</span>
                      <strong className="text-charcoal-900">2620 kg/m³</strong> (Req &gt; 2550)
                    </div>
                    <div className="p-2.5 bg-industrial-lightGray">
                      <span className="text-charcoal-500 block text-[9px] font-semibold">Apparent Porosity</span>
                      <strong className="text-charcoal-900">15.4%</strong> (Req &lt; 18.0%)
                    </div>
                    <div className="p-2.5 bg-industrial-lightGray">
                      <span className="text-charcoal-500 block text-[9px] font-semibold">Cold Crushing (CCS)</span>
                      <strong className="text-charcoal-900">92.4 MPa</strong> (Req &gt; 65.0)
                    </div>
                    <div className="p-2.5 bg-industrial-lightGray">
                      <span className="text-charcoal-500 block text-[9px] font-semibold">Al2O3 Oxide Assay</span>
                      <strong className="text-charcoal-900">72.3%</strong> (Req &gt; 70.0%)
                    </div>
                  </div>

                  <div className="pt-2 text-[10px] text-charcoal-600 flex items-center justify-between">
                    <span>Authentic DC Format Sample</span>
                    <span className="text-industrial-darkOrange group-hover:underline flex items-center gap-1 font-semibold">
                      <span>Click to inspect full document</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT & INQUIRY FORM */}
      <section id="contact" className="py-20 lg:py-28 bg-industrial-lightGray/60 border-b border-industrial-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 5 Cols: Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <SectionHeader
                eyebrow="Consultation Desk"
                title="Initiate Refractory Testing Protocol"
                description="Coordinate lot sampling, qualification testing, or project acceptance testing with Danieli Corus refractory engineers."
              />

              <div className="space-y-4 pt-4 text-xs font-mono text-charcoal-800">
                <div className="p-5 bg-white border border-industrial-border space-y-1">
                  <span className="text-[10px] uppercase font-bold text-charcoal-500 block">Organization</span>
                  <div className="font-bold text-sm text-charcoal-950 font-sans">Danieli Corus — Refractory Testing Laboratory</div>
                  <div className="text-charcoal-700">Refractory Engineering & Materials Testing Division</div>
                </div>

                <div className="p-5 bg-white border border-industrial-border space-y-1">
                  <span className="text-[10px] uppercase font-bold text-charcoal-500 block">Procedure R-01 Intake</span>
                  <div className="text-charcoal-950 font-bold">Standard Testing Turnaround</div>
                  <div className="text-charcoal-600 text-[11px] font-sans leading-relaxed">
                    Samples received are acknowledged with intake photographs, condition verification, and unique tracking code assignment.
                  </div>
                </div>

                <div className="p-5 bg-white border border-industrial-border space-y-1">
                  <span className="text-[10px] uppercase font-bold text-charcoal-500 block">Sample Delivery Instructions</span>
                  <div className="text-charcoal-700 font-sans text-xs leading-relaxed font-light">
                    Test bricks and monolithics must be dispatched intact with manufacturer heat identification and project cross-references per Procedure R-01 §1.
                  </div>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Polished Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-industrial-border p-8 sm:p-10 shadow-sm relative">
                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4 animate-fadeIn">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-charcoal">
                      Testing Protocol Inquiry Received
                    </h3>
                    <p className="text-sm text-charcoal-700 max-w-md mx-auto leading-relaxed font-light">
                      Thank you, <strong>{formData.name}</strong> from <strong>{formData.organization}</strong>. Your testing requirements have been logged in our demonstration submission queue.
                    </p>
                    <div className="pt-2">
                      <span className="inline-block px-3 py-1 bg-industrial-lightGray text-[11px] font-mono text-charcoal-700 border border-charcoal-200">
                        Demonstration Confirmation • Reference: DCL-INQ-{(Math.random() * 10000).toFixed(0)}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: '',
                          organization: '',
                          email: '',
                          testRequirement: 'Thermal & Mechanical Suite',
                          sampleType: 'Dense Shaped Refractory Bricks',
                          timeline: 'Standard Laboratory Schedule',
                          message: ''
                        });
                      }}
                      className="mt-6 px-6 py-2.5 bg-charcoal text-white hover:bg-industrial-orange transition-colors font-mono text-xs uppercase tracking-wider font-bold"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="border-b border-industrial-border pb-3">
                      <h3 className="text-lg font-bold text-charcoal">
                        Technical Enquiry & Sample Registration
                      </h3>
                      <p className="text-xs text-charcoal-600 font-mono mt-0.5">
                        Frontend Demonstration Form with Validation
                      </p>
                    </div>

                    {formError && (
                      <div className="p-3 bg-red-50 border-l-4 border-red-600 text-red-900 text-xs font-mono">
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="contact-name" className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-800 block">
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Dr. Thomas Kramer"
                          className="w-full px-3.5 py-2.5 border border-industrial-border focus:border-charcoal focus:outline-none text-xs bg-white text-charcoal"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="contact-org" className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-800 block">
                          Organization / Steel Plant *
                        </label>
                        <input
                          id="contact-org"
                          name="organization"
                          type="text"
                          required
                          value={formData.organization}
                          onChange={e => setFormData({ ...formData, organization: e.target.value })}
                          placeholder="e.g. Steel Plant / Refractory Supplier"
                          className="w-full px-3.5 py-2.5 border border-industrial-border focus:border-charcoal focus:outline-none text-xs bg-white text-charcoal"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="contact-email" className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-800 block">
                          Business Email *
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full px-3.5 py-2.5 border border-industrial-border focus:border-charcoal focus:outline-none text-xs bg-white text-charcoal"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="contact-scope" className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-800 block">
                          Testing Requirement Scope
                        </label>
                        <select
                          id="contact-scope"
                          name="testRequirement"
                          value={formData.testRequirement}
                          onChange={e => setFormData({ ...formData, testRequirement: e.target.value })}
                          className="w-full px-3.5 py-2.5 border border-industrial-border focus:border-charcoal focus:outline-none text-xs bg-white text-charcoal font-mono"
                        >
                          <option>Full Characterization Suite (All Disciplines)</option>
                          <option>High-Temperature Thermal (PLC, RUL, Creep)</option>
                          <option>Mechanical Compression & Abrasion (CCS, MOR, ABR)</option>
                          <option>Physical Density & Porosimetry (AP & BD)</option>
                          <option>Chemical Assay & Loss on Ignition (WD-XRF)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="contact-sample-type" className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-800 block">
                          Material Sample Type
                        </label>
                        <select
                          id="contact-sample-type"
                          name="sampleType"
                          value={formData.sampleType}
                          onChange={e => setFormData({ ...formData, sampleType: e.target.value })}
                          className="w-full px-3.5 py-2.5 border border-industrial-border focus:border-charcoal focus:outline-none text-xs bg-white text-charcoal font-mono"
                        >
                          <option>Dense Shaped Refractory Bricks</option>
                          <option>Carbon / Semi-Graphite Hearth Blocks</option>
                          <option>Silica / Andalusite Stove Checker Bricks</option>
                          <option>Unshaped Castables & Ramming Mixes</option>
                          <option>Blast Furnace Taphole Clay</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="contact-timeline" className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-800 block">
                          Testing Schedule
                        </label>
                        <select
                          id="contact-timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full px-3.5 py-2.5 border border-industrial-border focus:border-charcoal focus:outline-none text-xs bg-white text-charcoal font-mono"
                        >
                          <option>Standard Laboratory Schedule</option>
                          <option>Relining Campaign Priority</option>
                          <option>Emergency Outage Fast-Track</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-message" className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-800 block">
                        Project Details & Specifications *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail the target refractory lining project, number of batches sampled, required DC-SPEC acceptance criteria, or specific ASTM/ISO test parameters..."
                        className="w-full px-3.5 py-2.5 border border-industrial-border focus:border-charcoal focus:outline-none text-xs bg-white text-charcoal"
                      ></textarea>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="text-[11px] text-charcoal-600 font-mono flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-industrial-teal" />
                        <span>Confidential Refractory Data Protection</span>
                      </div>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3.5 bg-industrial-orange hover:bg-industrial-darkOrange text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center space-x-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Consultation Request</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Specs Modal for single test */}
      {selectedTestDetail && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border-t-4 border-industrial-orange max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-industrial-border pb-4">
              <div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-charcoal text-white uppercase">
                  {selectedTestDetail.code}
                </span>
                <h3 className="text-xl font-bold text-charcoal mt-1">
                  {selectedTestDetail.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTestDetail(null)}
                className="text-charcoal-500 hover:text-charcoal-900 font-bold p-1 text-lg"
                aria-label="Close protocol details"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-mono text-charcoal-500 uppercase text-[10px] font-bold block">Test Description</span>
                <p className="text-charcoal-800 leading-relaxed font-sans text-sm mt-0.5 font-light">
                  {selectedTestDetail.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono p-3 bg-industrial-lightGray">
                <div>
                  <span className="text-charcoal-500 text-[10px] uppercase font-bold block">Unit of Measurement</span>
                  <span className="font-bold text-charcoal-900">{selectedTestDetail.unit}</span>
                </div>
                <div>
                  <span className="text-charcoal-500 text-[10px] uppercase font-bold block">Specimen Dimensions</span>
                  <span className="font-bold text-charcoal-900">{selectedTestDetail.testSpecimen}</span>
                </div>
              </div>

              <div>
                <span className="font-mono text-charcoal-500 uppercase text-[10px] font-bold block">Documented International Standards</span>
                <div className="flex flex-wrap gap-1.5 mt-1 font-mono">
                  {selectedTestDetail.applicableStandards.map((std, i) => (
                    <span key={i} className="px-2 py-0.5 bg-charcoal-100 text-charcoal-800 border border-charcoal-200 font-medium">
                      {std}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-charcoal-500 uppercase text-[10px] font-bold block">Typical Applications in Ironmaking</span>
                <ul className="list-disc list-inside text-charcoal-700 mt-1 space-y-0.5 font-sans font-light">
                  {selectedTestDetail.typicalApplications.map((app, i) => (
                    <li key={i}>{app}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-industrial-border flex justify-end">
              <button
                onClick={() => setSelectedTestDetail(null)}
                className="px-5 py-2 bg-charcoal text-white hover:bg-industrial-orange transition-colors font-mono text-xs uppercase font-bold"
              >
                Close Protocol Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Illustrative Report Preview Modal */}
      <ReportPreviewModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
};
