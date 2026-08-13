import React, { useState } from 'react';
import { BuilderProfile, HomeownerProject, AdminStats } from '../types';
import { 
  Building2, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Search, 
  ShieldCheck, 
  FileText, 
  Sparkles,
  TrendingUp,
  Settings
} from 'lucide-react';

interface AdminPanelProps {
  builders: BuilderProfile[];
  projects: HomeownerProject[];
  onToggleBuilderStatus: (builderId: string) => void;
  onToggleFeatured: (builderId: string) => void;
  onChangePlan: (builderId: string, plan: 'STARTER' | 'PRIORITY') => void;
  onApproveBuilder: (builderId: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  builders,
  projects,
  onToggleBuilderStatus,
  onToggleFeatured,
  onChangePlan,
  onApproveBuilder,
}) => {
  const [activeTab, setActiveTab] = useState<'builders' | 'leads' | 'subscriptions'>('builders');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate platform statistics
  const totalBuilders = builders.length;
  const activePriority = builders.filter(b => b.plan === 'PRIORITY' && b.status === 'active').length;
  const totalLeads = projects.length;
  const totalRevenue = builders.reduce((acc, b) => {
    if (b.plan === 'PRIORITY') return acc + 4000;
    if (b.plan === 'STARTER') return acc + 2000;
    return acc;
  }, 0);

  const filteredBuilders = builders.filter(b => 
    b.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-amber-400 text-xs font-bold mb-1">
              <Settings className="w-3.5 h-3.5" /> Platform Admin Portal
            </div>
            <h1 className="text-2xl font-black font-serif text-slate-900">Co-Builder Management Console</h1>
            <p className="text-xs text-slate-500">Monitor builder onboarding, verification approvals, homeowner leads and subscription revenue</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Registered Builders</span>
            <div className="text-2xl font-black font-serif text-slate-900">{totalBuilders}</div>
            <span className="text-[11px] text-slate-500 font-medium">{activePriority} Priority Subscriptions</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Subscription Revenue</span>
            <div className="text-2xl font-black font-serif text-amber-600">₹{totalRevenue.toLocaleString('en-IN')}</div>
            <span className="text-[11px] text-emerald-600 font-bold">100% Collected</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Homeowner Requirements</span>
            <div className="text-2xl font-black font-serif text-slate-900">{totalLeads}</div>
            <span className="text-[11px] text-slate-500 font-medium">Free Homeowner Submissions</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Platform Verification</span>
            <div className="text-2xl font-black font-serif text-emerald-600">100%</div>
            <span className="text-[11px] text-slate-500 font-medium">Internal Audited Profiles</span>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="flex border-b border-slate-200 gap-8 text-sm font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('builders')}
            className={`pb-3 transition-all cursor-pointer ${
              activeTab === 'builders' ? 'border-b-2 border-slate-900 text-slate-900 font-black' : 'hover:text-slate-900'
            }`}
          >
            Manage Builders ({builders.length})
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 transition-all cursor-pointer ${
              activeTab === 'leads' ? 'border-b-2 border-slate-900 text-slate-900 font-black' : 'hover:text-slate-900'
            }`}
          >
            Homeowner Projects ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`pb-3 transition-all cursor-pointer ${
              activeTab === 'subscriptions' ? 'border-b-2 border-slate-900 text-slate-900 font-black' : 'hover:text-slate-900'
            }`}
          >
            Subscription Ledger
          </button>
        </div>

        {/* BUILDERS TAB */}
        {activeTab === 'builders' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center gap-4">
              <div className="relative max-w-sm w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search builder name, business, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-slate-900 bg-white"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-4">Builder / Company</th>
                      <th className="p-4">City</th>
                      <th className="p-4">Plan Tier</th>
                      <th className="p-4">Verification</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredBuilders.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={b.profilePhoto} alt={b.fullName} className="w-9 h-9 rounded-lg object-cover border" />
                            <div>
                              <div className="font-bold text-slate-900">{b.fullName}</div>
                              <div className="text-[11px] text-slate-500">{b.businessName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-slate-800">{b.city}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            b.plan === 'PRIORITY' ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {b.plan}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Audited
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            b.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {b.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => onToggleFeatured(b.id)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer border ${
                              b.isFeatured ? 'bg-amber-500/20 text-amber-900 border-amber-400' : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            {b.isFeatured ? 'Featured ★' : 'Make Featured'}
                          </button>

                          <button
                            onClick={() => onChangePlan(b.id, b.plan === 'PRIORITY' ? 'STARTER' : 'PRIORITY')}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-bold cursor-pointer"
                          >
                            Toggle Plan
                          </button>

                          <button
                            onClick={() => onToggleBuilderStatus(b.id)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                              b.status === 'active' ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            }`}
                          >
                            {b.status === 'active' ? 'Suspend' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 font-serif">Homeowner Requirements Log</h2>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-4">Homeowner</th>
                      <th className="p-4">City / Locality</th>
                      <th className="p-4">Plot & House Type</th>
                      <th className="p-4">Budget</th>
                      <th className="p-4">Map Status</th>
                      <th className="p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {projects.map((p) => (
                      <tr key={p.id}>
                        <td className="p-4 font-bold text-slate-900">{p.homeownerName} ({p.mobileNumber})</td>
                        <td className="p-4">{p.locality}, {p.city}</td>
                        <td className="p-4">{p.plotSizeSqFt} sq ft • {p.houseType} ({p.floors})</td>
                        <td className="p-4 font-bold text-amber-700">{p.budgetRange}</td>
                        <td className="p-4">
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Plan Attached
                          </span>
                        </td>
                        <td className="p-4 text-slate-500">{p.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SUBSCRIPTIONS TAB */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 font-serif">Subscription Payments Log</h2>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center text-xs pb-4 border-b border-slate-100">
                <span className="font-bold text-slate-800">Total Payments Processed:</span>
                <span className="font-black text-amber-600 text-lg font-serif">₹{totalRevenue.toLocaleString('en-IN')}</span>
              </div>

              <div className="space-y-3">
                {builders.map((b) => (
                  <div key={b.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{b.fullName} ({b.businessName})</span>
                      <p className="text-[11px] text-slate-500">Plan: {b.plan} • City: {b.city}</p>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-slate-900">
                        {b.plan === 'PRIORITY' ? '₹4,000' : '₹2,000'}
                      </span>
                      <span className="block text-[10px] text-emerald-600 font-bold">PAID via Razorpay</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
