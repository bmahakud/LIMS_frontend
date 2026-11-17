import React, { useState, useEffect } from 'react';
import { Layers, Search, Loader2, FolderKanban, ArrowRight, Building2 } from 'lucide-react';
import { apiClient } from '../../api/client';
import { LIMSLayout } from './LIMSLayout';

export const ProjectsMaterialsPage: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [lots, setLots] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [pData, lData] = await Promise.all([
        apiClient.request<any>('/api/v1/projects/projects/'),
        apiClient.request<any>('/api/v1/projects/lots/'),
      ]);
      setProjects(pData.results || pData || []);
      setLots(lData.results || lData || []);
    } catch {
      setProjects([]);
      setLots([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LIMSLayout>
      <div className="space-y-8 max-w-6xl mx-auto font-mono text-xs">
        {/* Header */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xs dark:shadow-md transition-colors">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-teal-50 dark:bg-teal-500/15 border border-teal-200 dark:border-teal-500/30 text-teal-800 dark:text-teal-300 text-[11px] font-semibold tracking-wider uppercase mb-2">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Refractory Campaign Authority</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-charcoal-900 dark:text-white">
            Relining Projects & Material Lots
          </h1>
          <p className="text-xs sm:text-sm font-sans text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Active blast furnace campaigns, client project authorities, and refractory grade production deliveries.
          </p>
        </div>

        {/* Projects Section */}
        <div className="space-y-4">
          <h2 className="text-sm uppercase font-bold text-slate-700 dark:text-slate-300 tracking-wider flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-industrial-orange" />
            <span>Active Relining Projects ({projects.length})</span>
          </h2>
          <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs dark:shadow-md transition-colors">
            {isLoading ? (
              <div className="py-16 flex justify-center text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin text-industrial-orange" />
              </div>
            ) : projects.length === 0 ? (
              <div className="py-12 text-center text-slate-400 font-mono text-xs">
                No active relining projects found.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-5">Project Code</th>
                    <th className="py-3 px-5">Campaign Name</th>
                    <th className="py-3 px-5">Client Authority</th>
                    <th className="py-3 px-5">Asset / Blast Furnace</th>
                    <th className="py-3 px-5">Start Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                  {projects.map((p, idx) => (
                    <tr key={p.id} className={idx % 2 === 0 ? 'bg-white dark:bg-[#1E293B]' : 'bg-slate-50/50 dark:bg-slate-900/30'}>
                      <td className="py-3.5 px-5 font-bold text-charcoal-900 dark:text-white font-mono">{p.code}</td>
                      <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-slate-200 font-sans">{p.name}</td>
                      <td className="py-3.5 px-5 text-slate-600 dark:text-slate-400 font-sans">{p.client_name || 'Tata Steel Europe'}</td>
                      <td className="py-3.5 px-5 text-slate-600 dark:text-slate-400 font-sans">{p.asset_name || 'BF-6 Hearth Lining'}</td>
                      <td className="py-3.5 px-5 text-slate-500 dark:text-slate-400 font-mono">{p.start_date || '2026-03-01'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Material Lots Section */}
        <div className="space-y-4">
          <h2 className="text-sm uppercase font-bold text-slate-700 dark:text-slate-300 tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Refractory Material Lots & Grades ({lots.length})</span>
          </h2>
          <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs dark:shadow-md transition-colors">
            {isLoading ? (
              <div className="py-16 flex justify-center text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin text-industrial-orange" />
              </div>
            ) : lots.length === 0 ? (
              <div className="py-12 text-center text-slate-400 font-mono text-xs">
                No material lots registered in database.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-5">Lot Number</th>
                    <th className="py-3 px-5">Material Grade</th>
                    <th className="py-3 px-5">Category</th>
                    <th className="py-3 px-5">Manufacturer</th>
                    <th className="py-3 px-5">Quantity (Tons)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                  {lots.map((l, idx) => (
                    <tr key={l.id} className={idx % 2 === 0 ? 'bg-white dark:bg-[#1E293B]' : 'bg-slate-50/50 dark:bg-slate-900/30'}>
                      <td className="py-3.5 px-5 font-bold text-charcoal-900 dark:text-white font-mono">{l.lot_number}</td>
                      <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-slate-200 font-sans">{l.material_name}</td>
                      <td className="py-3.5 px-5 text-slate-600 dark:text-slate-400 font-sans">{l.material_category_display || 'Dense Shaped'}</td>
                      <td className="py-3.5 px-5 text-slate-600 dark:text-slate-400 font-sans">{l.vendor_name || 'RHI Magnesita'}</td>
                      <td className="py-3.5 px-5 text-slate-500 dark:text-slate-400 font-mono">{l.quantity_tons} t</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </LIMSLayout>
  );
};
