import type {
  Achievement,
  Player,
} from "../types/game";

export function getAchievementValue(
  player: Player,
  achievement: Achievement,
): number {
  switch (achievement.metric) {
    case "completedContracts":
      return player.completedContracts;

    case "level":
      return player.level;

    case "reputation":
      return player.reputation;

    case "ownedUpgrades":
      return player.ownedUpgrades.length;

    case "unlockedSkills":
      return player.unlockedSkills.length;

    case "totalCreditsEarned":
      return player.totalCreditsEarned;

    default:
      return 0;
  }
}

export function getAchievementProgress(
  player: Player,
  achievement: Achievement,
): number {
  const currentValue = getAchievementValue(
    player,
    achievement,
  );

  return Math.min(
    100,
    (currentValue / achievement.target) * 100,
  );
}