import React from 'react';
import { Building2, ShieldCheck, HardHat, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onFindBuilder: () => void;
  onRegisterBuilder: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onFindBuilder,
  onRegisterBuilder,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black font-serif text-white tracking-tight">Co-Builder</span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Your Plan. Your Budget. Your Builder. Co-Builder connects homeowners who want to construct a house with local thekedars and civil builders who execute the construction.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Free for Homeowners • Zero Commission</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">For Homeowners</h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <button onClick={onFindBuilder} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Submit House Requirement
                </button>
              </li>
              <li>
                <button onClick={onFindBuilder} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Search Local Builders
                </button>
              </li>
              <li>
                <span className="text-slate-500">How Matching Works</span>
              </li>
              <li>
                <span className="text-slate-500">Frequently Asked Questions</span>
              </li>
            </ul>
          </div>

          {/* Builder Links */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">For Builders & Contractors</h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <button onClick={onRegisterBuilder} className="hover:text-amber-400 transition-colors cursor-pointer text-amber-400 font-bold">
                  Register as a Builder (Starter ₹2,000 / Priority ₹4,000)
                </button>
              </li>
              <li>
                <button onClick={onRegisterBuilder} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Builder Onboarding Questionnaire
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-amber-400 transition-colors cursor-pointer text-slate-500">
                  Platform Admin Panel
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer Box */}
        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 text-xs text-slate-400 space-y-2">
          <h5 className="font-bold text-amber-400 uppercase text-[10px] tracking-wider">
            Important Business Disclaimer & Platform Terms
          </h5>
          <p className="leading-relaxed">
            Co-Builder is a discovery and connection platform. Co-Builder helps homeowners discover and connect with builders. Construction agreements, pricing, timelines, payments, quality and execution are decided directly between the homeowner and builder. Co-Builder does not take commission per project and is not a party to the construction agreement.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Co-Builder Construction Marketplace India. All rights reserved.
          </div>
          <div className="flex gap-4">
            <span>Trust</span>
            <span>•</span>
            <span>Local Expertise</span>
            <span>•</span>
            <span>Transparency</span>
            <span>•</span>
            <span>Connection</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
