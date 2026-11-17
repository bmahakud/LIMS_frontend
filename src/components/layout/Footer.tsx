import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Mail, Phone, ExternalLink, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-white border-t-4 border-industrial-orange">
      {/* Top Banner Accent */}
      <div className="border-b border-charcoal-800 bg-charcoal-900/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-mono font-bold tracking-widest text-industrial-orange uppercase">
              Industrial Authority in Ironmaking & Refractories
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              Need technical qualification for critical furnace refractory linings?
            </h3>
          </div>
          <Link
            to="/concepts/industrial/contact"
            className="inline-flex items-center space-x-2.5 px-6 py-3.5 bg-industrial-orange text-white hover:bg-industrial-darkOrange transition-all font-semibold text-xs tracking-wider uppercase font-mono shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-industrial-orange"
          >
            <span>Request Test Protocol Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/danieli-corus-logo-white.svg" 
                alt="Danieli Corus" 
                className="h-8 w-auto object-contain"
              />
              <div className="border-l border-charcoal-700 pl-3">
                <span className="text-xs font-mono text-industrial-orange uppercase tracking-wider block font-bold">
                  Refractory Laboratory
                </span>
              </div>
            </div>

            <p className="text-charcoal-300 text-sm leading-relaxed max-w-sm">
              Dedicated high-temperature, physical, mechanical, and chemical characterization facility for blast furnace, hot blast stove, and hot metal refractory systems.
            </p>

            <div className="space-y-2 text-xs text-charcoal-300 font-mono">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-industrial-orange flex-shrink-0 mt-0.5" />
                <span>Danieli Corus India Private Limited<br />Riana Aurelia Towers, Sector 136, Noida – 201304, India</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-industrial-orange flex-shrink-0" />
                <span>info@danieli-corus.com</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-industrial-orange flex-shrink-0" />
                <span>+91 120 697 0100 (Refractory Testing Desk)</span>
              </div>
            </div>
          </div>

          {/* Col 1: Testing Capabilities */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-industrial-orange uppercase border-b border-charcoal-800 pb-2">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs text-charcoal-300">
              <li>
                <Link to="/concepts/industrial/capabilities" className="hover:text-white transition-colors">
                  Physical Characterization (AP & BD)
                </Link>
              </li>
              <li>
                <Link to="/concepts/industrial/capabilities" className="hover:text-white transition-colors">
                  Cold Crushing Strength (CCS)
                </Link>
              </li>
              <li>
                <Link to="/concepts/industrial/capabilities" className="hover:text-white transition-colors">
                  Permanent Linear Change (PLC)
                </Link>
              </li>
              <li>
                <Link to="/concepts/industrial/capabilities" className="hover:text-white transition-colors">
                  Refractoriness Under Load (RUL)
                </Link>
              </li>
              <li>
                <Link to="/concepts/industrial/capabilities" className="hover:text-white transition-colors">
                  Creep in Compression (ISO 3187)
                </Link>
              </li>
              <li>
                <Link to="/concepts/industrial/capabilities" className="hover:text-white transition-colors">
                  Thermal Conductivity (Hot Wire)
                </Link>
              </li>
              <li>
                <Link to="/concepts/industrial/capabilities" className="hover:text-white transition-colors">
                  Chemical Analysis (WDXRF & LOI)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Engineering & Standards */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-industrial-orange uppercase border-b border-charcoal-800 pb-2">
              Quality & Process
            </h4>
            <ul className="space-y-2.5 text-xs text-charcoal-300">
              <li>
                <Link to="/concepts/industrial/process" className="hover:text-white transition-colors">
                  R-01 Testing Procedure
                </Link>
              </li>
              <li>
                <Link to="/concepts/industrial/quality" className="hover:text-white transition-colors">
                  DC-SPEC Quality Guidelines
                </Link>
              </li>
              <li>
                <Link to="/concepts/industrial/equipment" className="hover:text-white transition-colors">
                  Calibrated Load Frames (1000 kN)
                </Link>
              </li>
              <li>
                <Link to="/concepts/industrial/equipment" className="hover:text-white transition-colors">
                  High-Temp Furnaces (1750°C)
                </Link>
              </li>
              <li>
                <Link to="/concepts/industrial/quality" className="hover:text-white transition-colors">
                  Inspection Certificates & Reports
                </Link>
              </li>
              <li>
                <Link to="/concepts/industrial/about" className="hover:text-white transition-colors">
                  Metallurgical Engineering Legacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal & Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-industrial-orange uppercase border-b border-charcoal-800 pb-2">
              Laboratory Info
            </h4>
            <ul className="space-y-2.5 text-xs text-charcoal-300">
              <li>
                <Link to="/concepts/industrial/about" className="hover:text-white transition-colors">
                  About the Laboratory
                </Link>
              </li>
              <li>
                <Link to="/concepts/industrial/contact" className="hover:text-white transition-colors">
                  Sample Delivery & Intake
                </Link>
              </li>
              <li>
                <a
                  href="https://www.danieli-corus.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 hover:text-white transition-colors mt-2 text-charcoal-300"
                >
                  <span>danieli-corus.com</span>
                  <ExternalLink className="w-3 h-3 text-industrial-teal" />
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <div className="p-3 bg-charcoal-900 border border-charcoal-800 rounded-none text-[11px] text-charcoal-400 space-y-1">
                <span className="text-white font-semibold block flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-industrial-teal" />
                  Compliance Matrix
                </span>
                <span>ISO 9001:2015 Quality Management</span>
                <span className="block">ISO/IEC 17025 Competence Framework</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-400 gap-4">
          <p>© {new Date().getFullYear()} Danieli Corus B.V. All rights reserved. Refractory Testing Laboratory.</p>
          <div className="flex items-center space-x-6">
            <span className="text-[11px] font-mono text-charcoal-500">
              Refractory Testing Laboratory — Industrial Authority
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
