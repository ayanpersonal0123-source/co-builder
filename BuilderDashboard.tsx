import React, { useState } from 'react';
import { BuilderProfile, HomeownerProject, ConnectionRequest, LeadMatch } from '../types';
import { calculateMatchScore } from '../utils/matching';
import { 
  Award, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  MessageSquare, 
  FileText, 
  Sparkles, 
  Edit, 
  UserCheck, 
  Calendar, 
  Clock, 
  DollarSign, 
  ChevronRight,
  ShieldCheck,
  Building2,
  Lock
} from 'lucide-react';

interface BuilderDashboardProps {
  builder: BuilderProfile;
  projects: HomeownerProject[];
  connections: ConnectionRequest[];
  onUpgradePlan: (builderId: string) => void;
  onUpdateProfile: (updated: BuilderProfile) => void;
}

export const BuilderDashboard: React.FC<BuilderDashboardProps> = ({
  builder,
  projects,
  connections,
  onUpgradePlan,
  onUpdateProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'profile' | 'connections'>('leads');
  const [unlockedLeadIds, setUnlockedLeadIds] = useState<string[]>([]);
  const [selectedLeadModal, setSelectedLeadModal] = useState<HomeownerProject | null>(null);

  // Filter relevant leads for builder's city or surrounding
  const matchedLeads: LeadMatch[] = projects
    .map(project => {
      const { score, reasons } = calculateMatchScore(builder, project);
      return {
        builder,
        matchScore: score,
        matchReasons: reasons,
        project
      } as any;
    })
    .sort((a: any, b: any) => b.matchScore - a.matchScore);

  const myConnections = connections.filter(c => c.builderId === builder.id);

  const handleUnlockLead = (projectId: string) => {
    if (!unlockedLeadIds.includes(projectId)) {
      setUnlockedLeadIds([...unlockedLeadIds, projectId]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Dashboard Top Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <img
                src={builder.profilePhoto}
                alt={builder.fullName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-700 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black font-serif text-white">{builder.fullName}</h1>
                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                    builder.plan === 'PRIORITY' ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-200'
                  }`}>
                    {builder.plan} PLAN
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-300 mt-0.5">{builder.businessName}</p>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" /> {builder.city} • {builder.contractorType}
                </p>
              </div>
            </div>

            {/* Plan Badge & Upgrade */}
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2 text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400">Subscription Status</span>
              <div className="text-base font-bold text-amber-400 flex items-center justify-end gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Active Account</span>
              </div>
              {builder.plan === 'STARTER' && (
                <button
                  onClick={() => onUpgradePlan(builder.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-xs transition-all cursor-pointer"
                >
                  Upgrade to Priority (₹4,000)
                </button>
              )}
            </div>
          </div>

          {/* Verification Status Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4 font-semibold text-emerald-400">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Phone ✓</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Identity ✓</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Business ✓</span>
            </div>

            <span className="text-slate-400 font-medium">
              Mobile: <strong className="text-white">{builder.mobileNumber}</strong>
            </span>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex border-b border-slate-200 gap-8 text-sm font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'leads' ? 'border-b-2 border-amber-500 text-amber-600 font-black' : 'hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Homeowner Leads ({matchedLeads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('connections')}
            className={`pb-3 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'connections' ? 'border-b-2 border-amber-500 text-amber-600 font-black' : 'hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-amber-500" />
            <span>Connection Requests ({myConnections.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'profile' ? 'border-b-2 border-amber-500 text-amber-600 font-black' : 'hover:text-slate-900'
            }`}
          >
            <Edit className="w-4 h-4 text-slate-500" />
            <span>My Profile</span>
          </button>
        </div>

        {/* LEADS FEED TAB */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-xs">
              <h2 className="text-lg font-bold font-serif text-slate-900">
                Matched Homeowner Construction Requirements
              </h2>
              <span className="text-slate-500">
                Sorted by AI Match Score % for {builder.city}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {matchedLeads.map((item: any) => {
                const proj: HomeownerProject = item.project;
                const isUnlocked = unlockedLeadIds.includes(proj.id);

                return (
                  <div
                    key={proj.id}
                    className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Top Header */}
                      <div className="flex justify-between items-start gap-3 pb-3 border-b border-slate-100">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                            New Home Construction — {proj.city}
                          </span>
                          <h3 className="text-base font-bold font-serif text-slate-900 mt-1">
                            {proj.houseType} ({proj.locality})
                          </h3>
                        </div>

                        <div className="bg-slate-900 text-amber-400 px-3 py-1.5 rounded-xl text-center shrink-0">
                          <span className="text-xs font-black">{item.matchScore}% Match</span>
                        </div>
                      </div>

                      {/* Specs Grid */}
                      <div className="grid grid-cols-2 gap-2.5 text-xs bg-slate-50 p-3.5 rounded-2xl">
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold">Plot Size</span>
                          <p className="font-bold text-slate-900">{proj.plotSizeSqFt} sq ft ({proj.floors})</p>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold">Approx Budget</span>
                          <p className="font-bold text-amber-700">{proj.budgetRange}</p>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold">Target Start</span>
                          <p className="font-bold text-slate-900">{proj.expectedStartDate}</p>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold">Target Timeline</span>
                          <p className="font-bold text-slate-900">{proj.desiredTimeline}</p>
                        </div>
                      </div>

                      {/* Requirements summary */}
                      <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                        "{proj.additionalRequirements || 'House plan approved. Looking for turnkey construction.'}"
                      </p>

                      {/* House Plan Indicator */}
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <span>House Map Ready: {proj.houseMapName || 'Attached PDF'}</span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-[11px] text-slate-400">Lead Date: {proj.createdAt}</span>

                      <button
                        onClick={() => {
                          handleUnlockLead(proj.id);
                          setSelectedLeadModal(proj);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{isUnlocked ? 'View Unlocked Lead' : 'View Lead Details'}</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CONNECTIONS TAB */}
        {activeTab === 'connections' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold font-serif text-slate-900">
              Homeowners Who Requested to Connect
            </h2>

            {myConnections.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 p-8 space-y-2">
                <MessageSquare className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-sm font-bold text-slate-800">No Connection Requests Yet</h3>
                <p className="text-xs text-slate-500">
                  Homeowners browsing your profile will appear here when they request a direct call or quote.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {myConnections.map((conn) => (
                  <div key={conn.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-sm">{conn.homeownerName}</h3>
                        <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded-full">
                          Connected
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Location: {conn.homeownerCity}</p>
                      <p className="text-xs text-slate-700 font-medium mt-1">"{conn.message}"</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <a
                        href={`tel:${conn.homeownerPhone}`}
                        className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call {conn.homeownerPhone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MY PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
            <h2 className="text-xl font-bold font-serif text-slate-900">
              Active Profile Settings
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={builder.fullName}
                  onChange={(e) => onUpdateProfile({ ...builder, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Business Name</label>
                <input
                  type="text"
                  value={builder.businessName}
                  onChange={(e) => onUpdateProfile({ ...builder, businessName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  value={builder.city}
                  onChange={(e) => onUpdateProfile({ ...builder, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Price / sq ft starting</label>
                <input
                  type="number"
                  value={builder.minPricePerSqFt}
                  onChange={(e) => onUpdateProfile({ ...builder, minPricePerSqFt: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">What Makes Work Different</label>
                <textarea
                  rows={3}
                  value={builder.whatMakesDifferent}
                  onChange={(e) => onUpdateProfile({ ...builder, whatMakesDifferent: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>
            </div>

            <div className="pt-2 text-right">
              <span className="text-xs text-emerald-700 font-bold">✓ Profile Changes Auto-Saved</span>
            </div>
          </div>
        )}

      </div>

      {/* LEAD DETAILS MODAL */}
      {selectedLeadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 border border-slate-200 shadow-2xl relative">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold font-serif text-slate-900">
                Unlocked Homeowner Requirement
              </h3>
              <button 
                onClick={() => setSelectedLeadModal(null)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
                <div className="text-xs text-amber-400 font-bold">Homeowner Contact Info:</div>
                <p className="font-bold text-sm">{selectedLeadModal.homeownerName}</p>
                <p className="text-slate-300 font-semibold">Phone: {selectedLeadModal.mobileNumber}</p>
                <p className="text-slate-300 font-semibold">WhatsApp: {selectedLeadModal.whatsappNumber}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-800">Plot & House Plan:</span>
                <p className="text-slate-600">{selectedLeadModal.plotSizeSqFt} sq ft • {selectedLeadModal.houseType} • {selectedLeadModal.floors}</p>
                <p className="text-slate-600">Location: {selectedLeadModal.locality}, {selectedLeadModal.city}</p>
                <p className="text-amber-800 font-bold mt-1">Budget Target: {selectedLeadModal.budgetRange}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800">Additional Instructions:</span>
                <p className="text-slate-700 italic">"{selectedLeadModal.additionalRequirements}"</p>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={`tel:${selectedLeadModal.mobileNumber}`}
                className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Homeowner</span>
              </a>
              <a
                href={`https://wa.me/${selectedLeadModal.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
