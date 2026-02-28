
export interface StartupInput {
  name: string;
  problem: string;
  audience: string;
  industry: string;
  revenueModel: string;
  competitors?: string;
  budget: 'bootstrap' | 'seed' | 'series-a';
}

export interface AnalysisResult {
  problemSolved: string;
  targetUsers: string;
  whyItMightWork: string[];
  mainRisks: string[];
  monetizationCheck: string;
  improvements: string[];
  marketGapStrength: 'Weak' | 'Moderate' | 'Strong';
  riskScore: 'Low' | 'Medium' | 'High';
  growthPotential: number; // 0-10
  confidenceScore: number; // 0-100
}

export interface SpyResult {
  name: string;
  strengths: string[];
  weaknesses: string[];
  differentiationIdeas: string[];
  pressureLevel: 'Low' | 'Medium' | 'High';
  founder?: string;
  estimatedRevenue?: string;
  marketShare?: string;
}

export interface RadarData {
  failurePatterns: {
    pattern: string;
    risk: 'Low' | 'Medium' | 'High' | 'Critical';
    description: string;
    realWorldExample: string;
  }[];
  opportunityIndustries: {
    industry: string;
    growth: string;
    trend: 'Up' | 'Down' | 'Steady';
    description: string;
    keyDrivers: string[];
  }[];
  lastUpdated: string;
}

export interface Expert {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  bio: string;
  availability: string;
  avatar: string;
}

export enum AppState {
  LANDING = 'landing',
  AUTH = 'auth',
  ANALYZER = 'analyzer',
  SPY_MODE = 'spy_mode',
  EXPERTS = 'experts',
  PUBLIC_FORUM = 'public_forum',
  TREND_RADAR = 'trend_radar',
  HISTORY = 'history',
  ENDING = 'ending'
}

export interface ForumMessage {
  id: string;
  user: string;
  text: string;
  timestamp: number;
  startupName?: string;
}
