import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { FileCheck2, AlertTriangle, CheckCircle2, Loader2, ArrowLeft, ShieldCheck, Package } from 'lucide-react';
import { apiClient, ApiError } from '../../api/client';
import { LIMSLayout } from './LIMSLayout';

export const SampleReceiptPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preselectedSampleId = searchParams.get('sample');

  const [samples, setSamples] = useState<any[]>([]);
  const [selectedSampleId, setSelectedSampleId] = useState(preselectedSampleId || '');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [packagingCondition, setPackagingCondition] = useState('INTACT');
  const [moistureBarrierIntact, setMoistureBarrierIntact] = useState(true);
  const [heatNumbersVerified, setHeatNumbersVerified] = useState(true);
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    fetchEligibleSamples();
  }, []);

  const fetchEligibleSamples = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient.request<any>('/api/v1/samples/samples/');
      const list = data.results || data || [];
      const eligible = list.filter((s: any) => s.status === 'REGISTERED' || s.status === 'DISPATCHED' || s.id === preselectedSampleId);
      setSamples(eligible);
      if (eligible.length > 0 && !selectedSampleId) {
        setSelectedSampleId(eligible[0].id);
      }
    } catch {
      setErrorMessage('Could not load samples.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSampleId) {
      setErrorMessage('Please select a sample.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const updated = await apiClient.request<any>(`/api/v1/samples/samples/${selectedSampleId}/receipt/`, {
        method: 'POST',
        body: JSON.stringify({
          packaging_condition: packagingCondition,
          moisture_barrier_intact: moistureBarrierIntact,
          heat_numbers_verified: heatNumbersVerified,
          remarks: remarks || 'Package intake inspected in full compliance with R-01 §2.',
        }),
      });
      setSuccessMessage(`Receipt confirmed for ${updated.sample_code}. Status transitioned to RECEIVED.`);
      setTimeout(() => {
        navigate(`/lims/samples/${selectedSampleId}`);
      }, 1200);
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Failed to log sample receipt in database.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LIMSLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
          <Link to="/lims/samples" className="hover:text-industrial-orange transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Sample Registry</span>
          </Link>
          <span className="text-slate-300 dark:text-charcoal-700">/</span>
          <span className="text-charcoal-900 dark:text-white font-semibold">Intake Verification</span>
        </nav>

        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-9 shadow-xs dark:shadow-xl transition-colors">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-7">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-teal-50 dark:bg-teal-500/15 border border-teal-200 dark:border-teal-500/30 text-teal-800 dark:text-teal-300 text-[11px] font-mono font-semibold tracking-wider uppercase mb-2.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Procedure R-01 §2 Chain-of-Custody Intake</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-charcoal-900 dark:text-white">
              Physical Sample Intake & Verification
            </h1>
            <p className="text-xs sm:text-sm font-sans text-slate-500 dark:text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
              Log arrival condition, verify packaging moisture seals, and register sample into the physical laboratory tracking system.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-mono flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-mono flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 font-mono text-xs gap-3">
              <Loader2 className="w-7 h-7 animate-spin text-industrial-orange" />
              <span>Loading Samples Awaiting Intake...</span>
            </div>
          ) : samples.length === 0 ? (
            <div className="py-16 text-center text-slate-400 font-mono text-xs">
              <Package className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="font-semibold text-charcoal-700 dark:text-charcoal-300">No samples currently awaiting intake verification.</p>
              <button
                onClick={() => navigate('/lims/samples/new')}
                className="mt-3 text-industrial-orange hover:underline"
              >
                Register a new sample shipment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-bold uppercase tracking-wide mb-1.5">
                  Select Sample for Intake *
                </label>
                <select
                  value={selectedSampleId}
                  onChange={(e) => setSelectedSampleId(e.target.value)}
                  className="w-full h-11 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 text-xs sm:text-sm text-charcoal-900 dark:text-white font-medium focus:ring-2 focus:ring-orange-500/40 focus:border-industrial-orange cursor-pointer"
                >
                  {samples.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.sample_code} — Lot #{s.lot_number} ({s.material_name})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-bold uppercase tracking-wide mb-1.5">
                    Packaging Condition *
                  </label>
                  <select
                    value={packagingCondition}
                    onChange={(e) => setPackagingCondition(e.target.value)}
                    className="w-full h-11 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 text-charcoal-900 dark:text-white font-medium focus:ring-2 focus:ring-orange-500/40 focus:border-industrial-orange"
                  >
                    <option value="INTACT">Intact / Undamaged</option>
                    <option value="DAMAGED">Damaged in Transit</option>
                    <option value="WEATHER_EXPOSED">Weather Exposed</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 w-full cursor-pointer">
                    <input
                      type="checkbox"
                      checked={moistureBarrierIntact}
                      onChange={(e) => setMoistureBarrierIntact(e.target.checked)}
                      className="w-4 h-4 rounded text-industrial-orange accent-orange-600"
                    />
                    <span className="text-slate-700 dark:text-slate-300 font-medium text-[11px]">
                      Moisture Barrier Intact
                    </span>
                  </label>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 w-full cursor-pointer">
                    <input
                      type="checkbox"
                      checked={heatNumbersVerified}
                      onChange={(e) => setHeatNumbersVerified(e.target.checked)}
                      className="w-4 h-4 rounded text-industrial-orange accent-orange-600"
                    />
                    <span className="text-slate-700 dark:text-slate-300 font-medium text-[11px]">
                      Heat Numbers Verified
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-bold uppercase tracking-wide mb-1.5">
                  Arrival Inspection Remarks
                </label>
                <textarea
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Record pallet numbers, seal integrity, visual brick surface condition..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-xs sm:text-sm text-charcoal-900 dark:text-white focus:ring-2 focus:ring-orange-500/40 focus:border-industrial-orange resize-none"
                />
              </div>

              <div className="pt-5 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3.5">
                <button
                  type="button"
                  onClick={() => navigate('/lims/samples')}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-industrial-orange hover:bg-industrial-darkOrange text-white font-bold flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Logging Intake...</span>
                    </>
                  ) : (
                    <span>Confirm Intake & Update Status</span>
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
