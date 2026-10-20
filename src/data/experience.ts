import type { Experience } from "@/types/portfolio";

export const experience: Experience[] = [
  {
    id: "feam-aero",
    roleTitle: "Software Engineer Intern",
    organization: "FEAM Aero",
    timeline: "Aug 2026 – Present",
    location: "Miami, FL",
    mapLocationName: "Hangar Route — Route 1",
    impactBullets: [
      "Develop full-stack features for the company website in React, Python, and Flask, shipping multiple features to production.",
      "Build file-processing pipelines with Azure Functions to automate file ingestion, backed by Azure SQL databases.",
      "Performed QA testing on web features before release, identifying and documenting defects to improve stability.",
    ],
    technologiesUsed: ["React", "Python", "Flask", "Azure Functions", "Azure SQL"],
  },
  {
    id: "royal-caribbean",
    roleTitle: "Information Security Intern",
    organization: "Royal Caribbean Group — Global Information Security",
    timeline: "May 2026",
    location: "Miami, FL",
    mapLocationName: "Port Harbor — Tidewater Docks",
    impactBullets: [
      "Designed and deployed a multi-agent system automating the incident commander role, cutting security ticket MTTR by 94%.",
      "Built agentic personas in Strike48 and n8n, using prompt engineering to define agent behavior and decision logic for triage, escalation, and resolution workflows.",
      "Migrated the agentic platform between two orchestration frameworks, maintaining continuity and scalability.",
    ],
    technologiesUsed: ["Multi-Agent Systems", "Strike48", "n8n", "Prompt Engineering"],
  },
  {
    id: "init-fiu",
    roleTitle: "Director of Finance and Data Analytics",
    organization: "INIT at FIU",
    timeline: "Jan 2026 – Present",
    location: "Miami, FL",
    mapLocationName: "Guild Hall — Campus Keep",
    impactBullets: [
      "Analyze financial data to guide planning and resource allocation, reducing budget variances and improving forecasts.",
      "Process membership and attendance data in Tableau to deliver reports with actionable recommendations.",
      "Automated monthly financial reporting with Python scripts, improving accuracy and timeliness.",
    ],
    technologiesUsed: ["Tableau", "Python", "Financial Analysis"],
  },
  {
    id: "shellhacks",
    roleTitle: "Volunteer Lead",
    organization: "ShellHacks",
    timeline: "2026",
    location: "Miami, FL",
    mapLocationName: "Hackathon Arena — Festival Grounds",
    impactBullets: [
      "Managed and scheduled 40 volunteers for Florida's largest hackathon, serving about 1,500 student attendees.",
      "Coordinated event logistics and allocated volunteers across operational areas to keep the event running smoothly.",
    ],
    technologiesUsed: ["Team Leadership", "Scheduling", "Event Logistics"],
  },
];
