import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Package, 
  ArrowLeft, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  Lock, 
  Calendar, 
  ChevronDown, 
  Building2, 
  Layers, 
  Archive,
  Info
} from 'lucide-react';
import { apiClient, ApiError } from '../../api/client';
import { LIMSLayout } from './LIMSLayout';

export const RegisterSamplePage: React.FC = () => {
  const navigate = useNavigate();
  const [materialLots, setMaterialLots] = useState<any[]>([]);
  const [facilities, setFacilities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    sample_code: `DC-SMP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    material_lot: '',
    current_facility: '',
    quantity_bricks: 10,
    sampling_date: new Date().toISOString().split('T')[0],
    sampled_by: 'Inspector Rajiv Sharma',
    is_counter_sample: false,
    notes: 'Representative lot coring sampled per ISO 5022 / Procedure R-01 §1.'
  });

  useEffect(() => {
    loadMasterData();
  }, []);

  const loadMasterData = async () => {
    setIsLoading(true);
    try {
      const [lotsData, labsData] = await Promise.all([
        apiClient.request<any>('/api/v1/projects/lots/'),
        apiClient.request<any>('/api/v1/laboratory/labs/'),
      ]);
      const lots = lotsData.results || lotsData || [];
      const labs = labsData.results || labsData || [];
      setMaterialLots(lots);
      setFacilities(labs.map((l: any) => ({ id: l.facility, name: l.facility_name })));

      if (lots.length > 0) {
        setFormData((prev) => ({ ...prev, material_lot: lots[0].id }));
      }
      if (labs.length > 0) {
        setFormData((prev) => ({ ...prev, current_facility: labs[0].facility }));
      }
    } catch {
      setErrorMessage('Could not load material lots or facilities from server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.material_lot || !formData.current_facility) {
      setErrorMessage('Please select a material lot and facility.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const created = await apiClient.request<any>('/api/v1/samples/samples/', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      navigate(`/lims/samples/${created.id}`);
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Failed to register sample in database.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LIMSLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 1. Clear Breadcrumb & Spatial Orientation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
          <Link 
            to="/lims/samples" 
            className="hover:text-industrial-orange transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Sample Registry</span>
          </Link>
          <span className="text-slate-300 dark:text-charcoal-700">/</span>
          <span className="text-charcoal-900 dark:text-white font-semibold">Register New Sample</span>
        </nav>

        {/* 2. Elevated Form Card (Light & Dark Unified) */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-9 shadow-xs dark:shadow-xl transition-colors">
          
          {/* Card Header */}
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-6 mb-7">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-teal-50 dark:bg-teal-500/15 border border-teal-200 dark:border-teal-500/30 text-teal-800 dark:text-teal-300 text-[11px] font-mono font-semibold tracking-wider uppercase mb-2.5">
              <Package className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Procedure R-01 §1 Representative Lot Sampling</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-charcoal-900 dark:text-white">
              Register New Laboratory Sample
            </h1>
            <p className="text-xs sm:text-sm font-sans text-slate-500 dark:text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
              Initialize a formal parent refractory sample lot into the database. Generates an immutable chain-of-custody entry and internal barcode identifier.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-mono flex items-start gap-2.5 shadow-2xs">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 font-mono text-xs gap-3">
              <Loader2 className="w-7 h-7 animate-spin text-industrial-orange" />
              <span>Loading Master Catalogues & Material Lots...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
              
              {/* Row 1: Sample Code (Auto-generated/Protected) & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                <div className="sm:col-span-8">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-slate-700 dark:text-slate-200 font-bold uppercase tracking-wide flex items-center gap-1.5">
                      <span>Sample Code *</span>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400 font-normal">
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span>System Generated</span>
                      </span>
                    </label>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.sample_code}
                    onChange={(e) => setFormData({ ...formData, sample_code: e.target.value })}
                    className="w-full h-11 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 text-xs sm:text-sm font-bold text-charcoal-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-industrial-orange transition-all"
                  />
                  <span className="text-[11px] font-sans text-slate-500 dark:text-slate-400 mt-1.5 block">
                    Permanent human-readable R-01 reference code used on physical diamond saw tags.
                  </span>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-slate-700 dark:text-slate-200 font-bold uppercase tracking-wide mb-1.5">
                    Quantity of Bricks *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={formData.quantity_bricks}
                    onChange={(e) => setFormData({ ...formData, quantity_bricks: parseInt(e.target.value) || 1 })}
                    className="w-full h-11 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 text-xs sm:text-sm font-semibold text-charcoal-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-industrial-orange transition-all shadow-inner"
                  />
                  <span className="text-[11px] font-sans text-slate-500 dark:text-slate-400 mt-1.5 block">
                    Standard pallet intake: 10 bricks.
                  </span>
                </div>
              </div>

              {/* Row 2: Full-Width Material Lot Selector (Prevents Text Clipping) */}
              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-bold uppercase tracking-wide mb-1.5">
                  Material Lot & Refractory Grade *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <select
                    value={formData.material_lot}
                    onChange={(e) => setFormData({ ...formData, material_lot: e.target.value })}
                    required
                    className="w-full h-11 appearance-none bg-slate-50/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-10 text-xs sm:text-sm text-charcoal-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-industrial-orange transition-all cursor-pointer shadow-inner"
                  >
                    {materialLots.map((l) => (
                      <option key={l.id} value={l.id}>
                        Lot #{l.lot_number} — {l.material_name} ({l.vendor_name || 'Verified Vendor'})
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
                <span className="text-[11px] font-sans text-slate-500 dark:text-slate-400 mt-1.5 block">
                  Assigns acceptance criteria and DC-SPEC threshold matrix to all downstream tests.
                </span>
              </div>

              {/* Row 3: Receiving Facility & Sampling Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-bold uppercase tracking-wide mb-1.5">
                    Receiving Facility *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <select
                      value={formData.current_facility}
                      onChange={(e) => setFormData({ ...formData, current_facility: e.target.value })}
                      required
                      className="w-full h-11 appearance-none bg-slate-50/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-10 text-xs sm:text-sm text-charcoal-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-industrial-orange transition-all cursor-pointer shadow-inner"
                    >
                      {facilities.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-bold uppercase tracking-wide mb-1.5">
                    Sampling Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={formData.sampling_date}
                      onChange={(e) => setFormData({ ...formData, sampling_date: e.target.value })}
                      className="w-full h-11 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 text-xs sm:text-sm text-charcoal-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-industrial-orange transition-all shadow-inner cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Sampled By (Inspector) */}
              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-bold uppercase tracking-wide mb-1.5">
                  Sampled By (Authorized Inspector) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.sampled_by}
                  onChange={(e) => setFormData({ ...formData, sampled_by: e.target.value })}
                  placeholder="e.g. Inspector Rajiv Sharma"
                  className="w-full h-11 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-industrial-orange transition-all shadow-inner"
                />
              </div>

              {/* Row 5: Elevated Counter-Sample Callout Container */}
              <div className="rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/20 p-4 transition-colors">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_counter_sample}
                    onChange={(e) => setFormData({ ...formData, is_counter_sample: e.target.checked })}
                    className="w-4 h-4 mt-0.5 rounded border-amber-300 dark:border-amber-700 text-industrial-orange focus:ring-orange-500/30 cursor-pointer accent-orange-600"
                  />
                  <div>
                    <span className="font-bold text-charcoal-900 dark:text-amber-200 flex items-center gap-1.5 text-xs">
                      <Archive className="w-3.5 h-3.5 text-industrial-orange" />
                      Designate as 24-Month Reserve Counter-Sample (R-01 §6 Archive)
                    </span>
                    <p className="text-[11px] font-sans text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Counter-samples are isolated in climate-controlled storage under temperature logging and retained for 24 months for arbitration testing in the event of blast furnace refractory lining disputes.
                    </p>
                  </div>
                </label>
              </div>

              {/* Row 6: Inspection Notes & Traceability */}
              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-bold uppercase tracking-wide mb-1.5">
                  Inspection Notes & Sampling Traceability
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-xs sm:text-sm text-charcoal-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-industrial-orange resize-none transition-all shadow-inner"
                />
              </div>

              {/* Anchored Footer Action Bar with Separator */}
              <div className="pt-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3.5">
                <button
                  type="button"
                  onClick={() => navigate('/lims/samples')}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-industrial-orange hover:bg-industrial-darkOrange active:scale-[0.98] text-white font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Writing to Database...</span>
                    </>
                  ) : (
                    <span>Register Sample</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </LIMSLayout>
  );
};
