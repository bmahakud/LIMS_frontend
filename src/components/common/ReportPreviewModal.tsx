import React from 'react';
import { X, FileText, CheckCircle2, ShieldCheck, Printer, AlertCircle } from 'lucide-react';
import { SAMPLE_INSPECTION_REPORT } from '../../data/standards';

interface ReportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportPreviewModal: React.FC<ReportPreviewModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const report = SAMPLE_INSPECTION_REPORT;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-4xl border-t-4 border-industrial-orange shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-modal-title"
      >
        {/* Top Header Bar */}
        <div className="bg-charcoal px-6 py-4 text-white flex items-center justify-between border-b border-charcoal-700">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-industrial-orange" />
            <div>
              <span className="text-[10px] font-mono tracking-widest text-industrial-orange uppercase block font-bold">
                Illustrative Quality Inspection Document
              </span>
              <h3 id="report-modal-title" className="text-sm sm:text-base font-bold text-white tracking-tight">
                Registration Form for Physical and Chemical Test Results
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 text-charcoal-200 hover:text-white transition-colors hidden sm:inline-flex"
              title="Print document preview"
              aria-label="Print document preview"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="text-charcoal-300 hover:text-white transition-colors p-1.5 focus:outline-none focus:ring-2 focus:ring-industrial-orange"
              aria-label="Close report preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Public Notice Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex items-center justify-between text-xs text-amber-950">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-800 flex-shrink-0" />
            <span>
              <strong>Sample Preview Document:</strong> Demonstrates standard Danieli Corus Refractory Acceptance reporting format with anonymized illustrative specimen metrics.
            </span>
          </div>
          <span className="font-mono text-[10px] bg-amber-200/80 text-amber-900 px-2 py-0.5 font-bold uppercase tracking-wider">
            PUBLIC SPECIMEN
          </span>
        </div>

        {/* Scrollable Report Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-white font-sans text-charcoal">
          {/* Certificate Header Section */}
          <div className="border-b-2 border-charcoal pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-charcoal text-white font-black flex items-center justify-center text-sm">
                  DC
                </div>
                <span className="font-extrabold text-lg tracking-tight uppercase">
                  DANIELI CORUS
                </span>
              </div>
              <p className="text-xs text-charcoal-700 font-mono">
                Refractory Testing Laboratory — Quality Assurance Registration
              </p>
            </div>

            <div className="text-left sm:text-right font-mono text-xs space-y-1">
              <div className="text-charcoal-900 font-bold">
                Registration No: <span className="text-industrial-darkOrange">{report.reportId}</span>
              </div>
              <div className="text-charcoal-700">Date of Testing: {report.dateTested}</div>
              <div className="text-charcoal-700">Project Reference: {report.clientRef}</div>
            </div>
          </div>

          {/* Sample Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-industrial-lightGray/70 p-4 border border-industrial-border text-xs font-mono">
            <div>
              <span className="text-charcoal-600 block text-[10px] uppercase font-semibold">Material / Quality Grade</span>
              <strong className="text-charcoal-900 font-sans text-sm block mt-0.5">{report.materialType} ({report.qualityGrade})</strong>
            </div>
            <div>
              <span className="text-charcoal-600 block text-[10px] uppercase font-semibold">Lot & Pallet Identification</span>
              <span className="text-charcoal-900 font-semibold">{report.batchNumber}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-charcoal-600 block text-[10px] uppercase font-semibold">Governing Specification & Norms</span>
              <span className="text-charcoal-900 font-semibold">{report.specification}</span>
            </div>
          </div>

          {/* Test Results Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-800">
              1. Physical, Mechanical, Thermal and Chemical Test Results
            </h4>
            <div className="overflow-x-auto border border-charcoal-200">
              <table className="w-full text-left text-xs font-mono divide-y divide-charcoal-200">
                <thead className="bg-charcoal text-white uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Tested Property</th>
                    <th className="py-2.5 px-3">Standard</th>
                    <th className="py-2.5 px-3">Unit</th>
                    <th className="py-2.5 px-3">DC Specification</th>
                    <th className="py-2.5 px-3">Measured Value</th>
                    <th className="py-2.5 px-3 text-right">Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-100 bg-white">
                  {report.tests.map((t, idx) => (
                    <tr key={idx} className="hover:bg-charcoal-50/50">
                      <td className="py-2.5 px-3 font-sans font-semibold text-charcoal-900">{t.property}</td>
                      <td className="py-2.5 px-3 text-charcoal-600">{t.standard}</td>
                      <td className="py-2.5 px-3 text-charcoal-700">{t.unit}</td>
                      <td className="py-2.5 px-3 text-charcoal-800 font-medium">{t.requirement}</td>
                      <td className="py-2.5 px-3 font-bold text-charcoal-950">{t.measuredValue}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          <span>{t.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Thermal Deformation Chart Illustration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-800">
                2. High-Temperature Refractoriness Under Load & Creep Response Trace
              </h4>
              <span className="text-[11px] font-mono text-charcoal-600 font-medium">ISO 1893 Differential Dilatometry</span>
            </div>

            <div className="p-4 bg-charcoal-950 text-white border border-charcoal-800">
              <div className="h-44 w-full flex flex-col justify-between">
                <div className="flex justify-between text-[10px] font-mono text-charcoal-300">
                  <span>ΔL / L₀ (%)</span>
                  <span className="text-industrial-orange">● Thermal Strain Expansion Curve</span>
                  <span className="text-industrial-teal">■ Isothermal Creep Soak (1500°C / 50h)</span>
                </div>

                {/* SVG Curve Illustration */}
                <svg className="w-full h-32 overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="20" x2="500" y2="20" stroke="#333333" strokeDasharray="3 3" />
                  <line x1="0" y1="60" x2="500" y2="60" stroke="#333333" strokeDasharray="3 3" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#333333" strokeDasharray="3 3" />

                  {/* Expansion curve */}
                  <path
                    d="M 10 110 Q 120 100 240 70 T 360 40 L 410 42 L 480 44"
                    fill="none"
                    stroke="#D75D36"
                    strokeWidth="2.5"
                  />
                  {/* Creep plateau & slight slope */}
                  <path
                    d="M 410 42 Q 445 43 480 44"
                    fill="none"
                    stroke="#367786"
                    strokeWidth="3"
                    strokeDasharray="4 2"
                  />
                  {/* Annotation points */}
                  <circle cx="360" cy="40" r="3.5" fill="#FFFFFF" stroke="#D75D36" strokeWidth="2" />
                  <text x="365" y="35" fill="#FFFFFF" fontSize="9" fontFamily="monospace">T0.5 (&gt;1620°C)</text>

                  <circle cx="480" cy="44" r="3.5" fill="#367786" />
                  <text x="430" y="62" fill="#4A92A3" fontSize="9" fontFamily="monospace">Creep Δe: 0.12%</text>
                </svg>

                <div className="flex justify-between text-[10px] font-mono text-charcoal-400 pt-1 border-t border-charcoal-800">
                  <span>20°C (Ambient)</span>
                  <span>600°C</span>
                  <span>1000°C</span>
                  <span>1400°C</span>
                  <span>1600°C (Peak Soak)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verdict & Approval */}
          <div className="border border-industrial-border p-5 space-y-4 bg-industrial-lightGray/40">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 bg-emerald-600"></span>
                <span className="font-mono text-xs font-bold text-emerald-900 uppercase tracking-widest">
                  Compliance Status: ACCORDING SPECIFICATION — APPROVED
                </span>
              </div>
              <p className="text-xs text-charcoal-800 mt-1.5 leading-relaxed font-light">
                {report.remarks}
              </p>
            </div>

            <div className="pt-4 border-t border-industrial-border grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-mono text-charcoal-500 uppercase block font-semibold">Testing Technologist</span>
                <div className="font-semibold text-charcoal-900 font-sans">Danieli Corus India Refractory Team</div>
                <span className="text-[11px] font-mono text-charcoal-600">Laboratory Testing Technologist</span>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-mono text-charcoal-500 uppercase block font-semibold">Quality Validation</span>
                <div className="font-semibold text-charcoal-900 font-sans">Quality Assurance & Technical Review</div>
                <span className="text-[11px] font-mono text-charcoal-600">Refractory Engineering Representative</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-charcoal px-6 py-3.5 text-xs text-charcoal-300 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-charcoal-700">
          <span className="font-mono text-[11px]">
            Document Ref: {report.reportId} • Retention Timeline Applied
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-1.5 bg-white text-charcoal hover:bg-industrial-orange hover:text-white transition-colors font-mono font-bold uppercase tracking-wider text-xs"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
