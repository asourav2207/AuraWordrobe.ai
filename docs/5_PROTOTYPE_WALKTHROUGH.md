# Prototype Evaluation Walkthrough & Reviewer Guide

**Application Name:** AuraWardrobe AI (Fashion Commerce India)  
**Live Evaluation URL:** [http://localhost:5173/](http://localhost:5173/)  
**Command to Run Locally:**
```bash
cd /Users/adityasourav/Downloads/FashionCommerce
npm run dev
```

---

## 1. Quick 3-Minute Reviewer Tour

### Step 1: Switch Profiles (Multi-Subject Vision Deconstruction)
- In the top banner, toggle between **Aditya (Male, 26)** and **Ananya (Female, 25)**.
- Notice how the application instantly swaps the wardrobe inventory, condition audits, anthropometric dimensions, and brand size calculations based on the subject's gender and physical build.

### Step 2: Inspect the Wardrobe Audit & Condition Scoring
- On the **"Wardrobe Audit"** tab:
  - Filter by **Tops**, **Bottoms**, **Ethnic & Festive**, or **Outerwear**.
  - Review the **Condition Scores** (1.0 to 10.0). Notice the distinction between **KEEP** (Pristine items like the Navy Short Kurta or Resham Embroidered Jacket) and **REPLACE** (Worn items like the faded pink checked shirt or rippled graphic t-shirt).
  - Click the **"Eye" icon** on any garment card to inspect the exact source lifestyle photo from which the computer vision model extracted that garment.

### Step 3: Test the Anti-Decision Fatigue "Why Buy" Recommender
- Click the **"Logical 'Why Buy'"** tab in the navigation bar.
- Notice that instead of 50,000 algorithmic tiles, the user is presented with **strictly 3 high-impact items**:
  - Exactly 1 high-quality **REPLACE** piece (e.g. Rare Rabbit Sage Green Linen Shirt replacing the faded plaid shirt).
  - Exactly 2 strategic **ADD** pieces that unlock at least 5 new permutations with existing clothes (e.g. Sand Beige Overshirt or Ecru Wide-Leg Palazzos).
- Inspect the **In-Cart Demographic Proof** card: shows peer acceptance rates (e.g. *"89% of tech professionals in Bengaluru kept this item; 3.8% return rate"*).
- Click **"View Live on Myntra / Amazon / Flipkart"** to verify valid, active e-commerce search deep links.
- Click **"Add to Cart (Size L)"** — notice that the size has already been pre-calculated based on that brand's sizing framework.

### Step 4: Examine the Indian Anthropometric Sizing Matrix
- Click the **"Brand Sizing"** tab in the navigation bar.
- Compare how Aditya's 40" chest maps across brands:
  - **Snitch:** Size **L** (Slim D2C cut; snug chest fit).
  - **Rare Rabbit:** Size **40 / L** (Tapered chest; high armhole).
  - **Zara India:** Size **M** (European regular cut; Size L sleeves would drag 1.5 inches past the wrist).
  - **Levi's:** **34W x 32L** (511 Slim or 512 Tapered).
  - **FabIndia / Manyavar:** Size **40 / M** (includes 3 inches of traditional ease for seating during family pujas).

### Step 5: Test the Instagram Influencer Look Replicator
- Click the **"Insta Look Cloner"** tab in the navigation bar.
- Review trending reels from Indian fashion creators (*Modern Desi Girl*, *Old Money Indian*, *Vanilla Girl Cozy Luxe*).
- Click **"Clone Look & Auto-Add All 3 to Cart"** to add the complete outfit bundle with an instant 15% bundle discount.

### Step 6: Test Dynamic Cart Artefact Pairing
- Click the **"Cart & Pairings"** button in the top right.
- In the slide-out drawer, notice that under the cart items, the **Automated Matching Artefacts Engine** dynamically surfaces complementary accessories (e.g., *Tan Leather Mojaris*, *Boho Oxidized Silver Jhumkas*, *Vintage Brass Dial Watch*) that match the color harmony and occasion of the cart items without any manual keyword search!
- Click **"+ Pair"** to add an artefact directly into the cart.

---

## 2. Technical Architecture & File Directory

```text
FashionCommerce/
├── src/
│   ├── components/
│   │   ├── Header.jsx                 # Navigation, active profile pill, cart counter
│   │   ├── ProfileSelector.jsx        # Multi-subject switcher, anthropometrics
│   │   ├── WardrobeAuditor.jsx        # Garment catalog, condition scorecards, photo lightbox
│   │   ├── DecisionFatigueReducer.jsx # 3-item Why Buy catalog, social proof, Myntra links
│   │   ├── BrandSizingMatrix.jsx      # Technical pattern breakdown across Indian brands
│   │   ├── InstaTrendCloner.jsx       # Viral reel-to-cart bundle replicator
│   │   ├── CartDrawer.jsx             # Dynamic cart drawer with automated artefact pairing
│   │   └── PhotoScanModal.jsx         # Computer vision pipeline simulator
│   ├── data/
│   │   └── wardrobeDatabase.js        # Master dataset with realistic photo metadata
│   ├── App.jsx                        # Central state controller
│   ├── main.jsx                       # React entry point
│   └── index.css                      # Custom Tailwind utility rules & Google Fonts
├── public/
│   ├── wardrobe_assets/               # The 6 authentic user-uploaded lifestyle photos
│   └── wardrobe_audit_summary.json    # CLI-generated structured audit export
├── scripts/
│   └── wardrobe_analyzer.py           # Standalone Python CLI analysis tool
├── docs/                              # Complete product & evaluation documentation
│   ├── 1_EXECUTIVE_WRITEUP.md         # 3-page Strategy Dossier (Steps 1-4 & 6)
│   ├── 2_PROMPT_NOTE.md               # 1-page Prompt Engineering Note
│   ├── 3_TIME_LOG.md                  # Comprehensive Task Time Log
│   ├── 4_USER_INTERVIEW_TRANSCRIPTS.md# 3 In-Depth User Interviews
│   ├── 5_PROTOTYPE_WALKTHROUGH.md     # This review guide
│   └── 6_AI_SESSION_LOGS.md           # AI Session audit trail
└── package.json                       # React 18, Vite 5, Tailwind 3, Lucide Icons
```
