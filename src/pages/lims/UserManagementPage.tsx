import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Shield,
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Building2,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Lock,
  Edit2,
  Trash2,
  Plus,
  RefreshCw,
  Eye,
  EyeOff,
  Check,
  UserCheck,
  UserX,
  ChevronDown,
  X,
  ArrowRight
} from 'lucide-react';
import { LIMSLayout } from './LIMSLayout';
import {
  apiClient,
  UserRecord,
  RoleInfo,
  OrganizationMeta,
  CreateUserInput,
  UpdateUserInput,
  ApiError
} from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const UserManagementPage: React.FC = () => {
  const { user: currentUser } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  // State
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [roles, setRoles] = useState<RoleInfo[]>([]);
  const [facilities, setFacilities] = useState<OrganizationMeta[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');

  // Feedback Notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Modal Controls
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isResetPwdModalOpen, setIsResetPwdModalOpen] = useState(false);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);

  // Create Form State
  const [createForm, setCreateForm] = useState<CreateUserInput>({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    job_title: '',
    phone_number: '',
    role_type: 'LAB_TECHNICIAN',
    facility_id: '',
    is_active: true
  });
  const [showCreatePassword, setShowCreatePassword] = useState(false);

  // Edit Form State
  const [editForm, setEditForm] = useState<UpdateUserInput>({
    first_name: '',
    last_name: '',
    job_title: '',
    phone_number: '',
    is_active: true
  });

  // Password Reset State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);

  // New Membership State
  const [newMembershipRole, setNewMembershipRole] = useState('');
  const [newMembershipFacility, setNewMembershipFacility] = useState('');
  const [isPrimaryMembership, setIsPrimaryMembership] = useState(false);

  // Modal submitting state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Initial Data Fetch
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [usersData, rolesData, facilitiesData] = await Promise.all([
        apiClient.getUsers(),
        apiClient.getRoles(),
        apiClient.getFacilities()
      ]);
      setUsers(usersData);
      setRoles(rolesData);
      setFacilities(facilitiesData.organizations || []);

      // Default facility for create form
      if (facilitiesData.organizations?.[0]?.facilities?.[0]) {
        setCreateForm(prev => ({
          ...prev,
          facility_id: facilitiesData.organizations[0].facilities[0].id
        }));
      }
    } catch (err: any) {
      setToast({
        message: err instanceof ApiError ? err.message : 'Failed to retrieve user directory.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered Users Memo
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${u.first_name} ${u.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.job_title && u.job_title.toLowerCase().includes(searchQuery.toLowerCase()));

      // Role filter
      const matchesRole = selectedRoleFilter === 'ALL' ||
        u.primary_role?.role_type === selectedRoleFilter ||
        u.memberships.some(m => m.is_active && m.role.role_type === selectedRoleFilter);

      // Status filter
      const matchesStatus = selectedStatusFilter === 'ALL' ||
        (selectedStatusFilter === 'ACTIVE' && u.is_active) ||
        (selectedStatusFilter === 'INACTIVE' && !u.is_active);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, selectedRoleFilter, selectedStatusFilter]);

  // Role Color Mapping
  const getRoleBadgeStyle = (roleType?: string) => {
    switch (roleType) {
      case 'SUPER_ADMIN':
        return isDark
          ? 'bg-purple-950/80 text-purple-300 border-purple-800'
          : 'bg-purple-100 text-purple-800 border-purple-200';
      case 'AUTHORIZED_APPROVER':
        return isDark
          ? 'bg-amber-950/80 text-amber-300 border-amber-800'
          : 'bg-amber-100 text-amber-900 border-amber-300';
      case 'QA_REVIEWER':
        return isDark
          ? 'bg-rose-950/80 text-rose-300 border-rose-800'
          : 'bg-rose-100 text-rose-800 border-rose-200';
      case 'LAB_MANAGER':
      case 'FACILITY_MANAGER':
        return isDark
          ? 'bg-blue-950/80 text-blue-300 border-blue-800'
          : 'bg-blue-100 text-blue-800 border-blue-200';
      case 'LAB_TECHNICIAN':
        return isDark
          ? 'bg-teal-950/80 text-teal-300 border-teal-800'
          : 'bg-teal-100 text-teal-800 border-teal-200';
      case 'SAMPLE_CLERK':
      case 'INSPECTOR':
        return isDark
          ? 'bg-orange-950/80 text-orange-300 border-orange-800'
          : 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return isDark
          ? 'bg-charcoal-800 text-charcoal-300 border-charcoal-700'
          : 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (userToEdit: UserRecord) => {
    setSelectedUser(userToEdit);
    setEditForm({
      first_name: userToEdit.first_name,
      last_name: userToEdit.last_name,
      job_title: userToEdit.job_title || '',
      phone_number: userToEdit.phone_number || '',
      is_active: userToEdit.is_active
    });
    setModalError('');
    setIsEditModalOpen(true);
  };

  // Open Reset Password Modal
  const handleOpenResetPwd = (userToReset: UserRecord) => {
    setSelectedUser(userToReset);
    setNewPassword('');
    setConfirmPassword('');
    setModalError('');
    setIsResetPwdModalOpen(true);
  };

  // Open Memberships Modal
  const handleOpenMemberships = (userToManage: UserRecord) => {
    setSelectedUser(userToManage);
    setNewMembershipRole(roles[0]?.id || '');
    setNewMembershipFacility(facilities[0]?.facilities?.[0]?.id || '');
    setIsPrimaryMembership(false);
    setModalError('');
    setIsMembershipModalOpen(true);
  };

  // Submit User Provisioning
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError('');

    if (!createForm.email || !createForm.first_name || !createForm.last_name || !createForm.password) {
      setModalError('Please complete all mandatory fields.');
      return;
    }

    if (createForm.password.length < 8) {
      setModalError('Password must contain at least 8 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await apiClient.createUser(createForm);
      setUsers(prev => [created, ...prev]);
      setIsCreateModalOpen(false);
      setToast({
        message: `Successfully registered personnel ${created.email}`,
        type: 'success'
      });
      // Reset form
      setCreateForm({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        job_title: '',
        phone_number: '',
        role_type: 'LAB_TECHNICIAN',
        facility_id: facilities[0]?.facilities?.[0]?.id || '',
        is_active: true
      });
    } catch (err: any) {
      setModalError(err instanceof ApiError ? err.message : 'Failed to register user.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Profile Update
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setModalError('');
    setIsSubmitting(true);

    try {
      const updated = await apiClient.updateUser(selectedUser.id, editForm);
      setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
      setIsEditModalOpen(false);
      setToast({
        message: `Updated profile for ${updated.email}`,
        type: 'success'
      });
    } catch (err: any) {
      setModalError(err instanceof ApiError ? err.message : 'Failed to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Password Reset
  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setModalError('');

    if (newPassword.length < 8) {
      setModalError('New password must contain at least 8 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setModalError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await apiClient.resetUserPassword(selectedUser.id, newPassword);
      setIsResetPwdModalOpen(false);
      setToast({
        message: `Password for ${selectedUser.email} has been securely updated.`,
        type: 'success'
      });
    } catch (err: any) {
      setModalError(err instanceof ApiError ? err.message : 'Failed to reset password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Assign New Role Membership
  const handleAssignMembership = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !newMembershipRole) return;
    setModalError('');
    setIsSubmitting(true);

    try {
      await apiClient.assignUserMembership(selectedUser.id, {
        role_id: newMembershipRole,
        facility_id: newMembershipFacility || undefined,
        is_primary: isPrimaryMembership
      });
      // Refresh user record
      const refreshedUser = await apiClient.getUser(selectedUser.id);
      setSelectedUser(refreshedUser);
      setUsers(prev => prev.map(u => u.id === refreshedUser.id ? refreshedUser : u));
      setToast({
        message: `Assigned new role to ${refreshedUser.email}`,
        type: 'success'
      });
    } catch (err: any) {
      setModalError(err instanceof ApiError ? err.message : 'Failed to assign role.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Revoke Role Membership
  const handleRevokeMembership = async (membershipId: string) => {
    if (!selectedUser) return;
    if (selectedUser.memberships.length <= 1) {
      setModalError('A user must retain at least one operational security role.');
      return;
    }

    try {
      await apiClient.revokeUserMembership(selectedUser.id, membershipId);
      const refreshedUser = await apiClient.getUser(selectedUser.id);
      setSelectedUser(refreshedUser);
      setUsers(prev => prev.map(u => u.id === refreshedUser.id ? refreshedUser : u));
      setToast({
        message: 'Role membership was revoked.',
        type: 'success'
      });
    } catch (err: any) {
      setModalError(err instanceof ApiError ? err.message : 'Failed to revoke role.');
    }
  };

  // Stats Counters
  const totalCount = users.length;
  const activeCount = users.filter(u => u.is_active).length;
  const inactiveCount = users.filter(u => !u.is_active).length;
  const noMembershipCount = users.filter(u => !u.memberships || u.memberships.length === 0).length;
  const approversCount = users.filter(u => 
    u.primary_role?.can_sign_certificates ||
    u.memberships.some(m => m.is_active && m.role.can_sign_certificates)
  ).length;

  return (
    <LIMSLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Toast Feedback */}
        {toast && (
          <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md animate-in slide-in-from-bottom-3 duration-200 ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-700 text-emerald-200'
              : 'bg-red-950/90 border-red-700 text-red-200'
          }`}>
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span className="text-xs font-mono font-medium">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 hover:opacity-75">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5 border-gray-200 dark:border-charcoal-800">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-industrial-orange/15 text-industrial-orange border border-industrial-orange/30">
                <Shield className="w-3.5 h-3.5" />
                Security & RBAC Administration
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                isDark ? 'bg-charcoal-800 border-charcoal-700 text-charcoal-400' : 'bg-gray-100 border-gray-200 text-gray-600'
              }`}>
                ISO/IEC 17025 Compliant
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-heading tracking-tight text-charcoal-900 dark:text-white">
              Enterprise User Management
            </h1>
            <p className="text-xs lg:text-sm text-gray-500 dark:text-charcoal-400 mt-1 font-sans">
              Manage authorized refractory laboratory staff, assign Procedure R-01 technical roles, and control sign-off clearances.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={isLoading}
              className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all ${
                isDark 
                  ? 'bg-charcoal-800 border-charcoal-700 text-charcoal-300 hover:text-white hover:bg-charcoal-700' 
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-xs'
              }`}
              title="Refresh personnel list"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={() => navigate('/lims/admin/users/new')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-industrial-orange hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all shadow-md shadow-industrial-orange/20 active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create New User</span>
            </button>
          </div>
        </div>

        {/* Top Operational Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className={`p-4 rounded-xl border transition-all ${
            isDark ? 'bg-charcoal-900/60 border-charcoal-800' : 'bg-white border-gray-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-gray-500 dark:text-charcoal-400">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Total Users</span>
              <Users className="w-4 h-4 text-industrial-teal" />
            </div>
            <div className="text-2xl font-black font-mono mt-2 text-charcoal-900 dark:text-white">
              {totalCount}
            </div>
            <span className="text-[10px] text-gray-400 font-mono">Enrolled accounts</span>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${
            isDark ? 'bg-charcoal-900/60 border-charcoal-800' : 'bg-white border-gray-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-gray-500 dark:text-charcoal-400">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Active Users</span>
              <UserCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black font-mono mt-2 text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              {activeCount}
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-[10px] text-gray-400 font-mono">Active login credentials</span>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${
            isDark ? 'bg-charcoal-900/60 border-charcoal-800' : 'bg-white border-gray-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-gray-500 dark:text-charcoal-400">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Inactive Users</span>
              <UserX className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-2xl font-black font-mono mt-2 text-red-600 dark:text-red-400">
              {inactiveCount}
            </div>
            <span className="text-[10px] text-gray-400 font-mono">Deactivated access</span>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${
            isDark ? 'bg-charcoal-900/60 border-charcoal-800' : 'bg-white border-gray-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-gray-500 dark:text-charcoal-400">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">CRC Approvers</span>
              <ShieldCheck className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black font-mono mt-2 text-amber-600 dark:text-amber-400">
              {approversCount}
            </div>
            <span className="text-[10px] text-gray-400 font-mono">ISO/IEC 17025 certified</span>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${
            isDark ? 'bg-charcoal-900/60 border-charcoal-800' : 'bg-white border-gray-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-gray-500 dark:text-charcoal-400">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">No Memberships</span>
              <AlertCircle className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-2xl font-black font-mono mt-2 text-orange-600 dark:text-orange-400">
              {noMembershipCount}
            </div>
            <span className="text-[10px] text-gray-400 font-mono">Awaiting facility assignment</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className={`p-3.5 rounded-xl border flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between ${
          isDark ? 'bg-charcoal-900/60 border-charcoal-800' : 'bg-white border-gray-200 shadow-xs'
        }`}>
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or job title..."
              className={`w-full pl-9 pr-3 py-2 rounded-lg text-xs font-mono border focus:outline-none focus:ring-1 focus:ring-industrial-orange transition-all ${
                isDark 
                  ? 'bg-charcoal-950 border-charcoal-700 text-white placeholder-charcoal-500' 
                  : 'bg-gray-50 border-gray-200 text-charcoal-900 placeholder-gray-400'
              }`}
            />
          </div>

          {/* Filters Row */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 md:pb-0">
            {/* Role Filter */}
            <div className="flex items-center gap-1.5 shrink-0">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={selectedRoleFilter}
                onChange={e => setSelectedRoleFilter(e.target.value)}
                className={`py-2 px-2.5 rounded-lg text-xs font-mono border focus:outline-none focus:ring-1 focus:ring-industrial-orange ${
                  isDark 
                    ? 'bg-charcoal-950 border-charcoal-700 text-white' 
                    : 'bg-gray-50 border-gray-200 text-charcoal-900'
                }`}
              >
                <option value="ALL">All Security Roles</option>
                {roles.map(r => (
                  <option key={r.id} value={r.role_type}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatusFilter}
              onChange={e => setSelectedStatusFilter(e.target.value)}
              className={`py-2 px-2.5 rounded-lg text-xs font-mono border focus:outline-none focus:ring-1 focus:ring-industrial-orange shrink-0 ${
                isDark 
                  ? 'bg-charcoal-950 border-charcoal-700 text-white' 
                  : 'bg-gray-50 border-gray-200 text-charcoal-900'
              }`}
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active Personnel</option>
              <option value="INACTIVE">Inactive Personnel</option>
            </select>
          </div>
        </div>

        {/* User Directory Table */}
        <div className={`rounded-xl border overflow-hidden transition-all ${
          isDark ? 'bg-charcoal-900/60 border-charcoal-800' : 'bg-white border-gray-200 shadow-xs'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`border-b text-[10px] font-mono font-bold uppercase tracking-wider ${
                  isDark ? 'border-charcoal-800 bg-charcoal-950/70 text-charcoal-400' : 'border-gray-200 bg-gray-50 text-gray-500'
                }`}>
                  <th className="py-3 px-4">Personnel & Contact</th>
                  <th className="py-3 px-4">Title & Contact</th>
                  <th className="py-3 px-4">Security Role (RBAC)</th>
                  <th className="py-3 px-4">Facility / Testing Bay</th>
                  <th className="py-3 px-4">Key Clearances</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-charcoal-800/80 text-xs font-mono">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-400 font-mono">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-industrial-orange" />
                      Loading laboratory personnel directory...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-400 font-mono">
                      No personnel matching your criteria were found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(u => {
                    const primaryRole = u.primary_role;
                    const primaryFacility = u.primary_facility;
                    const isSelf = currentUser?.id === u.id;

                    return (
                      <tr 
                        key={u.id}
                        className={`transition-colors ${
                          isDark ? 'hover:bg-charcoal-800/40' : 'hover:bg-gray-50/80'
                        }`}
                      >
                        {/* Name & Email */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-industrial-orange/20 border border-industrial-orange/30 text-industrial-orange flex items-center justify-center font-bold text-xs shrink-0">
                              {u.first_name?.[0] || 'U'}{u.last_name?.[0] || ''}
                            </div>
                            <div>
                              <div className="font-sans font-bold text-charcoal-900 dark:text-white flex items-center gap-1.5">
                                <span>{u.first_name} {u.last_name}</span>
                                {isSelf && (
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-industrial-teal/20 text-industrial-teal border border-industrial-teal/30">
                                    You
                                  </span>
                                )}
                                {u.is_superuser && (
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                                    Root
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-gray-500 dark:text-charcoal-400 flex items-center gap-1 mt-0.5">
                                <Mail className="w-3 h-3 text-gray-400 shrink-0" />
                                <span>{u.email}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Title & Phone */}
                        <td className="py-3.5 px-4 text-gray-600 dark:text-charcoal-300">
                          <div className="font-sans font-medium text-xs text-charcoal-800 dark:text-charcoal-200">
                            {u.job_title || 'Refractory Operator'}
                          </div>
                          {u.phone_number && (
                            <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3" />
                              <span>{u.phone_number}</span>
                            </div>
                          )}
                        </td>

                        {/* Security Role Badge */}
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border ${getRoleBadgeStyle(primaryRole?.role_type)}`}>
                            <Shield className="w-3 h-3" />
                            {primaryRole?.name || 'No Assigned Role'}
                          </span>
                          {u.memberships.length > 1 && (
                            <div className="text-[10px] text-gray-400 mt-1">
                              +{u.memberships.length - 1} secondary role{u.memberships.length > 2 ? 's' : ''}
                            </div>
                          )}
                        </td>

                        {/* Facility */}
                        <td className="py-3.5 px-4 text-gray-600 dark:text-charcoal-300">
                          <div className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span className="font-sans text-xs">{primaryFacility?.name || 'Danieli Corus IJmuiden'}</span>
                          </div>
                          {primaryFacility?.code && (
                            <span className="text-[10px] text-gray-400 ml-5 block font-mono">
                              Code: {primaryFacility.code}
                            </span>
                          )}
                        </td>

                        {/* Clearances */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            {primaryRole?.can_sign_certificates && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                                Sign CRC
                              </span>
                            )}
                            {primaryRole?.can_verify_results && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                                QA Verify
                              </span>
                            )}
                            {primaryRole?.can_input_results && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30">
                                Metrology
                              </span>
                            )}
                            {primaryRole?.can_manage_samples && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30">
                                Samples
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 text-center">
                          {u.is_active ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-500/15 text-gray-500 border border-gray-500/30">
                              <XCircle className="w-3 h-3" />
                              Inactive
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => navigate(`/lims/admin/users/${u.id}`)}
                              className={`p-1.5 rounded-lg border transition-colors ${
                                isDark 
                                  ? 'border-charcoal-700 bg-charcoal-800 text-industrial-orange hover:text-white hover:bg-charcoal-700' 
                                  : 'border-gray-200 bg-white text-industrial-orange hover:bg-orange-50 shadow-xs'
                              }`}
                              title="View User Dossier"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => navigate(`/lims/admin/users/${u.id}/edit`)}
                              className={`p-1.5 rounded-lg border transition-colors ${
                                isDark 
                                  ? 'border-charcoal-700 bg-charcoal-800 text-charcoal-300 hover:text-white hover:bg-charcoal-700' 
                                  : 'border-gray-200 bg-white text-gray-600 hover:text-charcoal-900 hover:bg-gray-100 shadow-xs'
                              }`}
                              title="Edit Personnel Profile"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleOpenMemberships(u)}
                              className={`p-1.5 rounded-lg border transition-colors ${
                                isDark 
                                  ? 'border-charcoal-700 bg-charcoal-800 text-charcoal-300 hover:text-white hover:bg-charcoal-700' 
                                  : 'border-gray-200 bg-white text-gray-600 hover:text-charcoal-900 hover:bg-gray-100 shadow-xs'
                              }`}
                              title="Manage Roles & Facilities"
                            >
                              <Shield className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleOpenResetPwd(u)}
                              className={`p-1.5 rounded-lg border transition-colors ${
                                isDark 
                                  ? 'border-charcoal-700 bg-charcoal-800 text-amber-400 hover:bg-amber-950/80 hover:border-amber-700' 
                                  : 'border-gray-200 bg-white text-amber-600 hover:bg-amber-50 shadow-xs'
                              }`}
                              title="Reset Password"
                            >
                              <KeyRound className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= MODAL: REGISTER PERSONNEL ================= */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className={`w-full max-w-lg rounded-2xl border shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto ${
              isDark ? 'bg-charcoal-900 border-charcoal-700 text-white' : 'bg-white border-gray-200 text-charcoal-900'
            }`}>
              <div className="flex items-center justify-between border-b pb-4 mb-5 border-gray-200 dark:border-charcoal-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-industrial-orange/20 text-industrial-orange flex items-center justify-center font-bold">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-lg text-charcoal-900 dark:text-white">
                      Register Laboratory Personnel
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-charcoal-400 font-mono">
                      Provision account and assign ISO/IEC 17025 testing role
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-charcoal-800 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {modalError && (
                <div className="mb-4 p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-200 text-xs font-mono flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                  <span>{modalError}</span>
                </div>
              )}

              <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs font-mono">
                {/* Names */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-gray-600 dark:text-charcoal-300 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={createForm.first_name}
                      onChange={e => setCreateForm(prev => ({ ...prev, first_name: e.target.value }))}
                      placeholder="e.g. Rajiv"
                      className={`w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-industrial-orange focus:outline-none ${
                        isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-gray-600 dark:text-charcoal-300 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={createForm.last_name}
                      onChange={e => setCreateForm(prev => ({ ...prev, last_name: e.target.value }))}
                      placeholder="e.g. Sharma"
                      className={`w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-industrial-orange focus:outline-none ${
                        isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal-900'
                      }`}
                    />
                  </div>
                </div>

                {/* Email & Initial Password */}
                <div>
                  <label className="block text-[11px] uppercase font-bold text-gray-600 dark:text-charcoal-300 mb-1">
                    Corporate Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={createForm.email}
                    onChange={e => setCreateForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="r.sharma@danieli-corus.com"
                    className={`w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-industrial-orange focus:outline-none ${
                      isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-gray-600 dark:text-charcoal-300 mb-1">
                    Initial Secure Password (Min 8 characters) *
                  </label>
                  <div className="relative">
                    <input
                      type={showCreatePassword ? 'text' : 'password'}
                      required
                      minLength={8}
                      value={createForm.password}
                      onChange={e => setCreateForm(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="••••••••••••"
                      className={`w-full pl-3 pr-10 py-2 rounded-lg border focus:ring-1 focus:ring-industrial-orange focus:outline-none ${
                        isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal-900'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCreatePassword(!showCreatePassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                    >
                      {showCreatePassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Title and Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-gray-600 dark:text-charcoal-300 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={createForm.job_title}
                      onChange={e => setCreateForm(prev => ({ ...prev, job_title: e.target.value }))}
                      placeholder="e.g. Senior Testing Specialist"
                      className={`w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-industrial-orange focus:outline-none ${
                        isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-gray-600 dark:text-charcoal-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={createForm.phone_number}
                      onChange={e => setCreateForm(prev => ({ ...prev, phone_number: e.target.value }))}
                      placeholder="+31 251 499022"
                      className={`w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-industrial-orange focus:outline-none ${
                        isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal-900'
                      }`}
                    />
                  </div>
                </div>

                {/* Security Role & Facility Assignment */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-200 dark:border-charcoal-800">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-gray-600 dark:text-charcoal-300 mb-1">
                      Primary Security Role *
                    </label>
                    <select
                      value={createForm.role_type}
                      onChange={e => setCreateForm(prev => ({ ...prev, role_type: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-industrial-orange focus:outline-none ${
                        isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal-900'
                      }`}
                    >
                      {roles.map(r => (
                        <option key={r.id} value={r.role_type}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-gray-600 dark:text-charcoal-300 mb-1">
                      Operating Facility *
                    </label>
                    <select
                      value={createForm.facility_id}
                      onChange={e => setCreateForm(prev => ({ ...prev, facility_id: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-industrial-orange focus:outline-none ${
                        isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal-900'
                      }`}
                    >
                      {facilities.flatMap(org => 
                        org.facilities.map(fac => (
                          <option key={fac.id} value={fac.id}>
                            {fac.name} ({fac.code})
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="create_is_active"
                    checked={createForm.is_active}
                    onChange={e => setCreateForm(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="rounded text-industrial-orange focus:ring-industrial-orange"
                  />
                  <label htmlFor="create_is_active" className="text-xs text-gray-700 dark:text-charcoal-300">
                    Account active immediately upon provisioning
                  </label>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-charcoal-800">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-charcoal-700 text-gray-600 dark:text-charcoal-400 hover:bg-gray-100 dark:hover:bg-charcoal-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-lg bg-industrial-orange hover:bg-orange-600 text-white font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    <span>Confirm Registration</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= MODAL: EDIT PROFILE ================= */}
        {isEditModalOpen && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className={`w-full max-w-md rounded-2xl border shadow-2xl p-6 relative ${
              isDark ? 'bg-charcoal-900 border-charcoal-700 text-white' : 'bg-white border-gray-200 text-charcoal-900'
            }`}>
              <div className="flex items-center justify-between border-b pb-4 mb-5 border-gray-200 dark:border-charcoal-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-industrial-teal/20 text-industrial-teal flex items-center justify-center font-bold">
                    <Edit2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-lg text-charcoal-900 dark:text-white">
                      Edit Personnel Profile
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-charcoal-400 font-mono">
                      {selectedUser.email}
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {modalError && (
                <div className="mb-4 p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-200 text-xs font-mono flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                  <span>{modalError}</span>
                </div>
              )}

              <form onSubmit={handleEditSubmit} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-gray-600 dark:text-charcoal-300 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editForm.first_name}
                      onChange={e => setEditForm(prev => ({ ...prev, first_name: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-industrial-orange focus:outline-none ${
                        isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-gray-600 dark:text-charcoal-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editForm.last_name}
                      onChange={e => setEditForm(prev => ({ ...prev, last_name: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-industrial-orange focus:outline-none ${
                        isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-gray-600 dark:text-charcoal-300 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={editForm.job_title}
                    onChange={e => setEditForm(prev => ({ ...prev, job_title: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-industrial-orange focus:outline-none ${
                      isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-gray-600 dark:text-charcoal-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={editForm.phone_number}
                    onChange={e => setEditForm(prev => ({ ...prev, phone_number: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-industrial-orange focus:outline-none ${
                      isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal-900'
                    }`}
                  />
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-charcoal-800">
                  <div className="flex items-center justify-between p-3 rounded-lg border bg-gray-50 dark:bg-charcoal-950/60 border-gray-200 dark:border-charcoal-800">
                    <div>
                      <span className="block font-bold text-xs text-charcoal-900 dark:text-white">Account Status</span>
                      <span className="text-[10px] text-gray-500 dark:text-charcoal-400">
                        {editForm.is_active ? 'Authorized for active laboratory sessions' : 'Access suspended'}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={editForm.is_active}
                      onChange={e => setEditForm(prev => ({ ...prev, is_active: e.target.checked }))}
                      className="w-4 h-4 rounded text-industrial-orange focus:ring-industrial-orange"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-charcoal-800">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-charcoal-700 text-gray-600 dark:text-charcoal-400 hover:bg-gray-100 dark:hover:bg-charcoal-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-lg bg-industrial-orange hover:bg-orange-600 text-white font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= MODAL: RESET PASSWORD ================= */}
        {isResetPwdModalOpen && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className={`w-full max-w-md rounded-2xl border shadow-2xl p-6 relative ${
              isDark ? 'bg-charcoal-900 border-charcoal-700 text-white' : 'bg-white border-gray-200 text-charcoal-900'
            }`}>
              <div className="flex items-center justify-between border-b pb-4 mb-5 border-gray-200 dark:border-charcoal-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-lg text-charcoal-900 dark:text-white">
                      Admin Password Reset
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-charcoal-400 font-mono">
                      {selectedUser.email}
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsResetPwdModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {modalError && (
                <div className="mb-4 p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-200 text-xs font-mono flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                  <span>{modalError}</span>
                </div>
              )}

              <form onSubmit={handleResetPasswordSubmit} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-gray-600 dark:text-charcoal-300 mb-1">
                    New Secure Password (Min 8 characters) *
                  </label>
                  <div className="relative">
                    <input
                      type={showResetPassword ? 'text' : 'password'}
                      required
                      minLength={8}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className={`w-full pl-3 pr-10 py-2 rounded-lg border focus:ring-1 focus:ring-industrial-orange focus:outline-none ${
                        isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal-900'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowResetPassword(!showResetPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                    >
                      {showResetPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-gray-600 dark:text-charcoal-300 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className={`w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-industrial-orange focus:outline-none ${
                      isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal-900'
                    }`}
                  />
                </div>

                <div className="p-3 rounded-lg border bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300 text-[11px]">
                  Setting a new password immediately invalidates any active sessions for this operator.
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-charcoal-800">
                  <button
                    type="button"
                    onClick={() => setIsResetPwdModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-charcoal-700 text-gray-600 dark:text-charcoal-400 hover:bg-gray-100 dark:hover:bg-charcoal-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
                    <span>Confirm Password Reset</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= MODAL: ROLE & MEMBERSHIP MANAGEMENT ================= */}
        {isMembershipModalOpen && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className={`w-full max-w-xl rounded-2xl border shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto ${
              isDark ? 'bg-charcoal-900 border-charcoal-700 text-white' : 'bg-white border-gray-200 text-charcoal-900'
            }`}>
              <div className="flex items-center justify-between border-b pb-4 mb-5 border-gray-200 dark:border-charcoal-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-lg text-charcoal-900 dark:text-white">
                      RBAC Security Roles & Facilities
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-charcoal-400 font-mono">
                      {selectedUser.first_name} {selectedUser.last_name} ({selectedUser.email})
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsMembershipModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {modalError && (
                <div className="mb-4 p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-200 text-xs font-mono flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                  <span>{modalError}</span>
                </div>
              )}

              {/* Current Memberships List */}
              <div className="space-y-3 mb-6">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-500 dark:text-charcoal-400">
                  Current Assigned Roles & Facilities ({selectedUser.memberships.length})
                </span>

                <div className="space-y-2">
                  {selectedUser.memberships.map(m => (
                    <div 
                      key={m.id}
                      className={`p-3 rounded-lg border flex items-center justify-between ${
                        isDark ? 'bg-charcoal-950/80 border-charcoal-800' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded text-xs font-bold border ${getRoleBadgeStyle(m.role.role_type)}`}>
                          {m.role.name}
                        </span>
                        <div>
                          <div className="text-xs font-medium text-charcoal-900 dark:text-white">
                            {m.facility_name || m.organization_name}
                          </div>
                          <div className="text-[10px] text-gray-400 font-mono">
                            {m.is_primary ? 'Primary Operating Assignment' : 'Secondary Role'}
                          </div>
                        </div>
                      </div>

                      {selectedUser.memberships.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRevokeMembership(m.id)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/60 transition-colors"
                          title="Revoke this role membership"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form to Assign New Role */}
              <form onSubmit={handleAssignMembership} className="border-t pt-4 border-gray-200 dark:border-charcoal-800 space-y-4 text-xs font-mono">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700 dark:text-charcoal-300 block">
                  Assign Additional Role / Facility Scope
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-gray-600 dark:text-charcoal-300 mb-1">
                      Role to Add *
                    </label>
                    <select
                      value={newMembershipRole}
                      onChange={e => setNewMembershipRole(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-industrial-orange focus:outline-none ${
                        isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal-900'
                      }`}
                    >
                      {roles.map(r => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-gray-600 dark:text-charcoal-300 mb-1">
                      Target Facility *
                    </label>
                    <select
                      value={newMembershipFacility}
                      onChange={e => setNewMembershipFacility(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-industrial-orange focus:outline-none ${
                        isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal-900'
                      }`}
                    >
                      {facilities.flatMap(org => 
                        org.facilities.map(fac => (
                          <option key={fac.id} value={fac.id}>
                            {fac.name} ({fac.code})
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="new_is_primary"
                    checked={isPrimaryMembership}
                    onChange={e => setIsPrimaryMembership(e.target.checked)}
                    className="rounded text-industrial-orange focus:ring-industrial-orange"
                  />
                  <label htmlFor="new_is_primary" className="text-xs text-gray-700 dark:text-charcoal-300">
                    Designate this as the operator's primary role
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-charcoal-800">
                  <button
                    type="button"
                    onClick={() => setIsMembershipModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-charcoal-700 text-gray-600 dark:text-charcoal-400 hover:bg-gray-100 dark:hover:bg-charcoal-800"
                  >
                    Done
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-lg bg-industrial-orange hover:bg-orange-600 text-white font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    <span>Assign Role</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </LIMSLayout>
  );
};
