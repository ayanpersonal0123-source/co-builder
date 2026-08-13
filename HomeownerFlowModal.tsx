import React, { useState } from 'react';
import { HomeownerProject, ProjectType, MaxFloors, BudgetRange, TimelineRange, PricingModel } from '../types';
import { FileText, MapPin, Upload, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, X, Image as ImageIcon } from 'lucide-react';

interface HomeownerFlowModalProps {
  onClose: () => void;
  onSubmitRequirement: (project: HomeownerProject) => void;
}

export const HomeownerFlowModal: React.FC<HomeownerFlowModalProps> = ({
  onClose,
  onSubmitRequirement,
}) => {
  const [formData, setFormData] = useState<Partial<HomeownerProject>>({
    homeownerName: 'Sunil Kumar',
    mobileNumber: '+91 94151 88776',
    whatsappNumber: '+91 94151 88776',
    city: 'Lucknow',
    locality: 'Gomti Nagar Extension',
    plotSizeSqFt: 1500,
    houseType: 'Independent Houses',
    floors: 'G+1',
    budgetRange: '₹30–40 lakh',
    expectedStartDate: 'Within 30 Days',
    desiredTimeline: '7–9 months',
    constructionPreference: 'Turnkey',
    labourMaterialPreference: 'Complete Material + Labour Turnkey (A-Grade materials)',
    houseMapUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600',
    houseMapName: 'Gomti_Nagar_1500sqft_G1_Plan.pdf',
    additionalRequirements: 'Need 3 BHK with ground floor car parking and open terrace garden. LDA approved house map is ready.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const createdProject: HomeownerProject = {
        id: `p-${Date.now()}`,
        homeownerName: formData.homeownerName || 'Homeowner',
        mobileNumber: formData.mobileNumber || '',
        whatsappNumber: formData.whatsappNumber || formData.mobileNumber || '',
        city: formData.city || 'Lucknow',
        locality: formData.locality || 'Main City',
        plotSizeSqFt: formData.plotSizeSqFt || 1500,
        houseType: (formData.houseType as ProjectType) || 'Independent Houses',
        floors: (formData.floors as MaxFloors) || 'G+1',
        budgetRange: (formData.budgetRange as BudgetRange) || '₹25–40 lakh',
        expectedStartDate: formData.expectedStartDate || 'Within 30 Days',
        desiredTimeline: (formData.desiredTimeline as TimelineRange) || '7–9 months',
        constructionPreference: (formData.constructionPreference as PricingModel) || 'Turnkey',
        labourMaterialPreference: formData.labourMaterialPreference || 'Turnkey',
        houseMapUrl: formData.houseMapUrl,
        houseMapName: formData.houseMapName || 'House_Plan.pdf',
        additionalRequirements: formData.additionalRequirements || '',
        createdAt: new Date().toISOString().split('T')[0],
        status: 'open'
      };

      setIsSubmitting(false);
      onSubmitRequirement(createdProject);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 border border-slate-200 shadow-2xl relative my-8">
        
        {/* Header */}
        <div className="flex justify-between items-start pb-4 border-b border-slate-100">
          <div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block mb-1">
              100% Free For Homeowners
            </span>
            <h2 className="text-2xl font-black font-serif text-slate-900">
              Tell Us About Your Home
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Submit your house requirements to discover matched local builders and thekedars.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          {/* Section 1: Contact & Location */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600" /> 1. Contact & Location Details
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.homeownerName}
                  onChange={(e) => setFormData({ ...formData, homeownerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                <input
                  type="text"
                  required
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value, whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                  placeholder="e.g. Lucknow, Jaipur, Pune"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Locality / Sector *</label>
                <input
                  type="text"
                  required
                  value={formData.locality}
                  onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                  placeholder="e.g. Gomti Nagar Extension"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Plot & House Specs */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-600" /> 2. Plot & Structure Requirements
            </h3>

            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Plot Size (sq ft) *</label>
                <input
                  type="number"
                  required
                  value={formData.plotSizeSqFt}
                  onChange={(e) => setFormData({ ...formData, plotSizeSqFt: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">House Type *</label>
                <select
                  value={formData.houseType}
                  onChange={(e) => setFormData({ ...formData, houseType: e.target.value as ProjectType })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900 bg-white"
                >
                  {['Independent Houses', 'Villas', 'Apartments', 'Duplex Houses', 'Commercial Buildings', 'Renovation'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Number of Floors *</label>
                <select
                  value={formData.floors}
                  onChange={(e) => setFormData({ ...formData, floors: e.target.value as MaxFloors })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900 bg-white"
                >
                  {['Ground Floor', 'G+1', 'G+2', 'G+3', 'G+4'].map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Budget & Timeline */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Approx Construction Budget *</label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value as BudgetRange })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-bold text-amber-800 bg-white"
                >
                  {['Under ₹15 lakh', '₹15–25 lakh', '₹25–40 lakh', '₹40–60 lakh', '₹60 lakh–₹1 crore', '₹1 crore+'].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Expected Start Date</label>
                <select
                  value={formData.expectedStartDate}
                  onChange={(e) => setFormData({ ...formData, expectedStartDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900 bg-white"
                >
                  <option value="Immediate">Immediate</option>
                  <option value="Within 30 Days">Within 30 Days</option>
                  <option value="Next 2 Months">Next 2 Months</option>
                  <option value="3-6 Months">3–6 Months</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: House Map Upload */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block font-bold text-slate-700">Upload House Plan / Map (PDF / Image)</label>
            <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-2">
              <Upload className="w-6 h-6 text-amber-600 mx-auto" />
              <div className="text-xs text-slate-700 font-semibold">
                {formData.houseMapName ? (
                  <span className="text-emerald-700 font-bold flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> {formData.houseMapName} Attached
                  </span>
                ) : (
                  <span>Drag & drop house plan or click to attach file</span>
                )}
              </div>
              <p className="text-[10px] text-slate-400">PDF, JPG, PNG up to 15MB. Map helps builders estimate exact pricing.</p>
            </div>
          </div>

          {/* Section 5: Additional Notes */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Additional Construction Requirements</label>
            <textarea
              rows={2}
              value={formData.additionalRequirements}
              onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
              placeholder="e.g. Car parking required, open terrace, Italian marble, LDA/JDA approved map..."
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Finding Matched Builders...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Find My Builder</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-slate-400 mt-2">
              Co-Builder does NOT charge homeowners. Your phone number is kept secure.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
