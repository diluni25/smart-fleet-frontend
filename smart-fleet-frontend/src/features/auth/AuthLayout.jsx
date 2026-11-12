import React, { useState } from 'react';
import { Mail, Lock, User, MapPin, Eye, EyeOff, AlertCircle, ArrowRight, ArrowLeft, Truck } from 'lucide-react';

export default function AuthLayout() {
  const [currentView, setCurrentView] = useState('signin'); // 'signin' | 'signup' | 'forgot' | 'reset'
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [email, setEmail] = useState('operator@logiroute.com');
  const [password, setPassword] = useState('••••••••••••');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 font-sans text-slate-800">
      
      {/* Auth Card Container */}
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 relative overflow-hidden">
        
        {/* Logo & Brand Name */}
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-11 h-11 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 tracking-wide text-sm">LOGIROUTE</h1>
            <p className="text-[10px] font-bold text-emerald-600 tracking-wider">FLEET OPS</p>
          </div>
        </div>

        {/*  1. SIGN IN VIEW (First Screen) */}
        {currentView === 'signin' && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Sign in to your account</h2>
            </div>

            {/* Error Alert Box */}
            {showError && (
              <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-rose-900">Authentication Alert</h4>
                  <p className="text-[11px] text-rose-700 mt-0.5">Invalid credentials. 2 attempts remaining before security lockout.</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600 transition-all font-medium text-slate-700"
                    placeholder="operator@logiroute.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  <button onClick={() => { setCurrentView('forgot'); setShowError(false); }} className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600 transition-all font-medium text-slate-700"
                  />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button 
                onClick={() => setShowError(true)}
                className="w-full mt-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center mt-6">
                <p className="text-xs text-slate-500">
                  Don't have an operator account?{' '}
                  <button onClick={() => { setCurrentView('signup'); setShowError(false); }} className="font-bold text-emerald-600 hover:underline cursor-pointer">
                    Contact your Fleet Admin or Sign Up
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. SIGN UP VIEW */}
        {currentView === 'signup' && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Create your LogiRoute account</h2>
            </div>

            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">Full Name</label>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Required</span>
                </div>
                <input 
                  type="text" 
                  defaultValue="Marcus Vance"
                  className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600 font-medium text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="marcus@apexlogistics.com"
                  className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600 font-medium text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Store Location</label>
                <input 
                  type="text" 
                  defaultValue="Apex Logistics Global"
                  className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600 font-medium text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Role</label>
                <select className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600 font-medium text-slate-700 cursor-pointer">
                  <option>System Administrator</option>
                  <option>Store Manager</option>
                  <option>Store Employee</option>
                  <option>Driver</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">Create Password</label>
                  <span className="text-xs font-bold text-emerald-600">Strong</span>
                </div>
                <div className="relative">
                  <input 
                    type="password" 
                    defaultValue="Tr@nsport98Secur3!"
                    className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs outline-none font-medium text-slate-700 pr-10"
                  />
                  <Eye className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 cursor-pointer" />
                </div>
                <div className="grid grid-cols-4 gap-1.5 mt-2">
                  <div className="h-1 bg-emerald-500 rounded-full"></div>
                  <div className="h-1 bg-emerald-500 rounded-full"></div>
                  <div className="h-1 bg-emerald-500 rounded-full"></div>
                  <div className="h-1 bg-emerald-500 rounded-full"></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>8+ characters</span>
                  <span>Upper/Lower, Num & Symbol</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer" />
                <span className="text-xs text-slate-600">I agree to the <a href="#" className="font-bold text-emerald-600 hover:underline">Terms of Service</a></span>
              </div>

              <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2">
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center mt-4">
                <p className="text-xs text-slate-500">
                  Already have an account?{' '}
                  <button onClick={() => setCurrentView('signin')} className="font-bold text-emerald-600 hover:underline cursor-pointer">
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. FORGOT PASSWORD VIEW */}
        {currentView === 'forgot' && (
          <div className="text-center py-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight mb-1">Reset your password</h2>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">Enter your registered work email and we will dispatch a secure single-use recovery link.</p>

            <div className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Registered Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input 
                    type="email" 
                    defaultValue="dispatcher@logiroute.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600 font-medium text-slate-700"
                  />
                </div>
              </div>

              <button 
                onClick={() => setCurrentView('reset')}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Send Recovery Link</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-3">
                <button onClick={() => setCurrentView('signin')} className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors cursor-pointer">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Sign In</span>
                </button>
              </div>

              <div className="text-center pt-4">
                <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Need help?</a>
              </div>
            </div>
          </div>
        )}

        {/*4. RESET PASSWORD VIEW */}
        {currentView === 'reset' && (
          <div className="py-2">
            <div className="text-center mb-5">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Set new password</h2>
              <p className="text-xs text-slate-500 mt-1">Create a resilient new password for your LogiRoute fleet console account.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">New Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    defaultValue="••••••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs outline-none font-medium text-slate-700 pr-10"
                  />
                  <Eye className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 cursor-pointer" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Confirm New Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    defaultValue="••••••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs outline-none font-medium text-slate-700 pr-10"
                  />
                  <Eye className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 cursor-pointer" />
                </div>
              </div>

              {/* Security Parameters Box */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>Security Parameters</span>
                  <span className="text-rose-500">Strength: Low</span>
                </div>
                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full border border-slate-300 inline-block"></span>
                    <span>At least 08 characters</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full border border-slate-300 inline-block"></span>
                    <span>One uppercase & one special character</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setCurrentView('signin')}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
              >
                <span>Update Password</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <button onClick={() => setCurrentView('signin')} className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors cursor-pointer">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Sign In</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}