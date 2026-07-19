import type {
  DailyLoginReward,
  DailyMission,
} from "../types/game";

export const dailyMissions: DailyMission[] = [
  {
    id: 1,
    title: "Active Operator",
    description:
      "Successfully complete 3 contracts today.",
    icon: "OPS",
    metric: "contractsCompleted",
    target: 3,
    rewardCredits: 60,
    rewardSkillPoints: 0,
  },
  {
    id: 2,
    title: "Credit Hunter",
    description:
      "Earn 150 credits from successful contracts today.",
    icon: "$",
    metric: "creditsEarned",
    target: 150,
    rewardCredits: 80,
    rewardSkillPoints: 0,
  },
  {
    id: 3,
    title: "No Rest",
    description:
      "Spend 50 energy while completing contracts today.",
    icon: "NRG",
    metric: "energySpent",
    target: 50,
    rewardCredits: 100,
    rewardSkillPoints: 1,
  },
];

export const dailyLoginRewards: DailyLoginReward[] = [
  {
    day: 1,
    credits: 50,
    energy: 0,
    skillPoints: 0,
  },
  {
    day: 2,
    credits: 75,
    energy: 20,
    skillPoints: 0,
  },
  {
    day: 3,
    credits: 100,
    energy: 0,
    skillPoints: 1,
  },
  {
    day: 4,
    credits: 125,
    energy: 30,
    skillPoints: 0,
  },
  {
    day: 5,
    credits: 175,
    energy: 0,
    skillPoints: 1,
  },
  {
    day: 6,
    credits: 225,
    energy: 50,
    skillPoints: 0,
  },
  {
    day: 7,
    credits: 350,
    energy: 100,
    skillPoints: 2,
  },
];