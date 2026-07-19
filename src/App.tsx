import { useState } from "react";
import { contracts } from "./data/contracts";
import { upgrades } from "./data/upgrades";
import { useGame } from "./hooks/useGame";
import { skills } from "./data/skills";
import ContractMission from "./components/ContractMission";
import type { Contract } from "./types/game";
import { achievements } from "./data/achievements";
import {
  getAchievementProgress,
  getAchievementValue,
} from "./utils/achievementProgress";

import { dailyLoginRewards, dailyMissions } from "./data/daily";

type Page =
  | "dashboard"
  | "contracts"
  | "daily"
  | "skills"
  | "achievements"
  | "shop";

function formatCountdown(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatDailyCountdown(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);

  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
}

function App() {
  const [activePage, setActivePage] = useState<Page>("dashboard");

  const [activeContract, setActiveContract] = useState<Contract | null>(null);
  const {
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
  } = useGame();

  const pageTitles: Record<Page, string> = {
    dashboard: "Dashboard",
    contracts: "Contracts",
    skills: "Skills",
    shop: "Black Market",
    achievements: "Achievements",
    daily: "Daily Ops",
  };

  return (
    <div className="game-layout">
      <aside className="sidebar">
        <div className="game-logo">
          <span className="logo-icon">&gt;_</span>

          <div>
            <h1>Hacker Life</h1>
            <p>Build your cyber career</p>
          </div>
        </div>

        <nav className="navigation">
          <button
            className={
              activePage === "dashboard" ? "nav-button active" : "nav-button"
            }
            onClick={() => setActivePage("dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className={
              activePage === "contracts" ? "nav-button active" : "nav-button"
            }
            onClick={() => setActivePage("contracts")}
          >
            <span>▣</span>
            Contracts
          </button>

          <button
            className={
              activePage === "daily" ? "nav-button active" : "nav-button"
            }
            onClick={() => setActivePage("daily")}
          >
            <span>◆</span>
            Daily Ops
          </button>

          <button
            className={
              activePage === "skills" ? "nav-button active" : "nav-button"
            }
            onClick={() => setActivePage("skills")}
          >
            <span>⌘</span>
            Skills
          </button>

          <button
            className={
              activePage === "achievements" ? "nav-button active" : "nav-button"
            }
            onClick={() => setActivePage("achievements")}
          >
            <span>★</span>
            Achievements
          </button>

          <button
            className={
              activePage === "shop" ? "nav-button active" : "nav-button"
            }
            onClick={() => setActivePage("shop")}
          >
            <span>◆</span>
            Black Market
          </button>
        </nav>

        <div className="sidebar-profile">
          <div className="avatar">A</div>

          <div>
            <strong>{player.username}</strong>
            <span>Level {player.level}</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {notification && (
          <div className="game-notification">{notification}</div>
        )}
        <header className="topbar">
          <div>
            <p className="terminal-path">root@hacker-life:~/{activePage}</p>

            <h2>{pageTitles[activePage]}</h2>
          </div>

          <div className="topbar-resources">
            <div className="resource">
              <span className="resource-label">Credits</span>
              <strong>${player.money}</strong>
            </div>

            <div className="resource energy-resource">
              <span className="resource-label">Energy</span>

              <strong>
                {player.energy}/{player.maxEnergy}
              </strong>

              <small>
                {player.energy >= player.maxEnergy
                  ? "Fully recovered"
                  : `+1 in ${formatCountdown(energyRegenerationSeconds)}`}
              </small>

              <div className="energy-recovery-track">
                <div
                  className="energy-recovery-value"
                  style={{
                    width: `${energyRegenerationProgress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </header>

        {activePage === "dashboard" && (
          <section className="page-content">
            <div className="welcome-card">
              <div>
                <span className="status-badge">SYSTEM ONLINE</span>

                <h3>Welcome back, {player.username}</h3>

                <p>
                  Your journey starts with an old laptop, basic knowledge and
                  one goal: become the most respected cybersecurity specialist
                  in the digital world.
                </p>
              </div>

              <div className="terminal-window">
                <div className="terminal-header">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="terminal-body">
                  <p>
                    <span className="terminal-user">guest@hacker-life</span>:~$
                    whoami
                  </p>

                  <p className="terminal-output">{player.username}</p>

                  <p>
                    <span className="terminal-user">guest@hacker-life</span>:~$
                    career --status
                  </p>

                  <p className="terminal-output">{player.career}</p>

                  <p className="cursor-line">
                    <span className="terminal-user">guest@hacker-life</span>:~$
                    <span className="cursor">▋</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="stats-grid">
              <article className="stat-card">
                <span className="stat-icon">LVL</span>
                <p>Current level</p>
                <strong>{player.level}</strong>
                <small>{player.career}</small>
              </article>

              <article className="stat-card">
                <span className="stat-icon">$</span>
                <p>Available credits</p>
                <strong>${player.money}</strong>
                <small>Complete contracts to earn more</small>
              </article>

              <article className="stat-card">
                <span className="stat-icon">REP</span>
                <p>Reputation</p>
                <strong>{player.reputation}</strong>
                <small>Unknown specialist</small>
              </article>

              <article className="stat-card">
                <span className="stat-icon">XP</span>
                <p>Experience</p>
                <strong>
                  {player.experience}/{player.experienceToNextLevel}
                </strong>
                <div className="progress-bar">
                  <div
                    className="progress-value"
                    style={{
                      width: `${
                        (player.experience / player.experienceToNextLevel) * 100
                      }%`,
                    }}
                  />
                </div>
              </article>
            </div>

            <div className="dashboard-grid">
              <article className="panel">
                <div className="panel-header">
                  <div>
                    <span className="section-label">AVAILABLE WORK</span>
                    <h3>Starter contract</h3>
                  </div>

                  <span className="difficulty easy">Easy</span>
                </div>

                <div className="contract-preview">
                  <div className="contract-icon">&lt;/&gt;</div>

                  <div>
                    <h4>Fix a Broken HTML Page</h4>
                    <p>
                      A local business needs help repairing the layout of its
                      website.
                    </p>
                  </div>
                </div>

                <div className="contract-details">
                  <span>Reward: $25</span>
                  <span>Energy: 10</span>
                  <span>XP: 15</span>
                </div>

                <button
                  className="primary-button"
                  onClick={() => setActivePage("contracts")}
                >
                  View contracts
                </button>
              </article>

              <article className="panel">
                <div className="panel-header">
                  <div>
                    <span className="section-label">CAREER PROGRESS</span>
                    <h3>Your next objective</h3>
                  </div>
                </div>

                <div className="objective-list">
                  <div className="objective completed">
                    <span>✓</span>
                    <div>
                      <strong>Create your hacker profile</strong>
                      <p>Account successfully initialized</p>
                    </div>
                  </div>

                  <div
                    className={
                      player.completedContracts > 0
                        ? "objective completed"
                        : "objective"
                    }
                  >
                    <span>{player.completedContracts > 0 ? "✓" : "1"}</span>

                    <div>
                      <strong>Complete your first contract</strong>

                      <p>
                        {player.completedContracts > 0
                          ? "Your first contract has been completed"
                          : "Earn money and gain experience"}
                      </p>
                    </div>
                  </div>

                  <div
                    className={
                      player.ownedUpgrades.length > 0
                        ? "objective completed"
                        : player.completedContracts > 0
                          ? "objective"
                          : "objective locked"
                    }
                  >
                    <span>{player.ownedUpgrades.length > 0 ? "✓" : "2"}</span>

                    <div>
                      <strong>Buy your first upgrade</strong>

                      <p>
                        {player.ownedUpgrades.length > 0
                          ? "Your first equipment upgrade has been purchased"
                          : player.completedContracts > 0
                            ? "Visit the Black Market"
                            : "Locked until the first contract"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      player.unlockedSkills.length > 0
                        ? "objective completed"
                        : "objective"
                    }
                  >
                    <span>{player.unlockedSkills.length > 0 ? "✓" : "3"}</span>

                    <div>
                      <strong>Unlock your first skill</strong>

                      <p>
                        {player.unlockedSkills.length > 0
                          ? "Your first permanent skill bonus is active"
                          : "Open the Skill Tree and choose a specialisation"}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>
        )}

        {activePage === "contracts" && (
          <section className="contracts-page">
            <div className="contracts-heading">
              <div>
                <span className="section-label">AVAILABLE MISSIONS</span>

                <h3>Contract Terminal</h3>

                <p>
                  Complete contracts to earn credits, experience and reputation.
                </p>
              </div>

              <button className="energy-button" onClick={restoreEnergy}>
                Buy energy drink — $20
              </button>
            </div>

            <div className="contracts-grid">
              {contracts.map((contract) => {
                const isLocked = player.level < contract.requiredLevel;

                const actualEnergyCost = getContractEnergyCost(contract);

                const hasEnoughEnergy = player.energy >= actualEnergyCost;

                return (
                  <article
                    className={
                      isLocked
                        ? "contract-card contract-locked"
                        : "contract-card"
                    }
                    key={contract.id}
                  >
                    <div className="contract-card-header">
                      <div>
                        <span className="contract-category">
                          {contract.category}
                        </span>

                        <h4>{contract.title}</h4>
                      </div>

                      <span
                        className={`difficulty ${contract.difficulty.toLowerCase()}`}
                      >
                        {contract.difficulty}
                      </span>
                    </div>

                    <p className="contract-description">
                      {contract.description}
                    </p>

                    <div className="contract-requirements">
                      <span>
                        Required level:
                        <strong>{contract.requiredLevel}</strong>
                      </span>

                      <span>
                        Energy:
                        <strong>{actualEnergyCost}</strong>
                      </span>
                    </div>

                    <div className="contract-rewards">
                      <div>
                        <small>Credits</small>
                        <strong>${contract.reward}</strong>
                      </div>

                      <div>
                        <small>Experience</small>
                        <strong>+{contract.experienceReward} XP</strong>
                      </div>

                      <div>
                        <small>Reputation</small>
                        <strong>+{contract.reputationReward}</strong>
                      </div>
                    </div>

                    <button
                      className="primary-button"
                      disabled={isLocked || !hasEnoughEnergy}
                      onClick={() => setActiveContract(contract)}
                    >
                      {isLocked
                        ? `Locked until level ${contract.requiredLevel}`
                        : !hasEnoughEnergy
                          ? "Not enough energy"
                          : "Start contract"}
                    </button>
                  </article>
                );
              })}
            </div>

            <div className="save-settings">
              <div className="contract-record">
                <span>
                  Successful:
                  <strong>{player.completedContracts}</strong>
                </span>

                <span>
                  Failed:
                  <strong>{player.failedContracts}</strong>
                </span>
              </div>

              <button className="reset-button" onClick={resetProgress}>
                Reset progress
              </button>
            </div>
          </section>
        )}

        {activePage === "daily" && (
          <section className="daily-page">
            <div className="daily-heading">
              <div>
                <span className="section-label">DAILY OPERATIONS</span>

                <h3>Daily Ops</h3>

                <p>Complete daily objectives and maintain your login streak.</p>
              </div>

              <div className="daily-reset-card">
                <span>Objectives reset in</span>

                <strong>{formatDailyCountdown(dailyResetSeconds)}</strong>
              </div>
            </div>

            <section className="login-reward-panel">
              <div className="login-reward-header">
                <div>
                  <span className="section-label">LOGIN STREAK</span>

                  <h4>Daily Access Rewards</h4>

                  <p>
                    Log in on consecutive days to receive increasingly valuable
                    rewards.
                  </p>
                </div>

                <div className="current-streak">
                  <span>Current day</span>
                  <strong>{nextDailyRewardDay}/7</strong>
                </div>
              </div>

              <div className="login-rewards-grid">
                {dailyLoginRewards.map((reward) => {
                  const isActive = reward.day === nextDailyRewardDay;

                  const isCompleted = dailyRewardClaimedToday
                    ? reward.day <= player.loginStreak
                    : reward.day < nextDailyRewardDay;

                  return (
                    <article
                      className={[
                        "login-reward-card",
                        isActive ? "active" : "",
                        isCompleted ? "completed" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      key={reward.day}
                    >
                      <span className="reward-day">Day {reward.day}</span>

                      <strong>${reward.credits}</strong>

                      <small>
                        {reward.energy > 0
                          ? `+${reward.energy} energy`
                          : "Credits reward"}
                      </small>

                      {reward.skillPoints > 0 && (
                        <small>
                          +{reward.skillPoints} skill point
                          {reward.skillPoints > 1 ? "s" : ""}
                        </small>
                      )}

                      <span className="reward-status">
                        {isCompleted ? "CLAIMED" : isActive ? "NEXT" : "LOCKED"}
                      </span>
                    </article>
                  );
                })}
              </div>

              <div className="login-claim-section">
                <div>
                  <span>Today's reward</span>

                  <strong>
                    ${nextDailyReward.credits}
                    {nextDailyReward.energy > 0 &&
                      ` + ${nextDailyReward.energy} energy`}
                    {nextDailyReward.skillPoints > 0 &&
                      ` + ${nextDailyReward.skillPoints} SP`}
                  </strong>
                </div>

                <button
                  className="primary-button"
                  type="button"
                  disabled={dailyRewardClaimedToday}
                  onClick={claimDailyLoginReward}
                >
                  {dailyRewardClaimedToday
                    ? "Reward claimed today"
                    : `Claim day ${nextDailyRewardDay} reward`}
                </button>
              </div>
            </section>

            <div className="daily-missions-heading">
              <div>
                <span className="section-label">DAILY CONTRACTS</span>

                <h4>Today's Objectives</h4>
              </div>

              <span>
                {player.claimedDailyMissions.length}/{dailyMissions.length}{" "}
                claimed
              </span>
            </div>

            <div className="daily-missions-grid">
              {dailyMissions.map((mission) => {
                const currentProgress =
                  player.dailyMissionProgress[mission.metric];

                const displayedProgress = Math.min(
                  currentProgress,
                  mission.target,
                );

                const progressPercent = Math.min(
                  100,
                  (currentProgress / mission.target) * 100,
                );

                const isComplete = currentProgress >= mission.target;

                const isClaimed = player.claimedDailyMissions.includes(
                  mission.id,
                );

                return (
                  <article
                    className={
                      isClaimed
                        ? "daily-mission-card claimed"
                        : isComplete
                          ? "daily-mission-card complete"
                          : "daily-mission-card"
                    }
                    key={mission.id}
                  >
                    <div className="daily-mission-header">
                      <div className="daily-mission-icon">{mission.icon}</div>

                      <div>
                        <span>
                          {isClaimed
                            ? "CLAIMED"
                            : isComplete
                              ? "COMPLETED"
                              : "IN PROGRESS"}
                        </span>

                        <h5>{mission.title}</h5>
                      </div>
                    </div>

                    <p>{mission.description}</p>

                    <div className="daily-progress-info">
                      <span>Progress</span>

                      <strong>
                        {displayedProgress}/{mission.target}
                      </strong>
                    </div>

                    <div className="daily-progress-track">
                      <div
                        className="daily-progress-value"
                        style={{
                          width: `${progressPercent}%`,
                        }}
                      />
                    </div>

                    <div className="daily-mission-rewards">
                      <span>
                        +$
                        {mission.rewardCredits}
                      </span>

                      {mission.rewardSkillPoints > 0 && (
                        <span>+{mission.rewardSkillPoints} skill point</span>
                      )}
                    </div>

                    <button
                      className="primary-button"
                      type="button"
                      disabled={!isComplete || isClaimed}
                      onClick={() => claimDailyMission(mission)}
                    >
                      {isClaimed
                        ? "Reward claimed"
                        : isComplete
                          ? "Claim reward"
                          : "Objective incomplete"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {activePage === "skills" && (
          <section className="skills-page">
            <div className="skills-heading">
              <div>
                <span className="section-label">CAREER DEVELOPMENT</span>

                <h3>Skill Tree</h3>

                <p>
                  Spend skill points to unlock permanent bonuses and new
                  specialisations.
                </p>
              </div>

              <div className="skill-points-card">
                <span>Available skill points</span>
                <strong>{player.skillPoints}</strong>
              </div>
            </div>

            <div className="skill-bonus-grid">
              <article>
                <span>Credits bonus</span>
                <strong>
                  +{Math.round((bonuses.creditsMultiplier - 1) * 100)}%
                </strong>
              </article>

              <article>
                <span>Experience bonus</span>
                <strong>
                  +{Math.round((bonuses.experienceMultiplier - 1) * 100)}%
                </strong>
              </article>

              <article>
                <span>Reputation bonus</span>
                <strong>
                  +{Math.round((bonuses.reputationMultiplier - 1) * 100)}%
                </strong>
              </article>

              <article>
                <span>Energy efficiency</span>
                <strong>
                  -{Math.round(bonuses.energyCostReduction * 100)}%
                </strong>
              </article>
            </div>

            {(["Development", "Security", "Operations"] as const).map(
              (category) => (
                <section className="skill-branch" key={category}>
                  <div className="skill-branch-heading">
                    <div>
                      <span className="section-label">SPECIALISATION</span>
                      <h4>{category}</h4>
                    </div>

                    <span className="branch-progress">
                      {
                        skills.filter(
                          (skill) =>
                            skill.category === category &&
                            player.unlockedSkills.includes(skill.id),
                        ).length
                      }
                      /
                      {
                        skills.filter((skill) => skill.category === category)
                          .length
                      }
                    </span>
                  </div>

                  <div className="skill-grid">
                    {skills
                      .filter((skill) => skill.category === category)
                      .map((skill) => {
                        const isUnlocked = player.unlockedSkills.includes(
                          skill.id,
                        );

                        const isLevelLocked =
                          player.level < skill.requiredLevel;

                        const isPrerequisiteLocked = Boolean(
                          skill.requiresSkillId &&
                          !player.unlockedSkills.includes(
                            skill.requiresSkillId,
                          ),
                        );

                        const canAfford = player.skillPoints >= skill.cost;

                        const requiredSkill = skill.requiresSkillId
                          ? skills.find(
                              (item) => item.id === skill.requiresSkillId,
                            )
                          : undefined;

                        return (
                          <article
                            className={
                              isUnlocked
                                ? "skill-card skill-unlocked"
                                : isLevelLocked || isPrerequisiteLocked
                                  ? "skill-card skill-locked"
                                  : "skill-card"
                            }
                            key={skill.id}
                          >
                            <div className="skill-card-header">
                              <div className="skill-code">{skill.code}</div>

                              <div>
                                <span>Level {skill.requiredLevel}</span>
                                <h5>{skill.name}</h5>
                              </div>

                              {isUnlocked && (
                                <span className="skill-status">UNLOCKED</span>
                              )}
                            </div>

                            <p>{skill.description}</p>

                            <div className="skill-effect">
                              <span>Permanent effect</span>
                              <strong>{skill.effectLabel}</strong>
                            </div>

                            {requiredSkill && (
                              <div className="skill-requirement">
                                Requires: <strong>{requiredSkill.name}</strong>
                              </div>
                            )}

                            <button
                              className="primary-button"
                              disabled={
                                isUnlocked ||
                                isLevelLocked ||
                                isPrerequisiteLocked ||
                                !canAfford
                              }
                              onClick={() => unlockSkill(skill)}
                            >
                              {isUnlocked
                                ? "Unlocked"
                                : isLevelLocked
                                  ? `Requires level ${skill.requiredLevel}`
                                  : isPrerequisiteLocked
                                    ? `Unlock ${requiredSkill?.name ?? "previous skill"} first`
                                    : !canAfford
                                      ? `Need ${skill.cost} skill points`
                                      : `Unlock for ${skill.cost} point${skill.cost > 1 ? "s" : ""}`}
                            </button>
                          </article>
                        );
                      })}
                  </div>
                </section>
              ),
            )}
          </section>
        )}

        {activePage === "achievements" && (
          <section className="achievements-page">
            <div className="achievements-heading">
              <div>
                <span className="section-label">PLAYER MILESTONES</span>

                <h3>Achievements</h3>

                <p>
                  Complete milestones to earn credits, skill points and
                  achievement points.
                </p>
              </div>

              <div className="achievement-points-card">
                <span>Achievement points</span>
                <strong>{player.achievementPoints}</strong>
              </div>
            </div>

            <div className="achievement-summary">
              <article>
                <span>Unlocked</span>

                <strong>
                  {player.unlockedAchievements.length}/{achievements.length}
                </strong>
              </article>

              <article>
                <span>Total credits earned</span>

                <strong>${player.totalCreditsEarned}</strong>
              </article>

              <article>
                <span>Successful contracts</span>

                <strong>{player.completedContracts}</strong>
              </article>

              <article>
                <span>Current reputation</span>

                <strong>{player.reputation}</strong>
              </article>
            </div>

            <div className="achievements-grid">
              {achievements.map((achievement) => {
                const isUnlocked = player.unlockedAchievements.includes(
                  achievement.id,
                );

                const currentValue = getAchievementValue(player, achievement);

                const progress = getAchievementProgress(player, achievement);

                return (
                  <article
                    className={
                      isUnlocked
                        ? "achievement-card achievement-unlocked"
                        : "achievement-card"
                    }
                    key={achievement.id}
                  >
                    <div className="achievement-card-header">
                      <div className="achievement-icon">{achievement.icon}</div>

                      <div>
                        <span>{isUnlocked ? "UNLOCKED" : "IN PROGRESS"}</span>

                        <h4>{achievement.name}</h4>
                      </div>

                      <div className="achievement-points">
                        +{achievement.points}
                        <small>AP</small>
                      </div>
                    </div>

                    <p>{achievement.description}</p>

                    <div className="achievement-progress-info">
                      <span>Progress</span>

                      <strong>
                        {Math.min(currentValue, achievement.target)}/
                        {achievement.target}
                      </strong>
                    </div>

                    <div className="achievement-progress-track">
                      <div
                        className="achievement-progress-value"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>

                    <div className="achievement-rewards">
                      <div>
                        <small>Credits</small>
                        <strong>
                          +$
                          {achievement.rewardCredits}
                        </strong>
                      </div>

                      <div>
                        <small>Skill points</small>
                        <strong>+{achievement.rewardSkillPoints}</strong>
                      </div>
                    </div>

                    <div
                      className={
                        isUnlocked
                          ? "achievement-status unlocked"
                          : "achievement-status"
                      }
                    >
                      {isUnlocked
                        ? "Achievement completed"
                        : `${Math.round(progress)}% completed`}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {activePage === "shop" && (
          <section className="shop-page">
            <div className="shop-heading">
              <div>
                <span className="section-label">UNDERGROUND MARKETPLACE</span>

                <h3>Black Market</h3>

                <p>
                  Purchase hardware, software and training to improve your
                  contract rewards.
                </p>
              </div>

              <div className="shop-balance">
                <span>Available credits</span>
                <strong>${player.money}</strong>
              </div>
            </div>

            <div className="bonus-grid">
              <article className="bonus-card">
                <span>Credits bonus</span>
                <strong>
                  +{Math.round((bonuses.creditsMultiplier - 1) * 100)}%
                </strong>
              </article>

              <article className="bonus-card">
                <span>Experience bonus</span>
                <strong>
                  +{Math.round((bonuses.experienceMultiplier - 1) * 100)}%
                </strong>
              </article>

              <article className="bonus-card">
                <span>Reputation bonus</span>
                <strong>
                  +{Math.round((bonuses.reputationMultiplier - 1) * 100)}%
                </strong>
              </article>

              <article className="bonus-card">
                <span>Maximum energy</span>
                <strong>{player.maxEnergy}</strong>
              </article>
            </div>

            <div className="shop-grid">
              {upgrades.map((upgrade) => {
                const isOwned = player.ownedUpgrades.includes(upgrade.id);
                const isLocked = player.level < upgrade.requiredLevel;
                const canAfford = player.money >= upgrade.price;

                return (
                  <article
                    className={
                      isOwned
                        ? "upgrade-card upgrade-owned"
                        : isLocked
                          ? "upgrade-card upgrade-locked"
                          : "upgrade-card"
                    }
                    key={upgrade.id}
                  >
                    <div className="upgrade-card-header">
                      <div className="upgrade-icon">{upgrade.icon}</div>

                      <div>
                        <span className="upgrade-category">
                          {upgrade.category}
                        </span>

                        <h4>{upgrade.name}</h4>
                      </div>

                      {isOwned && <span className="owned-badge">OWNED</span>}
                    </div>

                    <p className="upgrade-description">{upgrade.description}</p>

                    <div className="upgrade-effect">
                      <span>Upgrade effect</span>
                      <strong>{upgrade.effectLabel}</strong>
                    </div>

                    <div className="upgrade-information">
                      <div>
                        <small>Price</small>
                        <strong>${upgrade.price}</strong>
                      </div>

                      <div>
                        <small>Required level</small>
                        <strong>{upgrade.requiredLevel}</strong>
                      </div>
                    </div>

                    <button
                      className="primary-button"
                      disabled={isOwned || isLocked || !canAfford}
                      onClick={() => purchaseUpgrade(upgrade)}
                    >
                      {isOwned
                        ? "Purchased"
                        : isLocked
                          ? `Locked until level ${upgrade.requiredLevel}`
                          : !canAfford
                            ? `Need $${upgrade.price - player.money} more`
                            : `Purchase for $${upgrade.price}`}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        )}
        {activeContract && (
          <ContractMission
            contract={activeContract}
            energyCost={getContractEnergyCost(activeContract)}
            onClose={() => setActiveContract(null)}
            onResolve={(successful) =>
              resolveContract(activeContract, successful)
            }
          />
        )}
      </main>
    </div>
  );
}

export default App;
