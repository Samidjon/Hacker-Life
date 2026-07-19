import type { Contract } from "../types/game";

export const contracts: Contract[] = [
  {
    id: 1,
    title: "Fix a Broken HTML Page",
    description:
      "A local business needs help fixing the layout of its website.",
    reward: 25,
    experienceReward: 20,
    reputationReward: 2,
    energyCost: 10,
    requiredLevel: 1,
    difficulty: "Easy",
    category: "Web Development",
    challenge: {
      scenario:
        "The navigation links are displayed vertically, but the client wants them arranged horizontally.",
      question:
        "Which CSS declaration should be applied to the navigation container?",
      options: [
        "display: flex;",
        "position: absolute;",
        "text-align: vertical;",
        "overflow: hidden;",
      ],
      correctOptionIndex: 0,
      explanation:
        "display: flex creates a flex container. Its children are arranged horizontally by default.",
    },
  },
  {
    id: 2,
    title: "Recover Lost Files",
    description:
      "A client accidentally deleted important documents from their computer.",
    reward: 40,
    experienceReward: 30,
    reputationReward: 3,
    energyCost: 15,
    requiredLevel: 1,
    difficulty: "Easy",
    category: "Technical Support",
    challenge: {
      scenario:
        "Important files were deleted from a storage drive. The client is still actively using the same drive.",
      question:
        "What should you tell the client to do first?",
      options: [
        "Continue using the drive normally",
        "Install several recovery programs on the drive",
        "Stop writing new data to the drive",
        "Format the drive",
      ],
      correctOptionIndex: 2,
      explanation:
        "New data can overwrite deleted file contents. The drive should not be used until recovery begins.",
    },
  },
  {
    id: 3,
    title: "Analyse a Suspicious Email",
    description:
      "Check an email and determine whether it contains a phishing attempt.",
    reward: 65,
    experienceReward: 45,
    reputationReward: 5,
    energyCost: 20,
    requiredLevel: 2,
    difficulty: "Medium",
    category: "Cybersecurity",
    challenge: {
      scenario:
        "An email claims to come from a bank. It asks the user to urgently confirm their account through a link.",
      question:
        "Which detail provides the strongest evidence of phishing?",
      options: [
        "The message contains the bank logo",
        "The sender domain is secure-bank-support.info",
        "The email uses formal language",
        "The message was received in the morning",
      ],
      correctOptionIndex: 1,
      explanation:
        "Attackers often use lookalike or unrelated domains. The sender domain should match the bank’s official domain.",
    },
  },
  {
    id: 4,
    title: "Remove Malware",
    description:
      "A company computer is infected. Find and remove the malicious software.",
    reward: 100,
    experienceReward: 70,
    reputationReward: 8,
    energyCost: 30,
    requiredLevel: 2,
    difficulty: "Medium",
    category: "Malware Analysis",
    challenge: {
      scenario:
        "A workstation is opening unknown processes and sending unusual network traffic.",
      question:
        "What should be the first containment action?",
      options: [
        "Delete random system files",
        "Disconnect the workstation from the network",
        "Publish the malware sample online",
        "Restart every company server",
      ],
      correctOptionIndex: 1,
      explanation:
        "Disconnecting the infected device helps prevent malware from spreading or communicating with an attacker.",
    },
  },
  {
    id: 5,
    title: "Website Security Audit",
    description:
      "Inspect a company website and identify possible security weaknesses.",
    reward: 180,
    experienceReward: 110,
    reputationReward: 12,
    energyCost: 40,
    requiredLevel: 3,
    difficulty: "Hard",
    category: "Web Security",
    challenge: {
      scenario:
        "A login system builds an SQL query by directly joining the username and password entered by the user.",
      question:
        "Which vulnerability is most likely present?",
      options: [
        "Cross-Site Request Forgery",
        "SQL Injection",
        "Clickjacking",
        "Directory Traversal",
      ],
      correctOptionIndex: 1,
      explanation:
        "Directly inserting user input into an SQL query can allow attackers to modify the query. Parameterised queries should be used.",
    },
  },
  {
    id: 6,
    title: "Investigate Network Intrusion",
    description:
      "Analyse network activity and identify how an attacker entered the system.",
    reward: 300,
    experienceReward: 160,
    reputationReward: 20,
    energyCost: 55,
    requiredLevel: 4,
    difficulty: "Hard",
    category: "Network Security",
    challenge: {
      scenario:
        "The logs show hundreds of failed SSH logins from one IP address, followed by one successful login.",
      question:
        "Which attack most likely occurred?",
      options: [
        "Brute-force password attack",
        "DNS poisoning",
        "Cross-site scripting",
        "ARP inspection",
      ],
      correctOptionIndex: 0,
      explanation:
        "A large number of failed login attempts followed by a successful one is a common indicator of brute-force password guessing.",
    },
  },
];