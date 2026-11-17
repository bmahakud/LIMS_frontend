import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Edit2,
  ArrowLeft,
  Mail,
  Phone,
  Briefcase,
  User,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { LIMSLayout } from './LIMSLayout';
import {
  apiClient,
  UserRecord,
  UpdateUserInput,
  ApiError
} from '../../api/client';
import { useTheme } from '../../context/ThemeContext';

export const UserEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  const [user, setUser] = useState<UserRecord | null>(null);
  const [form, setForm] = useState<UpdateUserInput>({
    first_name: '',
    last_name: '',
    job_title: '',
    phone_number: '',
    is_active: true,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        const u = await apiClient.getUser(id);
        setUser(u);
        setForm({
          first_name: u.first_name,
          last_name: u.last_name,
          job_title: u.job_title || '',
          phone_number: u.phone_number || '',
          is_active: u.is_active,
        });
      } catch (err: any) {
        setErrorMsg('Failed to load user profile.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setErrorMsg('');
    setSuccessMsg('');

    if (!form.first_name?.trim() || !form.last_name?.trim()) {
      setErrorMsg('First and last names cannot be blank.');
      return;
    }

    setIsSubmitting(true);
    try {
      const updated = await apiClient.updateUser(id, form);
      setSuccessMsg(`Successfully updated personnel record for ${updated.email}.`);
      setTimeout(() => {
        navigate(`/lims/admin/users/${id}`);
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err instanceof ApiError ? err.message : (err?.message || 'Failed to update user.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <LIMSLayout>
        <div className="flex items-center justify-center p-20 font-mono text-xs text-gray-500">
          Loading user record...
        </div>
      </LIMSLayout>
    );
  }

  return (
    <LIMSLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/lims/admin/users/${id}`)}
            className={`p-2 rounded-lg border font-mono text-xs flex items-center gap-1.5 transition-colors ${
              isDark
                ? 'bg-charcoal-900 border-charcoal-800 text-charcoal-400 hover:text-white'
                : 'bg-white border-gray-200 text-gray-600 hover:text-charcoal-950'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Cancel</span>
          </button>
          <div>
            <h1 className="text-xl font-heading font-black tracking-tight text-charcoal-900 dark:text-white uppercase flex items-center gap-2">
              <Edit2 className="w-5 h-5 text-industrial-orange" />
              Edit Personnel Profile
            </h1>
            <p className="text-xs font-mono text-gray-500 dark:text-charcoal-400">
              {user?.email}
            </p>
          </div>
        </div>

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

        <form
          onSubmit={handleSubmit}
          className={`p-6 rounded-2xl border transition-colors space-y-4 font-mono text-xs ${
            isDark ? 'bg-charcoal-900/60 border-charcoal-800' : 'bg-white border-gray-200 shadow-sm'
          }`}
        >
          <div>
            <label className="block mb-1 text-gray-400 font-semibold">Corporate Email (Immutable)</label>
            <input
              type="email"
              disabled
              value={user?.email || ''}
              className={`w-full px-3 py-2 rounded-lg border opacity-60 cursor-not-allowed ${
                isDark ? 'bg-charcoal-950 border-charcoal-800 text-gray-400' : 'bg-gray-100 border-gray-300'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-400 font-semibold">First Name *</label>
              <input
                type="text"
                required
                value={form.first_name}
                onChange={e => setForm({ ...form, first_name: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border outline-none ${
                  isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300'
                }`}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-400 font-semibold">Last Name *</label>
              <input
                type="text"
                required
                value={form.last_name}
                onChange={e => setForm({ ...form, last_name: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border outline-none ${
                  isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-gray-400 font-semibold">Job Title / Technical Designation</label>
            <input
              type="text"
              value={form.job_title}
              onChange={e => setForm({ ...form, job_title: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border outline-none ${
                isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300'
              }`}
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-400 font-semibold">Phone Number</label>
            <input
              type="tel"
              value={form.phone_number}
              onChange={e => setForm({ ...form, phone_number: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border outline-none ${
                isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300'
              }`}
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-400 font-semibold">Account Status</label>
            <select
              value={form.is_active ? 'ACTIVE' : 'INACTIVE'}
              onChange={e => setForm({ ...form, is_active: e.target.value === 'ACTIVE' })}
              className={`w-full px-3 py-2 rounded-lg border outline-none ${
                isDark ? 'bg-charcoal-950 border-charcoal-700 text-white' : 'bg-gray-50 border-gray-300'
              }`}
            >
              <option value="ACTIVE">Active (Can log in & perform authorized testing)</option>
              <option value="INACTIVE">Deactivated (Access strictly revoked)</option>
            </select>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(`/lims/admin/users/${id}`)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-charcoal-700 text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-industrial-orange hover:bg-orange-600 text-white font-bold transition-colors"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </LIMSLayout>
  );
};
