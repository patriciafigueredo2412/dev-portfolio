import type { Experience } from "@/types/portfolio";

export const experience: Experience[] = [
  {
    id: "feam-aero",
    roleTitle: "Full-Stack Software Engineer Intern",
    organization: "FEAM Aero",
    timeline: "May 2025 – Aug 2025",
    location: "Miami, FL",
    mapLocationName: "Hangar Route — Route 1",
    impactBullets: [
      "Built internal tooling to track aircraft maintenance work orders end to end with a React + TypeScript front end and a .NET REST API.",
      "Replaced a spreadsheet workflow with role-based dashboards, cutting status-check time for line supervisors from minutes to seconds.",
      "Added server-side pagination, filtering, and audit logging to a table view backed by ~200k rows.",
      "Wrote integration tests and a CI pipeline that gated deploys on a green build.",
    ],
    technologiesUsed: ["TypeScript", "React", "C#", ".NET", "SQL Server", "Azure DevOps"],
  },
  {
    id: "royal-caribbean",
    roleTitle: "Sprinternship — AI Multi-Agent Systems",
    organization: "Royal Caribbean Group",
    timeline: "Jan 2025 (1-week sprint)",
    location: "Miami, FL",
    mapLocationName: "Port Harbor — Tidewater Docks",
    impactBullets: [
      "Prototyped a multi-agent assistant that drafts, critiques, and revises guest-services responses before a human approves them.",
      "Designed the planner/executor/reviewer loop and a tool interface for querying an internal knowledge base.",
      "Presented measured quality gains from the reviewer agent to engineering leadership at the sprint demo.",
    ],
    technologiesUsed: ["Python", "LLM Orchestration", "Prompt Engineering", "REST APIs", "Streamlit"],
  },
  {
    id: "init-fiu",
    roleTitle: "Director of Finance",
    organization: "INIT — Interactive Media & AI Club @ FIU",
    timeline: "Aug 2024 – Present",
    location: "Florida International University",
    mapLocationName: "Guild Hall — Campus Keep",
    impactBullets: [
      "Manage the club's annual budget and sponsorship funds across workshops, hackathons, and travel.",
      "Built a lightweight reimbursement tracker so 200+ members get paid back without email threads.",
      "Coordinate with university finance and external sponsors on grant reporting and compliance.",
    ],
    technologiesUsed: ["Budgeting", "Google Apps Script", "Sheets", "Stakeholder Comms"],
  },
];
