import React, { useState, useEffect } from 'react';
import { Building2, Search, Loader2, ShieldCheck, ExternalLink, MapPin } from 'lucide-react';
import { apiClient } from '../../api/client';
import { LIMSLayout } from './LIMSLayout';

export const VendorRegistryPage: React.FC = () => {
  const [vendors, setVendors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient.request<any>('/api/v1/projects/vendors/');
      setVendors(data.results || data || []);
    } catch {
      setVendors([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.vendor_code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <LIMSLayout>
      <div className="space-y-6 max-w-6xl mx-auto font-mono text-xs">
        {/* Header */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xs dark:shadow-md transition-colors">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-teal-50 dark:bg-teal-500/15 border border-teal-200 dark:border-teal-500/30 text-teal-800 dark:text-teal-300 text-[11px] font-semibold tracking-wider uppercase mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Approved Manufacturer Register</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-charcoal-900 dark:text-white">
            Vendor & Manufacturer Registry
          </h1>
          <p className="text-xs sm:text-sm font-sans text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Certified refractory brickworks and suppliers approved under Danieli Corus Procedure R-01 §1.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vendor by name or code..."
            className="w-full h-11 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-4 text-xs sm:text-sm text-charcoal dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-industrial-orange shadow-inner"
          />
        </div>

        {/* Vendors Table */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs dark:shadow-md transition-colors">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 text-xs gap-3">
              <Loader2 className="w-7 h-7 animate-spin text-industrial-orange" />
              <span>Querying Vendor Database...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-slate-400 font-mono text-xs">
              <Building2 className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="font-semibold text-charcoal-700 dark:text-charcoal-300">No approved vendors matched your search.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-5">Vendor Code</th>
                  <th className="py-3 px-5">Manufacturer Name</th>
                  <th className="py-3 px-5">Headquarters / Country</th>
                  <th className="py-3 px-5">Approval Scope</th>
                  <th className="py-3 px-5 text-right">Accreditation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                {filtered.map((v, idx) => (
                  <tr key={v.id} className={idx % 2 === 0 ? 'bg-white dark:bg-[#1E293B]' : 'bg-slate-50/50 dark:bg-slate-900/30'}>
                    <td className="py-3.5 px-5 font-bold text-charcoal-900 dark:text-white font-mono">{v.vendor_code}</td>
                    <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-slate-200 font-sans">{v.name}</td>
                    <td className="py-3.5 px-5 text-slate-600 dark:text-slate-400 font-sans flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{v.country || 'Austria / Global'}</span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-600 dark:text-slate-400 font-sans">
                      High-Alumina, Magnesia-Carbon & Fused Zirconia
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30">
                        <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>R-01 Certified</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </LIMSLayout>
  );
};
