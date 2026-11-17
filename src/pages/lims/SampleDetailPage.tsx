import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Package, ArrowLeft, Loader2, AlertCircle, CheckCircle2,
  FileCheck2, Scissors, Shield, Layers, Calendar, User, Building2,
  ExternalLink, Lock, Flame, Scale
} from 'lucide-react';
import { apiClient, ApiError } from '../../api/client';
import { LIMSLayout } from './LIMSLayout';

export const SampleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [sample, setSample] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Specimen cutting modal
  const [isPreparing, setIsPreparing] = useState(false);
  const [cuttingCount, setCuttingCount] = useState(4);
  const [cuttingGeometry, setCuttingGeometry] = useState('Cylinder 50mm dia x 50mm h (CCS / BD / AP)');
  const [isSubmittingCutting, setIsSubmittingCutting] = useState(false);

  useEffect(() => {
    fetchSample();
  }, [id]);

  const fetchSample = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient.request<any>(`/api/v1/samples/samples/${id}/`);
      setSample(data);
    } catch {
      setErrorMessage('Could not load sample record from laboratory database.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrepareSpecimens = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingCutting(true);
    try {
      await apiClient.request(`/api/v1/samples/samples/${id}/prepare-specimens/`, {
        method: 'POST',
        body: JSON.stringify({
          count: cuttingCount,
          geometry: cuttingGeometry,
          length_mm: 50.0,
          width_mm: 50.0,
          height_mm: 50.0
        }),
      });
      setIsPreparing(false);
      await fetchSample();
    } catch (err) {
      if (err instanceof ApiError) {
        alert(err.message);
      } else {
        alert('Failed to prepare specimens.');
      }
    } finally {
      setIsSubmittingCutting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'REGISTERED':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:border-sky-500/30">Registered</span>;
      case 'RECEIVED':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30">Received</span>;
      case 'PREPARATION':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30">Preparation</span>;
      case 'TESTING':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-industrial-orange border border-orange-200 dark:bg-industrial-orange/15 dark:text-industrial-orange dark:border-industrial-orange/30">Active Testing</span>;
      case 'REPORT_ISSUED':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 dark:bg-teal-500/20 dark:text-teal-300 dark:border-teal-500/30">Report Issued</span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200 dark:bg-charcoal-800 dark:text-charcoal-300 dark:border-charcoal-700">{status}</span>;
    }
  };

  return (
    <LIMSLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
          <Link to="/lims/samples" className="hover:text-industrial-orange transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Sample Registry</span>
          </Link>
          <span className="text-slate-300 dark:text-charcoal-700">/</span>
          <span className="text-charcoal-900 dark:text-white font-semibold">Sample Profile</span>
        </nav>

        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center text-slate-400 font-mono text-xs gap-3">
            <Loader2 className="w-7 h-7 animate-spin text-industrial-orange" />
            <span>Reading Sample Record...</span>
          </div>
        ) : errorMessage || !sample ? (
          <div className="p-6 bg-white dark:bg-[#1E293B] border border-rose-200 dark:border-rose-900 rounded-2xl text-center font-mono text-xs text-rose-600 dark:text-rose-400 shadow-xs">
            {errorMessage || 'Sample not found.'}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top Overview Banner */}
            <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs dark:shadow-md transition-colors">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-heading font-black text-charcoal-900 dark:text-white tracking-tight">
                    {sample.sample_code}
                  </h1>
                  {getStatusBadge(sample.status)}
                </div>
                <p className="text-xs sm:text-sm font-sans text-slate-500 dark:text-slate-400">
                  Refractory Lot: <strong className="text-charcoal-800 dark:text-white font-mono">{sample.lot_number}</strong> — {sample.material_name}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {sample.status === 'REGISTERED' && (
                  <button
                    onClick={() => navigate(`/lims/receipt?sample=${sample.id}`)}
                    className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <FileCheck2 className="w-4 h-4" />
                    <span>Confirm Intake Receipt</span>
                  </button>
                )}

                {(sample.status === 'RECEIVED' || sample.status === 'PREPARATION') && (
                  <button
                    onClick={() => setIsPreparing(true)}
                    className="px-4 py-2.5 rounded-xl bg-industrial-orange hover:bg-industrial-darkOrange text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <Scissors className="w-4 h-4" />
                    <span>Cut Test Specimens</span>
                  </button>
                )}
              </div>
            </div>

            {/* Specimen Cutting Modal */}
            {isPreparing && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 font-mono text-xs shadow-2xl animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h3 className="font-heading font-bold text-sm text-charcoal-900 dark:text-white flex items-center gap-2">
                      <Scissors className="w-4 h-4 text-industrial-orange" />
                      <span>Diamond Saw Specimen Preparation</span>
                    </h3>
                    <button
                      onClick={() => setIsPreparing(false)}
                      className="text-slate-400 hover:text-charcoal-900 dark:hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handlePrepareSpecimens} className="space-y-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5 uppercase">
                        Specimen Count *
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={cuttingCount}
                        onChange={(e) => setCuttingCount(parseInt(e.target.value) || 1)}
                        className="w-full h-10 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 text-charcoal-900 dark:text-white font-medium focus:ring-2 focus:ring-orange-500/40 focus:border-industrial-orange"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5 uppercase">
                        Target Cutting Geometry & Norm *
                      </label>
                      <select
                        value={cuttingGeometry}
                        onChange={(e) => setCuttingGeometry(e.target.value)}
                        className="w-full h-10 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 text-charcoal-900 dark:text-white font-medium focus:ring-2 focus:ring-orange-500/40 focus:border-industrial-orange"
                      >
                        <option value="Cylinder 50mm dia x 50mm h (CCS / BD / AP)">Cylinder 50mm dia x 50mm h (CCS / BD / AP)</option>
                        <option value="Cylinder 50mm dia x 50mm h with 12mm central bore (Creep / RUL)">Cylinder 50mm dia with 12mm central bore (Creep / RUL)</option>
                        <option value="Prism 150 x 25 x 25 mm (Modulus of Rupture)">Prism 150 x 25 x 25 mm (Modulus of Rupture)</option>
                        <option value="Cube 50 x 50 x 50 mm (Permanent Linear Change)">Cube 50 x 50 x 50 mm (Permanent Linear Change)</option>
                        <option value="Pulverized 100µm Fused Bead (WD-XRF Assay)">Pulverized 100µm Fused Bead (WD-XRF Assay)</option>
                      </select>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => setIsPreparing(false)}
                        className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmittingCutting}
                        className="px-4 py-2 rounded-xl bg-industrial-orange hover:bg-industrial-darkOrange text-white font-bold"
                      >
                        {isSubmittingCutting ? 'Logging Cutting...' : 'Generate Child Specimens'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Two-Column Specification & Provenance Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs dark:shadow-md">
                <div className="text-xs uppercase font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center justify-between">
                  <span>Parent Lot Metadata</span>
                  <Package className="w-4 h-4 text-industrial-orange" />
                </div>
                <div className="space-y-3 font-sans">
                  <div className="flex justify-between py-1.5 border-b border-slate-50 dark:border-slate-800/60">
                    <span className="text-slate-500 dark:text-slate-400">Campaign / Project:</span>
                    <span className="font-semibold text-charcoal-900 dark:text-white font-mono">{sample.project_code || 'General Relining'}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-50 dark:border-slate-800/60">
                    <span className="text-slate-500 dark:text-slate-400">Brick Quantity:</span>
                    <span className="font-semibold text-charcoal-900 dark:text-white font-mono">{sample.quantity_bricks} standard shapes</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-50 dark:border-slate-800/60">
                    <span className="text-slate-500 dark:text-slate-400">Sampling Date:</span>
                    <span className="font-semibold text-charcoal-900 dark:text-white font-mono">{sample.sampling_date}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500 dark:text-slate-400">Lead Inspector:</span>
                    <span className="font-semibold text-charcoal-900 dark:text-white font-mono">{sample.sampled_by}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs dark:shadow-md">
                <div className="text-xs uppercase font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center justify-between">
                  <span>Quality & Chain of Custody</span>
                  <Shield className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                </div>
                <div className="space-y-3 font-sans">
                  <div className="flex justify-between py-1.5 border-b border-slate-50 dark:border-slate-800/60">
                    <span className="text-slate-500 dark:text-slate-400">Counter-Sample Reserve:</span>
                    <span className="font-semibold text-charcoal-900 dark:text-white font-mono">{sample.is_counter_sample ? 'Yes (24-Month Retained)' : 'Standard Test Sample'}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-50 dark:border-slate-800/60">
                    <span className="text-slate-500 dark:text-slate-400">Current Facility:</span>
                    <span className="font-semibold text-charcoal-900 dark:text-white font-mono">{sample.facility_name || 'IJmuiden Centre'}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500 dark:text-slate-400">Sampling Protocol:</span>
                    <span className="font-semibold text-charcoal-900 dark:text-white font-mono">ISO 5022 / Procedure R-01</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Child Specimens Genealogy Table */}
            <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs dark:shadow-md transition-colors">
              <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-black text-sm text-charcoal-900 dark:text-white tracking-tight flex items-center gap-2">
                    <Layers className="w-4 h-4 text-industrial-orange" />
                    <span>Prepared Child Specimens ({sample.specimens ? sample.specimens.length : 0})</span>
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 font-mono text-[11px] mt-0.5">
                    Genealogy tracking diamond cutting, dimensions, and allocated test runs.
                  </p>
                </div>
              </div>

              {!sample.specimens || sample.specimens.length === 0 ? (
                <div className="py-16 text-center text-slate-400 font-mono text-xs">
                  <Scissors className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <p className="font-semibold text-charcoal-700 dark:text-charcoal-300">No specimens cut from parent brick yet.</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Confirm intake receipt first, then run diamond saw cutting.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
                        <th className="py-3 px-5">Specimen Code</th>
                        <th className="py-3 px-5">Geometry</th>
                        <th className="py-3 px-5">Prepared Date</th>
                        <th className="py-3 px-5">Test Eligible</th>
                        <th className="py-3 px-5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                      {sample.specimens.map((spec: any, idx: number) => (
                        <tr key={spec.id} className={idx % 2 === 0 ? 'bg-white dark:bg-[#1E293B]' : 'bg-slate-50/50 dark:bg-slate-900/30'}>
                          <td className="py-3.5 px-5 font-bold text-charcoal-900 dark:text-white">
                            {spec.specimen_code}
                          </td>
                          <td className="py-3.5 px-5 text-slate-700 dark:text-slate-300">
                            {spec.geometry}
                          </td>
                          <td className="py-3.5 px-5 text-slate-500 dark:text-slate-400">
                            {spec.prepared_at ? spec.prepared_at.split('T')[0] : 'Today'}
                          </td>
                          <td className="py-3.5 px-5 text-slate-700 dark:text-slate-300">
                            CCS / BD / AP / Porosimetry
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30">
                              Ready for Test
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
        )}
      </div>
    </LIMSLayout>
  );
};
