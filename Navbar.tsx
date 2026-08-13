import React, { useState } from 'react';
import { Building2, HardHat, ShieldCheck, User, LayoutDashboard, Settings, Menu, X, PlusCircle, Search } from 'lucide-react';
import { PlanTier } from '../types';

interface NavbarProps {
  currentTab: 'home' | 'find-builders' | 'register-builder' | 'builder-dashboard' | 'admin-panel' | 'matched-results';
  setCurrentTab: (tab: 'home' | 'find-builders' | 'register-builder' | 'builder-dashboard' | 'admin-panel' | 'matched-results') => void;
  openHomeownerModal: () => void;
  activeBuilderPlan?: PlanTier;
  activeBuilderName?: string;
  onSelectBuilderPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  openHomeownerModal,
  activeBuilderPlan,
  activeBuilderName,
  onSelectBuilderPortal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-slate-900 text-amber-500 flex items-center justify-center shadow-md group-hover:bg-slate-800 transition-all border border-slate-700">
            <Building2 className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-slate-900 font-serif">Co-Builder</span>
              <span className="bg-amber-500/15 text-amber-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border border-amber-500/30 tracking-wider">
                India
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 tracking-tight leading-none mt-0.5">
              Your Plan. Your Budget. Your Builder.
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
          <button
            onClick={() => setCurrentTab('home')}
            className={`hover:text-amber-600 transition-colors ${currentTab === 'home' ? 'text-amber-600 font-bold' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentTab('find-builders')}
            className={`hover:text-amber-600 transition-colors flex items-center gap-1.5 ${currentTab === 'find-builders' || currentTab === 'matched-results' ? 'text-amber-600 font-bold' : ''}`}
          >
            <Search className="w-4 h-4 text-slate-400" />
            Find Builders
          </button>
          <button
            onClick={() => setCurrentTab('register-builder')}
            className={`hover:text-amber-600 transition-colors flex items-center gap-1.5 ${currentTab === 'register-builder' ? 'text-amber-600 font-bold' : ''}`}
          >
            <HardHat className="w-4 h-4 text-amber-500" />
            Builder Plans & Onboarding
          </button>
        </nav>

        {/* Action CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Homeowner Free Submit Button */}
          <button
            onClick={openHomeownerModal}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-slate-950" />
            Post House Requirement <span className="bg-slate-950 text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">Free</span>
          </button>

          {/* Builder Portal or Dashboard */}
          <button
            onClick={onSelectBuilderPortal}
            className="px-3.5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            {activeBuilderName ? (
              <>
                <LayoutDashboard className="w-4 h-4 text-amber-600" />
                <span>Dashboard ({activeBuilderName.split(' ')[0]})</span>
                {activeBuilderPlan && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                    activeBuilderPlan === 'PRIORITY' ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {activeBuilderPlan}
                  </span>
                )}
              </>
            ) : (
              <>
                <User className="w-4 h-4 text-slate-600" />
                <span>Builder Login</span>
              </>
            )}
          </button>

          {/* Admin Toggle Switch */}
          <button
            onClick={() => setCurrentTab('admin-panel')}
            title="Admin Platform Management"
            className={`p-2.5 rounded-xl border transition-all ${
              currentTab === 'admin-panel' 
                ? 'bg-slate-900 text-white border-slate-900 shadow' 
                : 'bg-white text-slate-500 border-slate-200 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Settings className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={openHomeownerModal}
            className="px-3 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shadow-xs"
          >
            Post Plan Free
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg font-semibold text-slate-800 hover:bg-slate-50"
          >
            Home
          </button>
          <button
            onClick={() => { setCurrentTab('find-builders'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg font-semibold text-slate-800 hover:bg-slate-50 flex items-center justify-between"
          >
            <span>Find Local Builders</span>
            <Search className="w-4 h-4 text-slate-400" />
          </button>
          <button
            onClick={() => { setCurrentTab('register-builder'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg font-semibold text-amber-700 bg-amber-50/70 hover:bg-amber-100/50 flex items-center justify-between"
          >
            <span>Register as a Builder</span>
            <HardHat className="w-4 h-4 text-amber-600" />
          </button>
          <button
            onClick={() => { onSelectBuilderPortal(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg font-semibold text-slate-800 hover:bg-slate-50 flex items-center gap-2 border border-slate-200"
          >
            <User className="w-4 h-4 text-slate-600" />
            <span>Builder Dashboard / Login</span>
          </button>
          <button
            onClick={() => { setCurrentTab('admin-panel'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-2 text-xs"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Admin Platform Panel</span>
          </button>
        </div>
      )}
    </header>
  );
};
