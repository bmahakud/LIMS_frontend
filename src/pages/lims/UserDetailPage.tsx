import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  User,
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Briefcase,
  Shield,
  CheckCircle2,
  XCircle,
  AlertCircle,
  KeyRound,
  Edit2,
  Plus,
  Trash2,
  History,
  Send,
  Calendar,
  Lock,
  Layers,
  ChevronRight,
  UserCheck,
  UserX
} from 'lucide-react';
import { LIMSLayout } from './LIMSLayout';
import {
  apiClient,
  UserRecord,
  RoleInfo,
  OrganizationMeta,
  AuditHistoryEvent,
  ApiError
} from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  const [user, setUser] = useState<UserRecord | null>(null);
  const [roles, setRoles] = useState<RoleInfo[]>([]);
  const [organizations, setOrganizations] = useState<OrganizationMeta[]>([]);
  const [auditHistory, setAuditHistory] = useState<AuditHistoryEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'memberships' | 'history'>('profile');

  // Modal / Action States
  const [isResetPwdOpen, setIsResetPwdOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [isAddMembershipOpen, setIsAddMembershipOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedFacility, setSelectedFacility] = useState('');
  const [isPrimary, setIsPrimary] = useState(false);
  const [justification, setJustification] = useState('');

  // Status / Feedback
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const loadUserData = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const [userData, rolesData, facData, historyData] = await Promise.all([
        apiClient.getUser(id),
        apiClient.getRoles(),
        apiClient.getFacilities(),
        apiClient.getUserAuditHistory(id).catch(() => ({ events: [] })),
      ]);
      setUser(userData);
      setRoles(rolesData);
      setOrganizations(facData.organizations || []);
      setAuditHistory(historyData.events || []);

      if (rolesData.length > 0) setSelectedRole(rolesData[0].id);
      if (facData.organizations?.[0]?.facilities?.[0]) {
        setSelectedFacility(facData.organizations[0].facilities[0].id);
      }
    } catch (err: any) {
      setToast({
        message: err instanceof ApiError ? err.message : 'Failed to retrieve user profile.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [id]);

  const handleToggleActive = async () => {
    if (!user) return;
    const action = user.is_active ? 'deactivate' : 'activate';
    if (!window.confirm(`Are you sure you want to ${action} ${user.first_name} ${user.last_name}?`)) {
      return;
    }
    setIsActionLoading(true);
    try {
      if (user.is_active) {
        await apiClient.deactivateUser(user.id);
        setToast({ message: `Account for ${user.email} deactivated.`, type: 'success' });
      } else {
        await apiClient.activateUser(user.id);
        setToast({ message: `Account for ${user.email} re-activated.`, type: 'success' });
      }
      await loadUserData();
    } catch (err: any) {
      setToast({ message: err?.message || `Failed to ${action} user.`, type: 'error' });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || newPassword.length < 10) {
      setToast({ message: 'Password must be at least 10 characters.', type: 'error' });
      return;
    }
    setIsActionLoading(true);
    try {
      await apiClient.resetUserPassword(user.id, newPassword);
      setToast({ message: `Password for ${user.email} updated successfully.`, type: 'success' });
      setIsResetPwdOpen(false);
      setNewPassword('');
    } catch (err: any) {
      setToast({ message: err?.message || 'Password reset failed.', type: 'error' });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleAddMembership = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedRole) return;
    setIsActionLoading(true);
    try {
      await apiClient.assignUserMembership(user.id, {
        role_id: selectedRole,
        facility_id: selectedFacility || undefined,
        is_primary: isPrimary,
        approval_justification: justification || undefined,
      });
      setToast({ message: 'Security membership assigned successfully.', type: 'success' });
      setIsAddMembershipOpen(false);
      setJustification('');
      await loadUserData();
    } catch (err: any) {
      setToast({ message: err?.message || 'Failed to assign membership.', type: 'error' });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleRevokeMembership = async (membershipId: string, roleName: string) => {
    if (!user) return;
    if (!window.confirm(`Revoke membership role '${roleName}' from ${user.email}?`)) return;
    setIsActionLoading(true);
    try {
      await apiClient.revokeUserMembership(user.id, membershipId);
      setToast({ message: `Revoked role ${roleName}.`, type: 'success' });
      await loadUserData();
    } catch (err: any) {
      setToast({ message: err?.message || 'Failed to revoke role.', type: 'error' });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleInviteUser = async () => {
    if (!user) return;
    setIsActionLoading(true);
    try {
      const res = await apiClient.inviteUser(user.id);
      setToast({
        message: res.message || 'Invitation notification initiated.',
        type: res.delivered ? 'success' : 'error'
      });
    } catch (err: any) {
      setToast({ message: err?.message || 'Failed to initiate invitation.', type: 'error' });
    } finally {
      setIsActionLoading(false);
    }
  };

  if (isLoading) {
    return (
      <LIMSLayout>
        <div className="flex items-center justify-center p-20 font-mono text-xs text-gray-500">
          Loading personnel dossier...
        </div>
      </LIMSLayout>
    );
  }

  if (!user) {
    return (
      <LIMSLayout>
        <div className="p-8 text-center font-mono space-y-4">
          <p className="text-red-400">Personnel record not found.</p>
          <button
            onClick={() => navigate('/lims/admin/users')}
            className="px-4 py-2 rounded-lg bg-charcoal-800 text-white text-xs"
          >
            Return to User Directory
          </button>
        </div>
      </LIMSLayout>
    );
  }

  return (
    <LIMSLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/lims/admin/users')}
              className={`p-2 rounded-lg border font-mono text-xs flex items-center gap-1.5 transition-colors ${
                isDark
                  ? 'bg-charcoal-900 border-charcoal-800 text-charcoal-400 hover:text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:text-charcoal-950'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-heading font-black tracking-tight text-charcoal-900 dark:text-white uppercase">
                  {user.first_name} {user.last_name}
                </h1>
                <span
                  className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                    user.is_active
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                      : 'bg-red-950/80 text-red-300 border-red-800'
                  }`}
                >
                  {user.is_active ? 'ACTIVE' : 'DEACTIVATED'}
                </span>
              </div>
              <p className="text-xs font-mono text-gray-500 dark:text-charcoal-400">
                {user.email} • {user.job_title || 'No Job Title'}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => navigate(`/lims/admin/users/${user.id}/edit`)}
              className="px-3.5 py-2 rounded-lg border border-gray-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 hover:bg-gray-50 dark:hover:bg-charcoal-700 text-charcoal dark:text-white flex items-center gap-1.5 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={() => setIsResetPwdOpen(true)}
              className="px-3.5 py-2 rounded-lg border border-gray-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 hover:bg-gray-50 dark:hover:bg-charcoal-700 text-charcoal dark:text-white flex items-center gap-1.5 transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Reset Password</span>
            </button>

            <button
              onClick={handleToggleActive}
              disabled={isActionLoading}
              className={`px-3.5 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                user.is_active
                  ? 'bg-red-950/40 hover:bg-red-900/60 border border-red-800 text-red-300'
                  : 'bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800 text-emerald-300'
              }`}
            >
              {user.is_active ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
              <span>{user.is_active ? 'Deactivate' : 'Activate'}</span>
            </button>
          </div>
        </div>

        {/* Feedback Toast */}
        {toast && (
          <div
            className={`p-4 rounded-xl border text-xs font-mono flex items-center gap-2 ${
              toast.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                : 'bg-red-950/40 border-red-800 text-red-300'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{toast.message}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 dark:border-charcoal-800 font-mono text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 font-bold border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-industrial-orange text-industrial-orange'
                : 'border-transparent text-gray-500 hover:text-charcoal dark:hover:text-white'
            }`}
          >
            Personnel Overview
          </button>
          <button
            onClick={() => setActiveTab('memberships')}
            className={`px-4 py-2.5 font-bold border-b-2 transition-colors ${
              activeTab === 'memberships'
                ? 'border-industrial-orange text-industrial-orange'
                : 'border-transparent text-gray-500 hover:text-charcoal dark:hover:text-white'
            }`}
          >
            Assigned Roles & Facilities ({user.memberships.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2.5 font-bold border-b-2 transition-colors ${
              activeTab === 'history'
                ? 'border-industrial-orange text-industrial-orange'
                : 'border-transparent text-gray-500 hover:text-charcoal dark:hover:text-white'
            }`}
          >
            Access & Audit History ({auditHistory.length})
          </button>
        </div>

        {/* Tab 1: Profile & Identity */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`p-6 rounded-2xl border transition-colors space-y-4 ${
                isDark ? 'bg-charcoal-900/60 border-charcoal-800' : 'bg-white border-gray-200 shadow-sm'
              }`}
            >
              <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-industrial-orange flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Personnel Identity</span>
              </h2>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-charcoal-800">
                  <span className="text-gray-400">Full Name</span>
                  <span className="font-semibold text-charcoal dark:text-white">{user.first_name} {user.last_name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-charcoal-800">
                  <span className="text-gray-400">Email Address</span>
                  <span className="font-semibold text-charcoal dark:text-white">{user.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-charcoal-800">
                  <span className="text-gray-400">Job Title</span>
                  <span className="font-semibold text-charcoal dark:text-white">{user.job_title || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-charcoal-800">
                  <span className="text-gray-400">Phone Number</span>
                  <span className="font-semibold text-charcoal dark:text-white">{user.phone_number || '—'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Date Registered</span>
                  <span className="font-semibold text-charcoal dark:text-white">
                    {new Date(user.date_joined).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`p-6 rounded-2xl border transition-colors space-y-4 ${
                isDark ? 'bg-charcoal-900/60 border-charcoal-800' : 'bg-white border-gray-200 shadow-sm'
              }`}
            >
              <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-industrial-orange flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Laboratory Clearance & Status</span>
              </h2>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-charcoal-800">
                  <span className="text-gray-400">Primary Role</span>
                  <span className="font-semibold text-industrial-orange">
                    {user.primary_role?.name || 'Unassigned'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-charcoal-800">
                  <span className="text-gray-400">Primary Plant / Facility</span>
                  <span className="font-semibold text-charcoal dark:text-white">
                    {user.primary_facility?.name || 'Unassigned'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-charcoal-800">
                  <span className="text-gray-400">Django Technical Staff</span>
                  <span className="font-semibold text-charcoal dark:text-white">
                    {user.is_staff ? 'YES (is_staff=True)' : 'NO (is_staff=False)'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Activation / Onboarding</span>
                  <button
                    onClick={handleInviteUser}
                    className="text-industrial-orange hover:underline flex items-center gap-1 font-bold"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Setup Invitation</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Memberships */}
        {activeTab === 'memberships' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                Active Organization & Testing Scope Memberships
              </h2>
              <button
                onClick={() => setIsAddMembershipOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-industrial-orange hover:bg-orange-600 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Membership</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {user.memberships.map((m) => (
                <div
                  key={m.id}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs ${
                    isDark ? 'bg-charcoal-900/60 border-charcoal-800' : 'bg-white border-gray-200 shadow-sm'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-charcoal-900 dark:text-white text-sm">
                        {m.role.name}
                      </span>
                      {m.is_primary && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-industrial-orange/15 text-industrial-orange font-bold border border-industrial-orange/30">
                          PRIMARY
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] ${
                          m.is_active ? 'bg-emerald-950/80 text-emerald-300' : 'bg-red-950/80 text-red-300'
                        }`}
                      >
                        {m.is_active ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                    <p className="text-gray-500 dark:text-charcoal-400">
                      {m.organization_name} • {m.facility_name || 'Primary Testing Lab'}
                      {m.laboratory_area_name && ` (${m.laboratory_area_name})`}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1 text-[10px] text-gray-400">
                      {m.role.can_sign_certificates && <span className="text-amber-400">✓ Can Sign Certificates</span>}
                      {m.role.can_verify_results && <span className="text-rose-400">✓ Can Verify Results</span>}
                      {m.role.can_input_results && <span className="text-teal-400">✓ Metrology Entry</span>}
                      {m.role.can_manage_samples && <span className="text-orange-400">✓ Sample Custody</span>}
                    </div>
                  </div>

                  <button
                    onClick={() => handleRevokeMembership(m.id, m.role.name)}
                    className="p-2 rounded-lg border border-red-800/80 hover:bg-red-950/40 text-red-300 text-xs self-start sm:self-center transition-colors"
                    title="Revoke Membership"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: History */}
        {activeTab === 'history' && (
          <div
            className={`p-6 rounded-2xl border transition-colors space-y-4 ${
              isDark ? 'bg-charcoal-900/60 border-charcoal-800' : 'bg-white border-gray-200 shadow-sm'
            }`}
          >
            <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-industrial-orange flex items-center gap-2">
              <History className="w-4 h-4" />
              <span>ISO/IEC 17025 Immutable Personnel Audit Trail</span>
            </h2>

            {auditHistory.length === 0 ? (
              <p className="font-mono text-xs text-gray-400 py-4 text-center">
                No recorded modification events for this personnel record.
              </p>
            ) : (
              <div className="space-y-3 font-mono text-xs">
                {auditHistory.map((e) => (
                  <div
                    key={e.id}
                    className="p-3.5 rounded-xl border border-gray-100 dark:border-charcoal-800 bg-gray-50/50 dark:bg-charcoal-950/40 space-y-1"
                  >
                    <div className="flex items-center justify-between text-gray-400 text-[11px]">
                      <span>{new Date(e.timestamp).toLocaleString()}</span>
                      <span className="font-semibold text-industrial-teal">{e.action}</span>
                    </div>
                    <p className="font-semibold text-charcoal dark:text-white">{e.summary}</p>
                    <p className="text-[10px] text-gray-500">
                      Operator: {e.actor_email} {e.ip_address && `(${e.ip_address})`}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reset Password Modal */}
      {isResetPwdOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleResetPassword}
            className={`w-full max-w-md p-6 rounded-2xl border space-y-4 font-mono text-xs ${
              isDark ? 'bg-charcoal-900 border-charcoal-700 text-white' : 'bg-white border-gray-200 text-charcoal'
            }`}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-industrial-orange flex items-center gap-2">
              <KeyRound className="w-4 h-4" />
              Administrative Password Reset
            </h3>
            <p className="text-gray-400">
              Set a new secure password for {user.email}. Minimum 10 characters required.
            </p>
            <input
              type="password"
              required
              minLength={10}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password (min 10 chars)"
              className={`w-full p-2.5 rounded-lg border outline-none ${
                isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300'
              }`}
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsResetPwdOpen(false)}
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-charcoal-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isActionLoading}
                className="px-4 py-2 rounded-lg bg-industrial-orange text-white font-bold"
              >
                Confirm Reset
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Membership Modal */}
      {isAddMembershipOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleAddMembership}
            className={`w-full max-w-lg p-6 rounded-2xl border space-y-4 font-mono text-xs ${
              isDark ? 'bg-charcoal-900 border-charcoal-700 text-white' : 'bg-white border-gray-200 text-charcoal'
            }`}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-industrial-orange flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Assign Additional Role & Facility Scope
            </h3>

            <div>
              <label className="block mb-1 text-gray-400 font-semibold">Security Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className={`w-full p-2 rounded-lg border ${
                  isDark ? 'bg-charcoal-950 border-charcoal-700' : 'bg-gray-50 border-gray-300'
                }`}
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.role_type})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-gray-400 font-semibold">Testing Facility</label>
              <select
                value={selectedFacility}
                onChange={(e) => setSelectedFacility(e.target.value)}
                className={`w-full p-2 rounded-lg border ${
                  isDark ? 'bg-charcoal-950 border-charcoal-700' : 'bg-gray-50 border-gray-300'
                }`}
              >
                {organizations.flatMap((o) => o.facilities).map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} [{f.code}]
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isPrimaryCheckbox"
                checked={isPrimary}
                onChange={(e) => setIsPrimary(e.target.checked)}
              />
              <label htmlFor="isPrimaryCheckbox">Designate as Primary Operating Role</label>
            </div>

            {roles.find((r) => r.id === selectedRole)?.role_type === 'AUTHORIZED_APPROVER' && (
              <div>
                <label className="block mb-1 text-amber-400 font-semibold">
                  Mandatory ISO/IEC 17025 Qualification Justification (min 10 chars)
                </label>
                <textarea
                  required
                  rows={2}
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  placeholder="Record accreditation credentials and management rationale..."
                  className={`w-full p-2 rounded-lg border ${
                    isDark ? 'bg-charcoal-950 border-amber-800' : 'bg-white border-amber-400'
                  }`}
                />
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddMembershipOpen(false)}
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-charcoal-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isActionLoading}
                className="px-4 py-2 rounded-lg bg-industrial-orange text-white font-bold"
              >
                Assign Membership
              </button>
            </div>
          </form>
        </div>
      )}
    </LIMSLayout>
  );
};
