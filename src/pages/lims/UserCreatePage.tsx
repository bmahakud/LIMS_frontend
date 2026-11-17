import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserPlus,
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Briefcase,
  Shield,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Lock
} from 'lucide-react';
import { LIMSLayout } from './LIMSLayout';
import {
  apiClient,
  RoleInfo,
  OrganizationMeta,
  CreateUserInput,
  ApiError
} from '../../api/client';
import { useTheme } from '../../context/ThemeContext';

export const UserCreatePage: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  const [roles, setRoles] = useState<RoleInfo[]>([]);
  const [organizations, setOrganizations] = useState<OrganizationMeta[]>([]);
  const [selectedOrgId, setSelectedOrgId] = useState<string>('');
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('');
  const [selectedAreaId, setSelectedAreaId] = useState<string>('');

  const [form, setForm] = useState<CreateUserInput>({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    job_title: '',
    phone_number: '',
    role_type: 'LAB_TECHNICIAN',
    is_active: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [approvalJustification, setApprovalJustification] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [rolesData, facData] = await Promise.all([
          apiClient.getRoles(),
          apiClient.getFacilities()
        ]);
        setRoles(rolesData);
        const orgs = facData.organizations || [];
        setOrganizations(orgs);
        if (orgs.length > 0) {
          setSelectedOrgId(orgs[0].id);
          if (orgs[0].facilities.length > 0) {
            setSelectedFacilityId(orgs[0].facilities[0].id);
            if (orgs[0].facilities[0].areas.length > 0) {
              setSelectedAreaId(orgs[0].facilities[0].areas[0].id);
            }
          }
        }
      } catch (err: any) {
        setErrorMsg('Failed to load roles and testing facilities from server.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMeta();
  }, []);

  const activeOrg = organizations.find(o => o.id === selectedOrgId);
  const activeFacilities = activeOrg?.facilities || [];
  const activeFacility = activeFacilities.find(f => f.id === selectedFacilityId);
  const activeAreas = activeFacility?.areas || [];

  const handleOrgChange = (orgId: string) => {
    setSelectedOrgId(orgId);
    const org = organizations.find(o => o.id === orgId);
    if (org && org.facilities.length > 0) {
      setSelectedFacilityId(org.facilities[0].id);
      setSelectedAreaId(org.facilities[0].areas[0]?.id || '');
    } else {
      setSelectedFacilityId('');
      setSelectedAreaId('');
    }
  };

  const handleFacilityChange = (facId: string) => {
    setSelectedFacilityId(facId);
    const fac = activeFacilities.find(f => f.id === facId);
    setSelectedAreaId(fac?.areas[0]?.id || '');
  };

  const isAuthorizedApprover = form.role_type === 'AUTHORIZED_APPROVER';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!form.first_name.trim() || !form.last_name.trim() || !form.email.trim() || !form.password) {
      setErrorMsg('First name, last name, email, and password are required.');
      return;
    }

    if (form.password.length < 10) {
      setErrorMsg('Password must be at least 10 characters long to comply with laboratory security policies.');
      return;
    }

    if (isAuthorizedApprover && (!approvalJustification.trim() || approvalJustification.trim().length < 10)) {
      setErrorMsg('Controlled Delegation: Mandatory ISO/IEC 17025 qualification justification (min 10 characters) required when provisioning an Authorized Approver.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: any = {
        ...form,
        email: form.email.trim().toLowerCase(),
        organization_id: selectedOrgId || undefined,
        facility_id: selectedFacilityId || undefined,
        laboratory_area_id: selectedAreaId || undefined,
        approval_justification: isAuthorizedApprover ? approvalJustification.trim() : undefined,
      };

      const newUser = await apiClient.createUser(payload);
      setSuccessMsg(`Successfully provisioned personnel ${newUser.email} with role ${form.role_type}.`);
      setTimeout(() => {
        navigate(`/lims/admin/users/${newUser.id}`);
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err instanceof ApiError ? err.message : (err?.message || 'Failed to create user.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LIMSLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Breadcrumb / Back */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/lims/admin/users')}
            className={`p-2 rounded-lg border font-mono text-xs flex items-center gap-1.5 transition-colors ${
              isDark
                ? 'bg-charcoal-900 border-charcoal-800 text-charcoal-400 hover:text-white hover:bg-charcoal-800'
                : 'bg-white border-gray-200 text-gray-600 hover:text-charcoal-950 hover:bg-gray-50'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Users</span>
          </button>
          <div>
            <h1 className="text-xl font-heading font-black tracking-tight text-charcoal-900 dark:text-white uppercase flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-industrial-orange" />
              Register New Laboratory Personnel
            </h1>
            <p className="text-xs font-mono text-gray-500 dark:text-charcoal-400">
              Provision user account, establish initial facility scope, and assign verified RBAC role.
            </p>
          </div>
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Main Provisioning Form Card */}
        <form
          onSubmit={handleSubmit}
          className={`p-6 rounded-2xl border transition-colors space-y-6 ${
            isDark ? 'bg-charcoal-900/60 border-charcoal-800' : 'bg-white border-gray-200 shadow-sm'
          }`}
        >
          {/* Section 1: Identity & Profile */}
          <div className="space-y-4">
            <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-industrial-orange flex items-center gap-2">
              <span>01.</span> Identity & Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <label className="block mb-1 text-gray-500 dark:text-charcoal-400 font-semibold">
                  First Name <span className="text-industrial-orange">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.first_name}
                  onChange={e => setForm({ ...form, first_name: e.target.value })}
                  placeholder="e.g. Johannes"
                  className={`w-full px-3 py-2 rounded-lg border outline-none transition-colors ${
                    isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal'
                  }`}
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-500 dark:text-charcoal-400 font-semibold">
                  Last Name <span className="text-industrial-orange">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.last_name}
                  onChange={e => setForm({ ...form, last_name: e.target.value })}
                  placeholder="e.g. van der Meer"
                  className={`w-full px-3 py-2 rounded-lg border outline-none transition-colors ${
                    isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal'
                  }`}
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-500 dark:text-charcoal-400 font-semibold">
                  Corporate Email Address <span className="text-industrial-orange">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="j.vandermeer@danieli-corus.com"
                    className={`w-full pl-9 pr-3 py-2 rounded-lg border outline-none transition-colors ${
                      isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-gray-500 dark:text-charcoal-400 font-semibold">
                  Initial Password <span className="text-industrial-orange">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-gray-400 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={10}
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    placeholder="Minimum 10 characters"
                    className={`w-full pl-9 pr-10 py-2 rounded-lg border outline-none transition-colors ${
                      isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-gray-500 dark:text-charcoal-400 font-semibold">
                  Job Title / Position
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 absolute left-3 top-2.5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={form.job_title}
                    onChange={e => setForm({ ...form, job_title: e.target.value })}
                    placeholder="e.g. Refractory Physical Metrologist"
                    className={`w-full pl-9 pr-3 py-2 rounded-lg border outline-none transition-colors ${
                      isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-gray-500 dark:text-charcoal-400 font-semibold">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-2.5 text-gray-400 pointer-events-none" />
                  <input
                    type="tel"
                    value={form.phone_number}
                    onChange={e => setForm({ ...form, phone_number: e.target.value })}
                    placeholder="+31 251 499111"
                    className={`w-full pl-9 pr-3 py-2 rounded-lg border outline-none transition-colors ${
                      isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className={isDark ? 'border-charcoal-800' : 'border-gray-200'} />

          {/* Section 2: Organization & Testing Facility Scope */}
          <div className="space-y-4">
            <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-industrial-orange flex items-center gap-2">
              <span>02.</span> Enterprise & Testing Facility Scope
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <label className="block mb-1 text-gray-500 dark:text-charcoal-400 font-semibold">
                  Enterprise Organization
                </label>
                <select
                  value={selectedOrgId}
                  onChange={e => handleOrgChange(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border outline-none transition-colors ${
                    isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal'
                  }`}
                >
                  {organizations.map(org => (
                    <option key={org.id} value={org.id}>
                      {org.name} ({org.country})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-gray-500 dark:text-charcoal-400 font-semibold">
                  Testing Facility
                </label>
                <select
                  value={selectedFacilityId}
                  onChange={e => handleFacilityChange(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border outline-none transition-colors ${
                    isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal'
                  }`}
                >
                  {activeFacilities.map(fac => (
                    <option key={fac.id} value={fac.id}>
                      {fac.name} [{fac.code}]
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-gray-500 dark:text-charcoal-400 font-semibold">
                  Laboratory Area (Optional)
                </label>
                <select
                  value={selectedAreaId}
                  onChange={e => setSelectedAreaId(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border outline-none transition-colors ${
                    isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal'
                  }`}
                >
                  <option value="">-- All Areas / None --</option>
                  {activeAreas.map(area => (
                    <option key={area.id} value={area.id}>
                      {area.name} [{area.code}]
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <hr className={isDark ? 'border-charcoal-800' : 'border-gray-200'} />

          {/* Section 3: Security Role & Activation State */}
          <div className="space-y-4">
            <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-industrial-orange flex items-center gap-2">
              <span>03.</span> Security Role & Account Status
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <label className="block mb-1 text-gray-500 dark:text-charcoal-400 font-semibold">
                  Assigned Security Role <span className="text-industrial-orange">*</span>
                </label>
                <select
                  value={form.role_type}
                  onChange={e => setForm({ ...form, role_type: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border outline-none transition-colors ${
                    isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal'
                  }`}
                >
                  {roles.map(r => (
                    <option key={r.id} value={r.role_type}>
                      {r.name} ({r.role_type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-gray-500 dark:text-charcoal-400 font-semibold">
                  Initial Account Status
                </label>
                <select
                  value={form.is_active ? 'ACTIVE' : 'INACTIVE'}
                  onChange={e => setForm({ ...form, is_active: e.target.value === 'ACTIVE' })}
                  className={`w-full px-3 py-2 rounded-lg border outline-none transition-colors ${
                    isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300 text-charcoal'
                  }`}
                >
                  <option value="ACTIVE">Active (Immediate operational login)</option>
                  <option value="INACTIVE">Inactive (Requires subsequent activation)</option>
                </select>
              </div>
            </div>

            {/* Controlled Delegation Justification for Authorized Approver */}
            {isAuthorizedApprover && (
              <div className="p-4 rounded-xl border border-amber-800/80 bg-amber-950/30 text-amber-300 font-mono text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>Controlled Delegation: ISO/IEC 17025 Qualification Justification Required</span>
                </div>
                <p className="text-[11px] text-amber-400/80">
                  Assigning final scientific sign-off authority requires a formal record of technical competence, accreditation compliance, and management justification.
                </p>
                <textarea
                  required
                  rows={3}
                  value={approvalJustification}
                  onChange={e => setApprovalJustification(e.target.value)}
                  placeholder="Record accreditation credentials, technical competence certification, and appointment rationale (min 10 characters)..."
                  className={`w-full p-2.5 rounded-lg border outline-none text-xs ${
                    isDark ? 'bg-charcoal-950 border-amber-700 text-white' : 'bg-white border-amber-300 text-charcoal'
                  }`}
                />
              </div>
            )}
          </div>

          {/* Form Action Controls */}
          <div className="pt-4 flex items-center justify-end gap-3 font-mono text-xs">
            <button
              type="button"
              onClick={() => navigate('/lims/admin/users')}
              className={`px-4 py-2.5 rounded-xl border transition-colors ${
                isDark ? 'border-charcoal-700 text-charcoal-400 hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="px-6 py-2.5 rounded-xl bg-industrial-orange hover:bg-orange-600 text-white font-bold transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isSubmitting ? 'Provisioning...' : 'Provision Laboratory User'}</span>
            </button>
          </div>
        </form>
      </div>
    </LIMSLayout>
  );
};
