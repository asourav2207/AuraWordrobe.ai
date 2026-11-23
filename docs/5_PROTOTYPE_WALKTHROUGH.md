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

### Feature 3: Interactive 3D Virtual Body & Neural Try-On Studio (Photorealistic Digital Twin)
- Click the **"3D Virtual Try-On"** tab (with the purple 3D badge).
- **Two Rendering Engines Available:**
  1. **Photorealistic Mirror:** Shows a 100% photo-grounded digital twin of the user (extracted from real lifestyle photos), avoiding the cartoonish uncanny-valley effect while previewing selected garments.
  2. **3D Turntable (Three.js):** Full 360° interactive turntable with the user's authentic face mapped onto an anatomically proportioned head mesh.
- **Controls & Interaction:**
  - **Orbit Controls:** Click and drag with mouse or touch to rotate 360°.
  - **View Presets:** Instant camera snap to **Front**, **Angle (45°)**, **Side**, or **Back**.
  - **Fit Heatmap Mode:** Toggle on to inspect fabric drape and ease allowances across the torso and hips.
- **Outfit Equipping & Synergy:**
  - Select items from the **Owned Closet** or **Recommended Gap-Fillers**.
  - Click **"Add Visualized 3D Outfit to Cart"** to stage the complete outfit into the checkout drawer with 1-click bundle savings.

### Feature 4: "Shop for Me" Smart Concierge (Anti-Decision Fatigue)
- Click the **"Shop for Me"** tab.
- **Interactive Controls:**
  - Select an occasion (e.g., *Diwali / Temple Puja*, *Cocktail / Weekend Dining*, *Client Presentation*, or custom text).
  - Adjust the budget slider from ₹1,000 to ₹15,000.
  - Enter custom styling intent (e.g. *"I want an ethnic look that pairs with my existing black chinos"*).
- **Closet Synergy Calculation:**
  - Highlights owned wardrobe pieces that can be reused at **₹0 spend**, eliminating redundant spending.
- **Strategic Gap Fillers:**
  - Displays high-conviction, scrollable suggestion cards with direct canonical merchant links to Snitch, Myntra, and FabIndia.

### Feature 5: Isolated Studio Garment Wardrobe Cards
- Click the **"Wardrobe"** tab.
- **Isolated Studio Flat-Lays:** Every card displays a clean, studio-photographed garment on a pure white background matching the user's real clothes.
- **Direct Merchant Links:** Click **"Product Page"** to open the real canonical product listing.
- **Inspection Lightbox:** Click **"📸 Worn in Photo"** to open a lightbox showing the authentic lifestyle photo of the user wearing that exact piece.
- **Instant 3D Try-On:** Click **"🎽 3D Try On"** to immediately teleport that garment into the 3D studio.

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
