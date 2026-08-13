import React, { useState } from 'react';
import { BuilderProfile, ContractorType } from '../types';
import { Star, MapPin, Award, CheckCircle2, Phone, MessageSquare, HardHat, Calendar, ChevronRight, ShieldCheck, Filter } from 'lucide-react';

interface FeaturedBuildersProps {
  builders: BuilderProfile[];
  onSelectBuilder: (builder: BuilderProfile) => void;
  onRequestConnect: (builder: BuilderProfile) => void;
}

export const FeaturedBuilders: React.FC<FeaturedBuildersProps> = ({
  builders,
  onSelectBuilder,
  onRequestConnect,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedContractorType, setSelectedContractorType] = useState<string>('All');
  const [selectedPlanFilter, setSelectedPlanFilter] = useState<string>('All');

  // Extract cities
  const cities = ['All', ...Array.from(new Set(builders.map(b => b.city)))];
  const contractorTypes = [
    'All',
    'General Contractor',
    'Civil Contractor',
    'Thekedar',
    'Turnkey Contractor',
    'Builder'
  ];

  const filteredBuilders = builders.filter(b => {
    if (b.status !== 'active') return false;
    if (selectedCity !== 'All' && b.city.toLowerCase() !== selectedCity.toLowerCase()) return false;
    if (selectedContractorType !== 'All' && b.contractorType !== selectedContractorType) return false;
    if (selectedPlanFilter === 'PRIORITY' && b.plan !== 'PRIORITY') return false;
    return true;
  });

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-amber-600 font-bold text-xs uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Verified Marketplace
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-slate-900 tracking-tight mt-3">
              Explore Suitable Local Builders
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Browse experienced thekedars and civil contractors registered in your area.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedPlanFilter(selectedPlanFilter === 'PRIORITY' ? 'All' : 'PRIORITY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                selectedPlanFilter === 'PRIORITY'
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Priority Builders Only</span>
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Filter className="w-4 h-4 text-amber-600" />
            <span>Filter By:</span>
          </div>

          {/* City Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500 font-medium">City:</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-white border border-slate-300 text-slate-800 text-xs font-semibold rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500"
            >
              {cities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Contractor Type Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500 font-medium">Contractor Type:</label>
            <select
              value={selectedContractorType}
              onChange={(e) => setSelectedContractorType(e.target.value)}
              className="bg-white border border-slate-300 text-slate-800 text-xs font-semibold rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500"
            >
              {contractorTypes.map(ct => (
                <option key={ct} value={ct}>{ct}</option>
              ))}
            </select>
          </div>

          {/* Reset button */}
          {(selectedCity !== 'All' || selectedContractorType !== 'All' || selectedPlanFilter !== 'All') && (
            <button
              onClick={() => {
                setSelectedCity('All');
                setSelectedContractorType('All');
                setSelectedPlanFilter('All');
              }}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 underline cursor-pointer ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Builders Grid */}
        {filteredBuilders.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8 space-y-3">
            <HardHat className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No Builders Found Matching Filters</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your city or contractor type filter, or register as a builder to become the first in this region!
            </p>
            <button
              onClick={() => { setSelectedCity('All'); setSelectedContractorType('All'); setSelectedPlanFilter('All'); }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-xs"
            >
              Show All Builders
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBuilders.map((builder) => (
              <div
                key={builder.id}
                className={`bg-white rounded-2xl border transition-all flex flex-col justify-between overflow-hidden group hover:shadow-md ${
                  builder.plan === 'PRIORITY' 
                    ? 'border-amber-400/80 ring-1 ring-amber-400/30' 
                    : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Top Header / Priority Badge */}
                  <div className="p-5 pb-0 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={builder.profilePhoto}
                        alt={builder.fullName}
                        className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-xs"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors font-serif">
                            {builder.fullName}
                          </h3>
                        </div>
                        <p className="text-xs font-medium text-slate-500">{builder.businessName}</p>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-600 font-semibold">
                          <span className="flex items-center gap-1 text-slate-700">
                            <MapPin className="w-3 h-3 text-amber-600" />
                            {builder.city}
                          </span>
                          <span>•</span>
                          <span className="text-slate-600">{builder.contractorType}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tier Badge */}
                    {builder.plan === 'PRIORITY' ? (
                      <span className="bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-2 py-0.5 rounded-full shadow-xs tracking-wider flex items-center gap-1 shrink-0">
                        <Award className="w-3 h-3" /> Priority
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-600 font-semibold text-[10px] uppercase px-2 py-0.5 rounded-full shrink-0">
                        Starter
                      </span>
                    )}
                  </div>

                  {/* Rating & Exp Bar */}
                  <div className="px-5 py-3 mt-3 bg-slate-50 border-y border-slate-100 flex items-center justify-between text-xs text-slate-700 font-medium">
                    <div className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span>{builder.rating.toFixed(1)}</span>
                      <span className="text-slate-400 font-normal">({builder.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{builder.yearsInConstruction} Exp</span>
                    </div>
                    <div className="text-slate-600 font-semibold">
                      {builder.housesCompleted} Houses
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 space-y-3 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-500 font-medium">Pricing Model:</span>
                      <span className="font-bold text-slate-900">{builder.pricingModel}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-500 font-medium">Est. Price / sq.ft:</span>
                      <span className="font-bold text-amber-700">₹{builder.minPricePerSqFt} – ₹{builder.maxPricePerSqFt}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-500 font-medium">Labour Model:</span>
                      <span className="font-medium text-slate-800 truncate max-w-[160px]">{builder.labourModel.split(' ')[0]} team</span>
                    </div>

                    {/* Verification Indicators */}
                    <div className="pt-2 border-t border-slate-100 flex items-center gap-3 text-[11px] text-slate-500">
                      <span className={`flex items-center gap-1 font-semibold ${builder.verification.phone ? 'text-emerald-600' : 'text-slate-400'}`}>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Phone
                      </span>
                      <span className={`flex items-center gap-1 font-semibold ${builder.verification.identity ? 'text-emerald-600' : 'text-slate-400'}`}>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Identity
                      </span>
                      <span className={`flex items-center gap-1 font-semibold ${builder.verification.business ? 'text-emerald-600' : 'text-slate-400'}`}>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Business
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer CTAs */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectBuilder(builder)}
                    className="w-full py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => onRequestConnect(builder)}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Request Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
