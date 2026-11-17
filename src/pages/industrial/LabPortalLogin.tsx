import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Clock, 
  UserCheck, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Fingerprint, 
  Mail, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
  Loader2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ApiError } from '../../api/client';

export const LabPortalLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isOtpMode, setIsOtpMode] = useState(false);

  // If already authenticated, redirect to protected LIMS dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/lims/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your authorized laboratory email and password.');
      return;
    }

    setIsLoading(true);

    try {
      await login(email.trim(), password);
      setLoginSuccess(true);
      setTimeout(() => {
        navigate('/lims/dashboard');
      }, 700);
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Unable to connect to laboratory authentication service. Please verify server connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col lg:flex-row bg-[#11161d] font-sans antialiased">
      {/* ================= LEFT BRAND & VISUAL HERO COLUMN ================= */}
      <div 
        className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-8 xl:p-12 2xl:p-14 bg-cover bg-center overflow-hidden h-full shrink-0"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(10, 16, 26, 0.78) 0%, rgba(13, 22, 35, 0.70) 50%, rgba(9, 14, 23, 0.86) 100%), url('/images/lab-furnace-bg.jpg')`,
        }}
      >
        {/* Subtle Architectural Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '28px 28px'
          }}
        />

        {/* Top Branding Row */}
        <div className="relative z-10 flex items-center justify-between shrink-0">
          <Link to="/concepts/industrial" className="flex items-center gap-3.5 group">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/images/danieli-corus-logo-white.svg" 
                alt="Danieli Corus" 
                className="h-8 xl:h-9 w-auto object-contain transition-transform group-hover:scale-105" 
              />
            </div>

            {/* Separator & LIMS Badge */}
            <div className="flex flex-col border-l border-white/25 pl-3">
              <span className="text-[11px] font-mono font-bold tracking-widest text-industrial-orange uppercase">
                LIMS Portal
              </span>
              <span className="text-[10px] font-mono text-white/60 uppercase tracking-wider">
                Enterprise Gateway
              </span>
            </div>
          </Link>

          {/* Back to Public Web Link */}
          <Link
            to="/concepts/industrial"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white/80 hover:text-white transition-all backdrop-blur-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>
        </div>

        {/* Center Pitch & Typography */}
        <div className="relative z-10 my-auto flex flex-col justify-center max-w-lg py-12">
          {/* Accent Line */}
          <div className="w-10 h-[3px] bg-industrial-orange mb-5 rounded-full shadow-[0_0_12px_rgba(215,93,54,0.6)]" />

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl xl:text-5xl 2xl:text-[52px] leading-[1.12] tracking-tight mb-5 text-white">
            Empowering the <br />
            <span className="italic text-industrial-orange font-normal">Refractory</span> Authority
          </h1>

          {/* Description */}
          <p className="text-sm xl:text-base text-white/80 leading-relaxed font-light max-w-md">
            The comprehensive laboratory operating system engineered specifically for high-temperature refractory characterization, specimen chain-of-custody, and Procedure R-01 quality governance.
          </p>

          {/* Active Standard Callout */}
          <div className="mt-8 flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-md max-w-md">
            <FlaskConical className="w-5 h-5 text-industrial-orange shrink-0" />
            <div className="text-xs">
              <span className="text-white/60 block font-mono text-[10px] uppercase">Active Laboratory Framework</span>
              <span className="text-white font-medium">Procedure R-01 (Doc No. 20210215) & ISO/IEC 17025</span>
            </div>
          </div>
        </div>

        {/* Bottom Security Badges Bar */}
        <div className="relative z-10 flex flex-wrap items-center gap-5 xl:gap-8 pt-6 border-t border-white/15 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-industrial-orange border border-white/10">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Secure Access</p>
              <p className="text-[11px] text-white/60 font-mono">HttpOnly Session Auth</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-industrial-orange border border-white/10">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Session Active</p>
              <p className="text-[11px] text-white/60 font-mono">Real-time DB Sync</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-industrial-orange border border-white/10">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Data Protected</p>
              <p className="text-[11px] text-white/60 font-mono">ISO/IEC 17025 Audit</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT FORM & AUTHENTICATION COLUMN ================= */}
      <div 
        className="w-full lg:w-1/2 bg-[#f8f9fa] flex flex-col items-center justify-between relative p-4 sm:p-6 xl:p-8 h-full overflow-y-auto"
      >
        {/* Ambient Subtle Radial Gradients */}
        <div 
          className="absolute inset-0 opacity-[0.45] pointer-events-none" 
          style={{ background: 'radial-gradient(circle at right top, rgba(215, 93, 54, 0.12) 0%, transparent 45%)' }}
        />
        <div 
          className="absolute inset-0 opacity-[0.35] pointer-events-none" 
          style={{ background: 'radial-gradient(circle at left bottom, rgba(54, 119, 134, 0.12) 0%, transparent 45%)' }}
        />

        {/* Mobile Header Bar (Only visible on small screens) */}
        <div className="w-full lg:hidden flex items-center justify-between py-2 shrink-0 relative z-10 border-b border-gray-200/80 mb-4">
          <Link to="/concepts/industrial" className="flex items-center gap-2.5">
            <img src="/images/danieli-corus-logo.svg" alt="Danieli Corus" className="h-6 w-auto" />
            <span className="text-[10px] font-mono font-bold text-industrial-orange uppercase">LIMS Portal</span>
          </Link>
          <Link to="/concepts/industrial" className="text-xs text-charcoal-600 hover:text-industrial-orange font-medium flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>
        </div>

        {/* Centered Floating Login Card */}
        <div className="relative z-10 w-full max-w-[490px] xl:max-w-[530px] bg-white rounded-[24px] p-6 sm:p-8 xl:p-9 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 my-auto shrink max-h-[calc(100vh-48px)] overflow-y-auto">
          {/* Card Top Icon & Title */}
          <div className="flex flex-col items-center text-center mb-5 sm:mb-6">
            <div className="w-11 h-11 bg-[#faf7f2] border border-[#f2e8d5] rounded-full flex items-center justify-center mb-3 text-industrial-orange shadow-sm">
              <Lock className="w-5 h-5 text-industrial-orange" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal mb-1 tracking-tight font-medium">
              Welcome back
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Sign in to access your Danieli Corus LIMS portal
            </p>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success State Indicator */}
          {loginSuccess && (
            <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs font-semibold text-emerald-800 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Identity verified. Connecting to LIMS session...</span>
            </div>
          )}

          {/* Form Mode 1: Real Email + Password */}
          {!isOtpMode ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input Field */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5 text-left">
                  Email or Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@danieli-corus.com"
                    required
                    autoComplete="email"
                    className="w-full h-11 pl-10 pr-4 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-charcoal placeholder-gray-400 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Password Input Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-charcoal text-left">
                    Password
                  </label>
                  <span
                    title="Self-service reset is managed through your facility administrator per ISO 17025 security policy."
                    className="text-xs font-medium text-gray-400 hover:text-charcoal transition-colors cursor-help"
                  >
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    autoComplete="current-password"
                    className="w-full h-11 pl-10 pr-10 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-charcoal placeholder-gray-400 focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal transition-all shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-charcoal transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Primary Sign In Button */}
              <button
                type="submit"
                disabled={isLoading || loginSuccess}
                className="w-full h-11 mt-2 bg-charcoal hover:bg-[#1a202c] active:scale-[0.99] text-white font-medium rounded-xl text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in to Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Mode 2: Enterprise SSO / SAML Informational View */
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#faf7f2] border border-[#f2e8d5] flex items-center justify-center mx-auto text-industrial-orange">
                <Fingerprint className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-charcoal font-semibold text-sm">Enterprise SSO (SAML 2.0 / OIDC)</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto leading-relaxed">
                  Single Sign-On for Danieli Corus corporate accounts and partner steelmaker entities is configured per relining contract.
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-600 text-xs">
                To link your corporate identity provider, contact Danieli Corus IT Systems Administration.
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200/80" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-widest text-gray-400">
              <span className="bg-white px-3 font-semibold">OR</span>
            </div>
          </div>

          {/* Secondary Button: Sign in with OTP / Danieli Enterprise SSO */}
          <button
            type="button"
            onClick={() => setIsOtpMode(!isOtpMode)}
            className="w-full h-[42px] bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-charcoal transition-all hover:bg-gray-50 flex items-center justify-center gap-2 mb-4 shadow-sm"
          >
            <Fingerprint className="w-4 h-4 text-industrial-orange" />
            <span>{isOtpMode ? 'Sign in with Password' : 'Sign in with Danieli Enterprise SSO'}</span>
          </button>

          {/* Workstation Checkbox */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 text-industrial-orange border-gray-300 rounded focus:ring-industrial-orange cursor-pointer"
              />
              <span className="text-xs text-gray-600 font-medium">Remember this workstation</span>
            </label>

            <span className="text-xs text-gray-400 font-mono">
              Procedure R-01
            </span>
          </div>

          {/* Security & Governance Notice Box */}
          <div className="bg-[#f8f9fa] rounded-xl p-3.5 flex gap-2.5 items-start border border-gray-200/70 text-left">
            <ShieldCheck className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed font-light">
              Protected by ISO/IEC 17025 standard laboratory access control. All access sessions are audited under <strong>Procedure R-01</strong> governance.
            </p>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="text-[11px] sm:text-xs font-medium text-gray-400 py-2 text-center shrink-0">
          &copy; {new Date().getFullYear()} Danieli Corus Refractory Testing Laboratory. All rights reserved.
        </div>
      </div>
    </div>
  );
};
