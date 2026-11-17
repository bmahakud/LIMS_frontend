import React, { useState } from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { STANDARDS_MATRIX } from '../../data/standards';
import { ShieldCheck, CheckCircle2, FileText } from 'lucide-react';
import { ReportPreviewModal } from '../../components/common/ReportPreviewModal';

export const QualityPage: React.FC = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-charcoal text-white pt-28 pb-16 lg:pt-36 lg:pb-20 border-b-4 border-industrial-orange relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-industrial-orange uppercase tracking-widest">
              <span className="w-5 h-[2px] bg-industrial-orange block"></span>
              <span>Governance & Acceptance Specifications</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Quality Assurance & International Standards Matrix.
            </h1>
            <p className="text-base sm:text-lg text-charcoal-300 leading-relaxed font-light">
              Compliance benchmarks mapped between international testing norms (ISO, ASTM, EN) and Danieli Corus Refractory Acceptance Specifications (DC-SPEC).
            </p>
          </div>
        </div>
      </section>

      {/* Quality Governance Principles */}
      <section className="py-20 bg-white border-b border-industrial-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeader
            eyebrow="Verification Integrity"
            title="The Danieli Corus Acceptance Framework"
            description="Our laboratory enforces a closed-loop quality gateway. Material batches are benchmarked against historical metallurgical databases to protect plant integrity."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-industrial-border p-6 sm:p-8 space-y-4 bg-white shadow-sm">
              <div className="w-10 h-10 bg-industrial-orange/10 border border-industrial-orange/30 flex items-center justify-center text-industrial-orange">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-charcoal">
                1. DC-SPEC Tolerances
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                Acceptance criteria are tighter than generic commercial ranges, calibrated specifically for prolonged campaign survival under intense ironmaking loads.
              </p>
            </div>

            <div className="border border-industrial-border p-6 sm:p-8 space-y-4 bg-white shadow-sm">
              <div className="w-10 h-10 bg-industrial-teal/10 border border-industrial-teal/30 flex items-center justify-center text-industrial-teal">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-charcoal">
                2. Four-Eyes Verification
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                Raw sensor measurements and calculations require dual sign-off from both the Primary Test Technologist and an independent Senior Quality Specialist.
              </p>
            </div>

            <div className="border border-industrial-border p-6 sm:p-8 space-y-4 bg-white shadow-sm">
              <div className="w-10 h-10 bg-charcoal/10 border border-charcoal/30 flex items-center justify-center text-charcoal">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-charcoal">
                3. Permanent Physical Archive
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                Representative split samples and test remnants are retained in climate-controlled dry storage for 36 months for referee audit verification.
              </p>
            </div>
          </div>

          {/* Interactive Inspection Certificate Teaser */}
          <div className="bg-charcoal text-white p-8 sm:p-10 border-l-4 border-industrial-orange flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10px] font-mono tracking-widest uppercase text-industrial-orange font-bold">
                Public Illustrative Specimen
              </span>
              <h4 className="text-xl font-bold text-white">
                Inspect a Danieli Corus Refractory Inspection Certificate
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-300 leading-relaxed font-light">
                Review the format of an official laboratory certificate, complete with tabulated property tolerances, dilatometric strain curves, and cryptographic sign-off metadata.
              </p>
            </div>
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-6 py-3.5 bg-industrial-orange text-white hover:bg-industrial-darkOrange transition-colors font-mono font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow-md"
            >
              Launch Certificate Viewer
            </button>
          </div>

          {/* Standards Matrix Table */}
          <div className="space-y-6 pt-6">
            <SectionHeader
              eyebrow="Normative Matrix"
              title="International Testing Standards & Scope"
              description="Authoritative test standards referenced in Danieli Corus procurement agreements."
            />

            <div className="overflow-x-auto border border-industrial-border shadow-sm">
              <table className="w-full text-left text-xs font-mono divide-y divide-industrial-border">
                <thead className="bg-charcoal text-white uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Standard Code</th>
                    <th className="py-3 px-4">Organization</th>
                    <th className="py-3 px-4">Standard Title & Description</th>
                    <th className="py-3 px-4">Applicable Laboratory Tests</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-industrial-border bg-white">
                  {STANDARDS_MATRIX.map((std, idx) => (
                    <tr key={idx} className="hover:bg-charcoal-50/50">
                      <td className="py-3 px-4 font-bold text-charcoal-900 whitespace-nowrap">{std.code}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-industrial-lightGray text-charcoal-700 font-semibold border border-charcoal-200">
                          {std.organization}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-sans text-charcoal-700 max-w-md">
                        <strong className="block text-charcoal-900 font-semibold text-xs">{std.title}</strong>
                        <span className="text-[11px] text-charcoal-500 mt-0.5 block">{std.scope}</span>
                      </td>
                      <td className="py-3 px-4 text-industrial-teal font-semibold">
                        {std.applicableTests.join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Report Preview Modal */}
      <ReportPreviewModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
};
