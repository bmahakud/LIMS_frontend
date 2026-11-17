import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FlaskConical,
  Package,
  FileCheck2,
  ListTodo,
  Layers,
  Settings,
  LogOut,
  ChevronRight,
  Shield,
  Activity,
  PlusCircle,
  Sun,
  Moon,
  FolderKanban,
  Building2,
  FileText,
  Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const LIMSLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, activeMembership, setActiveMembership, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/concepts/industrial/login');
  };

  const isSuperAdmin = user?.memberships?.some(
    (m) => m.is_active && m.role.role_type === 'SUPER_ADMIN'
  );

  const activeRoleType = activeMembership?.role?.role_type;

  // Role-Aware Navigation Filtering
  const navItems = [
    { name: 'Dashboard', path: '/lims/dashboard', icon: Activity, show: true },
    {
      name: 'Sample Registry',
      path: '/lims/samples',
      icon: Package,
      show: ['SUPER_ADMIN', 'FACILITY_MANAGER', 'LAB_MANAGER', 'SAMPLE_CLERK', 'INSPECTOR', 'LAB_TECHNICIAN', 'QA_REVIEWER', 'AUTHORIZED_APPROVER', 'REPORT_COORDINATOR', 'STORAGE_CUSTODIAN'].includes(activeRoleType || '')
    },
    {
      name: 'Register Sample',
      path: '/lims/samples/new',
      icon: PlusCircle,
      show: ['SUPER_ADMIN', 'LAB_MANAGER', 'SAMPLE_CLERK'].includes(activeRoleType || '')
    },
    {
      name: 'Intake Receipt',
      path: '/lims/receipt',
      icon: FileCheck2,
      show: ['SUPER_ADMIN', 'FACILITY_MANAGER', 'LAB_MANAGER', 'SAMPLE_CLERK', 'INSPECTOR'].includes(activeRoleType || '')
    },
    {
      name: 'Projects & Lots',
      path: '/lims/projects',
      icon: FolderKanban,
      show: ['SUPER_ADMIN', 'FACILITY_MANAGER', 'LAB_MANAGER', 'REPORT_COORDINATOR'].includes(activeRoleType || '')
    },
    {
      name: 'Vendor Registry',
      path: '/lims/vendors',
      icon: Building2,
      show: ['SUPER_ADMIN', 'FACILITY_MANAGER', 'LAB_MANAGER'].includes(activeRoleType || '')
    },
    {
      name: 'Test Checklist',
      path: '/lims/tests',
      icon: FlaskConical,
      show: ['SUPER_ADMIN', 'LAB_MANAGER', 'LAB_TECHNICIAN', 'QA_REVIEWER'].includes(activeRoleType || '')
    },
    {
      name: 'Work Orders',
      path: '/lims/work-orders',
      icon: ListTodo,
      show: ['SUPER_ADMIN', 'FACILITY_MANAGER', 'LAB_MANAGER', 'LAB_TECHNICIAN', 'QA_REVIEWER'].includes(activeRoleType || '')
    },
    {
      name: 'CRC Certificates',
      path: '/lims/reports',
      icon: FileText,
      show: ['SUPER_ADMIN', 'FACILITY_MANAGER', 'LAB_MANAGER', 'QA_REVIEWER', 'AUTHORIZED_APPROVER', 'REPORT_COORDINATOR'].includes(activeRoleType || '')
    },
    {
      name: 'User Management',
      path: '/lims/admin/users',
      icon: Users,
      show: isSuperAdmin
    },
  ].filter(item => item.show);

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDark ? 'bg-charcoal-950 text-white' : 'bg-[#F9FAFB] text-charcoal'
    }`}>
      {/* Top Header */}
      <header className={`border-b px-6 py-3 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md transition-colors ${
        isDark 
          ? 'border-charcoal-800 bg-charcoal-900/95 text-white' 
          : 'border-gray-200 bg-white/95 text-charcoal shadow-sm'
      }`}>
        <div className="flex items-center gap-4">
          <div
            onClick={() => navigate('/lims/dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex items-center">
              <img 
                src="/images/danieli-corus-logo.svg" 
                alt="Danieli Corus" 
                className={`h-7 w-auto object-contain transition-all duration-200 ${
                  isDark ? 'brightness-0 invert' : 'brightness-100'
                }`}
              />
            </div>
            <div className="border-l pl-3 flex items-center gap-2 border-gray-300 dark:border-charcoal-700">
              <span className="font-heading font-black tracking-wider text-xs sm:text-sm uppercase text-charcoal dark:text-white">
                LIMS Portal
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-industrial-orange/15 text-industrial-orange border border-industrial-orange/30">
                Procedure R-01
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 font-medium transition-all ${
              isDark 
                ? 'bg-charcoal-800 border-charcoal-700 text-amber-300 hover:bg-charcoal-700' 
                : 'bg-gray-100 border-gray-200 text-charcoal-700 hover:bg-gray-200'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle visual theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-charcoal-600" />}
            <span className="hidden sm:inline font-mono text-[11px]">{isDark ? 'Light' : 'Dark'}</span>
          </button>

          {/* Multi-membership Role / Facility Context Selector */}
          {user && user.memberships && user.memberships.length > 1 && (
            <div className="hidden lg:flex items-center gap-1.5 font-mono text-xs">
              <span className="text-[10px] text-gray-400">Context:</span>
              <select
                value={activeMembership?.id || ''}
                onChange={(e) => {
                  const selected = user.memberships.find(m => m.id === e.target.value);
                  if (selected) setActiveMembership(selected);
                }}
                className={`py-1 px-2 rounded-lg border text-[11px] font-mono outline-none ${
                  isDark ? 'bg-charcoal-800 border-charcoal-700 text-white' : 'bg-gray-100 border-gray-300 text-charcoal'
                }`}
              >
                {user.memberships.filter(m => m.is_active).map(m => (
                  <option key={m.id} value={m.id}>
                    {m.role.name} @ {m.facility_name || 'Primary Plant'}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* User Identity Info */}
          <div className="hidden md:flex flex-col text-right font-mono text-xs">
            <span className="font-bold text-charcoal-900 dark:text-white">{user?.first_name} {user?.last_name}</span>
            <span className="text-[10px] text-industrial-orange font-semibold uppercase">
              {activeMembership?.role?.name || user?.memberships?.[0]?.role?.name || 'No Role Assigned'}
            </span>
            {activeMembership?.facility_name && (
              <span className="text-[9px] text-gray-400">
                {activeMembership.facility_name}
              </span>
            )}
          </div>

          <button
            onClick={() => navigate('/concepts/industrial')}
            className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${
              isDark
                ? 'text-charcoal-300 hover:text-white border-charcoal-700 bg-charcoal-800/80 hover:bg-charcoal-700'
                : 'text-charcoal-700 hover:text-charcoal-950 border-gray-300 bg-white hover:bg-gray-50 shadow-sm'
            }`}
          >
            Public Site
          </button>

          <button
            onClick={handleLogout}
            className={`p-1.5 rounded-lg border transition-colors ${
              isDark
                ? 'bg-charcoal-800 hover:bg-red-950/80 border-charcoal-700 hover:border-red-800/80 text-charcoal-400 hover:text-red-300'
                : 'bg-white hover:bg-red-50 border-gray-200 hover:border-red-200 text-gray-500 hover:text-red-600 shadow-sm'
            }`}
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main App Container */}
      <div className="flex-1 flex">
        {/* Left Side Navigation Sidebar */}
        <aside className={`w-64 border-r p-4 hidden md:flex flex-col justify-between shrink-0 transition-colors ${
          isDark 
            ? 'border-charcoal-800 bg-charcoal-900/40 text-white' 
            : 'border-gray-200 bg-white text-charcoal-800'
        }`}>
          <div className="space-y-1 font-mono text-xs">
            <div className={`text-[10px] uppercase font-bold px-3 py-2 tracking-wider ${
              isDark ? 'text-charcoal-500' : 'text-gray-400'
            }`}>
              Operational Directory
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/lims/dashboard' || item.path === '/lims/samples'}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? isDark
                          ? 'bg-industrial-orange/20 text-industrial-orange border border-industrial-orange/30 font-semibold'
                          : 'bg-industrial-orange/10 text-industrial-orange border border-industrial-orange/25 font-bold shadow-xs'
                        : isDark
                          ? 'text-charcoal-400 hover:bg-charcoal-800/80 hover:text-white'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-charcoal-900'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Environmental / Compliance Footer Card */}
          <div className={`p-3.5 rounded-xl border font-mono text-[11px] space-y-1 ${
            isDark 
              ? 'bg-charcoal-950/80 border-charcoal-800 text-charcoal-400' 
              : 'bg-gray-50 border-gray-200 text-gray-600'
          }`}>
            <div className="flex items-center gap-1.5 text-industrial-teal font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>ISO/IEC 17025 Ready</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-tight">
              Sample genealogy & custody logged to PostgreSQL immutable audit trail.
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
