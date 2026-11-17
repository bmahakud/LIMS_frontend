import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  FileCheck2,
  ListTodo,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  TrendingUp,
  Users,
  Building2,
  FileText,
  FlaskConical,
  Archive,
  Eye,
  PlusCircle,
  FileSearch,
  CheckSquare,
  BadgeAlert
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../api/client';
import { LIMSLayout } from './lims/LIMSLayout';

export const LabDashboard: React.FC = () => {
  const { user, activeMembership, setActiveMembership } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardStats = async () => {
    setIsLoading(true);
    try {
      const facilityParam = activeMembership?.facility_id ? `?facility_id=${activeMembership.facility_id}` : '';
      const data = await apiClient.request<any>(`/api/v1/laboratory/dashboard/stats/${facilityParam}`);
      setStats(data);
    } catch {
      setStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, [activeMembership]);

  // Safe State: User has no active laboratory membership
  if (!activeMembership || !user?.memberships || user.memberships.length === 0) {
    return (
      <LIMSLayout>
        <div className="max-w-xl mx-auto py-16 text-center space-y-4 font-mono">
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-bold text-charcoal-900 dark:text-white uppercase tracking-wider">
            No Active Laboratory Access Assigned
          </h1>
          <p className="text-xs text-gray-500 dark:text-charcoal-400 leading-relaxed">
            Your personnel account ({user?.email}) is enrolled, but does not currently hold an active operational role or facility membership. Contact your Danieli Corus Super Administrator to assign security clearance.
          </p>
          <div className="pt-2">
            <span className="text-[10px] px-3 py-1 rounded bg-gray-100 dark:bg-charcoal-800 border border-gray-200 dark:border-charcoal-700 text-gray-500">
              ISO/IEC 17025 Clearance: Restricted
            </span>
          </div>
        </div>
      </LIMSLayout>
    );
  }

  const roleType = activeMembership.role.role_type;
  const facilityName = activeMembership.facility_name || 'Primary Plant';

  return (
    <LIMSLayout>
      <div className="space-y-8 max-w-7xl mx-auto font-sans">
        {/* Top Operational Banner */}
        <div className="bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm dark:shadow-xl transition-colors">
          <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-industrial-orange/10 dark:from-industrial-orange/15 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-industrial-orange/10 border border-industrial-orange/20 text-industrial-orange text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-industrial-orange animate-pulse" />
                Procedure R-01 • {activeMembership.role.name}
              </span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-gray-100 dark:bg-charcoal-800 border border-gray-200 dark:border-charcoal-700 text-gray-600 dark:text-charcoal-300">
                {facilityName}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-black text-charcoal-900 dark:text-white tracking-tight">
              Welcome, {user?.first_name} {user?.last_name}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-gray-600 dark:text-charcoal-300 leading-relaxed">
              Active laboratory session bound to <strong className="text-charcoal-900 dark:text-white">{facilityName}</strong>. Real-time synchronisation with PostgreSQL immutable ISO/IEC 17025 metrology ledger.
            </p>

            {/* Multiple Memberships Selector */}
            {user.memberships.length > 1 && (
              <div className="pt-2 flex items-center gap-2 font-mono text-xs">
                <span className="text-gray-400">Switch Operating Scope:</span>
                <select
                  value={activeMembership.id}
                  onChange={(e) => {
                    const found = user.memberships.find(m => m.id === e.target.value);
                    if (found) setActiveMembership(found);
                  }}
                  className="px-2.5 py-1 rounded-lg border border-gray-300 dark:border-charcoal-700 bg-gray-50 dark:bg-charcoal-800 text-charcoal dark:text-white text-xs outline-none"
                >
                  {user.memberships.filter(m => m.is_active).map(m => (
                    <option key={m.id} value={m.id}>
                      {m.role.name} — {m.facility_name || 'Primary Plant'}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Database Metric Counters */}
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500 dark:text-charcoal-400 font-bold mb-3">
            Real-Time Database Metrics ({facilityName})
          </div>

          {isLoading ? (
            <div className="py-10 flex flex-col items-center justify-center text-gray-500 dark:text-charcoal-400 font-mono text-xs gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-industrial-orange" />
              <span>Querying Database Metrics...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
              <div
                onClick={() => navigate('/lims/samples')}
                className="p-5 bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 hover:border-industrial-orange/60 rounded-xl transition-all cursor-pointer group shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-charcoal-400 mb-2 font-medium">
                  <span>Total Lots</span>
                  <Package className="w-4 h-4 text-industrial-orange" />
                </div>
                <div className="text-2xl font-bold text-charcoal-900 dark:text-white group-hover:text-industrial-orange transition-colors">
                  {stats?.samples?.total || 0}
                </div>
                <div className="text-[10px] text-gray-400 dark:text-charcoal-500 mt-1">
                  {stats?.samples?.in_testing || 0} in active testing
                </div>
              </div>

              <div
                onClick={() => navigate('/lims/receipt')}
                className="p-5 bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 hover:border-industrial-teal/60 rounded-xl transition-all cursor-pointer group shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-charcoal-400 mb-2 font-medium">
                  <span>Received Lots</span>
                  <FileCheck2 className="w-4 h-4 text-industrial-teal" />
                </div>
                <div className="text-2xl font-bold text-charcoal-900 dark:text-white group-hover:text-industrial-teal transition-colors">
                  {stats?.samples?.received || 0}
                </div>
                <div className="text-[10px] text-gray-400 dark:text-charcoal-500 mt-1">
                  {stats?.samples?.awaiting_receipt || 0} awaiting delivery
                </div>
              </div>

              <div
                onClick={() => navigate('/lims/work-orders')}
                className="p-5 bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 hover:border-blue-500/60 rounded-xl transition-all cursor-pointer group shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-charcoal-400 mb-2 font-medium">
                  <span>Work Orders</span>
                  <ListTodo className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-charcoal-900 dark:text-white group-hover:text-blue-500 transition-colors">
                  {stats?.work_orders?.active || 0}
                </div>
                <div className="text-[10px] text-gray-400 dark:text-charcoal-500 mt-1">
                  {stats?.work_orders?.total || 0} total scheduled
                </div>
              </div>

              <div
                onClick={() => navigate('/lims/reports')}
                className="p-5 bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 hover:border-emerald-500/60 rounded-xl transition-all cursor-pointer group shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-charcoal-400 mb-2 font-medium">
                  <span>Certificates Issued</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {stats?.quality?.reports_issued || 0}
                </div>
                <div className="text-[10px] text-gray-400 dark:text-charcoal-500 mt-1">
                  ISO 17025 SHA-256 sealed
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================= ROLE-AWARE OPERATIONAL WORKBENCH ================= */}
        <div className="border border-gray-200 dark:border-charcoal-800 rounded-2xl p-6 bg-white dark:bg-charcoal-900/60 shadow-xs transition-colors space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-gray-100 dark:border-charcoal-800">
            <div>
              <h2 className="text-sm font-mono uppercase tracking-wider text-charcoal-900 dark:text-white font-bold flex items-center gap-2">
                <Shield className="w-4 h-4 text-industrial-orange" />
                <span>Operational Priority Console: {activeMembership.role.name}</span>
              </h2>
              <p className="text-xs font-mono text-gray-500 dark:text-charcoal-400">
                Authorized workflow tasks driven by verified PostgreSQL database states.
              </p>
            </div>
          </div>

          {/* 1. SUPER_ADMIN Task Card */}
          {roleType === 'SUPER_ADMIN' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div
                onClick={() => navigate('/lims/admin/users')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-industrial-orange/60 cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-industrial-orange">
                  <span>User & RBAC Governance</span>
                  <Users className="w-4 h-4 text-industrial-orange" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  {stats?.role_stats?.users_active || 0} of {stats?.role_stats?.users_total || 0} users active. Manage accounts & roles.
                </p>
                <span className="text-industrial-orange font-bold text-[10px] flex items-center gap-1">Open User Management →</span>
              </div>

              <div
                onClick={() => navigate('/lims/admin/users/new')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-industrial-orange/60 cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-industrial-orange">
                  <span>Provision Personnel</span>
                  <PlusCircle className="w-4 h-4 text-industrial-orange" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  Enrol new laboratory operator and assign facility & security scope.
                </p>
                <span className="text-industrial-orange font-bold text-[10px] flex items-center gap-1">Register New User →</span>
              </div>

              <div
                onClick={() => navigate('/lims/reports')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-industrial-orange/60 cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-industrial-orange">
                  <span>Audit Trail & Records</span>
                  <CheckCircle2 className="w-4 h-4 text-industrial-teal" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  {stats?.role_stats?.audit_events_recent || 0} total immutable audit events logged.
                </p>
                <span className="text-industrial-teal font-bold text-[10px] flex items-center gap-1">Inspect Audit Records →</span>
              </div>
            </div>
          )}

          {/* 2. FACILITY_MANAGER Task Card */}
          {roleType === 'FACILITY_MANAGER' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div
                onClick={() => navigate('/lims/projects')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-blue-500 cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-blue-500">
                  <span>Blast Furnace Campaigns</span>
                  <Building2 className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  Track active steelmaker client relining campaigns and facility capacity.
                </p>
                <span className="text-blue-500 font-bold text-[10px] flex items-center gap-1">View Campaigns →</span>
              </div>

              <div
                onClick={() => navigate('/lims/vendors')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-blue-500 cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-blue-500">
                  <span>Refractory Vendors</span>
                  <Package className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  Audit certified manufacturers (RHI, Vesuvius) supplying refractory brick lots.
                </p>
                <span className="text-blue-500 font-bold text-[10px] flex items-center gap-1">Vendor Registry →</span>
              </div>

              <div
                onClick={() => navigate('/lims/reports')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-blue-500 cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-blue-500">
                  <span>Plant QA Reports</span>
                  <FileText className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  {stats?.quality?.reports_issued || 0} completed plant acceptance certificates.
                </p>
                <span className="text-blue-500 font-bold text-[10px] flex items-center gap-1">Review Reports →</span>
              </div>
            </div>
          )}

          {/* 3. LAB_MANAGER Task Card */}
          {roleType === 'LAB_MANAGER' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div
                onClick={() => navigate('/lims/work-orders')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-industrial-orange cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-industrial-orange">
                  <span>Test Allocations</span>
                  <ListTodo className="w-4 h-4 text-industrial-orange" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  {stats?.work_orders?.active || 0} active work orders requiring technician dispatch.
                </p>
                <span className="text-industrial-orange font-bold text-[10px] flex items-center gap-1">Manage Work Orders →</span>
              </div>

              <div
                onClick={() => navigate('/lims/tests')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-industrial-orange cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-industrial-orange">
                  <span>13-Test Master Catalogue</span>
                  <FlaskConical className="w-4 h-4 text-industrial-orange" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  Configure ASTM/ISO testing limits, calibration tolerances, and furnace rigs.
                </p>
                <span className="text-industrial-orange font-bold text-[10px] flex items-center gap-1">Inspect Test Protocol →</span>
              </div>

              <div
                onClick={() => navigate('/lims/samples')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-industrial-orange cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-industrial-orange">
                  <span>Sample Inventory</span>
                  <Package className="w-4 h-4 text-industrial-orange" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  {stats?.samples?.in_testing || 0} specimens currently under physical or thermal testing.
                </p>
                <span className="text-industrial-orange font-bold text-[10px] flex items-center gap-1">View Sample Tracking →</span>
              </div>
            </div>
          )}

          {/* 4. SAMPLE_CLERK Task Card */}
          {roleType === 'SAMPLE_CLERK' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div
                onClick={() => navigate('/lims/samples/new')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-industrial-orange cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-industrial-orange">
                  <span>Register Incoming Refractory Lot</span>
                  <PlusCircle className="w-4 h-4 text-industrial-orange" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  Intake refractory brick shipment, assign specimen lot codes, and record pallet packaging.
                </p>
                <span className="text-industrial-orange font-bold text-[10px] flex items-center gap-1">Register New Sample →</span>
              </div>

              <div
                onClick={() => navigate('/lims/receipt')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-industrial-orange cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-industrial-orange">
                  <span>Intake Delivery Receipts</span>
                  <FileCheck2 className="w-4 h-4 text-industrial-orange" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  {stats?.samples?.awaiting_receipt || 0} shipments awaiting formal physical receiving inspection.
                </p>
                <span className="text-industrial-orange font-bold text-[10px] flex items-center gap-1">Process Intake Receipt →</span>
              </div>
            </div>
          )}

          {/* 5. INSPECTOR Task Card */}
          {roleType === 'INSPECTOR' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div
                onClick={() => navigate('/lims/receipt')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-amber-500 cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-amber-500">
                  <span>Visual & Physical Inspection</span>
                  <FileSearch className="w-4 h-4 text-amber-500" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  Record spalling, corner chips, dimensions, and bulk non-conformances on received bricks.
                </p>
                <span className="text-amber-500 font-bold text-[10px] flex items-center gap-1">Inspect Delivery Queue →</span>
              </div>

              <div
                onClick={() => navigate('/lims/samples')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-amber-500 cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-amber-500">
                  <span>Held / Quarantined Specimens</span>
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  {stats?.samples?.held_damaged || 0} specimens quarantined due to physical defects or damage.
                </p>
                <span className="text-amber-500 font-bold text-[10px] flex items-center gap-1">Review Quarantined Lots →</span>
              </div>
            </div>
          )}

          {/* 6. LAB_TECHNICIAN Task Card */}
          {roleType === 'LAB_TECHNICIAN' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div
                onClick={() => navigate('/lims/work-orders')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-teal-500 cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-teal-500">
                  <span>Assigned Work Orders & Test Benches</span>
                  <ListTodo className="w-4 h-4 text-teal-500" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  {stats?.role_stats?.technician_assigned_wos || 0} testing work orders currently allocated to your bench.
                </p>
                <span className="text-teal-500 font-bold text-[10px] flex items-center gap-1">Open Assigned Work Orders →</span>
              </div>

              <div
                onClick={() => navigate('/lims/tests')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-teal-500 cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-teal-500">
                  <span>Procedure R-01 Metrology Entry</span>
                  <FlaskConical className="w-4 h-4 text-teal-500" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  Record test readings: Bulk Density / Apparent Porosity, CCS, RUL, Creep in Compression.
                </p>
                <span className="text-teal-500 font-bold text-[10px] flex items-center gap-1">Enter Test Results →</span>
              </div>
            </div>
          )}

          {/* 7. QA_REVIEWER Task Card */}
          {roleType === 'QA_REVIEWER' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div
                onClick={() => navigate('/lims/tests')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-rose-500 cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-rose-500">
                  <span>Statistical QA Review Queue</span>
                  <CheckSquare className="w-4 h-4 text-rose-500" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  Verify metrology results against ISO/ASTM acceptance tolerances. Segregated from Approver role.
                </p>
                <span className="text-rose-500 font-bold text-[10px] flex items-center gap-1">Verify Test Results →</span>
              </div>

              <div
                onClick={() => navigate('/lims/reports')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-rose-500 cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-rose-500">
                  <span>QA Deviations & Tolerance Limits</span>
                  <BadgeAlert className="w-4 h-4 text-rose-500" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  {stats?.quality?.deviations_recorded || 0} recorded measurement deviations logged in audit trail.
                </p>
                <span className="text-rose-500 font-bold text-[10px] flex items-center gap-1">Review Deviations →</span>
              </div>
            </div>
          )}

          {/* 8. AUTHORIZED_APPROVER Task Card */}
          {roleType === 'AUTHORIZED_APPROVER' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div
                onClick={() => navigate('/lims/reports')}
                className="p-4 rounded-xl border border-amber-800/80 bg-amber-950/20 hover:border-amber-600 cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-amber-300 group-hover:text-amber-200">
                  <span>Scientific Sign-Off Queue (ISO/IEC 17025)</span>
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-amber-400/80 text-[11px]">
                  Authorize and apply cryptographic SHA-256 seal to final Procedure R-01 Certificate of Analysis.
                </p>
                <span className="text-amber-300 font-bold text-[10px] flex items-center gap-1">Open Sign-Off Queue →</span>
              </div>

              <div
                onClick={() => navigate('/lims/samples')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-amber-500 cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-amber-400">
                  <span>Final Sample Acceptance Decisions</span>
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  {stats?.samples?.approved || 0} specimen lots successfully approved and certified for blast furnace lining.
                </p>
                <span className="text-amber-400 font-bold text-[10px] flex items-center gap-1">Inspect Certified Lots →</span>
              </div>
            </div>
          )}

          {/* 9. REPORT_COORDINATOR Task Card */}
          {roleType === 'REPORT_COORDINATOR' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div
                onClick={() => navigate('/lims/reports')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-purple-500 cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-purple-400">
                  <span>CRC Dossier Compilation</span>
                  <FileText className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  Consolidate verified test runs into client-ready blast furnace quality dossiers.
                </p>
                <span className="text-purple-400 font-bold text-[10px] flex items-center gap-1">Manage Report Dossiers →</span>
              </div>

              <div
                onClick={() => navigate('/lims/projects')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-purple-500 cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-purple-400">
                  <span>Client Relining Packages</span>
                  <Building2 className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  Package refractory lots by project campaigns (e.g., Tata Steel IJmuiden BF6).
                </p>
                <span className="text-purple-400 font-bold text-[10px] flex items-center gap-1">Open Client Projects →</span>
              </div>
            </div>
          )}

          {/* 10. STORAGE_CUSTODIAN Task Card */}
          {roleType === 'STORAGE_CUSTODIAN' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div
                onClick={() => navigate('/lims/samples')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-teal-500 cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-teal-400">
                  <span>Core Archive & Long-Term Retain Lockers</span>
                  <Archive className="w-4 h-4 text-teal-400" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  {stats?.samples?.archived || 0} specimen retain cores secured in temperature-controlled archive racks.
                </p>
                <span className="text-teal-400 font-bold text-[10px] flex items-center gap-1">Manage Storage Archives →</span>
              </div>

              <div
                onClick={() => navigate('/lims/receipt')}
                className="p-4 rounded-xl border border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 hover:border-teal-500 cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between font-bold text-sm text-charcoal-900 dark:text-white group-hover:text-teal-400">
                  <span>Chain-of-Custody Transfers</span>
                  <FileCheck2 className="w-4 h-4 text-teal-400" />
                </div>
                <p className="text-gray-500 text-[11px]">
                  Record physical custody handoffs between testing bays and storage racks.
                </p>
                <span className="text-teal-400 font-bold text-[10px] flex items-center gap-1">Custody Log →</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </LIMSLayout>
  );
};
