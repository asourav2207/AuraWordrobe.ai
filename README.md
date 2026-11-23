# AuraWardrobe AI — Fashion Commerce Operating System for India

> **A Next-Generation Shopping Experience for Urban Young Professionals in India**  
> *Solves "Closet Saturation vs Style Scarcity", 34% Brand Sizing Inconsistency, Decision Fatigue, and Disjointed Social Look Translation.*

[![Live Prototype](https://img.shields.io/badge/Prototype-Running%20Live-brightgreen)](http://localhost:5173/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com/)

---

## 🚀 Live Prototype & Quick Start

### 1. Live Interactive Prototype
The application is currently running live on local port 5173:  
👉 **[http://localhost:5173/](http://localhost:5173/)**

### 2. Run Locally in Terminal
```bash
# Clone or navigate to the directory
cd /Users/adityasourav/Downloads/FashionCommerce

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Run Standalone Python Wardrobe CLI Analyzer
```bash
./scripts/wardrobe_analyzer.py --dir public/wardrobe_assets --output public/wardrobe_audit_summary.json
```

---

## 📑 Required Submission Dossiers (in `/docs/`)

| Document | Description | Direct File Link |
| :--- | :--- | :--- |
| **1. Executive Strategy Write-Up** | 3-page rigorous strategy covering Steps 1–4 and 6: Segment, 5 Gaps, Incumbent Failures, 3 Bets, 30-Day GTM, Metrics & Kill Signal. | [1_EXECUTIVE_WRITEUP.md](file:///Users/adityasourav/Downloads/FashionCommerce/docs/1_EXECUTIVE_WRITEUP.md) |
| **2. Prompt Note (1 Page)** | The 5 most important prompts word-for-word, 1 failed prompt dissection, and the 4-tier output verification methodology. | [2_PROMPT_NOTE.md](file:///Users/adityasourav/Downloads/FashionCommerce/docs/2_PROMPT_NOTE.md) |
| **3. Project Time Log** | Chronological 8h 45m breakdown across discovery, architecture, vision deconstruction, brand sizing, coding, and testing. | [3_TIME_LOG.md](file:///Users/adityasourav/Downloads/FashionCommerce/docs/3_TIME_LOG.md) |
| **4. User Interview Transcripts** | In-depth qualitative research notes from 3 real target users: Aditya (26, Tech), Ananya (25, Creative), and Rohan (28, Product). | [4_USER_INTERVIEW_TRANSCRIPTS.md](file:///Users/adityasourav/Downloads/FashionCommerce/docs/4_USER_INTERVIEW_TRANSCRIPTS.md) |
| **5. Prototype Walkthrough Guide** | Step-by-step evaluator tour for testing multi-subject switching, condition audits, 3-item Why Buy, sizing, and dynamic cart pairing. | [5_PROTOTYPE_WALKTHROUGH.md](file:///Users/adityasourav/Downloads/FashionCommerce/docs/5_PROTOTYPE_WALKTHROUGH.md) |
| **6. Unedited AI Session Logs** | Complete audit trail with direct link to unedited raw JSON Lines export `docs/logs/session_transcript.jsonl`. | [6_AI_SESSION_LOGS.md](file:///Users/adityasourav/Downloads/FashionCommerce/docs/6_AI_SESSION_LOGS.md) |

---

## 💡 Core Innovations of the Chosen Bet (AI-Led Wardrobe OS)

1. **Multi-Subject Vision Segregation:** Automatically decouples coupled, family, and friend lifestyle photos into discrete user profiles (e.g. Aditya vs. Ananya) with personalized wardrobes and sizing.
2. **Garment Condition Auditing:** Evaluates fabric GSM, weave, and wear flags (collar roll, wash fade, placket fatigue) to assign objective condition scores (1–10) and triage actions (**KEEP**, **REPLACE**, **ADD**).
3. **Indian Anthropometric Brand Sizing Matrix:** Solves the 34% size return rate by calculating exact cross-brand pattern mappings (Snitch Slim L vs. Zara Regular M vs. Manyavar Ethnic 40 with 3" ease vs. Levi's 34W).
4. **Anti-Decision Fatigue "Why Buy" Recommender:** Replaces 50,000 infinite-scroll catalog tiles with strictly **3 high-conviction recommendations** with demographic social proof (*"89% kept in Bengaluru tech cohort"*).
5. **Viral Instagram Look Cloner:** Translates creator reels into 1-click 3-item wardrobe bundles with a 15% bundle discount.
6. **Automated Cart Artefact Pairing:** Dynamically surfaces complementary accessories and footwear (e.g. Tan Kolhapuris with Navy Kurta) without manual searching.

---

## 🛠️ Tech Stack & Dependencies

- **Frontend:** React 18, Vite 5, Tailwind CSS, Lucide React Icons
- **Typography:** Playfair Display (Serif) & Plus Jakarta Sans
- **Backend / CLI:** Python 3.13, Node 18, JSONL event streams
- **Agent Skill:** Registered in `~/.gemini/config/skills/wardrobe-intelligence-commerce/SKILL.md`
