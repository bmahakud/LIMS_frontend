import React, { useState, useEffect } from 'react';
import { ListTodo, Search, Plus, Loader2, ChevronRight, CheckCircle2, Clock, AlertTriangle, Layers } from 'lucide-react';
import { apiClient, ApiError } from '../../api/client';
import { LIMSLayout } from './LIMSLayout';

export const WorkOrdersPage: React.FC = () => {
  const [workOrders, setWorkOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [laboratories, setLaboratories] = useState<any[]>([]);

  const [newOrder, setNewOrder] = useState({
    order_number: `WO-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    laboratory: '',
    priority: 'ROUTINE',
    target_completion_date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchWorkOrders();
  }, []);

  const fetchWorkOrders = async () => {
    setIsLoading(true);
    try {
      const [woData, labsData] = await Promise.all([
        apiClient.request<any>('/api/v1/work-orders/orders/'),
        apiClient.request<any>('/api/v1/laboratory/labs/'),
      ]);
      const orders = woData.results || woData || [];
      const labs = labsData.results || labsData || [];
      setWorkOrders(orders);
      setLaboratories(labs);
      if (labs.length > 0 && !newOrder.laboratory) {
        setNewOrder((prev) => ({ ...prev, laboratory: labs[0].id }));
      }
    } catch {
      setWorkOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiClient.request('/api/v1/work-orders/orders/', {
        method: 'POST',
        body: JSON.stringify(newOrder),
      });
      setIsCreating(false);
      await fetchWorkOrders();
    } catch (err) {
      if (err instanceof ApiError) {
        alert(err.message);
      } else {
        alert('Failed to create work order.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-300">Urgent</span>;
      case 'HIGH':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300">High</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300">Routine</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300">Completed</span>;
      case 'IN_PROGRESS':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-50 text-industrial-orange border border-orange-200 dark:bg-industrial-orange/20 dark:text-industrial-orange">In Testing</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-500/20 dark:text-sky-300">Draft Scheduled</span>;
    }
  };

  return (
    <LIMSLayout>
      <div className="space-y-6 max-w-7xl mx-auto font-mono text-xs">
        {/* Header */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xs dark:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-teal-50 dark:bg-teal-500/15 border border-teal-200 dark:border-teal-500/30 text-teal-800 dark:text-teal-300 text-[11px] font-semibold tracking-wider uppercase mb-2">
              <ListTodo className="w-3.5 h-3.5" />
              <span>Furnace & Bench Batch Operations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-charcoal-900 dark:text-white">
              Laboratory Work Orders & Batches
            </h1>
            <p className="text-xs sm:text-sm font-sans text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Dispatch specimen groups to furnace testing lines, XRF spectrometers, and mechanical crushing rigs.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2.5 rounded-xl bg-industrial-orange hover:bg-industrial-darkOrange text-white font-bold flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Create Work Order</span>
            </button>
          </div>
        </div>

        {/* Create Modal */}
        {isCreating && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="font-heading font-bold text-sm text-charcoal-900 dark:text-white flex items-center gap-2">
                  <ListTodo className="w-4 h-4 text-industrial-orange" />
                  <span>New Laboratory Batch Order</span>
                </h3>
                <button
                  onClick={() => setIsCreating(false)}
                  className="text-slate-400 hover:text-charcoal-900 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateOrder} className="space-y-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5 uppercase">
                    Order Reference *
                  </label>
                  <input
                    type="text"
                    required
                    value={newOrder.order_number}
                    onChange={(e) => setNewOrder({ ...newOrder, order_number: e.target.value })}
                    className="w-full h-10 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 text-charcoal-900 dark:text-white font-bold focus:ring-2 focus:ring-orange-500/40 focus:border-industrial-orange"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5 uppercase">
                    Target Laboratory Facility *
                  </label>
                  <select
                    value={newOrder.laboratory}
                    onChange={(e) => setNewOrder({ ...newOrder, laboratory: e.target.value })}
                    required
                    className="w-full h-10 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 text-charcoal-900 dark:text-white font-medium focus:ring-2 focus:ring-orange-500/40 focus:border-industrial-orange"
                  >
                    {laboratories.map((lab) => (
                      <option key={lab.id} value={lab.id}>
                        {lab.name} ({lab.facility_name})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5 uppercase">
                      Priority *
                    </label>
                    <select
                      value={newOrder.priority}
                      onChange={(e) => setNewOrder({ ...newOrder, priority: e.target.value })}
                      className="w-full h-10 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 text-charcoal-900 dark:text-white font-medium focus:ring-2 focus:ring-orange-500/40 focus:border-industrial-orange"
                    >
                      <option value="ROUTINE">Routine</option>
                      <option value="HIGH">High</option>
                      <option value="URGENT">Urgent (Blast Furnace Shutdown)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5 uppercase">
                      Target Completion *
                    </label>
                    <input
                      type="date"
                      required
                      value={newOrder.target_completion_date}
                      onChange={(e) => setNewOrder({ ...newOrder, target_completion_date: e.target.value })}
                      className="w-full h-10 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 text-charcoal-900 dark:text-white font-medium focus:ring-2 focus:ring-orange-500/40 focus:border-industrial-orange"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-xl bg-industrial-orange hover:bg-industrial-darkOrange text-white font-bold"
                  >
                    {isSubmitting ? 'Creating...' : 'Schedule Batch'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Work Orders Table */}
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs dark:shadow-md transition-colors">
          {isLoading ? (
            <div className="py-20 flex justify-center text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin text-industrial-orange" />
            </div>
          ) : workOrders.length === 0 ? (
            <div className="py-16 text-center text-slate-400 font-mono text-xs">
              <ListTodo className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="font-semibold text-charcoal-700 dark:text-charcoal-300">No active laboratory work orders.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-5">Order Reference</th>
                  <th className="py-3 px-5">Laboratory Line</th>
                  <th className="py-3 px-5">Priority</th>
                  <th className="py-3 px-5">Target Deadline</th>
                  <th className="py-3 px-5 text-right">Batch Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                {workOrders.map((wo, idx) => (
                  <tr key={wo.id} className={idx % 2 === 0 ? 'bg-white dark:bg-[#1E293B]' : 'bg-slate-50/50 dark:bg-slate-900/30'}>
                    <td className="py-3.5 px-5 font-bold text-charcoal-900 dark:text-white font-mono">{wo.order_number}</td>
                    <td className="py-3.5 px-5 font-semibold text-slate-800 dark:text-slate-200 font-sans">{wo.laboratory_name || 'Thermo-Mechanical Line'}</td>
                    <td className="py-3.5 px-5">{getPriorityBadge(wo.priority)}</td>
                    <td className="py-3.5 px-5 text-slate-500 dark:text-slate-400 font-mono">{wo.target_completion_date}</td>
                    <td className="py-3.5 px-5 text-right">{getStatusBadge(wo.status)}</td>
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
