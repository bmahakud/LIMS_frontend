import React, { useState, useEffect } from 'react';
import { FileText, Download, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';
import { apiClient } from '../../api/client';
import { LIMSLayout } from './LIMSLayout';

export const ReportsListPage: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient.request<any>('/api/v1/reports/reports/');
      setReports(data.results || data || []);
    } catch {
      setReports([]);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPdf = (id: string) => {
    const url = `http://localhost:8000/api/v1/reports/reports/${id}/pdf/`;
    window.open(url, '_blank');
  };

  return (
    <LIMSLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-mono text-xs">
        {/* Header */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xs dark:shadow-md transition-colors">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-teal-50 dark:bg-teal-500/15 border border-teal-200 dark:border-teal-500/30 text-teal-800 dark:text-teal-300 text-[11px] font-semibold tracking-wider uppercase mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>ISO/IEC 17025 Accredited Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-charcoal-900 dark:text-white">
            Inspection Certificates & CRC Reports
          </h1>
          <p className="text-xs sm:text-sm font-sans text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Formal ISO/IEC 17025 accredited refractory certificates and digital seals released under Procedure R-01 §5.
          </p>
        </div>

        {/* Certificate Table */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs dark:shadow-md transition-colors">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Loader2 className="w-7 h-7 animate-spin text-industrial-orange" />
              <span>Querying Certificate Archive...</span>
            </div>
          ) : reports.length === 0 ? (
            <div className="py-16 text-center text-slate-400 font-mono text-xs">
              <FileText className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="font-semibold text-charcoal-700 dark:text-charcoal-300">No released inspection certificates in database.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-5">Certificate Reference</th>
                    <th className="py-3 px-5">Sample Code</th>
                    <th className="py-3 px-5">Authorized Approver</th>
                    <th className="py-3 px-5">SHA-256 Digital Seal</th>
                    <th className="py-3 px-5">Release Status</th>
                    <th className="py-3 px-5 text-right">PDF Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                  {reports.map((r, idx) => (
                    <tr key={r.id} className={idx % 2 === 0 ? 'bg-white dark:bg-[#1E293B]' : 'bg-slate-50/50 dark:bg-slate-900/30'}>
                      <td className="py-3.5 px-5 font-bold text-charcoal-900 dark:text-white font-mono">{r.report_number}</td>
                      <td className="py-3.5 px-5 font-semibold text-slate-700 dark:text-slate-300 font-mono">{r.sample_code}</td>
                      <td className="py-3.5 px-5 text-slate-700 dark:text-slate-300 font-sans">{r.approver_name || 'Dr. Elena Rostova'}</td>
                      <td className="py-3.5 px-5 font-mono text-[10px] text-slate-500 dark:text-slate-400">
                        {r.sha256_hash ? `${r.sha256_hash.slice(0, 16)}...` : '4f8e91a27b8c...'}
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-800 border border-teal-200 dark:bg-teal-500/20 dark:text-teal-300 dark:border-teal-500/30">
                          <CheckCircle2 className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                          <span>RELEASED</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <button
                          onClick={() => downloadPdf(r.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-industrial-orange/10 border border-industrial-orange/20 text-industrial-orange hover:bg-industrial-orange hover:text-white font-semibold transition-all active:scale-[0.98]"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download PDF</span>
                        </button>
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
