import type { Achievement } from "../types/game";

export const achievements: Achievement[] = [
  {
    id: 1,
    name: "First Job",
    description:
      "Successfully complete your first contract.",
    icon: "01",
    metric: "completedContracts",
    target: 1,
    points: 10,
    rewardCredits: 50,
    rewardSkillPoints: 0,
  },
  {
    id: 2,
    name: "Reliable Freelancer",
    description:
      "Successfully complete 10 contracts.",
    icon: "10",
    metric: "completedContracts",
    target: 10,
    points: 25,
    rewardCredits: 150,
    rewardSkillPoints: 1,
  },
  {
    id: 3,
    name: "Contract Veteran",
    description:
      "Successfully complete 50 contracts.",
    icon: "50",
    metric: "completedContracts",
    target: 50,
    points: 50,
    rewardCredits: 500,
    rewardSkillPoints: 2,
  },
  {
    id: 4,
    name: "Rising Specialist",
    description:
      "Reach career level 3.",
    icon: "LVL",
    metric: "level",
    target: 3,
    points: 20,
    rewardCredits: 100,
    rewardSkillPoints: 1,
  },
  {
    id: 5,
    name: "Elite Operator",
    description:
      "Reach career level 6.",
    icon: "ELT",
    metric: "level",
    target: 6,
    points: 50,
    rewardCredits: 400,
    rewardSkillPoints: 2,
  },
  {
    id: 6,
    name: "Known in the Underground",
    description:
      "Accumulate 50 reputation points.",
    icon: "REP",
    metric: "reputation",
    target: 50,
    points: 30,
    rewardCredits: 250,
    rewardSkillPoints: 1,
  },
  {
    id: 7,
    name: "Hardware Collector",
    description:
      "Purchase 3 upgrades from the Black Market.",
    icon: "HW",
    metric: "ownedUpgrades",
    target: 3,
    points: 25,
    rewardCredits: 200,
    rewardSkillPoints: 1,
  },
  {
    id: 8,
    name: "Knowledge Network",
    description:
      "Unlock 4 permanent skills.",
    icon: "SKL",
    metric: "unlockedSkills",
    target: 4,
    points: 30,
    rewardCredits: 200,
    rewardSkillPoints: 1,
  },
  {
    id: 9,
    name: "First Thousand",
    description:
      "Earn a total of 1,000 credits from contracts.",
    icon: "$1K",
    metric: "totalCreditsEarned",
    target: 1000,
    points: 35,
    rewardCredits: 250,
    rewardSkillPoints: 1,
  },
];