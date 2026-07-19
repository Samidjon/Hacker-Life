export interface Player {
  username: string;
  career: string;
  level: number;
  money: number;
  energy: number;
  maxEnergy: number;
  experience: number;
  experienceToNextLevel: number;
  reputation: number;
  completedContracts: number;
  failedContracts: number;
  ownedUpgrades: number[];
  skillPoints: number;
  unlockedSkills: number[];
  lastEnergyUpdate: number;

  totalCreditsEarned: number;
  achievementPoints: number;
  unlockedAchievements: number[];

  dailyDate: string;
  dailyMissionProgress: DailyMissionProgress;
  claimedDailyMissions: number[];

  lastDailyRewardDate: string | null;
  loginStreak: number;
}

export interface ContractChallenge {
  scenario: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Contract {
  id: number;
  title: string;
  description: string;
  reward: number;
  experienceReward: number;
  reputationReward: number;
  energyCost: number;
  requiredLevel: number;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  challenge: ContractChallenge;
}

export type UpgradeEffect =
  | "credits"
  | "experience"
  | "reputation"
  | "maxEnergy";

export interface Upgrade {
  id: number;
  name: string;
  description: string;
  price: number;
  requiredLevel: number;
  category: "Hardware" | "Education" | "Software" | "Infrastructure";
  effect: UpgradeEffect;
  amount: number;
  effectLabel: string;
  icon: string;
}

export type SkillCategory = "Development" | "Security" | "Operations";

export type SkillEffect =
  | "credits"
  | "experience"
  | "reputation"
  | "energyEfficiency";

export interface Skill {
  id: number;
  name: string;
  description: string;
  category: SkillCategory;
  code: string;
  cost: number;
  requiredLevel: number;
  requiresSkillId?: number;
  effect: SkillEffect;
  amount: number;
  effectLabel: string;
}

export type AchievementMetric =
  | "completedContracts"
  | "level"
  | "reputation"
  | "ownedUpgrades"
  | "unlockedSkills"
  | "totalCreditsEarned";

export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  metric: AchievementMetric;
  target: number;
  points: number;
  rewardCredits: number;
  rewardSkillPoints: number;
}

export type DailyMissionMetric =
  | "contractsCompleted"
  | "creditsEarned"
  | "energySpent";

export interface DailyMissionProgress {
  contractsCompleted: number;
  creditsEarned: number;
  energySpent: number;
}

export interface DailyMission {
  id: number;
  title: string;
  description: string;
  icon: string;
  metric: DailyMissionMetric;
  target: number;
  rewardCredits: number;
  rewardSkillPoints: number;
}

export interface DailyLoginReward {
  day: number;
  credits: number;
  energy: number;
  skillPoints: number;
}
