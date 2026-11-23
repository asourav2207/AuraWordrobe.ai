# Prototype Evaluation Walkthrough & Reviewer Guide

**Application Name:** AuraWardrobe AI (Fashion Commerce India)  
**Live Evaluation URL:** [http://localhost:5173/](http://localhost:5173/)  
**Command to Run Locally:**
```bash
cd /Users/adityasourav/Downloads/FashionCommerce
npm run dev
```

---

## 1. Quick 3-Minute Reviewer Tour (Enhanced End-to-End Capabilities)

### Step 1: Switch Profiles (Multi-Subject Vision Deconstruction)
- In the top banner, toggle between **Aditya (Male, 26)** and **Ananya (Female, 25)**.
- Notice how the application instantly swaps the wardrobe inventory, condition audits, anthropometric dimensions, and brand size calculations based on the subject's gender and physical build.

### Step 2: Interactive Wardrobe Management & Condition Scoring
- On the **"Wardrobe Audit"** tab:
  - **Search & Filter:** Search by keyword (e.g., *"linen"*, *"polo"*, *"embroidered"*, *"black"*) or filter by Category and Occasion.
  - **Interactive Triage:** Click **"Mark to Replace"** or **"Mark as Kept"** to toggle an item's status live. Watch the top counter and health scores update immediately!
  - **Archive/Delete:** Click the trash icon to retire an item from rotation.
  - **Add Custom Garment:** Click **"+ Add Garment"** to manually inventory a piece with fabric, occasion, and condition metrics.
  - Click the **"Eye" icon** on any garment card to inspect the exact source lifestyle photo from which the computer vision model extracted that garment.

### Step 3: Test the Anti-Decision Fatigue "Why Buy" Recommender & Outfit Simulator
- Click the **"Logical 'Why Buy'"** tab in the navigation bar.
- Notice that instead of 50,000 algorithmic tiles, the user is presented with **strictly 3 high-impact items**:
  - Exactly 1 high-quality **REPLACE** piece (e.g. Rare Rabbit Sage Green Linen Shirt replacing the faded plaid shirt).
  - Exactly 2 strategic **ADD** pieces that unlock at least 5 new permutations with existing clothes (e.g. Sand Beige Overshirt or Ecru Wide-Leg Palazzos).
- **Interactive Outfit Permutations Simulator:** Click **"Simulate Outfits With Your Closet"** on any recommendation! It expands to reveal 2–3 distinct outfits showing how the recommended piece combines with items in the user's closet (e.g. *"Overshirt + Navy Pique Polo + Black Chinos for Indiranagar Dining"*).
- Inspect the **In-Cart Demographic Proof** card: shows peer acceptance rates (e.g. *"89% of tech professionals in Bengaluru kept this item; 3.8% return rate"*).
- Click **"View Live on Myntra / Amazon / Flipkart"** to verify valid, active e-commerce search deep links.
- Click **"Add to Cart (Size L)"** — notice that the size has already been pre-calculated based on that brand's sizing framework.

### Step 4: Test the Live Interactive Anthropometric Measurement Tuner
- Click the **"Brand Sizing"** tab in the navigation bar.
- **Drag the Sliders:**
  - Adjust **Chest / Bust** from 30" to 48".
  - Adjust **Waist** from 24" to 44".
- Watch every single brand size (**Snitch, Rare Rabbit, Zara, Levi's, FabIndia, Marks & Spencer, Mango**) recalculate live in real time right before your eyes!
- Notice the technical pattern explainer:
  - **Snitch:** Explains why slim D2C cuts require sizing up for chest armhole clearance.
  - **Zara India:** Explains why Euro regular fit avoids sleeve dragging.
  - **Manyavar / FabIndia:** Explains the traditional 3-inch comfort ease for seating during family pujas.

### Step 5: Test the Smart Instagram Influencer Look Replicator
- Click the **"Insta Look Cloner"** tab in the navigation bar.
- Review trending reels from Indian fashion creators (*Modern Desi Girl*, *Old Money Indian*, *Vanilla Girl Cozy Luxe*).
- **Smart Closet Synergy:** Notice that for Ananya, the app alerts: *"Closet Synergy Detected! You already own the Black Resham Floral Embroidered Jacket! You only need the missing pieces to complete this look!"*
- Click **"Smart Add Missing Pieces Only (Save ₹2,499)"** or **"Clone Look & Auto-Add All 3 to Cart (15% OFF)"**.

### Step 6: Test Dynamic Cart Artefact Pairing & Unified Checkout
- Click the **"Cart & Pairings"** button in the top right.
- In the slide-out drawer:
  - Adjust quantities (**+ / -**) and see real-time price recalculation with the auto-applied `AURAWARDROBE15` coupon.
  - In the **Automated Matching Artefacts** section, observe that complementary accessories dynamically match the current cart items (e.g., Tan Leather Mojari Mules for kurtas; Bohemian Silver Jhumkas for female shrugs/palazzos) without any manual searching!
  - Click **"+ Pair"** to add an artefact into the cart.
  - Click **"Proceed to Unified 1-Click Order"** to launch the **Unified Dispatch Modal** showing:
    - Bengaluru delivery address
    - Multi-merchant split dispatch breakdown (Myntra Fast Logistics + Amazon Prime)
    - Zero-Return Fit Guarantee certificate
    - Click **"Confirm & Dispatch Unified Order"** to receive the instant order confirmation and tracking number!

### Step 7: Test Photo Scan Simulator
- Click **"Scan Photo"** in the top navigation bar.
- Upload additional photos or click **"Execute Vision Audit"** to watch the multi-stage neural pipeline segment subjects and refresh the wardrobe health score.

---

## 2. Technical Architecture & File Directory

```text
FashionCommerce/
├── src/
│   ├── components/
│   │   ├── Header.jsx                 # Navigation, active profile pill, cart counter
│   │   ├── ProfileSelector.jsx        # Multi-subject switcher, anthropometrics
│   │   ├── WardrobeAuditor.jsx        # Garment catalog, condition scorecards, custom add & delete
│   │   ├── DecisionFatigueReducer.jsx # 3-item Why Buy catalog, outfit permutation simulator, Myntra links
│   │   ├── BrandSizingMatrix.jsx      # Interactive live measurement tuner across Indian brands
│   │   ├── InstaTrendCloner.jsx       # Smart reel-to-cart bundle replicator with closet synergy
│   │   ├── CartDrawer.jsx             # Dynamic cart drawer, artefact pairing & unified checkout
│   │   └── PhotoScanModal.jsx         # Custom upload dropzone & vision pipeline simulator
│   ├── data/
│   │   └── wardrobeDatabase.js        # Master dataset with photo metadata & dynamic size algorithm
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
