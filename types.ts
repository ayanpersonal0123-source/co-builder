export type ContractorType = 
  | 'General Contractor'
  | 'Civil Contractor'
  | 'Thekedar'
  | 'Turnkey Contractor'
  | 'Builder'
  | 'Other';

export type ExperienceRange =
  | 'Less than 2 years'
  | '2–5 years'
  | '5–10 years'
  | '10–15 years'
  | '15–20 years'
  | '20+ years';

export type CompletedHousesRange =
  | '1–5'
  | '6–10'
  | '11–25'
  | '26–50'
  | '51–100'
  | '100+';

export type ProjectType =
  | 'Independent Houses'
  | 'Villas'
  | 'Apartments'
  | 'Duplex Houses'
  | 'Commercial Buildings'
  | 'Renovation'
  | 'Extensions'
  | 'Other';

export type MaxFloors =
  | 'Ground Floor'
  | 'G+1'
  | 'G+2'
  | 'G+3'
  | 'G+4'
  | 'Other';

export type TimelineRange =
  | '3–5 months'
  | '5–7 months'
  | '7–9 months'
  | '9–12 months'
  | '12+ months';

export type ConstructionScope =
  | 'Foundation'
  | 'RCC'
  | 'Brickwork'
  | 'Plaster'
  | 'Electrical'
  | 'Plumbing'
  | 'Flooring'
  | 'Painting'
  | 'Waterproofing'
  | 'Full turnkey construction';

export type LabourModel =
  | 'I have my own permanent labour team'
  | 'Mostly my own team'
  | 'Mix of own + third-party labour'
  | 'Mostly third-party labour'
  | 'I arrange labour project-by-project';

export type BudgetRange =
  | 'Under ₹15 lakh'
  | '₹15–25 lakh'
  | '₹25–40 lakh'
  | '₹40–60 lakh'
  | '₹60 lakh–₹1 crore'
  | '₹1 crore+';

export type PricingModel =
  | 'Labour only'
  | 'Labour + material'
  | 'Turnkey'
  | 'Custom quotation'
  | 'Depends on project';

export type PlanTier = 'STARTER' | 'PRIORITY' | 'FREE_TRIAL';

export interface VerificationStatus {
  phone: boolean;
  identity: boolean;
  business: boolean;
  gst?: string;
  pan?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  location: string;
  sqft: number;
  imageUrl: string;
  category: string;
  completionYear: string;
}

export interface BuilderProfile {
  id: string;
  fullName: string;
  businessName: string;
  mobileNumber: string;
  whatsappNumber: string;
  email: string;
  city: string;
  areasServed: string[];
  fullAddress: string;
  yearsInConstruction: ExperienceRange;
  currentOccupation: string;
  contractorType: ContractorType;
  storyHowStarted: string;

  // Experience
  housesCompleted: CompletedHousesRange;
  projectTypes: ProjectType[];
  maxFloors: MaxFloors;
  avgHouseSizeSqFt: number;
  residentialPercentage: number;

  // Capability
  typicalTimeline: TimelineRange;
  timelineAffectingFactors: string[];
  workManaged: ConstructionScope[];
  labourModel: LabourModel;
  availableWorkersCount: number;

  // Budget & Pricing
  typicalBudgetRange: BudgetRange;
  minPricePerSqFt: number;
  maxPricePerSqFt: number;
  pricingModel: PricingModel;
  providesWrittenQuotation: 'Always' | 'Usually' | 'Sometimes' | 'No';
  providesEstimatedTimeline: 'Yes' | 'No';
  clientChangesHandling: string;

  // Professional Profile
  profilePhoto: string;
  companyLogo: string;
  portfolio: PortfolioItem[];
  whatMakesDifferent: string;
  idealHomeownerType: string;
  alwaysPromised: string;
  bestCompletedProject: string;

  // Platform & Verification
  verification: VerificationStatus;
  plan: PlanTier;
  status: 'active' | 'pending_approval' | 'suspended';
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface HomeownerProject {
  id: string;
  homeownerName: string;
  mobileNumber: string;
  whatsappNumber: string;
  city: string;
  locality: string;
  plotSizeSqFt: number;
  houseType: ProjectType;
  floors: MaxFloors;
  budgetRange: BudgetRange;
  expectedStartDate: string;
  desiredTimeline: TimelineRange;
  constructionPreference: PricingModel;
  labourMaterialPreference: string;
  houseMapUrl?: string;
  houseMapName?: string;
  additionalRequirements: string;
  createdAt: string;
  status: 'open' | 'matched' | 'closed';
}

export interface LeadMatch {
  builder: BuilderProfile;
  matchScore: number;
  matchReasons: string[];
}

export interface ConnectionRequest {
  id: string;
  projectId: string;
  homeownerName: string;
  homeownerPhone: string;
  homeownerCity: string;
  builderId: string;
  builderName: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'connected' | 'rejected';
}

export interface AdminStats {
  totalBuilders: number;
  activePriorityBuilders: number;
  totalHomeownerLeads: number;
  totalMatchesMade: number;
  totalRevenueINR: number;
}
