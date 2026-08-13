import React from 'react';
import { HardHat, Check, Award, ArrowRight, ShieldCheck } from 'lucide-react';

interface BuilderCalloutProps {
  onRegisterClick: () => void;
}

export const BuilderCallout: React.FC<BuilderCalloutProps> = ({ onRegisterClick }) => {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Construction Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-slate-800/90 rounded-3xl border border-slate-700/80 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold border border-amber-500/30">
                <HardHat className="w-3.5 h-3.5" />
                <span>For Local Builders, Contractors & Thekedars</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black font-serif text-white tracking-tight">
                Looking for Construction Work?
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Get your builder profile in front of homeowners actively looking to build. Receive direct homeowner connections with house plans, plot sizes and verified budgets in your city.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 text-xs font-medium text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Showcase your past house projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Verified phone & location matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Receive direct WhatsApp enquiries</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>No commission percentage charged per project</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onRegisterClick}
                  className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-base shadow-lg shadow-amber-500/20 transition-all inline-flex items-center gap-2.5 cursor-pointer group"
                >
                  <span>Become a Co-Builder</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Column: Pricing Plans Preview */}
            <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4">
              
              {/* Starter Card Preview */}
              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-700 space-y-4">
                <div>
                  <h3 className="text-xs font-bold uppercase text-slate-400">Starter Plan</h3>
                  <div className="text-2xl font-black font-serif text-white mt-1">₹2,000</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Basic builder visibility</p>
                </div>
                <ul className="text-xs space-y-2 text-slate-300">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400" /> Professional profile</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400" /> Basic lead access</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400" /> WhatsApp & call options</li>
                </ul>
              </div>

              {/* Priority Card Preview */}
              <div className="bg-gradient-to-b from-amber-500/10 to-slate-900 rounded-2xl p-5 border-2 border-amber-500 relative space-y-4">
                <span className="absolute -top-3 right-3 bg-amber-500 text-slate-950 font-black text-[9px] uppercase px-2 py-0.5 rounded-full shadow-xs">
                  MOST POPULAR
                </span>
                <div>
                  <h3 className="text-xs font-bold uppercase text-amber-400">Priority Plan</h3>
                  <div className="text-2xl font-black font-serif text-white mt-1">₹4,000</div>
                  <p className="text-[11px] text-amber-200/80 mt-0.5">Priority leads & featured badge</p>
                </div>
                <ul className="text-xs space-y-2 text-slate-200">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400" /> Everything in Starter</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400" /> Priority lead matching</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400" /> Featured builder badge</li>
                </ul>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
