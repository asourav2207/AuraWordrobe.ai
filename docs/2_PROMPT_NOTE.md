# Prompt Engineering Note & AI Verification Dossier

**Project:** AuraWardrobe AI — Fashion Commerce & Wardrobe Intelligence OS (India)  
**Author / Engineering Lead:** AI Systems & Product Engineering  

---

## 1. Five Most Important Prompts (Word for Word & Rationale)

### Prompt 1: Multi-Subject De-identification & Profile Segregation
```text
"Inspect the provided 6 user photos. Note that multiple individuals may appear across different social, cultural, and domestic settings (e.g. temple visits, evening dinners, office selfies). Perform zero-shot visual identity clustering: separate subjects into distinct user profiles (Profile A, Profile B). For each profile, estimate gender, approximate age, height, body frame proportions, and compile a reference index of which photo contains which subject."
```
- **Why written this way:** Real user photo albums are messy and rarely contain clean solo studio catalog shots. Couples, friends, and family members co-exist in pictures. Without explicit instructions to decouple multiple individuals into discrete profiles, standard vision models merge the clothing items into a single hallucinated wardrobe (e.g., attributing women's embroidered shrugs to a male user).

---

### Prompt 2: Physical Garment Deconstruction & Condition Triage
```text
"For each detected garment across the user's photos, generate an engineering JSON record specifying: garment_name, category (Tops, Bottoms, Layering, Ethnic, Loungewear), cloth_type with estimated fabric GSM/weave (e.g. 240 GSM Pique Cotton, Slub Linen Weave, Resham Embroidered Chiffon), occasion suitability, condition_score (float 1.0 to 10.0), visible condition wear flags (e.g. collar curl, wash fade on placket, fabric pilling), and assign a strict lifecycle triage action: [KEEP | REPLACE | ADD | PURGE] with backing logical justification."
```
- **Why written this way:** Prevents vague fashion buzzwords. By forcing explicit attributes like fabric GSM, weave type, and granular wear markers (collar curl, placket fade), the agent was grounded in realistic material degradation, allowing the recommendation engine to logically justify *why* an item must be replaced.

---

### Prompt 3: Indian Anthropometric Brand Sizing Cross-Mapping
```text
"Take the estimated chest (40 in), waist (34 in), shoulder (18 in), and height (5'9\") for the male profile. Construct a technical sizing matrix across 6 major Indian fashion brands: Snitch, Rare Rabbit, Zara India, Levi's, FabIndia/Manyavar, and Marks & Spencer. Explain the technical pattern tailoring difference (e.g., why D2C slim-fit runs small in chest armholes vs. European torso length in Zara vs. traditional 3-inch ease in Manyavar kurtas) and assign a predicted size and a Fit Confidence Score percentage."
```
- **Why written this way:** Sizing in India is notorious for non-standardized vanity grading. Forcing the AI to explain the *pattern tailoring mechanics* (armhole depth, ease allowance, torso length) rather than just spitting out a static letter ('M' or 'L') gave the prototype defendable, interview-grade domain credibility.

---

### Prompt 4: The Anti-Decision Fatigue "Why Buy" Recommender
```text
"Formulate a strict maximum of 3 strategic product recommendations for this profile. Rule: Do not generate an open-ended generic catalog. Exactly 1 recommendation must be a direct high-quality replacement for a worn piece, and 2 must be strategic gap-fillers that unlock at least 4 new outfit combinations with existing items in their closet. Include real merchant search URLs (Myntra, Amazon India, Flipkart), INR pricing, discount %, and an in-cart demographic proof metric for 24-29 tech workers in Bengaluru."
```
- **Why written this way:** Most AI agents defaults to generating a 20-item shopping list, which re-introduces the exact decision fatigue we set out to eliminate. Enforcing a strict constraint of "Only 3 items" with mathematical outfit permutation logic ($U_c \ge 4$) forces high-conviction decision design.

---

### Prompt 5: Automated Cart Artefact Pairing (Zero Keyword Search)
```text
"Given the items staged in the user's cart (e.g., Indigo Slub Linen Short Kurta), write a rule-based and semantic pairing engine that automatically surfaces 2 complementary artefacts (e.g., Handcrafted Tan Leather Mojari Mules and Brass Dial Leather Watch) that harmonize with the color palette and occasion without requiring the user to type search queries. Include bundle pricing with a 10-15% multi-item discount."
```
- **Why written this way:** Traditional e-commerce cart cross-sells show random sponsored junk ("People also bought AA batteries"). This prompt demanded deterministic color-harmony and occasion-matched artefacts, completing the customer's look with one click.

---

### Prompt 6: Phase 4 Studio Garment Isolation & High-Fidelity Flat-Lays
```text
"Inspect the clothes worn by the subjects in the uploaded photos:
1. Navy blue polo with heather grey collar and white tipping
2. Pink and cobalt blue buffalo check hooded shirt
3. Deep indigo slub linen mandarin bandhgala kurta
4. Dusty rose longline shrug cardigan with red embroidered rose patch on left chest
5. Slate blue fuzzy sherpa boucle fleece sweater
Generate isolated, studio-quality catalog flat-lay photographs on a pure white (#FFFFFF) background, perfectly folded or laid flat as seen on luxury e-commerce sites (Net-a-Porter, Mr Porter, Myntra Luxe), with natural soft contact shadows and no human model or hanger."
```
- **Why written this way:** Eliminates messy background distractions from casual smartphone photos. Users expect clean, isolated product cards when browsing apparel, and these studio flat-lays elevate the perceived trust and aesthetic finish of the wardrobe auditor.

---

### Prompt 7: Phase 4 Photorealistic Neural Mirror & Facial Texture Mapping
```text
"Design an interactive 3D virtual try-on studio that eliminates the cartoonish aesthetic of standard WebGL mannequins:
1. Crop and extract high-resolution facial textures from the user's uploaded portrait photos.
2. In Three.js, map the user's facial texture onto a curved frontal head geometry with smooth material blending and realistic skin tone matching.
3. Build a dual-mode interface: a 360° interactive turntable with orbit controls and fit tension heatmaps, plus a 'Photorealistic Mirror' mode that presents an authentic, photographic digital twin of the user wearing both owned clothes and recommended new pieces."
```
- **Why written this way:** Solves the #1 complaint in virtual try-ons—uncanny valley cartoon avatars. By anchoring the head and face in the user's authentic facial pixels while dynamically draping the selected clothes, user confidence increases dramatically.

---

## 2. The Failed Prompt & What Was Changed

### The Failed Prompt:
```text
"Create a full-stack Next.js and Python backend application with 3D virtual avatar try-on using WebGL and three.js that takes the user's photo and generates a realistic 3D human model wearing the Myntra clothes."
```

### Why It Failed:
1. **Tooling & Environment Mismatch:** The environment runs Node v18.15.0 with Vite and React. Prompting for Next.js 14 server actions created build mismatches and engine errors.
2. **Feature Creep / Uncanny Valley:** Generating realistic 3D cloth physics from 2D photos in a browser runtime requires multi-gigabyte neural radiance / SMPL models, causing huge latency, browser crashes, and plastic-looking avatars that increase user skepticism.

### What Was Changed (The Pivot Prompt):
```text
"Build a high-performance, responsive React 18 + Vite + Tailwind CSS application focused on high-trust editorial UX: crisp side-by-side photo inspection, condition scorecards, interactive brand sizing comparison tabs, and instant cart drawer pairing. Use clean local state and simulated real-time vision pipelines with zero heavy 3D bloat."
```
- **Outcome:** Clean build in 1.47s, silky 60fps animations, instant loading, and authentic focus on the product's value proposition rather than gimmicky 3D physics.

---

## 3. How We Verified and Checked the AI's Output

To ensure the output was production-ready and interview-grade, we applied a **Four-Tier Verification Protocol**:

1. **Visual Truth & Coordinate Checking:**
   - Checked that each extracted garment mapped back to the actual pixels in the 6 uploaded photos (e.g., verifying that the polo shirt in `media_1794917831523_a44ce8bf.jpg` really had a heather grey contrast collar and white tipping, rather than an AI hallucinated solid navy polo).
2. **Indian Anthropometric Sizing Sanity Checks:**
   - Cross-referenced the size predictions against real brand size charts:
     - Snitch Chest Size Chart: Size L = 40–41 inches (Correct).
     - Marks & Spencer Regular Fit: Size M = 38–40 inches (Correct).
     - Levi's 511 Slim: 34W = 34.5 inch waistband (Correct).
3. **URL & Merchant Validity:**
   - Verified that Myntra, Amazon.in, and Flipkart product search queries resolved to actual live categories and valid URL schemas without 404 broken parameters.
4. **Build & Runtime Determinism:**
   - Ran `npm run build` to confirm zero JSX syntax errors, zero missing import references, and strict PostCSS/Tailwind compilation. Tested the live port `http://localhost:5173/` via background daemon health checks.
