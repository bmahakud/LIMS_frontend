import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole, requireAdmin }) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex flex-col items-center justify-center text-charcoal-400 font-mono text-xs gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-industrial-orange" />
        <span>Verifying Security Clearance...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/concepts/industrial/login" state={{ from: location }} replace />;
  }

  if (requireAdmin) {
    const isSuperAdmin = user?.memberships?.some(
      (m) => m.is_active && m.role.role_type === 'SUPER_ADMIN'
    );
    if (!isSuperAdmin) {
      return (
        <div className="min-h-screen bg-charcoal-950 flex flex-col items-center justify-center p-6 text-center font-mono">
          <div className="p-6 bg-charcoal-900 border border-red-900/60 rounded-xl max-w-md">
            <h2 className="text-red-400 font-bold text-sm uppercase mb-2">Access Restricted</h2>
            <p className="text-xs text-charcoal-400 mb-4">
              Administrative privilege required. Only designated Super Administrators can access user governance.
            </p>
            <a
              href="/lims/dashboard"
              className="inline-block px-4 py-2 bg-charcoal-800 hover:bg-charcoal-700 text-white rounded text-xs"
            >
              Back to Dashboard
            </a>
          </div>
        </div>
      );
    }
  }

  if (requiredRole) {
    const hasRole = user?.memberships?.some(
      (m) => m.is_active && m.role.role_type === requiredRole
    );
    if (!hasRole) {
      return (
        <div className="min-h-screen bg-charcoal-950 flex flex-col items-center justify-center p-6 text-center font-mono">
          <div className="p-6 bg-charcoal-900 border border-red-900/60 rounded-xl max-w-md">
            <h2 className="text-red-400 font-bold text-sm uppercase mb-2">Access Restricted</h2>
            <p className="text-xs text-charcoal-400 mb-4">
              Your account lacks the authorized security clearance ({requiredRole}) to access this laboratory module.
            </p>
            <a
              href="/lims/dashboard"
              className="inline-block px-4 py-2 bg-charcoal-800 hover:bg-charcoal-700 text-white rounded text-xs"
            >
              Back to Dashboard
            </a>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};
