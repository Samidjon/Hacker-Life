import type { Contract } from "../types/game";

export const contracts: Contract[] = [
  {
    id: 1,
    title: "Fix a Broken HTML Page",
    description: "A local business needs help fixing the layout of its website.",
    reward: 25,
    experienceReward: 20,
    reputationReward: 2,
    energyCost: 10,
    requiredLevel: 1,
    difficulty: "Easy",
    category: "Web Development",
    challenges: [
      {
        id: "html-navigation-layout",
        scenario: "The navigation links are displayed vertically, but the client wants them arranged horizontally.",
        question: "Which CSS declaration should be applied to the navigation container?",
        options: ["display: flex;", "position: absolute;", "text-align: vertical;", "overflow: hidden;"],
        correctOptionIndex: 0,
        explanation: "display: flex creates a flex container whose children are arranged in a row by default.",
      },
      {
        id: "html-image-alt",
        scenario: "A product image does not provide any information to visitors using a screen reader.",
        question: "Which HTML change makes the product image accessible?",
        options: ["Add a descriptive alt attribute", "Wrap it in a div", "Set a larger width", "Add a title to the page"],
        correctOptionIndex: 0,
        explanation: "A meaningful alt attribute gives assistive technology a text alternative for the image.",
      },
      {
        id: "html-form-label",
        scenario: "Clicking the text beside an email input does not focus the field, and its purpose is unclear to assistive technology.",
        question: "How should the text be associated with the input?",
        options: ["Match a label's for attribute to the input id", "Place the input in a table", "Add a placeholder only", "Give both elements the same class"],
        correctOptionIndex: 0,
        explanation: "A label connected with for and id creates a programmatic and clickable association.",
      },
    ],
  },
  {
    id: 2,
    title: "Recover Lost Files",
    description: "A client accidentally deleted important documents from their computer.",
    reward: 40,
    experienceReward: 30,
    reputationReward: 3,
    energyCost: 15,
    requiredLevel: 1,
    difficulty: "Easy",
    category: "Technical Support",
    challenges: [
      {
        id: "recovery-stop-writes",
        scenario: "Important files were deleted from a storage drive. The client is still actively using the same drive.",
        question: "What should you tell the client to do first?",
        options: ["Continue using the drive normally", "Install recovery tools on that drive", "Stop writing new data to the drive", "Format the drive"],
        correctOptionIndex: 2,
        explanation: "New data can overwrite deleted file contents, so writes should stop until recovery begins.",
      },
      {
        id: "recovery-backup-restore",
        scenario: "A document was corrupted this morning, and the company's nightly backup completed successfully before the corruption.",
        question: "What is the safest recovery source to try first?",
        options: ["A verified copy from last night's backup", "A random file-sharing site", "The corrupted document itself", "A full disk format"],
        correctOptionIndex: 0,
        explanation: "A recent verified backup provides a known recovery point without risking the original evidence.",
      },
      {
        id: "recovery-disk-image",
        scenario: "A failing drive makes clicking noises and disconnects intermittently, but its remaining data is important.",
        question: "What should a recovery specialist create before attempting file repairs?",
        options: ["A sector-by-sector image of the drive", "A new partition on the drive", "A benchmark report", "A larger recycle bin"],
        correctOptionIndex: 0,
        explanation: "Working from a disk image reduces further stress on failing hardware and preserves the original state.",
      },
    ],
  },
  {
    id: 3,
    title: "Analyse a Suspicious Email",
    description: "Check an email and determine whether it contains a phishing attempt.",
    reward: 65,
    experienceReward: 45,
    reputationReward: 5,
    energyCost: 20,
    requiredLevel: 2,
    difficulty: "Medium",
    category: "Cybersecurity",
    challenges: [
      {
        id: "phishing-sender-domain",
        scenario: "An email claims to come from a bank and asks the user to confirm an account urgently through a link.",
        question: "Which detail provides the strongest evidence of phishing?",
        options: ["The message contains a bank logo", "The sender domain is secure-bank-support.info", "The email uses formal language", "The message arrived in the morning"],
        correctOptionIndex: 1,
        explanation: "A sender domain that does not match the bank's official domain is a strong phishing indicator.",
      },
      {
        id: "phishing-link-target",
        scenario: "A payroll message displays an official-looking link, but hovering over it reveals a different destination.",
        question: "Which action best verifies the link without opening it?",
        options: ["Compare the revealed URL with the official domain", "Forward it to every colleague", "Reply with account details", "Disable the browser's warnings"],
        correctOptionIndex: 0,
        explanation: "Inspecting the actual destination and comparing its domain with the official one helps expose deceptive links.",
      },
      {
        id: "phishing-report-attachment",
        scenario: "An unexpected invoice email contains a macro-enabled document and asks the recipient to enable editing.",
        question: "What is the safest response?",
        options: ["Enable macros to view it", "Upload it to a public forum", "Report the email and keep the attachment closed", "Rename the attachment and run it"],
        correctOptionIndex: 2,
        explanation: "Unexpected macro-enabled attachments should remain closed and be reported through the approved security channel.",
      },
    ],
  },
  {
    id: 4,
    title: "Remove Malware",
    description: "A company computer is infected. Contain and remove the malicious software.",
    reward: 100,
    experienceReward: 70,
    reputationReward: 8,
    energyCost: 30,
    requiredLevel: 2,
    difficulty: "Medium",
    category: "Malware Analysis",
    challenges: [
      {
        id: "malware-network-isolation",
        scenario: "A workstation is opening unknown processes and sending unusual network traffic.",
        question: "What should be the first containment action?",
        options: ["Delete random system files", "Disconnect the workstation from the network", "Publish the sample online", "Restart every company server"],
        correctOptionIndex: 1,
        explanation: "Network isolation limits spread and command-and-control traffic while preserving the device for investigation.",
      },
      {
        id: "malware-preserve-evidence",
        scenario: "Security staff have isolated an infected laptop and need to understand how the compromise occurred.",
        question: "What should happen before the operating system is reinstalled?",
        options: ["Preserve relevant forensic evidence", "Delete every log", "Reconnect it to production", "Notify the attacker"],
        correctOptionIndex: 0,
        explanation: "Evidence should be collected before remediation changes or destroys information needed for root-cause analysis.",
      },
      {
        id: "malware-known-good-rebuild",
        scenario: "A privileged workstation has a confirmed persistent compromise and its integrity can no longer be trusted.",
        question: "Which remediation provides the strongest assurance?",
        options: ["Rebuild it from a known-good image", "Hide the suspicious process", "Clear browser history", "Change the wallpaper"],
        correctOptionIndex: 0,
        explanation: "A known-good rebuild is more reliable than attempting to remove every unknown persistence mechanism manually.",
      },
    ],
  },
  {
    id: 5,
    title: "Website Security Audit",
    description: "Inspect a company website and identify possible security weaknesses.",
    reward: 180,
    experienceReward: 110,
    reputationReward: 12,
    energyCost: 40,
    requiredLevel: 3,
    difficulty: "Hard",
    category: "Web Security",
    challenges: [
      {
        id: "web-sql-injection",
        scenario: "A login system builds an SQL query by directly joining the supplied username and password.",
        question: "Which vulnerability is most likely present?",
        options: ["Cross-Site Request Forgery", "SQL Injection", "Clickjacking", "Directory Traversal"],
        correctOptionIndex: 1,
        explanation: "Unparameterised user input can alter the SQL query. Parameterised queries should be used.",
      },
      {
        id: "web-stored-xss",
        scenario: "Comments are saved in a database and later inserted into pages as raw HTML for every visitor.",
        question: "Which vulnerability should the auditor report?",
        options: ["Stored cross-site scripting", "DNS poisoning", "Password spraying", "ARP spoofing"],
        correctOptionIndex: 0,
        explanation: "Persisted, unescaped HTML can execute attacker-controlled scripts in other users' browsers.",
      },
      {
        id: "web-csrf-defense",
        scenario: "A state-changing account form accepts authenticated requests without checking where they originated.",
        question: "Which control most directly helps prevent forged cross-site submissions?",
        options: ["An unpredictable CSRF token", "A larger database index", "A custom 404 page", "Client-side minification"],
        correctOptionIndex: 0,
        explanation: "A server-validated CSRF token binds the request to the legitimate user session and form flow.",
      },
    ],
  },
  {
    id: 6,
    title: "Investigate Network Intrusion",
    description: "Analyse network activity and identify how an attacker entered the system.",
    reward: 300,
    experienceReward: 160,
    reputationReward: 20,
    energyCost: 55,
    requiredLevel: 4,
    difficulty: "Hard",
    category: "Network Security",
    challenges: [
      {
        id: "network-ssh-bruteforce",
        scenario: "Logs show hundreds of failed SSH logins from one address, followed by one successful login.",
        question: "Which attack most likely occurred?",
        options: ["Brute-force password attack", "DNS poisoning", "Cross-site scripting", "ARP inspection"],
        correctOptionIndex: 0,
        explanation: "Many failed logins followed by a success commonly indicate password guessing.",
      },
      {
        id: "network-dns-tunneling",
        scenario: "A host sends a steady stream of unusually long, unique subdomain queries to one external domain.",
        question: "Which activity best matches this traffic pattern?",
        options: ["DNS tunnelling", "Normal DHCP renewal", "Local file compression", "Printer discovery"],
        correctOptionIndex: 0,
        explanation: "Encoded data in numerous long subdomain queries is a common sign of DNS tunnelling.",
      },
      {
        id: "network-segmentation",
        scenario: "A compromised guest Wi-Fi device can directly reach sensitive database servers on the internal network.",
        question: "Which architectural control would most reduce this exposure?",
        options: ["Network segmentation with restrictive rules", "A brighter access-point LED", "Longer hostnames", "Disabling server logs"],
        correctOptionIndex: 0,
        explanation: "Segmentation and access rules limit which systems a less-trusted network can reach.",
      },
    ],
  },
  {
    id: 7,
    title: "Harden Employee Accounts",
    description: "Improve authentication controls after a wave of account takeover attempts.",
    reward: 75,
    experienceReward: 50,
    reputationReward: 5,
    energyCost: 22,
    requiredLevel: 2,
    difficulty: "Medium",
    category: "Identity Security",
    challenges: [
      {
        id: "identity-mfa",
        scenario: "Several reused employee passwords have appeared in a third-party breach.",
        question: "Which control best limits damage if one of those passwords is tried successfully?",
        options: ["Multi-factor authentication", "A shorter username", "Hidden login button", "Weekly browser cache clearing"],
        correctOptionIndex: 0,
        explanation: "MFA requires another factor, reducing the value of a stolen password alone.",
      },
      {
        id: "identity-password-storage",
        scenario: "A legacy application stores user passwords with reversible encryption.",
        question: "How should passwords be stored instead?",
        options: ["With a salted, slow password-hashing algorithm", "In plain text", "Inside source-code comments", "As unsalted MD5 hashes"],
        correctOptionIndex: 0,
        explanation: "A modern salted password hash such as Argon2id resists bulk cracking and does not require decryption.",
      },
      {
        id: "identity-least-privilege",
        scenario: "Every support agent has administrator access even though most only reset customer contact details.",
        question: "Which principle should guide the permission redesign?",
        options: ["Least privilege", "Security through obscurity", "Open access", "Shared administrator accounts"],
        correctOptionIndex: 0,
        explanation: "Least privilege grants only the access needed for each role, limiting mistakes and compromise impact.",
      },
    ],
  },
  {
    id: 8,
    title: "Repair the Backup Strategy",
    description: "Review a small company's backups before the next ransomware incident.",
    reward: 120,
    experienceReward: 80,
    reputationReward: 8,
    energyCost: 30,
    requiredLevel: 2,
    difficulty: "Medium",
    category: "Resilience",
    challenges: [
      {
        id: "backup-3-2-1",
        scenario: "The only backup is on a USB drive permanently attached to the production computer.",
        question: "Which strategy gives the business stronger ransomware resilience?",
        options: ["Keep 3 copies on 2 media with 1 off-site", "Rename the backup folder", "Use only the attached drive", "Compress the production files"],
        correctOptionIndex: 0,
        explanation: "The 3-2-1 approach reduces the chance that one failure or compromise destroys every copy.",
      },
      {
        id: "backup-restore-test",
        scenario: "Automated backup jobs report success, but nobody has restored a file in over a year.",
        question: "What is the most important next validation step?",
        options: ["Perform a controlled restore test", "Trust the success message", "Delete older logs", "Disable backup alerts"],
        correctOptionIndex: 0,
        explanation: "Only a restore test demonstrates that backed-up data is usable when recovery is needed.",
      },
      {
        id: "backup-rpo",
        scenario: "The business can tolerate losing no more than four hours of newly entered orders after an outage.",
        question: "Which recovery metric captures that maximum acceptable data loss?",
        options: ["Recovery Point Objective", "Recovery Time Objective", "Mean Time to Repair", "Service Level Indicator"],
        correctOptionIndex: 0,
        explanation: "RPO defines how far back in time data recovery may go, which drives backup frequency.",
      },
    ],
  },
  {
    id: 9,
    title: "Secure a Cloud Storage Bucket",
    description: "Investigate a cloud bucket that may expose internal files publicly.",
    reward: 210,
    experienceReward: 125,
    reputationReward: 14,
    energyCost: 42,
    requiredLevel: 3,
    difficulty: "Hard",
    category: "Cloud Security",
    challenges: [
      {
        id: "cloud-public-access",
        scenario: "A storage bucket containing internal reports allows anonymous internet users to list and download objects.",
        question: "What is the immediate containment step?",
        options: ["Block public access to the bucket", "Publish its address", "Copy files to another public bucket", "Disable audit logging"],
        correctOptionIndex: 0,
        explanation: "Removing public access immediately limits further exposure before permissions and impact are reviewed.",
      },
      {
        id: "cloud-credential-rotation",
        scenario: "A developer accidentally committed an active cloud access key to a public repository.",
        question: "Which response should happen first?",
        options: ["Revoke or rotate the exposed key", "Only delete the latest commit", "Wait for suspicious activity", "Rename the repository"],
        correctOptionIndex: 0,
        explanation: "Repository history and copies may retain the secret, so the credential itself must be invalidated promptly.",
      },
      {
        id: "cloud-audit-logs",
        scenario: "The team needs to determine who changed a cloud firewall rule during an incident.",
        question: "Which data source is most useful for attribution?",
        options: ["Cloud control-plane audit logs", "The marketing website sitemap", "A desktop wallpaper file", "The office printer queue"],
        correctOptionIndex: 0,
        explanation: "Control-plane audit logs record authenticated administrative actions and their identities.",
      },
    ],
  },
  {
    id: 10,
    title: "Triage a Data Breach",
    description: "Coordinate the first technical decisions after sensitive records are exposed.",
    reward: 360,
    experienceReward: 190,
    reputationReward: 24,
    energyCost: 58,
    requiredLevel: 4,
    difficulty: "Hard",
    category: "Incident Response",
    challenges: [
      {
        id: "incident-timeline",
        scenario: "Responders have alerts from several systems, all using synchronized timestamps.",
        question: "What should the team construct to understand the sequence of the compromise?",
        options: ["A unified incident timeline", "A new company logo", "A list of employee birthdays", "A blank disk image"],
        correctOptionIndex: 0,
        explanation: "A normalized timeline correlates events across sources and reveals the attack sequence.",
      },
      {
        id: "incident-chain-custody",
        scenario: "A disk image may later support disciplinary or legal proceedings.",
        question: "Which practice documents who handled the evidence and when?",
        options: ["Chain of custody", "Round-robin DNS", "Code minification", "Load balancing"],
        correctOptionIndex: 0,
        explanation: "A chain-of-custody record tracks evidence possession and handling to support its integrity.",
      },
      {
        id: "incident-lessons-learned",
        scenario: "Systems are restored, monitoring is stable, and the immediate breach response is complete.",
        question: "Which activity best reduces the chance of a similar incident recurring?",
        options: ["Run a lessons-learned review and track actions", "Delete the incident record", "Disable the new detections", "Avoid discussing root causes"],
        correctOptionIndex: 0,
        explanation: "A blameless review turns root causes and response gaps into owned, measurable improvements.",
      },
    ],
  },
];

function normaliseQuestion(question: string): string {
  return question.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function validateContracts(items: Contract[]): void {
  const contractIds = new Set<number>();
  const challengeIds = new Set<string>();
  const questions = new Set<string>();

  for (const contract of items) {
    if (contractIds.has(contract.id)) {
      throw new Error(`Duplicate contract id: ${contract.id}`);
    }
    contractIds.add(contract.id);

    if (contract.challenges.length < 2) {
      throw new Error(`Contract ${contract.id} must have multiple challenges`);
    }

    for (const challenge of contract.challenges) {
      const questionKey = normaliseQuestion(challenge.question);

      if (challengeIds.has(challenge.id)) {
        throw new Error(`Duplicate challenge id: ${challenge.id}`);
      }
      if (questions.has(questionKey)) {
        throw new Error(`Duplicate contract question: ${challenge.question}`);
      }
      if (
        challenge.options.length < 2 ||
        challenge.correctOptionIndex < 0 ||
        challenge.correctOptionIndex >= challenge.options.length
      ) {
        throw new Error(`Invalid options for challenge: ${challenge.id}`);
      }

      challengeIds.add(challenge.id);
      questions.add(questionKey);
    }
  }
}

validateContracts(contracts);
