import React, { useState } from 'react';
import { BuilderProfile } from '../types';
import { 
  X, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Award, 
  Calendar, 
  Building2, 
  Users, 
  Clock, 
  DollarSign, 
  FileText, 
  ShieldCheck, 
  Phone, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface BuilderDetailModalProps {
  builder: BuilderProfile;
  onClose: () => void;
  onRequestConnect: (builder: BuilderProfile) => void;
}

export const BuilderDetailModal: React.FC<BuilderDetailModalProps> = ({
  builder,
  onClose,
  onRequestConnect,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'pricing' | 'portfolio'>('overview');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 border border-slate-200 shadow-2xl relative my-8">
        
        {/* Header */}
        <div className="flex justify-between items-start pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <img
              src={builder.profilePhoto}
              alt={builder.fullName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black font-serif text-slate-900">{builder.fullName}</h2>
                {builder.plan === 'PRIORITY' && (
                  <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Award className="w-3 h-3" /> Priority Builder
                  </span>
                )}
              </div>
              <p className="text-xs font-bold text-slate-600">{builder.businessName}</p>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" /> {builder.city} • {builder.areasServed?.join(', ')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 text-xs font-bold text-slate-600 gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 transition-all cursor-pointer ${activeTab === 'overview' ? 'border-b-2 border-amber-500 text-amber-600 font-extrabold' : 'hover:text-slate-900'}`}
          >
            Overview & Specialities
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`pb-3 transition-all cursor-pointer ${activeTab === 'experience' ? 'border-b-2 border-amber-500 text-amber-600 font-extrabold' : 'hover:text-slate-900'}`}
          >
            Experience & Capability
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`pb-3 transition-all cursor-pointer ${activeTab === 'pricing' ? 'border-b-2 border-amber-500 text-amber-600 font-extrabold' : 'hover:text-slate-900'}`}
          >
            Budget & Pricing
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`pb-3 transition-all cursor-pointer ${activeTab === 'portfolio' ? 'border-b-2 border-amber-500 text-amber-600 font-extrabold' : 'hover:text-slate-900'}`}
          >
            House Portfolio ({builder.portfolio?.length || 0})
          </button>
        </div>

        {/* TAB CONTENTS */}
        <div className="space-y-6 text-xs text-slate-700">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Years Experience</span>
                  <p className="text-sm font-bold text-slate-900">{builder.yearsInConstruction}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Houses Completed</span>
                  <p className="text-sm font-bold text-slate-900">{builder.housesCompleted}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Contractor Type</span>
                  <p className="text-sm font-bold text-slate-900">{builder.contractorType}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Rating</span>
                  <p className="text-sm font-bold text-amber-600 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {builder.rating.toFixed(1)} ({builder.reviewCount})
                  </p>
                </div>
              </div>

              {/* What makes different */}
              {builder.whatMakesDifferent && (
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-900 text-sm font-serif">What Makes Our Work Different</h3>
                  <p className="leading-relaxed bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/70 text-slate-800">
                    "{builder.whatMakesDifferent}"
                  </p>
                </div>
              )}

              {/* Always promised */}
              {builder.alwaysPromised && (
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-900 text-sm font-serif">Our Promise to Homeowners</h3>
                  <p className="leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-800 font-medium">
                    "{builder.alwaysPromised}"
                  </p>
                </div>
              )}

              {/* Story */}
              {builder.storyHowStarted && (
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-900 text-sm font-serif">How I Started in Construction</h3>
                  <p className="leading-relaxed text-slate-600">
                    {builder.storyHowStarted}
                  </p>
                </div>
              )}

              {/* Flagship project */}
              {builder.bestCompletedProject && (
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-900 text-sm font-serif">Best Completed Project Highlight</h3>
                  <p className="leading-relaxed text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {builder.bestCompletedProject}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900">Project Types Handled:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {builder.projectTypes?.map(pt => (
                      <span key={pt} className="px-2.5 py-1 rounded-md bg-white border border-slate-300 font-semibold text-slate-700">
                        {pt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900">Max Floors & Size:</span>
                  <p className="text-slate-700 font-semibold">Max Structure: {builder.maxFloors}</p>
                  <p className="text-slate-700 font-semibold">Average House Size: {builder.avgHouseSizeSqFt} sq ft</p>
                  <p className="text-slate-700 font-semibold">Residential Focus: {builder.residentialPercentage}%</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900">Construction Scope Personally Managed:</span>
                <div className="flex flex-wrap gap-1.5">
                  {builder.workManaged?.map(scope => (
                    <span key={scope} className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 font-bold text-amber-900">
                      ✓ {scope}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900">Labour Management Model:</span>
                  <p className="text-slate-700 font-medium">{builder.labourModel}</p>
                  <p className="text-slate-500 font-semibold">{builder.availableWorkersCount} workers in team</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900">Construction Speed & Factors:</span>
                  <p className="text-slate-700 font-medium">Average Timeline: {builder.typicalTimeline}</p>
                  <p className="text-slate-500">Timeline Factors: {builder.timelineAffectingFactors?.join(', ')}</p>
                </div>
              </div>
            </div>
          )}

          {/* PRICING TAB */}
          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 grid sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-slate-500 font-medium text-[11px]">Pricing Model</span>
                  <p className="text-sm font-bold text-slate-900">{builder.pricingModel}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-medium text-[11px]">Est. Cost / sq.ft</span>
                  <p className="text-sm font-bold text-amber-700">₹{builder.minPricePerSqFt} – ₹{builder.maxPricePerSqFt}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-medium text-[11px]">Usual House Budget</span>
                  <p className="text-sm font-bold text-slate-900">{builder.typicalBudgetRange}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900">Written Quotations</span>
                  <p className="text-slate-700 font-semibold">{builder.providesWrittenQuotation} provides itemized written quote before work.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900">Timeline Estimates</span>
                  <p className="text-slate-700 font-semibold">{builder.providesEstimatedTimeline === 'Yes' ? 'Provides detailed milestone schedule.' : 'Discusses on site.'}</p>
                </div>
              </div>

              {builder.clientChangesHandling && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900">Handling Client Design Changes:</span>
                  <p className="text-slate-700">{builder.clientChangesHandling}</p>
                </div>
              )}
            </div>
          )}

          {/* PORTFOLIO TAB */}
          {activeTab === 'portfolio' && (
            <div className="space-y-4">
              {builder.portfolio && builder.portfolio.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {builder.portfolio.map((item) => (
                    <div key={item.id} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden space-y-2">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-3 space-y-1">
                        <h4 className="font-bold text-slate-900 text-xs">{item.title}</h4>
                        <div className="flex justify-between text-[11px] text-slate-500">
                          <span>{item.location}</span>
                          <span>{item.sqft} sq.ft ({item.completionYear})</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">No project photos uploaded yet.</div>
              )}
            </div>
          )}

          {/* Verification Status Banner */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-xs font-bold text-emerald-400">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Phone Verified</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Identity Verified</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Business Verified</span>
            </div>
            <span className="text-[10px] text-slate-400">Verified by Co-Builder Evaluation Team</span>
          </div>

        </div>

        {/* Footer CTA */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Co-Builder does not charge homeowners to connect.
          </div>

          <button
            onClick={() => {
              onClose();
              onRequestConnect(builder);
            }}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Request Direct Connection</span>
          </button>
        </div>

      </div>
    </div>
  );
};
