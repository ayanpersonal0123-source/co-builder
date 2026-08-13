import React, { useState } from 'react';
import { 
  BuilderProfile, 
  ContractorType, 
  ExperienceRange, 
  CompletedHousesRange, 
  ProjectType, 
  MaxFloors, 
  TimelineRange, 
  ConstructionScope, 
  LabourModel, 
  BudgetRange, 
  PricingModel, 
  PlanTier 
} from '../types';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  HardHat, 
  Star, 
  MapPin, 
  Building2, 
  Phone, 
  Lock, 
  CreditCard, 
  QrCode, 
  Sparkles,
  UserCheck
} from 'lucide-react';

interface BuilderOnboardingProps {
  onCompleteAndPay: (builder: BuilderProfile) => void;
  onCancel: () => void;
}

export const BuilderOnboarding: React.FC<BuilderOnboardingProps> = ({
  onCompleteAndPay,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showPaymentWall, setShowPaymentWall] = useState<boolean>(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>('PRIORITY');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('builder@upi');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('1234');
  const [otpVerified, setOtpVerified] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<BuilderProfile>>({
    fullName: 'Rajesh Kumar Verma',
    businessName: 'Verma Civil Engineering & Construction',
    mobileNumber: '+91 98765 43210',
    whatsappNumber: '+91 98765 43210',
    email: 'rajesh.verma@vermacivil.in',
    city: 'Lucknow',
    areasServed: ['Gomti Nagar', 'Mahanagar', 'Indira Nagar', 'Aliganj'],
    fullAddress: 'Plot 12, Block C, Gomti Nagar Extension, Lucknow 226010',
    yearsInConstruction: '10–15 years',
    currentOccupation: 'Civil Contractor & Home Builder',
    contractorType: 'Turnkey Contractor',
    storyHowStarted: 'I worked as a diploma civil engineer for 4 years on residential sites in Lucknow before starting my own independent construction firm in 2014.',
    
    // Step 2
    housesCompleted: '26–50',
    projectTypes: ['Independent Houses', 'Duplex Houses', 'Villas'],
    maxFloors: 'G+2',
    avgHouseSizeSqFt: 1800,
    residentialPercentage: 90,

    // Step 3
    typicalTimeline: '7–9 months',
    timelineAffectingFactors: ['Weather', 'Material availability', 'Client changes'],
    workManaged: ['Foundation', 'RCC', 'Brickwork', 'Plaster', 'Electrical', 'Plumbing', 'Flooring', 'Full turnkey construction'],
    labourModel: 'I have my own permanent labour team',
    availableWorkersCount: 28,

    // Step 4
    typicalBudgetRange: '₹25–40 lakh',
    minPricePerSqFt: 1500,
    maxPricePerSqFt: 2100,
    pricingModel: 'Turnkey',
    providesWrittenQuotation: 'Always',
    providesEstimatedTimeline: 'Yes',
    clientChangesHandling: 'We provide an itemized change-order document before making any modifications to the agreed house plan.',

    // Step 5
    profilePhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    companyLogo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=200',
    portfolio: [
      {
        id: 'p-10',
        title: '2,000 sq.ft Duplex Home',
        location: 'Gomti Nagar, Lucknow',
        sqft: 2000,
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
        category: 'Duplex House',
        completionYear: '2024'
      },
      {
        id: 'p-11',
        title: 'Modern Independent Villa',
        location: 'Mahanagar, Lucknow',
        sqft: 1600,
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
        category: 'Independent House',
        completionYear: '2023'
      }
    ],
    whatMakesDifferent: 'We use high quality tested UltraTech cement, Tata TMT steel, and provide live weekly video site walkthroughs to house owners.',
    idealHomeownerType: 'Homeowners who have approved maps and want a transparent, zero-headache turnkey construction experience.',
    alwaysPromised: 'Punctual timeline delivery with zero structural compromises.',
    bestCompletedProject: 'A 2,800 sq ft 4 BHK Duplex home in Lucknow completed in 8 months with Italian marble flooring.',

    // Step 6
    verification: {
      phone: true,
      identity: true,
      business: true,
      gst: '09AABCV1234F1Z5',
      pan: 'AABCV1234F'
    }
  });

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Step 6 complete -> Show Profile Preview!
      setShowPreview(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (showPaymentWall) {
      setShowPaymentWall(false);
      setShowPreview(true);
    } else if (showPreview) {
      setShowPreview(false);
      setCurrentStep(6);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onCancel();
    }
  };

  const handleProceedToPayment = () => {
    setShowPreview(false);
    setShowPaymentWall(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowCheckoutModal(false);

      const createdBuilder: BuilderProfile = {
        id: `b-${Date.now()}`,
        fullName: formData.fullName || 'Registered Builder',
        businessName: formData.businessName || 'Civil Contractor',
        mobileNumber: formData.mobileNumber || '',
        whatsappNumber: formData.whatsappNumber || formData.mobileNumber || '',
        email: formData.email || '',
        city: formData.city || 'Lucknow',
        areasServed: formData.areasServed || [formData.city || 'Lucknow'],
        fullAddress: formData.fullAddress || '',
        yearsInConstruction: (formData.yearsInConstruction as ExperienceRange) || '5–10 years',
        currentOccupation: formData.currentOccupation || 'Builder',
        contractorType: (formData.contractorType as ContractorType) || 'General Contractor',
        storyHowStarted: formData.storyHowStarted || '',

        housesCompleted: (formData.housesCompleted as CompletedHousesRange) || '11–25',
        projectTypes: formData.projectTypes || ['Independent Houses'],
        maxFloors: (formData.maxFloors as MaxFloors) || 'G+2',
        avgHouseSizeSqFt: formData.avgHouseSizeSqFt || 1500,
        residentialPercentage: formData.residentialPercentage || 85,

        typicalTimeline: (formData.typicalTimeline as TimelineRange) || '7–9 months',
        timelineAffectingFactors: formData.timelineAffectingFactors || ['Weather'],
        workManaged: formData.workManaged || ['Foundation', 'RCC', 'Brickwork', 'Full turnkey construction'],
        labourModel: (formData.labourModel as LabourModel) || 'Mostly my own team',
        availableWorkersCount: formData.availableWorkersCount || 20,

        typicalBudgetRange: (formData.typicalBudgetRange as BudgetRange) || '₹25–40 lakh',
        minPricePerSqFt: formData.minPricePerSqFt || 1500,
        maxPricePerSqFt: formData.maxPricePerSqFt || 2100,
        pricingModel: (formData.pricingModel as PricingModel) || 'Turnkey',
        providesWrittenQuotation: formData.providesWrittenQuotation || 'Always',
        providesEstimatedTimeline: formData.providesEstimatedTimeline || 'Yes',
        clientChangesHandling: formData.clientChangesHandling || '',

        profilePhoto: formData.profilePhoto || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
        companyLogo: formData.companyLogo || '',
        portfolio: formData.portfolio || [],
        whatMakesDifferent: formData.whatMakesDifferent || '',
        idealHomeownerType: formData.idealHomeownerType || '',
        alwaysPromised: formData.alwaysPromised || '',
        bestCompletedProject: formData.bestCompletedProject || '',

        verification: {
          phone: true,
          identity: true,
          business: !!formData.verification?.gst,
          gst: formData.verification?.gst,
          pan: formData.verification?.pan
        },
        plan: selectedPlan,
        status: 'active',
        isFeatured: selectedPlan === 'PRIORITY',
        rating: 5.0,
        reviewCount: 1,
        createdAt: new Date().toISOString().split('T')[0]
      };

      onCompleteAndPay(createdBuilder);
    }, 1500);
  };

  const toggleArraySelection = (field: keyof BuilderProfile, item: string) => {
    const currentList = (formData[field] as string[]) || [];
    if (currentList.includes(item)) {
      setFormData({ ...formData, [field]: currentList.filter(i => i !== item) });
    } else {
      setFormData({ ...formData, [field]: [...currentList, item] });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-500 flex items-center justify-center font-bold">
              <HardHat className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-serif text-slate-900">Co-Builder Professional Registration</h1>
              <p className="text-xs text-slate-500">Connect with homeowners actively looking to build</p>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            Save & Exit
          </button>
        </div>

        {/* Progress Bar (Visible during questionnaire) */}
        {!showPreview && !showPaymentWall && (
          <div className="mb-8 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-black">
                  {currentStep}
                </span>
                <span>Profile Step {currentStep} of 6</span>
              </span>
              <span className="text-amber-600 font-semibold">{Math.round((currentStep / 6) * 100)}% Completed</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-amber-500 h-full transition-all duration-300" 
                style={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* STEP CONTENT CONTAINER */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
          
          {/* STEP 1: BASIC INFORMATION */}
          {currentStep === 1 && !showPreview && !showPaymentWall && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black font-serif text-slate-900">
                  Let's Build Your Professional Profile
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Provide your basic details so local homeowners can discover your contractor business.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName || ''}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                    placeholder="e.g. Rameshwar Sharma"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Business / Company Name *</label>
                  <input
                    type="text"
                    value={formData.businessName || ''}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                    placeholder="e.g. Sharma Civil & Turnkey Infra"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="text"
                    value={formData.mobileNumber || ''}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">WhatsApp Number *</label>
                  <input
                    type="text"
                    value={formData.whatsappNumber || ''}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">City of Operation *</label>
                  <input
                    type="text"
                    value={formData.city || ''}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                    placeholder="e.g. Lucknow, Jaipur, Pune"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Areas You Serve (comma separated) *</label>
                  <input
                    type="text"
                    value={formData.areasServed?.join(', ') || ''}
                    onChange={(e) => setFormData({ ...formData, areasServed: e.target.value.split(',').map(s => s.trim()) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                    placeholder="e.g. Gomti Nagar, Aliganj, Mahanagar, Sushant Golf City"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Full Business Address *</label>
                  <input
                    type="text"
                    value={formData.fullAddress || ''}
                    onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                    placeholder="Office address, plot number, area, pin code"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Type of Contractor *</label>
                  <select
                    value={formData.contractorType || 'General Contractor'}
                    onChange={(e) => setFormData({ ...formData, contractorType: e.target.value as ContractorType })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900 bg-white"
                  >
                    {['General Contractor', 'Civil Contractor', 'Thekedar', 'Turnkey Contractor', 'Builder', 'Other'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Current Primary Occupation</label>
                  <input
                    type="text"
                    value={formData.currentOccupation || ''}
                    onChange={(e) => setFormData({ ...formData, currentOccupation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                    placeholder="e.g. Turnkey Civil Contractor"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">How did you get into construction?</label>
                  <textarea
                    rows={3}
                    value={formData.storyHowStarted || ''}
                    onChange={(e) => setFormData({ ...formData, storyHowStarted: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                    placeholder="Tell us a little about your background or how you started your contracting business..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: EXPERIENCE */}
          {currentStep === 2 && !showPreview && !showPaymentWall && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black font-serif text-slate-900">
                  Tell Homeowners About Your Experience
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Demonstrate your track record in building residential structures.
                </p>
              </div>

              <div className="space-y-5 text-xs">
                {/* Years in construction */}
                <div>
                  <label className="block font-bold text-slate-700 mb-2">How many years have you been working in construction?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {['Less than 2 years', '2–5 years', '5–10 years', '10–15 years', '15–20 years', '20+ years'].map(range => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => setFormData({ ...formData, yearsInConstruction: range as ExperienceRange })}
                        className={`p-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                          formData.yearsInConstruction === range 
                            ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs' 
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Houses completed */}
                <div>
                  <label className="block font-bold text-slate-700 mb-2">Approximately how many houses have you completed?</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {['1–5', '6–10', '11–25', '26–50', '51–100', '100+'].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setFormData({ ...formData, housesCompleted: val as CompletedHousesRange })}
                        className={`p-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                          formData.housesCompleted === val 
                            ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-xs' 
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project types (Multiple select) */}
                <div>
                  <label className="block font-bold text-slate-700 mb-2">What type of projects do you usually handle? (Multiple Selection)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      'Independent Houses',
                      'Villas',
                      'Apartments',
                      'Duplex Houses',
                      'Commercial Buildings',
                      'Renovation',
                      'Extensions',
                      'Other'
                    ].map(pt => {
                      const isSelected = formData.projectTypes?.includes(pt as ProjectType);
                      return (
                        <button
                          key={pt}
                          type="button"
                          onClick={() => toggleArraySelection('projectTypes', pt)}
                          className={`p-2.5 rounded-xl border text-left font-bold transition-all cursor-pointer flex items-center justify-between ${
                            isSelected 
                              ? 'bg-amber-500/15 text-amber-800 border-amber-500' 
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span>{pt}</span>
                          {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Max floors */}
                <div>
                  <label className="block font-bold text-slate-700 mb-2">What is the maximum number of floors you normally handle?</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {['Ground Floor', 'G+1', 'G+2', 'G+3', 'G+4', 'Other'].map(f => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFormData({ ...formData, maxFloors: f as MaxFloors })}
                        className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                          formData.maxFloors === f 
                            ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs' 
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Avg size sqft & Residential % slider */}
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Average size of houses normally constructed (sq ft)</label>
                    <input
                      type="number"
                      value={formData.avgHouseSizeSqFt || 1800}
                      onChange={(e) => setFormData({ ...formData, avgHouseSizeSqFt: parseInt(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-bold text-slate-700">Residential Work Percentage</label>
                      <span className="font-black text-amber-600">{formData.residentialPercentage || 90}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={formData.residentialPercentage || 90}
                      onChange={(e) => setFormData({ ...formData, residentialPercentage: parseInt(e.target.value) })}
                      className="w-full accent-amber-500 cursor-pointer mt-2"
                    />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 3: CONSTRUCTION CAPABILITY */}
          {currentStep === 3 && !showPreview && !showPaymentWall && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black font-serif text-slate-900">
                  How Do You Usually Build?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Outline your construction execution speed, team strength, and labour management model.
                </p>
              </div>

              <div className="space-y-5 text-xs">
                {/* Timeline */}
                <div>
                  <label className="block font-bold text-slate-700 mb-2">Typical construction timeline for a standard residential house</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {['3–5 months', '5–7 months', '7–9 months', '9–12 months', '12+ months'].map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFormData({ ...formData, typicalTimeline: t as TimelineRange })}
                        className={`p-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                          formData.typicalTimeline === t 
                            ? 'bg-amber-500 text-slate-950 border-amber-500' 
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Factors affecting timeline */}
                <div>
                  <label className="block font-bold text-slate-700 mb-2">What usually affects your construction timeline? (Multiple Choice)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      'Weather',
                      'Material availability',
                      'Labour availability',
                      'Client changes',
                      'Design changes',
                      'Government approvals',
                      'Other'
                    ].map(f => {
                      const isSel = formData.timelineAffectingFactors?.includes(f);
                      return (
                        <button
                          key={f}
                          type="button"
                          onClick={() => toggleArraySelection('timelineAffectingFactors', f)}
                          className={`p-2.5 rounded-xl border text-left font-bold transition-all cursor-pointer flex items-center justify-between ${
                            isSel 
                              ? 'bg-slate-900 text-amber-400 border-slate-900' 
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span>{f}</span>
                          {isSel && <Check className="w-4 h-4 text-amber-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Work personally managed */}
                <div>
                  <label className="block font-bold text-slate-700 mb-2">What construction work do you personally manage? (Multiple Selection)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      'Foundation',
                      'RCC',
                      'Brickwork',
                      'Plaster',
                      'Electrical',
                      'Plumbing',
                      'Flooring',
                      'Painting',
                      'Waterproofing',
                      'Full turnkey construction'
                    ].map(scope => {
                      const isSel = formData.workManaged?.includes(scope as ConstructionScope);
                      return (
                        <button
                          key={scope}
                          type="button"
                          onClick={() => toggleArraySelection('workManaged', scope)}
                          className={`p-2.5 rounded-xl border text-left font-bold transition-all cursor-pointer flex items-center justify-between ${
                            isSel 
                              ? 'bg-amber-500/15 text-amber-900 border-amber-500' 
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span className="truncate">{scope}</span>
                          {isSel && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Labour Model */}
                <div>
                  <label className="block font-bold text-slate-700 mb-2">Do you provide labour yourself or arrange labour through third parties?</label>
                  <div className="space-y-2">
                    {[
                      'I have my own permanent labour team',
                      'Mostly my own team',
                      'Mix of own + third-party labour',
                      'Mostly third-party labour',
                      'I arrange labour project-by-project'
                    ].map(model => (
                      <button
                        key={model}
                        type="button"
                        onClick={() => setFormData({ ...formData, labourModel: model as LabourModel })}
                        className={`w-full p-3 rounded-xl border text-left font-bold transition-all cursor-pointer flex items-center justify-between ${
                          formData.labourModel === model 
                            ? 'bg-slate-900 text-white border-slate-900' 
                            : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span>{model}</span>
                        {formData.labourModel === model && <Check className="w-4 h-4 text-amber-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Worker count */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Approximately how many workers are normally available through your team?</label>
                  <input
                    type="number"
                    value={formData.availableWorkersCount || 25}
                    onChange={(e) => setFormData({ ...formData, availableWorkersCount: parseInt(e.target.value) || 0 })}
                    className="w-full sm:w-1/2 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-bold text-slate-900"
                  />
                </div>

              </div>
            </div>
          )}

          {/* STEP 4: BUDGET & PRICING */}
          {currentStep === 4 && !showPreview && !showPaymentWall && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black font-serif text-slate-900">
                  What Kind of Projects Do You Usually Take?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Specify your usual construction budgets, sq.ft rates, and quotation practices.
                </p>
              </div>

              <div className="space-y-5 text-xs">
                {/* Budget Range */}
                <div>
                  <label className="block font-bold text-slate-700 mb-2">Usual construction budget of houses you work on</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {['Under ₹15 lakh', '₹15–25 lakh', '₹25–40 lakh', '₹40–60 lakh', '₹60 lakh–₹1 crore', '₹1 crore+'].map(b => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setFormData({ ...formData, typicalBudgetRange: b as BudgetRange })}
                        className={`p-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                          formData.typicalBudgetRange === b 
                            ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs' 
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sq Ft pricing range */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Starting Construction Cost per sq ft (₹)</label>
                    <input
                      type="number"
                      value={formData.minPricePerSqFt || 1500}
                      onChange={(e) => setFormData({ ...formData, minPricePerSqFt: parseInt(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Typical / Maximum Cost per sq ft (₹)</label>
                    <input
                      type="number"
                      value={formData.maxPricePerSqFt || 2200}
                      onChange={(e) => setFormData({ ...formData, maxPricePerSqFt: parseInt(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-bold text-slate-900"
                    />
                  </div>
                </div>

                {/* Pricing Model */}
                <div>
                  <label className="block font-bold text-slate-700 mb-2">Which pricing model do you usually offer?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['Labour only', 'Labour + material', 'Turnkey', 'Custom quotation', 'Depends on project'].map(pm => (
                      <button
                        key={pm}
                        type="button"
                        onClick={() => setFormData({ ...formData, pricingModel: pm as PricingModel })}
                        className={`p-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                          formData.pricingModel === pm 
                            ? 'bg-slate-900 text-amber-400 border-slate-900' 
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {pm}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Written quotation & timeline */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Do you provide a written quotation before starting?</label>
                    <select
                      value={formData.providesWrittenQuotation || 'Always'}
                      onChange={(e) => setFormData({ ...formData, providesWrittenQuotation: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900 bg-white"
                    >
                      <option value="Always">Always</option>
                      <option value="Usually">Usually</option>
                      <option value="Sometimes">Sometimes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Do you provide estimated timeline before starting?</label>
                    <select
                      value={formData.providesEstimatedTimeline || 'Yes'}
                      onChange={(e) => setFormData({ ...formData, providesEstimatedTimeline: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900 bg-white"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>

                {/* Client changes */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">How do you normally handle changes requested by the client during construction?</label>
                  <textarea
                    rows={2}
                    value={formData.clientChangesHandling || ''}
                    onChange={(e) => setFormData({ ...formData, clientChangesHandling: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                    placeholder="e.g. Provide itemized written change estimate before carrying out modifications..."
                  />
                </div>

              </div>
            </div>
          )}

          {/* STEP 5: PROFESSIONAL PROFILE */}
          {currentStep === 5 && !showPreview && !showPaymentWall && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black font-serif text-slate-900">
                  Show Homeowners What You Can Build
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Upload photos, highlight your specialities, and describe your promise to clients.
                </p>
              </div>

              <div className="space-y-5 text-xs">
                {/* Photo & Logo */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Profile Photo URL</label>
                    <input
                      type="text"
                      value={formData.profilePhoto || ''}
                      onChange={(e) => setFormData({ ...formData, profilePhoto: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Image link of builder or owner photo</p>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Company Logo URL (Optional)</label>
                    <input
                      type="text"
                      value={formData.companyLogo || ''}
                      onChange={(e) => setFormData({ ...formData, companyLogo: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                    />
                  </div>
                </div>

                {/* Text fields */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">What makes your work different from other builders? *</label>
                  <textarea
                    rows={3}
                    value={formData.whatMakesDifferent || ''}
                    onChange={(e) => setFormData({ ...formData, whatMakesDifferent: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                    placeholder="Highlight quality cement, steel, regular supervision, anti-damp treatment..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">What type of homeowner / project is best suited for you?</label>
                  <textarea
                    rows={2}
                    value={formData.idealHomeownerType || ''}
                    onChange={(e) => setFormData({ ...formData, idealHomeownerType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                    placeholder="e.g. Homeowners with ready approved map looking for complete turnkey execution..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">What is one thing you always promise your clients?</label>
                  <textarea
                    rows={2}
                    value={formData.alwaysPromised || ''}
                    onChange={(e) => setFormData({ ...formData, alwaysPromised: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                    placeholder="e.g. Guaranteed completion within agreed timeframe without compromise on steel/cement grade."
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tell us about your best completed project</label>
                  <textarea
                    rows={2}
                    value={formData.bestCompletedProject || ''}
                    onChange={(e) => setFormData({ ...formData, bestCompletedProject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-medium text-slate-900"
                    placeholder="Details about sq ft, floors, finishes, and completion time of your flagship house project..."
                  />
                </div>

              </div>
            </div>
          )}

          {/* STEP 6: VERIFICATION */}
          {currentStep === 6 && !showPreview && !showPaymentWall && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black font-serif text-slate-900">
                  Let's Verify Your Profile
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Complete mobile OTP verification and submit business documents. Verification documents remain private.
                </p>
              </div>

              <div className="space-y-6 text-xs">
                
                {/* Mobile OTP Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-amber-600" /> Mobile OTP Verification
                    </span>
                    {otpVerified ? (
                      <span className="text-emerald-700 bg-emerald-100 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="text-slate-500 font-medium">Pending OTP</span>
                    )}
                  </div>

                  {!otpVerified && (
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={formData.mobileNumber}
                        readOnly
                        className="px-3 py-2 rounded-xl border border-slate-300 bg-slate-100 text-slate-700 font-medium"
                      />
                      {!otpSent ? (
                        <button
                          type="button"
                          onClick={() => setOtpSent(true)}
                          className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-600 transition-colors cursor-pointer"
                        >
                          Send OTP
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            maxLength={4}
                            className="w-20 px-3 py-2 text-center rounded-xl border border-amber-500 bg-white font-black tracking-widest text-slate-900"
                          />
                          <button
                            type="button"
                            onClick={() => setOtpVerified(true)}
                            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 cursor-pointer"
                          >
                            Verify
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Business Docs */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">GST Number (Optional)</label>
                    <input
                      type="text"
                      value={formData.verification?.gst || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        verification: { ...formData.verification!, gst: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-bold text-slate-900"
                      placeholder="e.g. 09AAAFS4321A1Z8"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">PAN Number</label>
                    <input
                      type="text"
                      value={formData.verification?.pan || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        verification: { ...formData.verification!, pan: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:outline-none font-bold text-slate-900"
                      placeholder="e.g. AAAFS4321A"
                    />
                  </div>
                </div>

                {/* Internal Verification Display */}
                <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
                  <span className="text-[11px] uppercase font-bold text-amber-400 tracking-wider">Internal Verification Status:</span>
                  <div className="flex items-center gap-6 text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" /> Phone ✓
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" /> Identity ✓
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-300">
                      <CheckCircle2 className="w-4 h-4" /> Business ✓
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Co-Builder maintains strict privacy. Sensitive document numbers are stored encrypted and never published on public builder cards.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* PROFILE PREVIEW STEP */}
          {showPreview && !showPaymentWall && (
            <div className="space-y-8">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-amber-900 font-bold">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Your Co-Builder Profile Information Has Been Saved.</span>
                </div>
                <span className="text-amber-700 font-semibold">Preview Mode</span>
              </div>

              <div>
                <h2 className="text-3xl font-black font-serif text-slate-900">
                  Your Co-Builder Profile is Ready
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Review how homeowners in {formData.city} will view your business card before activating your account.
                </p>
              </div>

              {/* Realistic Homeowner Facing Card Mockup */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">How Homeowners Will See You:</span>
                
                <div className="bg-white rounded-2xl border-2 border-amber-400 shadow-md overflow-hidden p-6 space-y-6">
                  
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                    <div className="flex items-center gap-4">
                      <img
                        src={formData.profilePhoto}
                        alt={formData.fullName}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 shadow-xs"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-black font-serif text-slate-900">{formData.fullName}</h3>
                          <span className="bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-2 py-0.5 rounded-full">
                            Priority
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-slate-600">{formData.businessName}</p>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-600" /> {formData.city} • {formData.areasServed?.join(', ')}
                        </p>
                      </div>
                    </div>

                    <div className="text-right sm:text-right">
                      <div className="text-xs font-bold text-amber-600">★ 5.0 (New Verified)</div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">{formData.yearsInConstruction} Experience</div>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Houses Built</span>
                      <p className="font-bold text-slate-900">{formData.housesCompleted}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Pricing Model</span>
                      <p className="font-bold text-slate-900">{formData.pricingModel}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Price / sq.ft</span>
                      <p className="font-bold text-amber-700">₹{formData.minPricePerSqFt} – ₹{formData.maxPricePerSqFt}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Avg Timeline</span>
                      <p className="font-bold text-slate-900">{formData.typicalTimeline}</p>
                    </div>
                  </div>

                  {/* Speciality text */}
                  <div className="space-y-2 text-xs">
                    <h4 className="font-bold text-slate-900">What Makes Our Work Different:</h4>
                    <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      "{formData.whatMakesDifferent}"
                    </p>
                  </div>

                  {/* Verification badges display */}
                  <div className="flex items-center gap-4 text-xs font-bold text-emerald-700 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Phone Verified</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Identity Verified</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Business Document Verified</span>
                  </div>

                </div>
              </div>

              {/* Action */}
              <div className="pt-4 text-center">
                <button
                  onClick={handleProceedToPayment}
                  className="px-10 py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-base shadow-lg shadow-amber-500/20 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Choose Plan & Activate Profile</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* PAYMENT WALL STEP */}
          {showPaymentWall && (
            <div className="space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 font-bold text-xs border border-amber-500/20 uppercase tracking-wider">
                  Final Step
                </span>
                <h2 className="text-3xl font-black font-serif text-slate-900">
                  Your Professional Profile Is Ready
                </h2>
                <p className="text-slate-600 text-sm">
                  Choose a plan to activate your profile and start receiving homeowner opportunities in {formData.city}.
                </p>
              </div>

              {/* Two Plans Cards */}
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                
                {/* STARTER PLAN */}
                <div 
                  onClick={() => setSelectedPlan('STARTER')}
                  className={`bg-white rounded-2xl p-6 border-2 transition-all cursor-pointer relative space-y-5 flex flex-col justify-between ${
                    selectedPlan === 'STARTER'
                      ? 'border-slate-900 ring-2 ring-slate-900/10 shadow-md'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 font-serif">STARTER</h3>
                        <p className="text-xs text-slate-500">Get discovered by homeowners</p>
                      </div>
                      <input
                        type="radio"
                        name="plan"
                        checked={selectedPlan === 'STARTER'}
                        onChange={() => setSelectedPlan('STARTER')}
                        className="w-5 h-5 accent-slate-900 cursor-pointer"
                      />
                    </div>

                    <div>
                      <span className="text-3xl font-black font-serif text-slate-900">₹2,000</span>
                      <span className="text-xs text-slate-500 font-medium ml-1">one-time annual fee</span>
                    </div>

                    <ul className="text-xs space-y-2.5 text-slate-700 font-medium">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Professional builder profile</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Portfolio gallery</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Location-based search visibility</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Basic homeowner lead notifications</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Direct connection requests</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> WhatsApp & Call contact options</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => { setSelectedPlan('STARTER'); setShowCheckoutModal(true); }}
                    className="w-full py-3 rounded-xl border border-slate-900 bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Register with Starter
                  </button>
                </div>

                {/* PRIORITY PLAN */}
                <div 
                  onClick={() => setSelectedPlan('PRIORITY')}
                  className={`bg-slate-900 text-white rounded-2xl p-6 border-2 transition-all cursor-pointer relative space-y-5 flex flex-col justify-between shadow-xl ${
                    selectedPlan === 'PRIORITY'
                      ? 'border-amber-500 ring-2 ring-amber-500/20'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="absolute -top-3 right-6 bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-full shadow-xs tracking-wider">
                    MOST POPULAR
                  </span>

                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-amber-400 font-serif flex items-center gap-1.5">
                          PRIORITY <Award className="w-4 h-4 text-amber-400" />
                        </h3>
                        <p className="text-xs text-slate-400">Get greater visibility and priority opportunities</p>
                      </div>
                      <input
                        type="radio"
                        name="plan"
                        checked={selectedPlan === 'PRIORITY'}
                        onChange={() => setSelectedPlan('PRIORITY')}
                        className="w-5 h-5 accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <span className="text-3xl font-black font-serif text-white">₹4,000</span>
                      <span className="text-xs text-amber-200/80 font-medium ml-1">one-time annual fee</span>
                    </div>

                    <ul className="text-xs space-y-2.5 text-slate-200 font-medium">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Everything in Starter plan</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Priority lead matching algorithm</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Top search placement in {formData.city}</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Elite profile badge & Priority tag</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Featured builder badge on search</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Priority matching for high-budget leads</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => { setSelectedPlan('PRIORITY'); setShowCheckoutModal(true); }}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-colors cursor-pointer"
                  >
                    Choose Priority (₹4,000)
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* QUESTIONNAIRE NAVIGATION CONTROLS */}
          {!showPreview && !showPaymentWall && (
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-200">
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{currentStep === 1 ? 'Cancel' : 'Previous'}</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-7 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>{currentStep === 6 ? 'Preview Profile' : 'Next Step'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* CHECKOUT MODAL SIMULATION */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 border border-slate-200 shadow-2xl relative">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold font-serif text-slate-900">Razorpay / Co-Builder Secure Checkout</h3>
                <p className="text-xs text-slate-500">Activating {selectedPlan} Builder Profile</p>
              </div>
              <button 
                onClick={() => setShowCheckoutModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Price Total Box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-500 font-medium">Subscription Plan</span>
                <p className="text-sm font-bold text-slate-900">{selectedPlan} Plan (1 Year)</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 font-medium">Total Amount</span>
                <p className="text-xl font-black text-amber-600 font-serif">
                  {selectedPlan === 'PRIORITY' ? '₹4,000' : '₹2,000'}
                </p>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 text-xs">
              <label className="block font-bold text-slate-700">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-xl border font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    paymentMethod === 'upi' ? 'bg-amber-500/15 border-amber-500 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-amber-600" />
                  <span>UPI / QR</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    paymentMethod === 'card' ? 'bg-amber-500/15 border-amber-500 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  <span>Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-2.5 rounded-xl border font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    paymentMethod === 'netbanking' ? 'bg-amber-500/15 border-amber-500 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <span>Netbanking</span>
                </button>
              </div>

              {paymentMethod === 'upi' && (
                <div className="pt-2 space-y-2">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                    placeholder="Enter VPA / UPI ID (e.g. mobile@upi)"
                  />
                  <p className="text-[10px] text-slate-400">Supports PhonePe, Google Pay, Paytm, BHIM</p>
                </div>
              )}
            </div>

            {/* Confirm Payment CTA */}
            <button
              disabled={isProcessingPayment}
              onClick={handleConfirmPayment}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessingPayment ? (
                <span>Activating Profile...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Pay {selectedPlan === 'PRIORITY' ? '₹4,000' : '₹2,000'} & Activate Profile</span>
                </>
              )}
            </button>

            <div className="text-center text-[10px] text-slate-400">
              256-bit Bank Grade Encrypted Payment Gateway
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
