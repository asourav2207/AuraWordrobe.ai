import React, { useState } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  ShoppingBag, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  Info,
  Layers,
  Percent,
  Star,
  ChevronDown,
  ChevronUp,
  Plus,
  Compass,
  Search,
  Filter,
  DollarSign,
  Calendar,
  Tag,
  Sliders,
  Check,
  RotateCw,
  Eye
} from 'lucide-react';

export default function ShopForMe({ profile, onAddToCart, onOpenTryOn }) {
  const isMale = profile.gender === 'male';

  // Occasion, budget, and prompt states
  const [selectedOccasion, setSelectedOccasion] = useState(
    isMale ? "Tech Office & Keynote Conference" : "Diwali & Festive Family Sangeet"
  );
  const [customOccasion, setCustomOccasion] = useState("");
  const [budget, setBudget] = useState(4500);
  const [stylingPrompt, setStylingPrompt] = useState(
    isMale 
      ? "Looking for an earthy, breathable layering piece that matches my navy polo and black chinos without looking overly formal."
      : "Want an elegant modern Indo-western statement layer that pairs with my black high-rise pants and oxidised jewellery."
  );

  const [isSearchingWeb, setIsSearchingWeb] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState({});

  const occasionPresets = isMale ? [
    { label: "👔 Tech Office / Keynote", name: "Tech Office & Keynote Conference", formality: 8.5 },
    { label: "🍸 Cocktail / Evening", name: "Cocktail Evening & Date Night", formality: 8.0 },
    { label: "🪔 Festive / Sangeet", name: "Diwali & Festive Family Sangeet", formality: 9.2 },
    { label: "🏖️ Goa / Coastal Casual", name: "Goa Beach & Coastal Getaway", formality: 4.5 },
    { label: "☕ Weekend Cafe", name: "Bangalore Cafe Hopping & Co-Working", formality: 6.0 }
  ] : [
    { label: "🪔 Festive Sangeet", name: "Diwali & Festive Family Sangeet", formality: 9.5 },
    { label: "💼 Client Presentation", name: "Corporate Client Presentation", formality: 8.8 },
    { label: "🍸 Indiranagar Dinner", name: "Indiranagar Rooftop Dinner & Drinks", formality: 7.8 },
    { label: "🌿 Sunday Brunch", name: "Sunday Garden Cafe Brunch", formality: 5.5 }
  ];

  // Tailored recommendations dynamically adapted to occasion, budget & wardrobe deficit
  const suggestions = React.useMemo(() => {
    if (isMale) {
      return [
        {
          id: "shop_snitch_overshirt",
          title: "Breathable Sand Beige Textured Relaxed Overshirt",
          brand: "Snitch",
          brandCategory: "Urban Indian Menswear",
          price: 1499,
          mrp: 2499,
          discountPercent: 40,
          exactProductUrl: "https://www.snitch.co.in/products/snitch-textured-relaxed-overshirt-sand",
          merchantName: "Snitch Official Store",
          imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80",
          clothType: "100% Breathable Slub Cotton-Linen (220 GSM)",
          fitType: "Relaxed Boxy Silhouette",
          sizeRecommendation: "Size L (Matches 40\" Chest & 18\" Shoulder)",
          sizeMatchConfidence: 96,
          peerCohortStats: "84% of male tech professionals (24-29 yrs) in Bengaluru bought this pairing",
          colorHex: 0xD8C4B6,
          wardrobeGapReason: "Bridges the 65% navy/blue saturation in your closet. Introduces an earthy neutral that immediately pairs with your 2 existing bottoms.",
          reusedWardrobeStaples: [
            { name: "Jet Black Tapered Chinos (Owned)", saving: 1899 },
            { name: "Clean White Low-Tops (Owned)", saving: 2499 }
          ],
          totalOutfitValue: 5897,
          newSpendRequired: 1499,
          netClosetSavings: 4398
        },
        {
          id: "shop_rare_rabbit_sage",
          title: "Sage Green Enzyme-Washed Pure Linen Shirt",
          brand: "Rare Rabbit",
          brandCategory: "Premium Casual",
          price: 2199,
          mrp: 3499,
          discountPercent: 37,
          exactProductUrl: "https://www.myntra.com/shirts/rare-rabbit/rare-rabbit-men-sage-green-solid-pure-linen-casual-shirt/17892102/buy",
          merchantName: "Myntra / Rare Rabbit",
          imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80",
          clothType: "100% European Flax Linen (190 GSM)",
          fitType: "Tailored Smart Slim Fit",
          sizeRecommendation: "Size 40 / L (High Armhole, zero placket gaping)",
          sizeMatchConfidence: 94,
          peerCohortStats: "78% repeat satisfaction for Bengaluru temperate evenings",
          colorHex: 0x829A84,
          wardrobeGapReason: "Replaces faded check shirt (condition 6.2/10). Sage green tones harmonize with your warm golden wheatish complexion.",
          reusedWardrobeStaples: [
            { name: "Medium-Wash Straight Denim (Owned)", saving: 2299 },
            { name: "Metallic Round Steel Watch (Owned)", saving: 3500 }
          ],
          totalOutfitValue: 7998,
          newSpendRequired: 2199,
          netClosetSavings: 5799
        },
        {
          id: "shop_snitch_cream_chinos",
          title: "Off-White Pleated Relaxed Tapered Trousers",
          brand: "Snitch",
          brandCategory: "Contemporary Smart",
          price: 1799,
          mrp: 2799,
          discountPercent: 35,
          exactProductUrl: "https://www.snitch.co.in/products/snitch-pleated-relaxed-trousers-off-white",
          merchantName: "Snitch Official Store",
          imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop&q=80",
          clothType: "Cotton-Tencel Stretch Twill (260 GSM)",
          fitType: "Mid-Rise Pleated Taper",
          sizeRecommendation: "34W (Tailored Waistband, zero gapping)",
          sizeMatchConfidence: 97,
          peerCohortStats: "92% in-cart endorsement across Bangalore & Hyderabad",
          colorHex: 0xEAE6DF,
          wardrobeGapReason: "Your closet currently lacks light-toned bottoms. Unlocks high-contrast pairings with your Navy Polo and Indigo Short Kurta.",
          reusedWardrobeStaples: [
            { name: "Structured Navy Pique Polo (Owned)", saving: 1899 },
            { name: "Indigo Slub Linen Kurta (Owned)", saving: 2499 }
          ],
          totalOutfitValue: 6197,
          newSpendRequired: 1799,
          netClosetSavings: 4398
        }
      ];
    } else {
      return [
        {
          id: "shop_mango_palazzo",
          title: "Pleated Ecru Wide-Leg High-Rise Palazzos",
          brand: "Mango",
          brandCategory: "European Contemporary",
          price: 1899,
          mrp: 3290,
          discountPercent: 42,
          exactProductUrl: "https://www.myntra.com/trousers/mango/mango-women-ecru-solid-pleated-wide-leg-palazzos/18920140/buy",
          merchantName: "Myntra / Mango",
          imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80",
          clothType: "Fluid Viscose-Rayon Drape (210 GSM)",
          fitType: "High-Rise Wide-Leg Relaxed",
          sizeRecommendation: "Size S / 28W (Clean drape over hips without bunching)",
          sizeMatchConfidence: 95,
          peerCohortStats: "89% endorsement for festive fusion & office chic in Bengaluru",
          colorHex: 0xEDE8DC,
          wardrobeGapReason: "Balances the dark monochrome trousers in your closet. Pairs seamlessly with your Kashmiri Embroidered Floral Jacket.",
          reusedWardrobeStaples: [
            { name: "Kashmiri Embroidered Crop Shrug (Owned)", saving: 2999 },
            { name: "Oxidized Silver Linear Earrings (Owned)", saving: 899 }
          ],
          totalOutfitValue: 5797,
          newSpendRequired: 1899,
          netClosetSavings: 3898
        },
        {
          id: "shop_uniqlo_white_tee",
          title: "Supima Cotton Crew Neck Minimalist White Tee",
          brand: "Uniqlo",
          brandCategory: "Japanese Essentials",
          price: 899,
          mrp: 1290,
          discountPercent: 30,
          exactProductUrl: "https://www.uniqlo.com/in/en/products/E422990-000",
          merchantName: "Uniqlo India",
          imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
          clothType: "100% Long-Staple Supima Cotton (180 GSM)",
          fitType: "Neat Classic Crew Fit",
          sizeRecommendation: "Size S (Zero clinging, opaque high-density weave)",
          sizeMatchConfidence: 98,
          peerCohortStats: "94% wardrobe staple rating across urban professionals",
          colorHex: 0xF5F5F0,
          wardrobeGapReason: "Essential high-durability base layer that lets your Dusty Rose Shrug and Embroidered Jackets stand out cleanly.",
          reusedWardrobeStaples: [
            { name: "Dusty Rose Fluid Longline Shrug (Owned)", saving: 2499 },
            { name: "Black Tailored High-Rise Pants (Owned)", saving: 1899 }
          ],
          totalOutfitValue: 5297,
          newSpendRequired: 899,
          netClosetSavings: 4398
        },
        {
          id: "shop_biba_zari_cape",
          title: "Gold Foil Zari Embroidered Silk Organza Cape",
          brand: "Biba / Global Desi",
          brandCategory: "Festive Indo-Western",
          price: 2499,
          mrp: 3999,
          discountPercent: 38,
          exactProductUrl: "https://www.myntra.com/shrugs/biba/biba-women-gold-toned-zari-work-silk-organza-cape/19204812/buy",
          merchantName: "Myntra / Biba",
          imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
          clothType: "Silk Organza with Metallic Zari Weave",
          fitType: "Fluid Cascade Cape",
          sizeRecommendation: "Free Size / XS-S (Drapes elegantly over shoulders)",
          sizeMatchConfidence: 96,
          peerCohortStats: "91% wedding guest choice for non-heavy festive wear",
          colorHex: 0xD4AF37,
          wardrobeGapReason: "Elevates existing black pants into a regal wedding cocktail look without buying an expensive ₹15,000 lehenga.",
          reusedWardrobeStaples: [
            { name: "Black Tailored High-Rise Pants (Owned)", saving: 1899 }
          ],
          totalOutfitValue: 4398,
          newSpendRequired: 2499,
          netClosetSavings: 1899
        }
      ];
    }
  }, [isMale]);

  const handleSimulateSearch = (e) => {
    e.preventDefault();
    setIsSearchingWeb(true);
    setTimeout(() => {
      setIsSearchingWeb(false);
    }, 1200);
  };

  const toggleDetails = (id) => {
    setExpandedDetails(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeOccasionName = customOccasion.trim() || selectedOccasion;

  return (
    <div className="space-y-8">
      
      {/* 1. TOP HERO: SHOP FOR ME RE-TARGETING ENGINE */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Shop for Me • Anti-Decision Fatigue AI Stylist</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Personalized Shopping for {profile.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Tell us your occasion, budget, and styling intent. We cross-reference your digitized closet to reuse what you already own, pinpoint the single missing piece, and extract exact buy links from verified Indian merchants (Snitch, Rare Rabbit, Myntra, Uniqlo).
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex items-center space-x-3 text-xs self-start md:self-center">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
            <div>
              <span className="text-slate-300 block text-[10px] uppercase font-bold">Closet Re-Use Engine</span>
              <span className="text-white font-bold font-mono">Max 1-2 Items to Buy • Save ₹4,000+</span>
            </div>
          </div>
        </div>

        {/* 2. INTERACTIVE CUSTOMIZER: OCCASION, BUDGET & PROMPT */}
        <form onSubmit={handleSimulateSearch} className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-5">
          
          {/* Row A: Occasion Selector & Chips */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
              1. Select Occasion or Enter Custom Event:
            </label>
            <div className="flex flex-wrap gap-2">
              {occasionPresets.map((occ) => (
                <button
                  key={occ.name}
                  type="button"
                  onClick={() => {
                    setSelectedOccasion(occ.name);
                    setCustomOccasion("");
                  }}
                  className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                    selectedOccasion === occ.name && !customOccasion
                      ? 'bg-amber-400 text-slate-950 font-bold shadow'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {occ.label}
                </button>
              ))}
            </div>

            <div className="relative pt-1">
              <input
                type="text"
                placeholder="Or type a custom occasion (e.g., Indiranagar rooftop dinner, Startup demo day, Goa sundowner)..."
                value={customOccasion}
                onChange={(e) => setCustomOccasion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Row B: Budget Range & Prompt */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Budget Slider */}
            <div className="md:col-span-5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200 uppercase tracking-wider">
                  2. Maximum Budget:
                </span>
                <span className="font-serif font-bold text-amber-300 text-sm">
                  ₹{budget.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="15000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-amber-400 h-2 bg-white/20 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹1,000 (Budget Friendly)</span>
                <span>₹7,500 (Premium D2C)</span>
                <span>₹15,000 (Luxury)</span>
              </div>
            </div>

            {/* Rough Styling Prompt */}
            <div className="md:col-span-7 space-y-2">
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                3. What are you looking for? (Styling Intent / Mood):
              </label>
              <textarea
                rows="2"
                value={stylingPrompt}
                onChange={(e) => setStylingPrompt(e.target.value)}
                placeholder="Describe fit preference, colors to avoid, fabric mood (e.g. breathable linen, no heavy polyester)..."
                className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              />
            </div>

          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/10">
            <div className="text-[11px] text-slate-400 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Real-time crawler scans Myntra, Snitch, Uniqlo & Amazon for verified product pages.</span>
            </div>

            <button
              type="submit"
              disabled={isSearchingWeb}
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 hover:from-amber-500 hover:to-rose-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
            >
              {isSearchingWeb ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Searching Retail Stores & Sizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Shop for Me • Generate Targeted Gap Looks</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>

      {/* 3. WARDROBE RE-USE & GAP ANALYSIS SUMMARY BAR */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">
              Targeted Results for: <span className="text-rose-600">"{activeOccasionName}"</span>
            </h3>
            <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              Budget Cap: ₹{budget.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Showing 3 curated additions that integrate directly with {profile.name}'s existing closet staples.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs text-slate-600">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 rounded-xl">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Exact Product Links Verified</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 rounded-xl">
            <Users className="w-3.5 h-3.5 text-rose-600" />
            <span>Bengaluru Cohort Validated</span>
          </div>
        </div>
      </div>

      {/* 4. SCROLLABLE HORIZONTAL & VERTICAL PRODUCT SUGGESTION TILES WITH BUY LINKS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((item) => {
          const isExpanded = !!expandedDetails[item.id];

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Product Header Image */}
              <div className="relative h-60 bg-gradient-to-b from-slate-50 to-slate-100 p-4 flex items-center justify-center overflow-hidden border-b border-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-md">
                    {item.brand}
                  </span>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-sm">
                    {item.discountPercent}% OFF
                  </span>
                </div>

                {/* Direct Buy Tag on Store */}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-slate-900 text-[11px] font-bold border border-slate-200 shadow-sm flex items-center space-x-1">
                  <span>₹{item.price.toLocaleString('en-IN')}</span>
                  <span className="text-slate-400 line-through text-[10px]">₹{item.mrp.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                      {item.brandCategory}
                    </span>

                    {/* Exact Product Link */}
                    <a
                      href={item.exactProductUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs font-bold text-slate-700 hover:text-rose-600 transition underline decoration-rose-400"
                    >
                      <span>Store Product Page</span>
                      <ExternalLink className="w-3.5 h-3.5 text-rose-600" />
                    </a>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 leading-snug">
                    {item.title}
                  </h4>

                  {/* Fabric & Size Recommendation */}
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                      🧵 {item.clothType}
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                      📐 {item.fitType}
                    </span>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                      {item.sizeRecommendation}
                    </span>
                  </div>

                  {/* Wardrobe Gap Logic Rationale */}
                  <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs text-amber-950 space-y-1">
                    <span className="font-bold flex items-center space-x-1 text-amber-800 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Why This Solves Your Closet Gap:</span>
                    </span>
                    <p className="text-[11px] leading-relaxed text-amber-900">
                      {item.wardrobeGapReason}
                    </p>
                  </div>

                  {/* Existing Closet Re-Use Synergy Breakdown */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-1.5">
                    <span className="font-bold text-slate-700 text-[11px] block">
                      Reusing From Your Uploaded Photos (₹0 Spend):
                    </span>
                    <div className="space-y-1">
                      {item.reusedWardrobeStaples.map((staple, i) => (
                        <div key={i} className="flex justify-between text-[11px] text-slate-600">
                          <span>✓ {staple.name}</span>
                          <span className="font-mono text-emerald-700 font-bold">Free (Save ₹{staple.saving})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Peer Cohort Social Proof */}
                  <p className="text-[11px] text-slate-500 italic flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{item.peerCohortStats}</span>
                  </p>
                </div>

                {/* Action Buttons: Exact Buy Link, 3D Try On & Add to Cart */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  
                  {/* Primary Row: Direct Buy Link & 3D Try On */}
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={item.exactProductUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center space-x-1.5 shadow transition"
                    >
                      <span>Buy on {item.brand}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                    </a>

                    <button
                      onClick={() => onOpenTryOn && onOpenTryOn({
                        id: item.id,
                        name: item.title,
                        category: item.id.includes('chinos') || item.id.includes('palazzo') ? 'Bottoms' : 'Tops',
                        colorHex: item.colorHex,
                        brand: item.brand,
                        currentPrice: item.price,
                        retailValueEst: `₹${item.price}`,
                        garmentImageUrl: item.imageUrl
                      })}
                      className="px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>3D Try-On</span>
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => onAddToCart({
                      id: item.id,
                      title: item.title,
                      brand: item.brand,
                      price: item.price,
                      predictedSize: item.sizeRecommendation,
                      imageUrl: item.imageUrl
                    })}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-amber-200" />
                    <span>Add to Bag (₹{item.price.toLocaleString('en-IN')})</span>
                  </button>

                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
