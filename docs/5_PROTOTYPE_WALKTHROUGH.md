# Prototype Evaluation Walkthrough & Reviewer Guide

**Application Name:** AuraWardrobe AI (Fashion Commerce India)  
**Live Evaluation URL:** [http://localhost:5173/](http://localhost:5173/)  
**Command to Run Locally:**
```bash
cd /Users/adityasourav/Downloads/FashionCommerce
npm run dev
```

---

## 1. Quick 3-Minute Reviewer Tour (Enhanced Capabilities)

### Feature 1: Instagram & YouTube Video Look Deconstructor
- Click the **"Reel Cloner"** tab.
- At the top, observe the **Video Link Input Bar**: supports Instagram Reels (`https://instagram.com/reel/...`) and YouTube Shorts (`https://youtube.com/shorts/...`).
- Click any of the quick sample chips (e.g. *"@kritika_khurana Indo-Western Reel"* or *"@streetstyle_bengaluru Minimalist Look"*).
- Click **"Deconstruct & Replicate Look"**:
  - Watch the live AI frame analysis bar (0:02, 0:06, 0:12 frame extraction $\to$ silhouette segmentation $\to$ Myntra/Amazon matching $\to$ closet synergy audit).
  - The newly extracted look appears instantly in the feed with pre-mapped sizes, closet match alerts, and 1-click cart addition!

### Feature 2: Full Biometric & Anthropometric Sizing Engine (Auto-Detected & Pre-Filled)
- Click the **"Biometric Sizing"** tab.
- **Pre-Filled from Photos:**
  - Notice all detected body landmarks: **Height (175 cm / 5'9")**, **Chest (40")**, **Waist (34")**, **Arm / Sleeve (25")**, **Leg Inseam (31")**, **Shoulder Width (18")**, **Neck (15.5")**, **Body Type (Athletic Mesomorph)**, **BMI (24.2)**, and **Skin Tone (Warm Golden Indian Wheatish with color swatch)**.
- **Interactive Calibration:**
  - Drag any slider (e.g., adjust Chest to 42" or Waist to 36") or pick a different skin tone swatch.
  - Watch the brand sizing cards (**Snitch, Rare Rabbit, Zara, Levi's, FabIndia/Manyavar, Marks & Spencer**) recalculate live in real time!
- **Sizes of Clothes Worn in Photos:**
  - Switch to the **"Cloth Size Guessed in Photos"** view at the top right:
  - Shows the AI's tension & fold analysis of the actual clothes worn in the uploaded photos (e.g. Navy Polo in Photo #3 guessed as *Size L in Snitch / Size M in Zara* at 94% confidence).

### Feature 3: Interactive 3D Virtual Body & AR Try-On Studio (Snapchat & Lenskart Grade)
- Click the **"3D Virtual Try-On"** tab (with the purple 3D badge).
- **Interactive 3D Mannequin:**
  - An anatomical 3D avatar rendered with Three.js that automatically morphs to the user's height, chest, waist, shoulder width, and skin tone.
  - **Orbit Controls:** Click and drag horizontally with your mouse or finger to **rotate the avatar 360°**.
  - **View Presets:** Click **Front**, **Angle (45°)**, **Side**, or **Back** to instantly snap the camera.
  - **Fit Heatmap Mode:** Click **"Fit Heatmap: ON"** to see fabric strain and drape tension in real-time (Green = optimal drape, Amber = snug chest, Blue = relaxed ease).
- **Populate with Existing Closet + New Suggestions:**
  - In the right-hand panel, mix and match **Upper Body** items (e.g., try the *Snitch Sand Beige Overshirt* or the existing *Navy Pique Polo*), **Lower Body** items (*Black Chinos* vs. *Blue Denim*), and **Footwear** (*Tan Kolhapuris* vs. *White Sneakers*).
  - Watch the 3D avatar update its fabrics and colors instantly!
  - Click **"Add Visualized 3D Outfit to Cart"** to stage the complete outfit bundle into your cart with one click!

### Feature 4: Standardized & De-duplicated Wardrobe Cards
- Click the **"Wardrobe"** tab.
- Notice the streamlined, production-grade card layout (standardized 48-height image banner, compact badges, uniform metadata, and concise status diagnostics).
- **View Mode Switcher:** Toggle between **"Grid View"** (3-column visual cards) and **"Compact List View"** (sleek row view for rapid inventory auditing).
- **Interactive Triage:** Click **"Mark Replace"** or **"Mark Kept"** to update wardrobe health scores in real time.

---

## 2. Technical Architecture & File Directory

```text
FashionCommerce/
├── src/
│   ├── components/
│   │   ├── Header.jsx                 # Top bar with 3D Try-On tab, active profile pill, cart counter
│   │   ├── ThreeDBodyTryOn.jsx        # Three.js 3D Virtual Try-On Studio (360° rotation, fit heatmap)
│   │   ├── BrandSizingMatrix.jsx      # Biometric & anthropometric calibration tuner + photo size guesser
│   │   ├── InstaTrendCloner.jsx       # Instagram Reel & YouTube Short link deconstructor
│   │   ├── WardrobeAuditor.jsx        # Standardized e-commerce wardrobe cards with Grid/List toggle
│   │   ├── DecisionFatigueReducer.jsx # 3-item Why Buy catalog, outfit permutation simulator, Myntra links
│   │   ├── CartDrawer.jsx             # Dynamic cart drawer, artefact pairing & unified checkout
│   │   ├── ProfileSelector.jsx        # Multi-subject switcher (Aditya vs. Ananya)
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
└── package.json                       # React 18, Vite 5, Tailwind 3, Three.js 0.160, Lucide Icons
```
