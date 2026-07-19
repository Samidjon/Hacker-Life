import { useEffect, useRef, useState } from "react";

import { achievements } from "../data/achievements";
import { skills } from "../data/skills";
import { upgrades } from "../data/upgrades";

import type {
  Contract,
  DailyMission,
  DailyMissionProgress,
  Player,
  Skill,
  Upgrade,
} from "../types/game";

import { getAchievementValue } from "../utils/achievementProgress";

import { dailyLoginRewards } from "../data/daily";

const STORAGE_KEY = "hacker-life-save";
const ENERGY_DRINK_PRICE = 20;
const ENERGY_DRINK_AMOUNT = 40;

const ENERGY_REGENERATION_SECONDS = 60;
const ENERGY_REGENERATION_MS = ENERGY_REGENERATION_SECONDS * 1000;
function getLocalDateKey(timestamp = Date.now()): string {
  const date = new Date(timestamp);

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function createDailyProgress(): DailyMissionProgress {
  return {
    contractsCompleted: 0,
    creditsEarned: 0,
    energySpent: 0,
  };
}

function parseDateKey(dateKey: string): number {
  const [year, month, day] = dateKey.split("-").map(Number);

  return Date.UTC(year, month - 1, day);
}

function isPreviousDay(previousDate: string, currentDate: string): boolean {
  const oneDay = 24 * 60 * 60 * 1000;

  return parseDateKey(currentDate) - parseDateKey(previousDate) === oneDay;
}

function resetDailyStateIfNeeded(
  player: Player,
  timestamp = Date.now(),
): Player {
  const currentDate = getLocalDateKey(timestamp);

  if (player.dailyDate === currentDate) {
    return player;
  }

  return {
    ...player,
    dailyDate: currentDate,
    dailyMissionProgress: createDailyProgress(),
    claimedDailyMissions: [],
  };
}

function getSecondsUntilDailyReset(timestamp = Date.now()): number {
  const currentDate = new Date(timestamp);

  const nextDay = new Date(currentDate);

  nextDay.setHours(24, 0, 0, 0);

  return Math.max(
    0,
    Math.ceil((nextDay.getTime() - currentDate.getTime()) / 1000),
  );
}
function createInitialPlayer(): Player {
  return {
    username: "Anonymous",
    career: "Cybersecurity Student",
    level: 1,
    money: 100,
    energy: 100,
    maxEnergy: 100,
    experience: 0,
    experienceToNextLevel: 100,
    reputation: 0,
    completedContracts: 0,
    failedContracts: 0,
    ownedUpgrades: [],
    skillPoints: 1,
    unlockedSkills: [],
    lastEnergyUpdate: Date.now(),

    totalCreditsEarned: 0,
    achievementPoints: 0,
    unlockedAchievements: [],

    dailyDate: getLocalDateKey(),
    dailyMissionProgress: createDailyProgress(),
    claimedDailyMissions: [],

    lastDailyRewardDate: null,
    loginStreak: 0,
  };
}

export interface Bonuses {
  creditsMultiplier: number;
  experienceMultiplier: number;
  reputationMultiplier: number;
  maxEnergyBonus: number;
  energyCostReduction: number;
}
function recoverPassiveEnergy(
  player: Player,
  currentTime = Date.now(),
): Player {
  if (player.energy >= player.maxEnergy) {
    return player;
  }

  const elapsedTime = Math.max(0, currentTime - player.lastEnergyUpdate);

  const recoveredPoints = Math.floor(elapsedTime / ENERGY_REGENERATION_MS);

  if (recoveredPoints <= 0) {
    return player;
  }

  const newEnergy = Math.min(player.maxEnergy, player.energy + recoveredPoints);

  return {
    ...player,
    energy: newEnergy,

    // Если энергия полностью восстановилась,
    // не сохраняем лишнее накопленное время.
    lastEnergyUpdate:
      newEnergy >= player.maxEnergy
        ? currentTime
        : player.lastEnergyUpdate + recoveredPoints * ENERGY_REGENERATION_MS,
  };
}

function loadPlayer(): Player {
  const freshPlayer = createInitialPlayer();
  const savedPlayer = localStorage.getItem(STORAGE_KEY);

  if (!savedPlayer) {
    return freshPlayer;
  }

  try {
    const parsedPlayer = JSON.parse(savedPlayer) as Partial<Player>;

    const restoredPlayer: Player = {
      ...freshPlayer,
      ...parsedPlayer,

      ownedUpgrades: Array.isArray(parsedPlayer.ownedUpgrades)
        ? parsedPlayer.ownedUpgrades
        : [],

      unlockedSkills: Array.isArray(parsedPlayer.unlockedSkills)
        ? parsedPlayer.unlockedSkills
        : [],

      skillPoints:
        typeof parsedPlayer.skillPoints === "number"
          ? parsedPlayer.skillPoints
          : 1,

      failedContracts:
        typeof parsedPlayer.failedContracts === "number"
          ? parsedPlayer.failedContracts
          : 0,

      lastEnergyUpdate:
        typeof parsedPlayer.lastEnergyUpdate === "number"
          ? parsedPlayer.lastEnergyUpdate
          : Date.now(),

      totalCreditsEarned:
        typeof parsedPlayer.totalCreditsEarned === "number"
          ? parsedPlayer.totalCreditsEarned
          : 0,

      achievementPoints:
        typeof parsedPlayer.achievementPoints === "number"
          ? parsedPlayer.achievementPoints
          : 0,

      unlockedAchievements: Array.isArray(parsedPlayer.unlockedAchievements)
        ? parsedPlayer.unlockedAchievements
        : [],
      dailyDate:
        typeof parsedPlayer.dailyDate === "string"
          ? parsedPlayer.dailyDate
          : getLocalDateKey(),

      dailyMissionProgress: {
        ...createDailyProgress(),

        ...(parsedPlayer.dailyMissionProgress &&
        typeof parsedPlayer.dailyMissionProgress === "object"
          ? parsedPlayer.dailyMissionProgress
          : {}),
      },

      claimedDailyMissions: Array.isArray(parsedPlayer.claimedDailyMissions)
        ? parsedPlayer.claimedDailyMissions
        : [],

      lastDailyRewardDate:
        typeof parsedPlayer.lastDailyRewardDate === "string"
          ? parsedPlayer.lastDailyRewardDate
          : null,

      loginStreak:
        typeof parsedPlayer.loginStreak === "number"
          ? parsedPlayer.loginStreak
          : 0,
    };

    const currentTime = Date.now();

    const dailyUpdatedPlayer = resetDailyStateIfNeeded(
      restoredPlayer,
      currentTime,
    );

    return recoverPassiveEnergy(dailyUpdatedPlayer, currentTime);
  } catch {
    return freshPlayer;
  }
}

function getCareerByLevel(level: number): string {
  if (level >= 9) {
    return "Cybersecurity Company Founder";
  }

  if (level >= 8) {
    return "Security Architect";
  }

  if (level >= 7) {
    return "Cybersecurity Consultant";
  }

  if (level >= 6) {
    return "Red Team Specialist";
  }

  if (level >= 5) {
    return "Pentester";
  }

  if (level >= 4) {
    return "Junior Pentester";
  }

  if (level >= 3) {
    return "Security Analyst";
  }

  if (level >= 2) {
    return "Junior Freelancer";
  }

  return "Cybersecurity Student";
}

function calculateBonuses(
  ownedUpgrades: number[],
  unlockedSkills: number[],
): Bonuses {
  const bonuses: Bonuses = {
    creditsMultiplier: 1,
    experienceMultiplier: 1,
    reputationMultiplier: 1,
    maxEnergyBonus: 0,
    energyCostReduction: 0,
  };

  upgrades.forEach((upgrade) => {
    if (!ownedUpgrades.includes(upgrade.id)) {
      return;
    }

    if (upgrade.effect === "credits") {
      bonuses.creditsMultiplier += upgrade.amount;
    }

    if (upgrade.effect === "experience") {
      bonuses.experienceMultiplier += upgrade.amount;
    }

    if (upgrade.effect === "reputation") {
      bonuses.reputationMultiplier += upgrade.amount;
    }

    if (upgrade.effect === "maxEnergy") {
      bonuses.maxEnergyBonus += upgrade.amount;
    }
  });

  skills.forEach((skill) => {
    if (!unlockedSkills.includes(skill.id)) {
      return;
    }

    if (skill.effect === "credits") {
      bonuses.creditsMultiplier += skill.amount;
    }

    if (skill.effect === "experience") {
      bonuses.experienceMultiplier += skill.amount;
    }

    if (skill.effect === "reputation") {
      bonuses.reputationMultiplier += skill.amount;
    }

    if (skill.effect === "energyEfficiency") {
      bonuses.energyCostReduction += skill.amount;
    }
  });

  bonuses.energyCostReduction = Math.min(bonuses.energyCostReduction, 0.5);

  return bonuses;
}

function calculateEnergyCost(contract: Contract, bonuses: Bonuses): number {
  return Math.max(
    1,
    Math.ceil(contract.energyCost * (1 - bonuses.energyCostReduction)),
  );
}

function getNextLoginRewardDay(player: Player, currentDate: string): number {
  if (!player.lastDailyRewardDate) {
    return 1;
  }

  if (player.lastDailyRewardDate === currentDate) {
    return Math.max(1, player.loginStreak);
  }

  if (isPreviousDay(player.lastDailyRewardDate, currentDate)) {
    return player.loginStreak >= 7 ? 1 : player.loginStreak + 1;
  }

  return 1;
}

export function useGame() {
  const [player, setPlayer] = useState<Player>(loadPlayer);

  const [notification, setNotification] = useState("");

  const [currentTime, setCurrentTime] = useState(Date.now());

  const notificationTimer = useRef<number | null>(null);

  const bonuses = calculateBonuses(player.ownedUpgrades, player.unlockedSkills);

  const isEnergyFull = player.energy >= player.maxEnergy;

  const elapsedEnergyTime = Math.max(0, currentTime - player.lastEnergyUpdate);

  const currentEnergyCycle = elapsedEnergyTime % ENERGY_REGENERATION_MS;

  const currentDate = getLocalDateKey(currentTime);

  const dailyRewardClaimedToday = player.lastDailyRewardDate === currentDate;

  const nextDailyRewardDay = getNextLoginRewardDay(player, currentDate);

  const nextDailyReward =
    dailyLoginRewards.find((reward) => reward.day === nextDailyRewardDay) ??
    dailyLoginRewards[0];

  const dailyResetSeconds = getSecondsUntilDailyReset(currentTime);

  const energyRegenerationSeconds = isEnergyFull
    ? 0
    : Math.max(
        1,
        Math.ceil((ENERGY_REGENERATION_MS - currentEnergyCycle) / 1000),
      );

  const energyRegenerationProgress = isEnergyFull
    ? 100
    : Math.min(100, (currentEnergyCycle / ENERGY_REGENERATION_MS) * 100);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
  }, [player]);

  useEffect(() => {
    return () => {
      if (notificationTimer.current !== null) {
        window.clearTimeout(notificationTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const gameTimer = window.setInterval(() => {
      const now = Date.now();

      setCurrentTime(now);

      setPlayer((currentPlayer) => {
        const dailyUpdatedPlayer = resetDailyStateIfNeeded(currentPlayer, now);

        return recoverPassiveEnergy(dailyUpdatedPlayer, now);
      });
    }, 1000);

    return () => {
      window.clearInterval(gameTimer);
    };
  }, []);

  useEffect(() => {
    const newlyUnlocked = achievements.filter((achievement) => {
      const alreadyUnlocked = player.unlockedAchievements.includes(
        achievement.id,
      );

      if (alreadyUnlocked) {
        return false;
      }

      return getAchievementValue(player, achievement) >= achievement.target;
    });

    if (newlyUnlocked.length === 0) {
      return;
    }

    const creditsReward = newlyUnlocked.reduce(
      (total, achievement) => total + achievement.rewardCredits,
      0,
    );

    const skillPointsReward = newlyUnlocked.reduce(
      (total, achievement) => total + achievement.rewardSkillPoints,
      0,
    );

    const achievementPointsReward = newlyUnlocked.reduce(
      (total, achievement) => total + achievement.points,
      0,
    );

    setPlayer((currentPlayer) => ({
      ...currentPlayer,

      money: currentPlayer.money + creditsReward,

      skillPoints: currentPlayer.skillPoints + skillPointsReward,

      achievementPoints:
        currentPlayer.achievementPoints + achievementPointsReward,

      unlockedAchievements: [
        ...currentPlayer.unlockedAchievements,
        ...newlyUnlocked.map((achievement) => achievement.id),
      ],
    }));

    if (newlyUnlocked.length === 1) {
      showNotification(`Achievement unlocked: ${newlyUnlocked[0].name}!`);
    } else {
      showNotification(`${newlyUnlocked.length} achievements unlocked!`);
    }
  }, [
    player.level,
    player.completedContracts,
    player.reputation,
    player.totalCreditsEarned,
    player.ownedUpgrades,
    player.unlockedSkills,
    player.unlockedAchievements,
  ]);

  function claimDailyMission(mission: DailyMission) {
    const currentPlayer = resetDailyStateIfNeeded(player);

    if (currentPlayer.claimedDailyMissions.includes(mission.id)) {
      showNotification("This daily mission reward has already been claimed.");

      return;
    }

    const missionProgress = currentPlayer.dailyMissionProgress[mission.metric];

    if (missionProgress < mission.target) {
      showNotification("This daily mission is not complete yet.");

      return;
    }

    setPlayer({
      ...currentPlayer,

      money: currentPlayer.money + mission.rewardCredits,

      skillPoints: currentPlayer.skillPoints + mission.rewardSkillPoints,

      claimedDailyMissions: [...currentPlayer.claimedDailyMissions, mission.id],
    });

    showNotification(`Daily mission completed: ${mission.title}.`);
  }

  function claimDailyLoginReward() {
    const currentPlayer = resetDailyStateIfNeeded(player);

    const today = getLocalDateKey();

    if (currentPlayer.lastDailyRewardDate === today) {
      showNotification("Today's login reward has already been claimed.");

      return;
    }

    const rewardDay = getNextLoginRewardDay(currentPlayer, today);

    const reward =
      dailyLoginRewards.find((item) => item.day === rewardDay) ??
      dailyLoginRewards[0];

    const restoredEnergy = Math.min(
      currentPlayer.maxEnergy,
      currentPlayer.energy + reward.energy,
    );

    setPlayer({
      ...currentPlayer,

      money: currentPlayer.money + reward.credits,

      energy: restoredEnergy,

      skillPoints: currentPlayer.skillPoints + reward.skillPoints,

      loginStreak: rewardDay,

      lastDailyRewardDate: today,

      lastEnergyUpdate:
        restoredEnergy >= currentPlayer.maxEnergy
          ? Date.now()
          : currentPlayer.lastEnergyUpdate,
    });

    showNotification(`Day ${rewardDay} login reward claimed.`);
  }

  function showNotification(message: string) {
    setNotification(message);

    if (notificationTimer.current !== null) {
      window.clearTimeout(notificationTimer.current);
    }

    notificationTimer.current = window.setTimeout(() => {
      setNotification("");
    }, 3000);
  }

  function getContractEnergyCost(contract: Contract): number {
    return calculateEnergyCost(contract, bonuses);
  }

  function resolveContract(contract: Contract, successful: boolean) {
    const currentPlayer = resetDailyStateIfNeeded(player);

    if (currentPlayer.level < contract.requiredLevel) {
      showNotification(
        `You need level ${contract.requiredLevel} to start this contract.`,
      );

      return;
    }

    const currentBonuses = calculateBonuses(
      currentPlayer.ownedUpgrades,
      currentPlayer.unlockedSkills,
    );

    const energyCost = calculateEnergyCost(contract, currentBonuses);

    if (currentPlayer.energy < energyCost) {
      showNotification("Not enough energy to complete this contract.");

      return;
    }

    const dailyProgress = {
      ...currentPlayer.dailyMissionProgress,

      energySpent: currentPlayer.dailyMissionProgress.energySpent + energyCost,
    };

    if (!successful) {
      setPlayer({
        ...currentPlayer,

        energy: currentPlayer.energy - energyCost,

        failedContracts: currentPlayer.failedContracts + 1,

        dailyMissionProgress: dailyProgress,

        lastEnergyUpdate:
          currentPlayer.energy >= currentPlayer.maxEnergy
            ? Date.now()
            : currentPlayer.lastEnergyUpdate,
      });

      showNotification(`Contract failed. ${energyCost} energy was spent.`);

      return;
    }

    const creditsReward = Math.round(
      contract.reward * currentBonuses.creditsMultiplier,
    );

    const experienceReward = Math.round(
      contract.experienceReward * currentBonuses.experienceMultiplier,
    );

    const reputationReward = Math.round(
      contract.reputationReward * currentBonuses.reputationMultiplier,
    );

    let newLevel = currentPlayer.level;

    let newExperience = currentPlayer.experience + experienceReward;

    let newExperienceTarget = currentPlayer.experienceToNextLevel;

    let levelsGained = 0;

    while (newExperience >= newExperienceTarget) {
      newExperience -= newExperienceTarget;
      newLevel += 1;
      levelsGained += 1;
      newExperienceTarget = newLevel * 100;
    }

    setPlayer({
      ...currentPlayer,

      career: getCareerByLevel(newLevel),

      level: newLevel,

      experience: newExperience,

      experienceToNextLevel: newExperienceTarget,

      money: currentPlayer.money + creditsReward,

      totalCreditsEarned: currentPlayer.totalCreditsEarned + creditsReward,

      energy: currentPlayer.energy - energyCost,

      reputation: currentPlayer.reputation + reputationReward,

      completedContracts: currentPlayer.completedContracts + 1,

      skillPoints: currentPlayer.skillPoints + levelsGained,

      dailyMissionProgress: {
        ...dailyProgress,

        contractsCompleted:
          currentPlayer.dailyMissionProgress.contractsCompleted + 1,

        creditsEarned:
          currentPlayer.dailyMissionProgress.creditsEarned + creditsReward,
      },

      lastEnergyUpdate:
        currentPlayer.energy >= currentPlayer.maxEnergy
          ? Date.now()
          : currentPlayer.lastEnergyUpdate,
    });

    if (levelsGained > 0) {
      showNotification(
        `Level ${newLevel} reached! You received ${levelsGained} skill point${levelsGained > 1 ? "s" : ""}.`,
      );

      return;
    }

    showNotification(
      `Contract completed! +$${creditsReward}, +${experienceReward} XP and +${reputationReward} reputation.`,
    );
  }

  function purchaseUpgrade(upgrade: Upgrade) {
    if (player.ownedUpgrades.includes(upgrade.id)) {
      showNotification("You already own this upgrade.");

      return;
    }

    if (player.level < upgrade.requiredLevel) {
      showNotification(
        `You need level ${upgrade.requiredLevel} to purchase this upgrade.`,
      );

      return;
    }

    if (player.money < upgrade.price) {
      showNotification(
        `Not enough credits. You need $${upgrade.price - player.money} more.`,
      );

      return;
    }

    const increasesEnergy = upgrade.effect === "maxEnergy";

    setPlayer({
      ...player,
      money: player.money - upgrade.price,
      ownedUpgrades: [...player.ownedUpgrades, upgrade.id],
      maxEnergy: increasesEnergy
        ? player.maxEnergy + upgrade.amount
        : player.maxEnergy,
      energy: increasesEnergy ? player.energy + upgrade.amount : player.energy,
    });

    showNotification(`${upgrade.name} purchased successfully.`);
  }

  function unlockSkill(skill: Skill) {
    if (player.unlockedSkills.includes(skill.id)) {
      showNotification("This skill is already unlocked.");

      return;
    }

    if (player.level < skill.requiredLevel) {
      showNotification(
        `You need level ${skill.requiredLevel} to unlock this skill.`,
      );

      return;
    }

    if (
      skill.requiresSkillId &&
      !player.unlockedSkills.includes(skill.requiresSkillId)
    ) {
      const requiredSkill = skills.find(
        (item) => item.id === skill.requiresSkillId,
      );

      showNotification(
        `Unlock ${requiredSkill?.name ?? "the previous skill"} first.`,
      );

      return;
    }

    if (player.skillPoints < skill.cost) {
      showNotification(
        `You need ${skill.cost} skill point${skill.cost > 1 ? "s" : ""}.`,
      );

      return;
    }

    setPlayer({
      ...player,
      skillPoints: player.skillPoints - skill.cost,
      unlockedSkills: [...player.unlockedSkills, skill.id],
    });

    showNotification(`${skill.name} unlocked successfully.`);
  }

  function restoreEnergy() {
    if (player.energy >= player.maxEnergy) {
      showNotification("Your energy is already full.");

      return;
    }

    if (player.money < ENERGY_DRINK_PRICE) {
      showNotification(
        `You need $${ENERGY_DRINK_PRICE} to buy an energy drink.`,
      );

      return;
    }

    const restoredEnergy = Math.min(
      player.energy + ENERGY_DRINK_AMOUNT,
      player.maxEnergy,
    );

    setPlayer({
      ...player,
      money: player.money - ENERGY_DRINK_PRICE,
      energy: restoredEnergy,

      lastEnergyUpdate:
        restoredEnergy >= player.maxEnergy
          ? Date.now()
          : player.lastEnergyUpdate,
    });

    showNotification(`Energy drink purchased. +${ENERGY_DRINK_AMOUNT} energy.`);
  }

  function resetProgress() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your progress?",
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(STORAGE_KEY);
    setPlayer(createInitialPlayer());

    showNotification("Game progress has been reset.");
  }

  return {
    player,
    bonuses,
    notification,

    energyRegenerationSeconds,
    energyRegenerationProgress,

    dailyRewardClaimedToday,
    nextDailyRewardDay,
    nextDailyReward,
    dailyResetSeconds,

    resolveContract,
    getContractEnergyCost,
    purchaseUpgrade,
    unlockSkill,
    restoreEnergy,

    claimDailyMission,
    claimDailyLoginReward,

    resetProgress,
  };
}
