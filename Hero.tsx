import React from 'react';
import { Search, HardHat, ShieldCheck, CheckCircle2, ArrowRight, Building, MapPin, Sparkles, FileText, Lock } from 'lucide-react';

interface HeroProps {
  onFindBuilder: () => void;
  onRegisterBuilder: () => void;
  onQuickSearchCity?: (city: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onFindBuilder, onRegisterBuilder, onQuickSearchCity }) => {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07] pointer-events-none" />
      
      {/* Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-amber-400 text-xs font-semibold tracking-wide shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Free for Homeowners • Zero Commissions</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif text-white tracking-tight leading-[1.12]">
              You Have the Plan.<br />
              <span className="text-amber-500 underline decoration-amber-500/40 underline-offset-8">
                We'll Help You Find
              </span>{' '}
              the Builder.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Find experienced local builders and thekedars who match your home's requirements, budget and timeline.
            </p>

            {/* Main CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onFindBuilder}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-base shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <Search className="w-5 h-5 text-slate-950" />
                <span>Find a Builder</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onRegisterBuilder}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-white font-bold text-base border border-slate-700/80 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <HardHat className="w-5 h-5 text-amber-400" />
                <span>Register as a Builder</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Local Thekedars</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Direct Homeowner Connection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No Hidden Charges</span>
              </div>
            </div>

            {/* City Quick Pills */}
            <div className="pt-2 text-xs text-slate-400 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" /> Popular Cities:
              </span>
              {['Lucknow', 'Jaipur', 'Pune', 'Hyderabad', 'Ahmedabad', 'Delhi NCR'].map((city) => (
                <button
                  key={city}
                  onClick={() => onQuickSearchCity && onQuickSearchCity(city)}
                  className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-amber-500/20 hover:text-amber-300 border border-slate-700/70 text-slate-300 transition-all cursor-pointer"
                >
                  {city}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Interactive Card Stack Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Frame */}
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 opacity-30 blur-lg" />

              <div className="relative bg-slate-800/90 rounded-2xl border border-slate-700 p-6 shadow-2xl space-y-6">
                
                {/* Header inside card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-700/80">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">House Plan Requirement</h3>
                      <p className="text-xs text-slate-400">Homeowner Match Request</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                    100% Free
                  </span>
                </div>

                {/* Sample Requirement Details */}
                <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700/60 space-y-3 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500 font-medium">Location:</span>
                    <span className="font-semibold text-white">Gomti Nagar Extension, Lucknow</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500 font-medium">Plot & Structure:</span>
                    <span className="font-semibold text-white">1,500 sq ft • G+1 Duplex</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500 font-medium">Budget Target:</span>
                    <span className="font-semibold text-amber-400">₹30–40 Lakh (Turnkey)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500 font-medium">House Map Status:</span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> LDA Approved Map Ready
                    </span>
                  </div>
                </div>

                {/* Matching Result Preview */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Matched Builder Quality:</span>
                    <span className="text-amber-400 font-bold">94% Compatibility Match</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-400 h-full w-[94%]" />
                  </div>
                </div>

                {/* Simulated Builder Card */}
                <div className="bg-slate-900 rounded-xl p-3.5 border border-amber-500/30 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120"
                    alt="Rameshwar Sharma"
                    className="w-12 h-12 rounded-lg object-cover border border-slate-700"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-white truncate">Rameshwar Sharma</h4>
                      <span className="bg-amber-500 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase">
                        Priority
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">Sharma Civil & Turnkey Infrastructure</p>
                    <p className="text-[10px] text-amber-400 font-medium">★ 4.9 (28 reviews) • 18 yrs exp</p>
                  </div>
                </div>

                {/* Bottom CTA in card */}
                <button
                  onClick={onFindBuilder}
                  className="w-full py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition-colors cursor-pointer text-center"
                >
                  Submit Your Requirement & See Matching Builders
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
