import React, { useState } from 'react';
import { HomeownerProject, LeadMatch, BuilderProfile } from '../types';
import { Star, MapPin, CheckCircle2, MessageSquare, Phone, ArrowLeft, ShieldCheck, Sparkles, Award, FileText } from 'lucide-react';

interface MatchedBuildersViewProps {
  project: HomeownerProject;
  matches: LeadMatch[];
  onBack: () => void;
  onSelectBuilder: (builder: BuilderProfile) => void;
  onRequestConnect: (builder: BuilderProfile) => void;
}

export const MatchedBuildersView: React.FC<MatchedBuildersViewProps> = ({
  project,
  matches,
  onBack,
  onSelectBuilder,
  onRequestConnect,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header & Back */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs cursor-pointer w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Page</span>
          </button>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-900">{matches.length} Matched Builders</span> for your house plan
          </div>
        </div>

        {/* Project Summary Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="bg-amber-500/15 text-amber-400 text-[10px] font-bold uppercase px-3 py-1 rounded-full border border-amber-500/30">
                Home Requirement Submitted
              </span>
              <h1 className="text-2xl font-black font-serif text-white mt-2">
                {project.houseType} Construction in {project.city}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                {project.locality} • {project.plotSizeSqFt} sq ft • {project.floors} Structure
              </p>
            </div>

            <div className="bg-slate-800 p-3.5 rounded-2xl border border-slate-700 text-right">
              <span className="text-[10px] uppercase text-slate-400 font-bold">Target Budget</span>
              <div className="text-lg font-bold text-amber-400 font-serif">{project.budgetRange}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" /> House Plan: {project.houseMapName || 'Attached PDF'}
            </span>
            <span className="text-slate-400">
              Start Target: <strong className="text-white">{project.expectedStartDate}</strong>
            </span>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Co-Builder Matching Notice: </span>
            Based on the information provided, these local builders may be a suitable match for your house construction requirements. Construction agreements, pricing, timelines, payments, quality and execution are decided directly between you and the builder.
          </div>
        </div>

        {/* Matched Builders Cards */}
        <div className="space-y-6">
          {matches.map(({ builder, matchScore, matchReasons }) => (
            <div
              key={builder.id}
              className={`bg-white rounded-3xl border-2 transition-all p-6 sm:p-8 space-y-6 shadow-sm hover:shadow-md ${
                builder.plan === 'PRIORITY' ? 'border-amber-400/90 ring-1 ring-amber-400/20' : 'border-slate-200'
              }`}
            >
              {/* Top Row: Score & Builder info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <img
                    src={builder.profilePhoto}
                    alt={builder.fullName}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl font-bold font-serif text-slate-900">{builder.fullName}</h2>
                      {builder.plan === 'PRIORITY' && (
                        <span className="bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Award className="w-3 h-3" /> Priority Builder
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-slate-600 mt-0.5">{builder.businessName}</p>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" /> {builder.city} ({builder.areasServed.join(', ')})
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-1 text-amber-600">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        {builder.rating.toFixed(1)} ({builder.reviewCount} reviews)
                      </span>
                      <span>•</span>
                      <span>{builder.yearsInConstruction} Experience</span>
                      <span>•</span>
                      <span>{builder.housesCompleted} Houses Built</span>
                    </div>
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-center md:min-w-[170px] shrink-0 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Match Score</span>
                  <div className="text-3xl font-black font-serif text-amber-400">{matchScore}%</div>
                  <span className="text-[10px] text-slate-400 block font-medium">Suitable Match</span>
                </div>
              </div>

              {/* Middle Section: Match Reasons */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Why This Builder Was Matched:</span>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {matchReasons.map((reason, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portfolio Samples */}
              {builder.portfolio && builder.portfolio.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Completed House Portfolio:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {builder.portfolio.slice(0, 3).map((item) => (
                      <div key={item.id} className="relative rounded-xl overflow-hidden group h-28 border border-slate-200">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent p-2 flex flex-col justify-end text-white text-[10px] font-bold">
                          <span className="truncate">{item.title}</span>
                          <span className="text-amber-300 font-normal">{item.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                <div className="text-xs text-slate-600">
                  <span className="font-bold text-slate-900">Pricing Model:</span> {builder.pricingModel} • ₹{builder.minPricePerSqFt}–₹{builder.maxPricePerSqFt}/sq.ft
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => onSelectBuilder(builder)}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-xs transition-colors cursor-pointer text-center"
                  >
                    View Full Profile
                  </button>

                  <button
                    onClick={() => onRequestConnect(builder)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Request Connection</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
