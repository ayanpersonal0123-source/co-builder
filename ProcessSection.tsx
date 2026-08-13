import React from 'react';
import { FileText, Search, MessageSquare, ShieldCheck } from 'lucide-react';

export const ProcessSection: React.FC<{ onStartFlow: () => void }> = ({ onStartFlow }) => {
  const steps = [
    {
      num: '01',
      title: 'Tell Us About Your Home',
      desc: 'Submit your location, budget, house plan and specific construction requirements in under 2 minutes.',
      icon: FileText,
      color: 'bg-amber-500/10 text-amber-600 border-amber-500/30'
    },
    {
      num: '02',
      title: 'Find Suitable Builders',
      desc: 'Co-Builder matches your requirements with relevant local builders and verified thekedars.',
      icon: Search,
      color: 'bg-slate-900/10 text-slate-900 border-slate-900/30'
    },
    {
      num: '03',
      title: 'Connect Directly',
      desc: 'Talk directly with matched builders via WhatsApp or phone call and decide whether to work together.',
      icon: MessageSquare,
      color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            How Co-Builder Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-slate-900 tracking-tight">
            3 Simple Steps to Find Your Builder
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            No broker fees, no middleman interference, and completely free for homeowners.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div 
                key={step.num}
                className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between group"
              >
                {/* Step Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${step.color}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black font-serif text-slate-300 group-hover:text-amber-500 transition-colors">
                    {step.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 font-serif">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Subtext indicator */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-amber-600 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>{idx === 0 ? 'Homeowner Request' : idx === 1 ? 'Smart Matching Engine' : 'Direct Call/WhatsApp'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onStartFlow}
            className="px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            Submit Your House Plan Requirements Now
          </button>
        </div>

      </div>
    </section>
  );
};
