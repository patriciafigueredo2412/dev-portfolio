import { Atom, BrainCircuit, Network, ServerCog } from "lucide-react";

import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: "multi-agent-workflow-engine",
    title: "Multi-Agent Workflow Engine",
    category: "Full-Stack & Agentic",
    questRank: "S",
    tagline: "A full-stack party of AI agents that plan, act, and check each other's work.",
    architectureSummary: [
      "Next.js App Router front end with a live run inspector streaming agent steps over SSE.",
      "Orchestrator service assigns roles — Planner, Tool-Caller, Critic — and routes messages on a shared blackboard.",
      "Typed tool registry with JSON-schema validation; every tool call is logged, retried, and replayable.",
      "Postgres + Redis persist run state so long workflows survive restarts and can be resumed.",
    ],
    techStack: ["TypeScript", "Next.js", "Node.js", "Anthropic API", "PostgreSQL", "Redis", "Docker"],
    githubUrl: "https://github.com/patriciafigueredo2412/multi-agent-workflow-engine",
    liveDemoUrl: "https://agents.patriciafigueredo.dev",
    icon: Network,
  },
  {
    id: "biosignal-classifier",
    title: "Applied ML Biosignal Classifier",
    category: "Machine Learning",
    questRank: "A",
    tagline: "Reads EMG/ECG waveforms and calls the gesture before you finish making it.",
    architectureSummary: [
      "Signal pipeline: bandpass filtering, sliding-window segmentation, and handcrafted + spectral features.",
      "1D CNN baseline vs. gradient-boosted trees, compared with stratified k-fold cross-validation.",
      "ONNX export lets the trained model run in-browser and on-device with sub-20ms inference.",
      "Reproducible training via config-driven runs and tracked experiments.",
    ],
    techStack: ["Python", "PyTorch", "scikit-learn", "NumPy", "SciPy", "ONNX"],
    githubUrl: "https://github.com/patriciafigueredo2412/biosignal-classifier",
    icon: BrainCircuit,
  },
  {
    id: "personalized-ml-api",
    title: "Personalized ML REST API Endpoint",
    category: "Personalized ML",
    questRank: "A",
    tagline: "One endpoint that adapts its predictions to each user's history.",
    architectureSummary: [
      "FastAPI service exposing /recommend with per-user feature hydration from a feature store.",
      "Hybrid model: collaborative-filtering embeddings blended with a content tower for cold start.",
      "Online personalization layer re-ranks candidates using the user's last-N interactions.",
      "Load-tested to 1k RPS with cached embeddings and async batching; p99 under 60ms.",
    ],
    techStack: ["Python", "FastAPI", "PyTorch", "Redis", "Docker", "PostgreSQL"],
    githubUrl: "https://github.com/patriciafigueredo2412/personalized-ml-api",
    liveDemoUrl: "https://ml-api.patriciafigueredo.dev/docs",
    icon: ServerCog,
  },
  {
    id: "bb84-quantum-simulator",
    title: "Qiskit BB84 Quantum Circuit Simulator",
    category: "Quantum Computing",
    questRank: "B",
    tagline: "Simulates quantum key distribution — and the eavesdropper who ruins it.",
    architectureSummary: [
      "Builds BB84 circuits in Qiskit with randomized basis choice for Alice and Bob.",
      "Optional intercept-resend Eve; sifting and QBER estimation quantify her disturbance.",
      "Monte Carlo sweeps over key length and noise to chart error rate vs. detectability.",
      "Notebook + CLI reproduce every figure from a single seed.",
    ],
    techStack: ["Python", "Qiskit", "NumPy", "Matplotlib", "Jupyter"],
    githubUrl: "https://github.com/patriciafigueredo2412/bb84-quantum-simulator",
    icon: Atom,
  },
];
