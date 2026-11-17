import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Search, 
  Plus, 
  Filter, 
  Loader2, 
  ChevronRight, 
  ChevronDown,
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileCheck2,
  ExternalLink,
  Layers
} from 'lucide-react';
import { apiClient } from '../../api/client';
import { LIMSLayout } from './LIMSLayout';

export const SampleRegistryPage: React.FC = () => {
  const navigate = useNavigate();
  const [samples, setSamples] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient.request<any>('/api/v1/samples/samples/');
      setSamples(data.results || data || []);
    } catch {
      setSamples([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSamples = samples.filter((s) => {
    const matchesSearch =
      s.sample_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.lot_number && s.lot_number.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.material_name && s.material_name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'REGISTERED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:border-sky-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            Registered
          </span>
        );
      case 'RECEIVED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Received
          </span>
        );
      case 'PREPARATION':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Preparation
          </span>
        );
      case 'TESTING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-orange-50 text-industrial-orange border border-orange-200 dark:bg-industrial-orange/15 dark:text-industrial-orange dark:border-industrial-orange/30">
            <span className="w-1.5 h-1.5 rounded-full bg-industrial-orange animate-ping" />
            Active Testing
          </span>
        );
      case 'HELD_DAMAGED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30">
            <AlertTriangle className="w-3 h-3 text-rose-500" />
            Held: Damaged
          </span>
        );
      case 'REPORT_ISSUED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-800 border border-teal-200 dark:bg-teal-500/20 dark:text-teal-300 dark:border-teal-500/30 shadow-xs">
            <CheckCircle2 className="w-3 h-3 text-teal-600 dark:text-teal-400" />
            Report Issued
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700 border border-gray-200 dark:bg-charcoal-800 dark:text-charcoal-300 dark:border-charcoal-700">
            {status}
          </span>
        );
    }
  };

  return (
    <LIMSLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* 1. Header with Strong Typography Hierarchy */}
        <div className="bg-white dark:bg-charcoal-900 border border-gray-200/90 dark:border-charcoal-800 rounded-2xl p-6 sm:p-7 shadow-xs dark:shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-industrial-orange/10 border border-industrial-orange/20 text-industrial-orange text-[11px] font-mono font-bold tracking-wider uppercase mb-2">
              <Package className="w-3.5 h-3.5" />
              <span>Chain of Custody Archive</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-charcoal-900 dark:text-white">
              Sample Registry
            </h1>
            <p className="text-xs sm:text-sm font-sans text-slate-500 dark:text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
              Permanent refractory sample tracking, specimen genealogy & custody archive per Procedure R-01 §2 and ISO/IEC 17025.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/lims/samples/new')}
              className="px-4 py-2.5 rounded-xl bg-industrial-orange hover:bg-industrial-darkOrange text-white font-mono text-xs font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Register Sample</span>
            </button>
          </div>
        </div>

        {/* 2. Polish Search & Filter Bar */}
        <div className="bg-white dark:bg-charcoal-900 border border-gray-200/90 dark:border-charcoal-800 rounded-2xl p-4 sm:p-5 shadow-xs dark:shadow-sm transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 font-mono text-xs">
            {/* Search Input Field */}
            <div className="md:col-span-8 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by sample code, material lot number, or refractory grade..."
                className="w-full h-11 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700/80 rounded-xl pl-10 pr-4 text-xs sm:text-sm text-charcoal dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-industrial-orange/30 focus:border-industrial-orange transition-all shadow-inner"
              />
            </div>

            {/* Status Dropdown with Custom Styling */}
            <div className="md:col-span-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Filter className="w-4 h-4" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-11 appearance-none bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700/80 rounded-xl pl-10 pr-10 text-xs sm:text-sm text-charcoal dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-industrial-orange/30 focus:border-industrial-orange transition-all cursor-pointer shadow-inner"
              >
                <option value="ALL">All Statuses ({samples.length})</option>
                <option value="REGISTERED">Registered</option>
                <option value="RECEIVED">Received</option>
                <option value="PREPARATION">Preparation</option>
                <option value="TESTING">Testing</option>
                <option value="HELD_DAMAGED">Held (Damaged)</option>
                <option value="REPORT_ISSUED">Report Issued</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Data Table with Alternating Shading, Distinct Dividers & Interactive Rows */}
        <div className="bg-white dark:bg-charcoal-900 border border-gray-200/90 dark:border-charcoal-800 rounded-2xl overflow-hidden shadow-xs dark:shadow-md transition-colors">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 font-mono text-xs gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-industrial-orange" />
              <span>Querying Sample Database...</span>
            </div>
          ) : filteredSamples.length === 0 ? (
            <div className="py-20 text-center text-slate-400 font-mono text-xs">
              <Package className="w-10 h-10 text-slate-300 dark:text-charcoal-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-charcoal-700 dark:text-charcoal-300">No matching sample records found</p>
              <p className="text-xs text-slate-400 mt-1">Try refining your search keyword or clearing the status filter.</p>
              <button
                onClick={() => navigate('/lims/samples/new')}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-industrial-orange/10 border border-industrial-orange/20 text-industrial-orange hover:bg-industrial-orange hover:text-white transition-all font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Register New Sample</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 dark:bg-charcoal-950/80 border-b border-gray-200 dark:border-charcoal-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <th className="py-3.5 px-5">Sample Code</th>
                    <th className="py-3.5 px-5">Material Lot & Grade</th>
                    <th className="py-3.5 px-5">Project & Campaign</th>
                    <th className="py-3.5 px-4">Units</th>
                    <th className="py-3.5 px-4">Specimens</th>
                    <th className="py-3.5 px-5">Workflow Status</th>
                    <th className="py-3.5 px-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-charcoal-800/70">
                  {filteredSamples.map((sample, idx) => (
                    <tr
                      key={sample.id}
                      onClick={() => navigate(`/lims/samples/${sample.id}`)}
                      className={`transition-all duration-150 cursor-pointer group hover:bg-industrial-orange/5 dark:hover:bg-charcoal-800/60 ${
                        idx % 2 === 0 
                          ? 'bg-white dark:bg-charcoal-900' 
                          : 'bg-gray-50/40 dark:bg-charcoal-900/40'
                      }`}
                    >
                      {/* Sample Code Column */}
                      <td className="py-4 px-5">
                        <div className="font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-industrial-orange transition-colors flex items-center gap-2">
                          <span>{sample.sample_code}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          ID: {sample.id.slice(0, 8)}...
                        </div>
                      </td>

                      {/* Material Lot Column */}
                      <td className="py-4 px-5">
                        <div className="text-charcoal-900 dark:text-white font-semibold text-xs">
                          {sample.lot_number}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-sans">
                          {sample.material_name}
                        </div>
                      </td>

                      {/* Project Column */}
                      <td className="py-4 px-5 font-sans">
                        <span className="font-medium text-charcoal-700 dark:text-charcoal-300">
                          {sample.project_code || 'General Relining'}
                        </span>
                      </td>

                      {/* Units Column */}
                      <td className="py-4 px-4">
                        <span className="font-medium text-charcoal-800 dark:text-charcoal-200">
                          {sample.quantity_bricks}
                        </span>{' '}
                        <span className="text-slate-400 text-[10px]">bricks</span>
                      </td>

                      {/* Specimens Count */}
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-charcoal-800 border border-gray-200 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-300 font-semibold text-[11px]">
                          <Layers className="w-3 h-3 text-slate-400" />
                          <span>{sample.specimens ? sample.specimens.length : 0} cut</span>
                        </span>
                      </td>

                      {/* Status Badge Column */}
                      <td className="py-4 px-5">
                        {getStatusBadge(sample.status)}
                      </td>

                      {/* Action Cell */}
                      <td className="py-4 px-5 text-right">
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100/80 dark:bg-charcoal-800/80 group-hover:bg-industrial-orange group-hover:text-white border border-gray-200 dark:border-charcoal-700 text-slate-400 transition-all shadow-2xs">
                          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                        </div>
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
