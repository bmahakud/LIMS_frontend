import React, { useState, useEffect } from 'react';
import { FlaskConical, Search, Loader2, CheckCircle2, Shield, Filter, ChevronDown, Layers } from 'lucide-react';
import { apiClient } from '../../api/client';
import { LIMSLayout } from './LIMSLayout';

export const TestChecklistPage: React.FC = () => {
  const [tests, setTests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDiscipline, setSelectedDiscipline] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient.request<any>('/api/v1/catalogue/tests/');
      setTests(data.results || data || []);
    } catch {
      setTests([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTests = tests.filter((t) => {
    const matchesDisc = selectedDiscipline === 'ALL' || t.discipline === selectedDiscipline;
    const matchesSearch =
      t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDisc && matchesSearch;
  });

  return (
    <LIMSLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xs dark:shadow-md transition-colors">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-teal-50 dark:bg-teal-500/15 border border-teal-200 dark:border-teal-500/30 text-teal-800 dark:text-teal-300 text-[11px] font-mono font-semibold tracking-wider uppercase mb-2">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>ISO/IEC 17025 Test Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-charcoal-900 dark:text-white">
            R-01 Refractory Testing Checklist & Norms
          </h1>
          <p className="text-xs sm:text-sm font-sans text-slate-500 dark:text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
            Complete catalogue of the thirteen accredited refractory testing categories and international methods (ISO / ASTM / EN).
          </p>
        </div>

        {/* Toolbar */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs dark:shadow-md transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 font-mono text-xs">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tests by code or title (e.g. CCS, Porosity, XRF, RUL)..."
                className="w-full h-11 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-10 pr-4 text-xs sm:text-sm text-charcoal dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-industrial-orange shadow-inner"
              />
            </div>

            <div className="md:col-span-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Filter className="w-4 h-4" />
              </div>
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="w-full h-11 appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-10 pr-10 text-xs sm:text-sm text-charcoal dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-industrial-orange cursor-pointer shadow-inner"
              >
                <option value="ALL">All Disciplines ({tests.length})</option>
                <option value="PHYSICAL">Physical Tests</option>
                <option value="THERMOMECHANICAL">Thermo-Mechanical</option>
                <option value="CHEMICAL">Chemical & Mineralogy</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Tests Grid */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs dark:shadow-md transition-colors">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 font-mono text-xs gap-3">
              <Loader2 className="w-7 h-7 animate-spin text-industrial-orange" />
              <span>Querying Accredited Test Matrix...</span>
            </div>
          ) : filteredTests.length === 0 ? (
            <div className="py-16 text-center text-slate-400 font-mono text-xs">
              <FlaskConical className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="font-semibold text-charcoal-700 dark:text-charcoal-300">No matching test categories found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-5">Test Code</th>
                    <th className="py-3 px-5">Standard Title</th>
                    <th className="py-3 px-5">Discipline</th>
                    <th className="py-3 px-5">Applicable Methods</th>
                    <th className="py-3 px-5 text-right">R-01 Scope</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                  {filteredTests.map((t, idx) => (
                    <tr key={t.id} className={idx % 2 === 0 ? 'bg-white dark:bg-[#1E293B]' : 'bg-slate-50/50 dark:bg-slate-900/30'}>
                      <td className="py-3.5 px-5 font-bold text-charcoal-900 dark:text-white font-mono">{t.code}</td>
                      <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-slate-200 font-sans">{t.name}</td>
                      <td className="py-3.5 px-5 font-sans">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {t.discipline_display || t.discipline}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                        {t.methods ? t.methods.map((m: any) => m.code).join(', ') : 'ISO 5014, ASTM C133'}
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-800 border border-teal-200 dark:bg-teal-500/20 dark:text-teal-300 dark:border-teal-500/30">
                          <CheckCircle2 className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                          <span>Mandatory</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </LIMSLayout>
  );
};
