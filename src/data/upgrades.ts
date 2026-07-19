import type { Upgrade } from "../types/game";

export const upgrades: Upgrade[] = [
  {
    id: 1,
    name: "Refurbished Laptop",
    description:
      "A faster laptop allows you to finish client work more efficiently.",
    price: 150,
    requiredLevel: 1,
    category: "Hardware",
    effect: "credits",
    amount: 0.1,
    effectLabel: "+10% contract credits",
    icon: ">_",
  },
  {
    id: 2,
    name: "Cybersecurity Course",
    description:
      "Structured training helps you learn more from every completed contract.",
    price: 200,
    requiredLevel: 1,
    category: "Education",
    effect: "experience",
    amount: 0.2,
    effectLabel: "+20% contract experience",
    icon: "XP",
  },
  {
    id: 3,
    name: "Second Monitor",
    description:
      "More screen space improves productivity and reduces mental fatigue.",
    price: 300,
    requiredLevel: 2,
    category: "Hardware",
    effect: "maxEnergy",
    amount: 15,
    effectLabel: "+15 maximum energy",
    icon: "▣",
  },
  {
    id: 4,
    name: "Professional Toolkit",
    description:
      "A collection of professional utilities improves the quality of your work.",
    price: 400,
    requiredLevel: 2,
    category: "Software",
    effect: "reputation",
    amount: 0.25,
    effectLabel: "+25% contract reputation",
    icon: "KEY",
  },
  {
    id: 5,
    name: "Home Server",
    description:
      "Run automated services and complete larger contracts more efficiently.",
    price: 750,
    requiredLevel: 3,
    category: "Infrastructure",
    effect: "credits",
    amount: 0.25,
    effectLabel: "+25% contract credits",
    icon: "SRV",
  },
  {
    id: 6,
    name: "Personal Cyber Lab",
    description:
      "A private testing environment accelerates practical cybersecurity training.",
    price: 900,
    requiredLevel: 4,
    category: "Infrastructure",
    effect: "experience",
    amount: 0.35,
    effectLabel: "+35% contract experience",
    icon: "LAB",
  },
];