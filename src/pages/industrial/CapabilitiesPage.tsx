import React, { useState } from 'react';
import { TestCard } from '../../components/common/TestCard';
import { TEST_CATALOGUE } from '../../data/testCatalogue';
import { TestItem } from '../../types';
import { Search } from 'lucide-react';
import { ReportPreviewModal } from '../../components/common/ReportPreviewModal';

export const CapabilitiesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTest, setSelectedTest] = useState<TestItem | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  const categories = ['All', 'Physical Properties', 'Mechanical Strength', 'Thermal Performance', 'Chemical Composition'];

  const filteredTests = TEST_CATALOGUE.filter(test => {
    const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          test.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          test.applicableStandards.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-charcoal text-white pt-28 pb-16 lg:pt-36 lg:pb-20 border-b-4 border-industrial-orange relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-industrial-orange uppercase tracking-widest">
              <span className="w-5 h-[2px] bg-industrial-orange block"></span>
              <span>Testing Capabilities Directory</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Rigorous Empirical Testing Across Four Disciplines.
            </h1>
            <p className="text-base sm:text-lg text-charcoal-300 leading-relaxed font-light">
              Full material characterization to international ISO, ASTM, and EN standards, validated against Danieli Corus Refractory Acceptance Specifications.
            </p>
          </div>
        </div>
      </section>

      {/* Main Testing Directory */}
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
                      : 'bg-industrial-lightGray text-charcoal-700 hover:bg-charcoal-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative min-w-[280px]">
              <Search className="w-4 h-4 absolute left-3 top-3 text-charcoal-400" />
              <input
                type="text"
                placeholder="Search test name, code, or standard..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-industrial-border focus:border-charcoal focus:outline-none text-xs font-mono bg-white"
              />
            </div>
          </div>

          {/* Test Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map(test => (
              <TestCard
                key={test.id}
                test={test}
                onSelect={(selected) => setSelectedTest(selected)}
              />
            ))}
          </div>

          {filteredTests.length === 0 && (
            <div className="text-center py-16 border border-dashed border-charcoal-300 p-8 space-y-2">
              <Search className="w-8 h-8 text-charcoal-400 mx-auto" />
              <p className="text-sm font-semibold text-charcoal">No tests match your filter criteria.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="text-xs font-mono text-industrial-orange uppercase underline"
              >
                Reset search & filters
              </button>
            </div>
          )}

          {/* Quality Banner Link */}
          <div className="mt-14 bg-industrial-lightGray p-6 sm:p-8 border-l-4 border-industrial-orange flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="text-base font-bold text-charcoal">
                Need a Custom Refractory Testing Program?
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                We configure bespoke test matrices for blast furnace bosh blocks, checker bricks, runner castables, and taphole clay.
              </p>
            </div>
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-6 py-3 bg-charcoal text-white hover:bg-industrial-orange font-mono text-xs uppercase tracking-wider font-bold transition-colors whitespace-nowrap"
            >
              View Inspection Certificate Sample
            </button>
          </div>
        </div>
      </section>

      {/* Protocol Specs Modal */}
      {selectedTest && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border-t-4 border-industrial-orange max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-industrial-border pb-4">
              <div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-charcoal text-white uppercase">
                  {selectedTest.code}
                </span>
                <h3 className="text-xl font-bold text-charcoal mt-1">
                  {selectedTest.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTest(null)}
                className="text-charcoal-400 hover:text-charcoal-900 font-bold p-1 text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-mono text-charcoal-400 uppercase text-[10px] block">Test Description</span>
                <p className="text-charcoal-700 leading-relaxed font-sans text-sm mt-0.5">
                  {selectedTest.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono p-3 bg-industrial-lightGray">
                <div>
                  <span className="text-charcoal-400 text-[10px] uppercase block">Unit</span>
                  <span className="font-bold text-charcoal-900">{selectedTest.unit}</span>
                </div>
                <div>
                  <span className="text-charcoal-400 text-[10px] uppercase block">Thermal Parameter</span>
                  <span className="font-bold text-charcoal-900">{selectedTest.temperatureRange || 'Room Temp (20°C)'}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-charcoal-400 text-[10px] uppercase block">Specimen Dimensions</span>
                  <span className="font-bold text-charcoal-900">{selectedTest.testSpecimen}</span>
                </div>
              </div>

              <div>
                <span className="font-mono text-charcoal-400 uppercase text-[10px] block">Applicable International Standards</span>
                <div className="flex flex-wrap gap-1.5 mt-1 font-mono">
                  {selectedTest.applicableStandards.map((std, i) => (
                    <span key={i} className="px-2 py-0.5 bg-charcoal-100 text-charcoal-800 border border-charcoal-200">
                      {std}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-charcoal-400 uppercase text-[10px] block">Governing Procedure</span>
                <p className="text-industrial-teal font-mono font-semibold mt-0.5">
                  Danieli Corus Refractory Testing Procedure R-01 (Doc 20210215)
                </p>
              </div>

              <div>
                <span className="font-mono text-charcoal-400 uppercase text-[10px] block">Typical Industrial Applications</span>
                <ul className="list-disc list-inside text-charcoal-600 mt-1 space-y-0.5 font-sans">
                  {selectedTest.typicalApplications.map((app, i) => (
                    <li key={i}>{app}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-industrial-border flex justify-end">
              <button
                onClick={() => setSelectedTest(null)}
                className="px-5 py-2 bg-charcoal text-white hover:bg-industrial-orange transition-colors font-mono text-xs uppercase font-bold"
              >
                Close Protocol Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Illustrative Report Modal */}
      <ReportPreviewModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
};
