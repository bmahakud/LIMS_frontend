import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Building2,
  ChevronRight,
  Shield,
  Activity,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ApiError } from '../api/client';

export const LabPortalLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState<'password' | 'sso'>('password');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already logged in, provide quick redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/lims/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your laboratory email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await login(email.trim(), password);
      navigate('/lims/dashboard');
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Unable to connect to laboratory authentication server.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col justify-between selection:bg-industrial-orange/30 selection:text-white">
      {/* Top Identity Header */}
      <header className="border-b border-charcoal-800/80 bg-charcoal-900/40 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div
          onClick={() => navigate('/concepts/industrial')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded bg-gradient-to-br from-industrial-orange to-amber-700 flex items-center justify-center font-mono font-black text-white text-sm shadow-lg shadow-industrial-orange/20 group-hover:scale-105 transition-transform">
            DC
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black tracking-wider text-white text-sm flex items-center gap-2">
              DANIELI CORUS
              <span className="text-[10px] font-mono font-normal px-1.5 py-0.5 rounded bg-industrial-orange/20 text-industrial-orange border border-industrial-orange/30">
                LIMS
              </span>
            </span>
            <span className="text-[10px] font-mono text-charcoal-400 uppercase tracking-widest">
              Procedure R-01 Refractory Testing
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate('/concepts/industrial')}
          className="text-xs font-mono text-charcoal-400 hover:text-white transition-colors flex items-center gap-1.5"
        >
          Return to Public Site
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Main Login Interface */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-industrial-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-industrial-teal/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md">
          <div className="bg-charcoal-900/90 border border-charcoal-800 rounded-xl p-8 shadow-2xl backdrop-blur-xl relative">
            {/* Form Title & Subtitle */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-charcoal-800/80 border border-charcoal-700/60 text-charcoal-300 text-xs font-mono mb-3">
                <Shield className="w-3.5 h-3.5 text-industrial-orange" />
                <span>Restricted Laboratory Portal</span>
              </div>
              <h1 className="text-2xl font-bold font-heading text-white tracking-wide">
                Laboratory Access
              </h1>
              <p className="text-xs font-mono text-charcoal-400 mt-1">
                Enter your credentials to manage refractory inspections & certificate sign-offs.
              </p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-6 p-3.5 rounded bg-red-950/60 border border-red-800/80 text-red-200 text-xs font-mono flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Auth Mode Tabs */}
            <div className="flex border-b border-charcoal-800 mb-6 font-mono text-xs">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('password');
                  setErrorMessage(null);
                }}
                className={`flex-1 py-2 text-center transition-colors border-b-2 font-medium ${
                  activeTab === 'password'
                    ? 'border-industrial-orange text-white'
                    : 'border-transparent text-charcoal-500 hover:text-charcoal-300'
                }`}
              >
                Password Authentication
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('sso');
                  setErrorMessage(null);
                }}
                className={`flex-1 py-2 text-center transition-colors border-b-2 font-medium ${
                  activeTab === 'sso'
                    ? 'border-industrial-orange text-white'
                    : 'border-transparent text-charcoal-500 hover:text-charcoal-300'
                }`}
              >
                Enterprise SSO
              </button>
            </div>

            {activeTab === 'password' ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-charcoal-300 mb-1.5 font-semibold">
                    Laboratory Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-charcoal-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="first.last@danieli-corus.com"
                      required
                      autoComplete="email"
                      className="w-full bg-charcoal-950/80 border border-charcoal-700/80 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-charcoal-600 focus:outline-none focus:border-industrial-orange transition-colors font-mono"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-charcoal-300 font-semibold">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-charcoal-500 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      autoComplete="current-password"
                      className="w-full bg-charcoal-950/80 border border-charcoal-700/80 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-charcoal-600 focus:outline-none focus:border-industrial-orange transition-colors font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-charcoal-500 hover:text-charcoal-300 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-charcoal-400 hover:text-charcoal-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded bg-charcoal-950 border-charcoal-700 text-industrial-orange focus:ring-0 focus:ring-offset-0"
                    />
                    <span>Remember terminal</span>
                  </label>

                  <span
                    title="Self-service password resets require system administrator approval for ISO 17025 access compliance."
                    className="text-charcoal-500 hover:text-charcoal-400 cursor-help"
                  >
                    Need assistance?
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 py-2.5 px-4 bg-industrial-orange hover:bg-industrial-orange-dark disabled:bg-charcoal-800 disabled:text-charcoal-600 text-white font-mono text-sm font-semibold rounded-lg shadow-lg shadow-industrial-orange/20 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Session...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Portal</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Enterprise SSO Tab */
              <div className="py-6 text-center space-y-4 font-mono">
                <div className="w-12 h-12 rounded-full bg-charcoal-800/80 border border-charcoal-700 flex items-center justify-center mx-auto text-charcoal-400">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-bold">Enterprise SSO (SAML 2.0 / OIDC)</h3>
                  <p className="text-xs text-charcoal-400 mt-1.5 max-w-xs mx-auto">
                    Centralized Single Sign-On for Danieli Corus corporate accounts and partner steelmakers is configured per site agreement.
                  </p>
                </div>
                <div className="p-3 rounded bg-charcoal-950 border border-charcoal-800 text-charcoal-400 text-xs">
                  Identity Provider link currently managed by IT Systems Administration.
                </div>
              </div>
            )}
          </div>

          {/* Operational Footnote */}
          <div className="mt-6 flex items-center justify-between text-[11px] font-mono text-charcoal-500 px-2">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-industrial-teal" />
              LIMS Server Operational
            </span>
            <span>Procedure R-01 Compliant</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-charcoal-800/80 px-6 py-4 text-center text-xs font-mono text-charcoal-500">
        Danieli Corus B.V. Refractory Testing Laboratory Information System &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};
