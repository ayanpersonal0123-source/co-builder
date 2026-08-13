import { BuilderProfile, HomeownerProject, LeadMatch } from '../types';

export function calculateMatchScore(builder: BuilderProfile, project: HomeownerProject): { score: number; reasons: string[] } {
  let score = 50; // base score for active qualified builders
  const reasons: string[] = [];

  // 1. Location match (Max 35 points)
  const cityMatch = builder.city.toLowerCase().trim() === project.city.toLowerCase().trim();
  const areaMatch = builder.areasServed.some(a => 
    a.toLowerCase().includes(project.locality.toLowerCase()) || 
    project.locality.toLowerCase().includes(a.toLowerCase())
  );

  if (cityMatch) {
    score += 25;
    if (areaMatch) {
      score += 10;
      reasons.push(`Operates directly in ${project.locality}, ${project.city}`);
    } else {
      reasons.push(`Based in ${builder.city}`);
    }
  }

  // 2. Project Type & Max Floors match (Max 15 points)
  const handlesType = builder.projectTypes.some(pt => pt === project.houseType);
  if (handlesType) {
    score += 10;
    reasons.push(`Experienced in ${project.houseType}`);
  }

  // Check floor capability
  const floorOrder = ['Ground Floor', 'G+1', 'G+2', 'G+3', 'G+4', 'Other'];
  const builderMaxFloorIdx = floorOrder.indexOf(builder.maxFloors);
  const projectFloorIdx = floorOrder.indexOf(project.floors);

  if (builderMaxFloorIdx >= projectFloorIdx && projectFloorIdx !== -1) {
    score += 5;
    reasons.push(`Capable of handling up to ${builder.maxFloors} structures`);
  }

  // 3. Budget Alignment (Max 15 points)
  if (builder.typicalBudgetRange === project.budgetRange) {
    score += 15;
    reasons.push(`Direct alignment with your ₹${project.budgetRange.replace('₹', '')} budget`);
  } else {
    // Partial budget match logic
    score += 8;
    reasons.push(`Flexible budget model (${builder.pricingModel})`);
  }

  // 4. Pricing / Sq Ft compatibility (Max 10 points)
  const estBudgetINR = parseBudgetApprox(project.budgetRange);
  if (project.plotSizeSqFt > 0 && estBudgetINR > 0) {
    const projEstPricePerSqFt = estBudgetINR / project.plotSizeSqFt;
    if (projEstPricePerSqFt >= builder.minPricePerSqFt * 0.8 && projEstPricePerSqFt <= builder.maxPricePerSqFt * 1.3) {
      score += 10;
      reasons.push(`Price per sq.ft fits typical rate (₹${builder.minPricePerSqFt}-${builder.maxPricePerSqFt}/sqft)`);
    }
  }

  // 5. Turnkey / Labour Preference (Max 10 points)
  if (project.constructionPreference === builder.pricingModel || builder.pricingModel === 'Turnkey') {
    score += 10;
    reasons.push(`Offers ${builder.pricingModel} contractual model`);
  }

  // Priority boost for Priority plan builders
  if (builder.plan === 'PRIORITY') {
    score += 3;
    reasons.push('Priority Verified Builder');
  }

  // Cap score at 98% (never claim 100% per prompt guidelines)
  const finalScore = Math.min(98, Math.max(68, score));

  return {
    score: finalScore,
    reasons: reasons.slice(0, 4)
  };
}

function parseBudgetApprox(budgetRangeStr: string): number {
  if (budgetRangeStr.includes('Under ₹15')) return 1200000;
  if (budgetRangeStr.includes('₹15–25')) return 2000000;
  if (budgetRangeStr.includes('₹25–40')) return 3200000;
  if (budgetRangeStr.includes('₹40–60')) return 5000000;
  if (budgetRangeStr.includes('₹60 lakh–₹1 crore')) return 8000000;
  if (budgetRangeStr.includes('₹1 crore+')) return 12000000;
  return 3000000;
}

export function matchBuildersForProject(builders: BuilderProfile[], project: HomeownerProject): LeadMatch[] {
  return builders
    .filter(b => b.status === 'active')
    .map(builder => {
      const { score, reasons } = calculateMatchScore(builder, project);
      return {
        builder,
        matchScore: score,
        matchReasons: reasons
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
