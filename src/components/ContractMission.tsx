import { useState } from "react";
import type { Contract } from "../types/game";

interface ContractMissionProps {
  contract: Contract;
  energyCost: number;
  onClose: () => void;
  onResolve: (successful: boolean) => void;
}

type MissionResult = "success" | "failure" | null;

function ContractMission({
  contract,
  energyCost,
  onClose,
  onResolve,
}: ContractMissionProps) {
  const [selectedOption, setSelectedOption] =
    useState<number | null>(null);

  const [result, setResult] =
    useState<MissionResult>(null);

  function handleSubmit() {
    if (selectedOption === null || result !== null) {
      return;
    }

    const successful =
      selectedOption ===
      contract.challenge.correctOptionIndex;

    setResult(successful ? "success" : "failure");
    onResolve(successful);
  }

  return (
    <div
      className="mission-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="mission-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mission-title"
      >
        <div className="mission-header">
          <div>
            <span className="section-label">
              ACTIVE CONTRACT
            </span>

            <h3 id="mission-title">
              {contract.title}
            </h3>
          </div>

          <button
            className="mission-close"
            type="button"
            onClick={onClose}
            aria-label="Close contract"
          >
            ×
          </button>
        </div>

        <div className="mission-status">
          <span>{contract.category}</span>
          <span>Energy cost: {energyCost}</span>
          <span>Level: {contract.requiredLevel}</span>
        </div>

        <div className="mission-scenario">
          <span>INCIDENT REPORT</span>
          <p>{contract.challenge.scenario}</p>
        </div>

        <div className="mission-question">
          <h4>{contract.challenge.question}</h4>

          <div className="mission-options">
            {contract.challenge.options.map(
              (option, index) => {
                const isSelected =
                  selectedOption === index;

                const isCorrect =
                  index ===
                  contract.challenge.correctOptionIndex;

                let optionClass = "mission-option";

                if (isSelected) {
                  optionClass += " selected";
                }

                if (result && isCorrect) {
                  optionClass += " correct";
                }

                if (
                  result === "failure" &&
                  isSelected &&
                  !isCorrect
                ) {
                  optionClass += " incorrect";
                }

                return (
                  <label
                    className={optionClass}
                    key={option}
                  >
                    <input
                      type="radio"
                      name="mission-answer"
                      checked={isSelected}
                      disabled={result !== null}
                      onChange={() =>
                        setSelectedOption(index)
                      }
                    />

                    <span className="option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span>{option}</span>
                  </label>
                );
              },
            )}
          </div>
        </div>

        {result && (
          <div
            className={
              result === "success"
                ? "mission-result success"
                : "mission-result failure"
            }
          >
            <strong>
              {result === "success"
                ? "CONTRACT COMPLETED"
                : "CONTRACT FAILED"}
            </strong>

            <p>
              {contract.challenge.explanation}
            </p>
          </div>
        )}

        <div className="mission-actions">
          {!result ? (
            <>
              <button
                className="secondary-button"
                type="button"
                onClick={onClose}
              >
                Abort mission
              </button>

              <button
                className="primary-button"
                type="button"
                disabled={selectedOption === null}
                onClick={handleSubmit}
              >
                Submit solution
              </button>
            </>
          ) : (
            <button
              className="primary-button"
              type="button"
              onClick={onClose}
            >
              Return to contracts
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default ContractMission;