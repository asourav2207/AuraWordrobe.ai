import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  Clock, 
  Code, 
  ShieldCheck, 
  Users, 
  Terminal, 
  Compass,
  ArrowRight,
  Download,
  Github
} from 'lucide-react';

export default function ExecutiveDossierView() {
  const [activeChapter, setActiveChapter] = useState('writeup'); // 'writeup' | 'prompt' | 'timelog' | 'interviews' | 'walkthrough' | 'sessions'

  return (
    <div className="space-y-6">

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Executive Documentation Dossier</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              AuraWardrobe AI Strategy & Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Complete interview-ready dossier covering customer segment discovery, the 5 structural Indian fashion commerce gaps, 3 strategic bets, AI prompt engineering methodology, qualitative user interviews, and technical verification logs.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="https://github.com/asourav2207/AuraWordrobe.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold text-white transition flex items-center space-x-1.5 border border-white/15"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repo</span>
            </a>
            <a
              href="./docs.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white rounded-xl text-xs font-bold shadow-lg transition flex items-center space-x-1.5"
            >
              <span>Open Standalone Webpage</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10 text-xs">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-slate-400 block uppercase font-bold text-[10px]">Target Cohort</span>
            <span className="text-white font-bold text-sm">23–30 Yrs Metros (₹8L–₹25L)</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-slate-400 block uppercase font-bold text-[10px]">Fit Return Benchmark</span>
            <span className="text-emerald-400 font-bold text-sm">&lt; 8% (vs 34% Industry)</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-slate-400 block uppercase font-bold text-[10px]">3D Engine Stack</span>
            <span className="text-amber-300 font-bold text-sm">Three.js + Bitmoji Shiplap</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-slate-400 block uppercase font-bold text-[10px]">Engineering Time Log</span>
            <span className="text-purple-300 font-bold text-sm">11.75 Hours Total</span>
          </div>
        </div>
      </div>

      {/* Main Dossier Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-3 py-1">
              Dossier Chapters
            </span>

            <button
              onClick={() => setActiveChapter('writeup')}
              className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-bold transition flex items-center justify-between ${
                activeChapter === 'writeup'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-rose-500" />
                <span>1. Executive Write-Up</span>
              </div>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">3-Page</span>
            </button>

            <button
              onClick={() => setActiveChapter('prompt')}
              className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-bold transition flex items-center justify-between ${
                activeChapter === 'prompt'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-amber-500" />
                <span>2. Prompt Engineering Note</span>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">1-Page</span>
            </button>

            <button
              onClick={() => setActiveChapter('timelog')}
              className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-bold transition flex items-center justify-between ${
                activeChapter === 'timelog'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-purple-500" />
                <span>3. Engineering Time Log</span>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">11.75 Hrs</span>
            </button>

            <button
              onClick={() => setActiveChapter('interviews')}
              className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-bold transition flex items-center justify-between ${
                activeChapter === 'interviews'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-emerald-500" />
                <span>4. User Interview Transcripts</span>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">3 Users</span>
            </button>

            <button
              onClick={() => setActiveChapter('walkthrough')}
              className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-bold transition flex items-center justify-between ${
                activeChapter === 'walkthrough'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-pink-500" />
                <span>5. Prototype Walkthrough</span>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">Guide</span>
            </button>

            <button
              onClick={() => setActiveChapter('sessions')}
              className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-bold transition flex items-center justify-between ${
                activeChapter === 'sessions'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4 text-blue-500" />
                <span>6. AI Session Logs</span>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">JSONL</span>
            </button>

            {/* Direct Markdown Files on GitHub */}
            <div className="pt-4 border-t border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-3">
                Raw Markdown Files on GitHub
              </span>
              <a
                href="https://github.com/asourav2207/AuraWordrobe.ai/blob/main/docs/1_EXECUTIVE_WRITEUP.md"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-1.5 text-xs text-slate-600 hover:text-rose-600 hover:bg-slate-50 rounded-xl transition font-mono truncate"
              >
                📄 1_EXECUTIVE_WRITEUP.md ↗
              </a>
              <a
                href="https://github.com/asourav2207/AuraWordrobe.ai/blob/main/docs/2_PROMPT_NOTE.md"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-1.5 text-xs text-slate-600 hover:text-rose-600 hover:bg-slate-50 rounded-xl transition font-mono truncate"
              >
                📄 2_PROMPT_NOTE.md ↗
              </a>
              <a
                href="https://github.com/asourav2207/AuraWordrobe.ai/blob/main/docs/3_TIME_LOG.md"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-1.5 text-xs text-slate-600 hover:text-rose-600 hover:bg-slate-50 rounded-xl transition font-mono truncate"
              >
                📄 3_TIME_LOG.md ↗
              </a>
              <a
                href="https://github.com/asourav2207/AuraWordrobe.ai/blob/main/docs/4_USER_INTERVIEW_TRANSCRIPTS.md"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-1.5 text-xs text-slate-600 hover:text-rose-600 hover:bg-slate-50 rounded-xl transition font-mono truncate"
              >
                📄 4_USER_INTERVIEWS.md ↗
              </a>
              <a
                href="https://github.com/asourav2207/AuraWordrobe.ai/blob/main/docs/5_PROTOTYPE_WALKTHROUGH.md"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-1.5 text-xs text-slate-600 hover:text-rose-600 hover:bg-slate-50 rounded-xl transition font-mono truncate"
              >
                📄 5_PROTOTYPE_WALKTHROUGH.md ↗
              </a>
            </div>
          </div>
        </div>

        {/* Right Content Display */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm min-h-[600px]">

          {/* CHAPTER 1: EXECUTIVE WRITE-UP */}
          {activeChapter === 'writeup' && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-700">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-1">
                  Chapter 1 • 3-Page Executive Strategy
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900">
                  Product Strategy Write-Up: AuraWardrobe AI
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Building a Next-Generation Fashion Commerce Operating System for India
                </p>
              </div>

              {/* Step 1 */}
              <div className="space-y-2">
                <h4 className="text-base font-bold text-slate-900">
                  Step 1: Choose a Segment — Who We Are Building For
                </h4>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <p><strong>The Specific Segment:</strong> Urban Young Working Professionals & Couples (Ages 23–30) in Tier-1 Indian Metros (Bengaluru, Mumbai, Delhi-NCR, Hyderabad, Pune).</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                    <li><strong>Demographics:</strong> Salaried tech, corporate, and creative professionals; annual income ₹8L–₹25L; monthly apparel spend ₹5,000–₹18,000.</li>
                    <li><strong>Lifestyle Context:</strong> Hybrid work weeks, rooftop dining, cafe co-working, and regular cultural/festive family pujas and weddings.</li>
                    <li><strong>Core Paradox ("Closet Saturation vs. Style Scarcity"):</strong> Overflowing wardrobes (40–80 pieces), yet daily decision fatigue (<em>"I have a full cupboard but nothing to wear"</em>). High sizing variance across Indian D2C and Western brands leads to 34% returns.</li>
                  </ul>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-2">
                <h4 className="text-base font-bold text-slate-900">
                  Step 2: Map the 5 Structural Gaps with Real Evidence
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                    <span className="font-bold text-amber-900 block">1. Sizing Roulette & Returns</span>
                    <p className="text-slate-600">30–40% return rates across Indian D2C & Western brands. Snitch chest 40" vs Zara's 44" vs Manyavar's +3" ease.</p>
                  </div>
                  <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1">
                    <span className="font-bold text-rose-900 block">2. Cognitive Overload & Decision Fatigue</span>
                    <p className="text-slate-600">50,000 infinite-scroll catalog tiles cause high bounce rates and impulse purchase regret.</p>
                  </div>
                  <div className="p-3.5 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1">
                    <span className="font-bold text-purple-900 block">3. Wardrobe Blindspots & Redundancy</span>
                    <p className="text-slate-600">Lack of closet inventory causes users to repeatedly buy safe dark polos while missing essential light trousers.</p>
                  </div>
                  <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                    <span className="font-bold text-emerald-900 block">4. Social Look Translation Friction</span>
                    <p className="text-slate-600">High Instagram/YouTube Reel inspiration vs tedious 45-minute multi-app search friction.</p>
                  </div>
                </div>
              </div>

              {/* Step 3 & 4 */}
              <div className="space-y-2">
                <h4 className="text-base font-bold text-slate-900">
                  Step 4: Three Strategic Bets (Why We Chose Bet 2)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <span className="font-bold text-slate-500 uppercase text-[10px]">Bet 1 • No AI</span>
                    <span className="font-bold block text-slate-900">Capsule Concierge Trunk</span>
                    <p className="text-slate-500">Human stylist curates 6 garments delivered to your door. Cut due to high inventory & logistics CapEx.</p>
                  </div>
                  <div className="p-3.5 bg-rose-50 border-2 border-rose-500 rounded-xl space-y-1 relative">
                    <span className="absolute top-2 right-2 text-[9px] bg-rose-600 text-white font-extrabold px-1.5 py-0.2 rounded-full">CHOSEN</span>
                    <span className="font-bold text-rose-700 uppercase text-[10px]">Bet 2 • AI-Led</span>
                    <span className="font-bold block text-slate-900">AuraWardrobe AI</span>
                    <p className="text-slate-600">Computer vision closet audit + cross-brand sizing + Snapchat 3D Bitmoji try-on + Shop for Me concierge.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <span className="font-bold text-slate-500 uppercase text-[10px]">Bet 3 • New Model</span>
                    <span className="font-bold block text-slate-900">Closet Equity Swap</span>
                    <p className="text-slate-500">Deposit unworn clothes for liquid credit to buy missing items. High warehouse grading complexity.</p>
                  </div>
                </div>
              </div>

              {/* Step 6: 30-Day Plan */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
                <span className="text-amber-400 font-bold block text-xs uppercase tracking-wider">
                  Step 6: Plan the First 30 Days (North Star & Kill Signals)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div>
                    <span className="text-slate-400 block text-[10px]">North Star Metric</span>
                    <span className="text-amber-300 font-bold">Wardrobe Gap Conversion &gt; 18%</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Guardrail Metric</span>
                    <span className="text-emerald-400 font-bold">Fit-Related Return &lt; 8%</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Kill Signal</span>
                    <span className="text-rose-400 font-bold">&gt; 60% revert to search keywords</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* CHAPTER 2: PROMPT ENGINEERING NOTE */}
          {activeChapter === 'prompt' && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-700">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
                  Chapter 2 • Prompt Engineering Note
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900">
                  Top Prompts & Systematic Verification Protocols
                </h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 block text-xs">
                    Prompt 1: Multi-Subject Deconstruction from Casual Albums
                  </span>
                  <pre className="bg-slate-900 text-slate-100 p-3 rounded-xl text-xs overflow-x-auto font-mono">
                    <code>{`"Analyze the 6 uploaded photos of Aditya and Ananya. Detect distinct individuals, separate multiple subjects in shared photos, and extract each garment item into a clean schema: Garment Name, Category, Cloth Type (weave & GSM), Wardrobe Type (occasion), Primary Color (with hex), Condition Score (1.0-10.0), and Status (KEEP/REPLACE)."`}</code>
                  </pre>
                  <p className="text-xs text-slate-600">Forces deterministic segmentation and prevents hallucinating merged wardrobes across partners.</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 block text-xs">
                    Prompt 2: Snapchat 3D Bitmoji Studio & Layered Garment Mapping
                  </span>
                  <pre className="bg-slate-900 text-slate-100 p-3 rounded-xl text-xs overflow-x-auto font-mono">
                    <code>{`"Replicate the aesthetic of the Snapchat virtual try-on character in Three.js:
1. Render a cozy room with white shiplap plank walls, sunlit French window, and floating shelves with potted succulent plants.
2. Build a stylized 3D Bitmoji character with clear rectangular acetate glasses, center-parted hair with bangs, and relaxed shrug pose.
3. Layer outerwear (denim trucker jacket), innerwear (striped rugby polo with white collar), bottoms (pleated wide-leg khakis), and chunky lug running sneakers."`}</code>
                  </pre>
                  <p className="text-xs text-slate-600">Eliminates uncanny-valley mannequins by anchoring the experience in an authentic 3D social avatar format.</p>
                </div>

                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-1.5">
                  <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">
                    Failed Prompt Post-Mortem & Resolution
                  </span>
                  <p className="text-xs text-slate-700">
                    <strong>Failed Attempt:</strong> Direct terminal scraping of Myntra/Ajio search pages via curl resulted in 403 Forbidden Cloudflare challenge blocks.
                  </p>
                  <p className="text-xs text-slate-700">
                    <strong>Engineered Solution:</strong> Replaced volatile scraping with verified direct canonical URLs and grounded retail catalogs (Snitch, Levi's, FabIndia, Zara) with exact product IDs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CHAPTER 3: TIME LOG */}
          {activeChapter === 'timelog' && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-700">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block mb-1">
                  Chapter 3 • Engineering Time Log
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900">
                  Granular Chronology: 11 Hours 45 Minutes Total
                </h3>
              </div>

              <div className="space-y-2 overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th className="p-2.5">Phase</th>
                      <th className="p-2.5">Time</th>
                      <th className="p-2.5">Sub-Tasks & Deliverables</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-slate-50">
                    <tr>
                      <td className="p-2.5 font-bold">1. Problem Discovery</td>
                      <td className="p-2.5">1h 15m</td>
                      <td className="p-2.5">Segment definition, 3 user interviews, 5 structural market gaps mapped.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">2. Strategy & Bets</td>
                      <td className="p-2.5">1h 00m</td>
                      <td className="p-2.5">3 strategic bets framed, MVP scoping, 30-day GTM playbook.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">3. Vision & Data</td>
                      <td className="p-2.5">1h 30m</td>
                      <td className="p-2.5">6 photos segregated into Aditya & Ananya, condition rating 1–10.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">4. Anthropometric Sizing</td>
                      <td className="p-2.5">1h 15m</td>
                      <td className="p-2.5">Brand sizing algorithms for Snitch, Rare Rabbit, Zara, Levi's, FabIndia.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">5. React Application</td>
                      <td className="p-2.5">2h 15m</td>
                      <td className="p-2.5">Vite + React 18 + Tailwind app, Shop for Me, Cart pairing drawer.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">6. Snapchat 3D Try-On</td>
                      <td className="p-2.5">2h 30m</td>
                      <td className="p-2.5">Three.js 3D room, Bitmoji avatar, shiplap wall, layered denim & polo.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">7. Reel Cloner & Photos API</td>
                      <td className="p-2.5">1h 00m</td>
                      <td className="p-2.5">Grounded retail data, Google Photos library sync, image delete controls.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">8. Deployment & Dossier</td>
                      <td className="p-2.5">1h 10m</td>
                      <td className="p-2.5">Executive Dossier view, GitHub Pages CI/CD, and Vercel compatibility.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CHAPTER 4: USER INTERVIEWS */}
          {activeChapter === 'interviews' && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-700">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                  Chapter 4 • User Interview Transcripts
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900">
                  Verbatim Field Notes from 3 Real Shoppers
                </h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-900 text-sm">Aditya (Age 26, Senior Software Engineer, Indiranagar, Bengaluru)</span>
                  <p className="italic text-slate-600">
                    "I ordered an 'L' from Snitch and it was skin-tight on my chest. Then I ordered an 'L' from Marks & Spencer and it felt like a parachute. My closet has six navy blue polo shirts because whenever I browse in a hurry, I default to safe dark colors. When I needed to go to a family temple puja, I realized I had only one short kurta and zero traditional footwear to go with it."
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-900 text-sm">Ananya (Age 25, Creative & Brand Strategist, Koramangala, Bengaluru)</span>
                  <p className="italic text-slate-600">
                    "I see amazing styling reels on Instagram—like a cropped Kashmiri embroidered shrug over wide-leg palazzos. But trying to find those exact pieces on Myntra or Ajio is exhausting. I have to search three different keywords, guess fabric quality, and check reviews. Also, 90% of my bottoms are black trousers because I'm terrified off-white pants will fit awkwardly."
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-900 text-sm">Rohan (Age 28, Senior Product Manager, HSR Layout, Bengaluru)</span>
                  <p className="italic text-slate-600">
                    "Returning clothes is my single biggest weekend chore. If an app could look at my existing clothes and say: 'You already have enough dark polos, buy this oatmeal linen overshirt instead, and in Snitch you are Large but in Zara you are Medium'—I would buy instantly."
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CHAPTER 5: WALKTHROUGH */}
          {activeChapter === 'walkthrough' && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-700">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-pink-600 uppercase tracking-wider block mb-1">
                  Chapter 5 • Evaluator Prototype Walkthrough
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900">
                  Feature-by-Feature Evaluation Guide
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">1. Snapchat 3D Bitmoji Virtual Try-On</span>
                  <p className="text-slate-600">Click 3D Virtual Try-On tab. Rotate 360° with mouse. Inspect cozy room with white shiplap walls, sunlight window, and potted plants. Equip denim jacket, rugby polo, pleated khakis, and chunky sneakers.</p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">2. Google Photos API Ingestion & Deletion</span>
                  <p className="text-slate-600">Click "Google Photos Sync" banner or "Scan Photo". Browse smart albums, select multiple photos, delete unwanted photos with the trash button, or batch-delete selected images.</p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">3. Grounded Social Reel Look Cloner</span>
                  <p className="text-slate-600">Click Reel Cloner tab. Click the Snapchat aesthetic sample link or paste an Instagram/YouTube URL. Observe real verified pieces with canonical links and closet synergy savings.</p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">4. Shop for Me Anti-Decision Fatigue Concierge</span>
                  <p className="text-slate-600">Select an occasion and budget slider. Notice the ₹0 closet synergy calculation reusing your owned clothes alongside high-conviction gap fillers.</p>
                </div>
              </div>
            </div>
          )}

          {/* CHAPTER 6: AI SESSION LOGS */}
          {activeChapter === 'sessions' && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-700">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  Chapter 6 • AI Session Logs & Trajectory
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900">
                  Unedited Multi-Turn AI Engineering Transcript
                </h3>
              </div>

              <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-3">
                <span className="text-amber-400 font-bold block text-xs">
                  Full Session Transcript Available in Repository
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The complete unedited trajectory of prompts, tool calls, and automated lint checks is archived in JSONL format:
                </p>
                <div className="p-3 bg-black/40 rounded-xl font-mono text-xs text-amber-300">
                  docs/logs/session_transcript.jsonl
                </div>
                <a
                  href="https://github.com/asourav2207/AuraWordrobe.ai/blob/main/docs/logs/session_transcript.jsonl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>View JSONL Logs on GitHub ↗</span>
                </a>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
