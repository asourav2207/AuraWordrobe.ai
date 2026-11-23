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

### Feature 1: Grounded Social Video Look Deconstructor (Instagram, YouTube & Pinterest)
- Click the **"Reel Cloner"** tab.
- **Direct Video Link Input Bar:** Supports Instagram Reels, YouTube Shorts, and Pinterest Looks.
- **Contextual 1-Click Samples:**
  - 👻 *Viral Snapchat Aesthetic Look: Denim Trucker, Striped Rugby Polo & Pleated Khakis*
  - 🎥 *The Formal Edit Slub Kurta Reel (Bangalore Lookbook)*
  - 👗 *Kritika Khurana Kashmiri Shrug & Palazzos Look*
  - ☕ *Komal Pandey Cozy Boucle Teddy Fleece Short*
- **100% Real, Grounded Retail Data (No Placeholders):**
  - Displays verified pieces from Levi's, Snitch, Zara, FabIndia, Jaypore, and Puma.
  - Actual INR prices, exact cloth types/GSM, and direct canonical store links.
  - Sizing calibrated directly to the user's biometric measurements (e.g. Size L for Aditya's 40" chest, Size 34W for waist).
- **Physical Closet Synergy Detection:**
  - Cross-references the active profile against `wardrobeDatabase.js`.
  - Automatically flags items already owned in the user's closet (e.g. Reusing owned Jet Black Chinos saves ₹1,799!).
  - Separates owned items (₹0 spend) from missing items to buy with dynamic net bundle math.

### Feature 2: Snapchat 3D Bitmoji Virtual Try-On Studio
- Click the **"3D Virtual Try-On"** tab (with the purple 3D badge).
- **Exact Replication of Snapchat 3D Virtual Try-On Character:**
  - Stylized Bitmoji 3D humanoid avatar standing in a cozy room:
    - Vertical white shiplap plank wall backdrop.
    - Sunlit French window frame with outdoor garden foliage.
    - Floating display shelf with potted succulent and cactus.
  - **Character Attributes:**
    - Expressive anime/pixar eyes with catchlight sparkle, stylized haircut with parted fringe, friendly smile, and warm wheatish skin tone.
    - Clear rectangular acetate hipster glasses (exact match to Aditya's glasses in his photos and in the reference!).
    - Optional festive reindeer antlers with evergreen pine needle leaves and red berries.
    - Iconic **Snapchat Shrug Pose** (hands open, palms facing up) or switchable to model stance.
  - **Real Layered Virtual Try-On:**
    - Outerwear: Levi's medium-wash denim trucker jacket (with brass buttons, chest flap pockets, and white tag!).
    - Innerwear: Snitch rugby stripe long-sleeve polo with clean white turn-down collar!
    - Bottoms: Zara pleated wide-leg beige/khaki trousers with clean cuffs.
    - Footwear: Puma RS-X chunky sneakers with thick white midsole and black jagged lug running tread!
    - Also supports instant equipping of owned closet pieces (Aditya's Navy Polo, Pink Check Shirt, Indigo Kurta; Ananya's Rose Shrug, Kashmiri Cardigan, Sherpa Fleece).
  - **360° Turntable & Snapchat Share Badge:**
    - Drag horizontally with mouse or touch to rotate 360°.
    - Camera angle snap buttons (Front, 3/4 Angle, Side, Back) and auto-spin toggle.
    - Snapchat Profile Card bar with user badge (`Aditya 🪐 </3 ✪`), handle (`@aditya_sourav`), and yellow Snapcode QR matrix!
    - "Compare with Ref" drawer to view the original Pinterest reference side-by-side.

### Feature 3: Photo Ingestion Modal with Google Photos Integration
- Click **"Scan Photo"** in the top navigation header.
- **Google Photos Library Sync Tab:**
  - Authenticated via Google OAuth 2.0 (`aditya.sourav@gmail.com`).
  - Browse smart albums: *All Photos*, *Outfits & Full Body*, *Festive & Social*, *Studio Flat-Lays*.
  - Multi-selection checkboxes on each photo thumbnail with "Select All" and "Clear" controls.
  - Displays detected AI tags (e.g., *"Detected: Polo Shirt + Glasses"*, *"Detected: 2 Persons Full Body"*).
- **Local Device Upload Tab:**
  - Drag-and-drop or file picker for custom JPG, PNG, HEIC files.
- **Multi-Step Ingestion Engine:**
  - Ingests selected photos via Google Photos API, performs face identification, cloth degradation scoring (1–10), and anthropometric size calibration.

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
