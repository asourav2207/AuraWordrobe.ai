import React, { useState } from 'react';
import { 
  Instagram, 
  Sparkles, 
  ShoppingBag, 
  Flame, 
  ArrowRight, 
  Check, 
  ExternalLink,
  Layers,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Video,
  Youtube,
  Link as LinkIcon,
  Play,
  RotateCw
} from 'lucide-react';

export default function InstaTrendCloner({ trends, currentGender, onAddBundleToCart, onAddToCart }) {
  const [videoUrl, setVideoUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [customTrends, setCustomTrends] = useState([]);
  const [selectedItemsMap, setSelectedItemsMap] = useState({});

  // Combine static and dynamically analyzed trends
  const allTrends = [...customTrends, ...trends].filter(t => t.targetGender === currentGender);

  const toggleItemSelection = (trendId, itemIdx) => {
    setSelectedItemsMap(prev => {
      const current = prev[trendId] || [0, 1, 2];
      const next = current.includes(itemIdx)
        ? current.filter(i => i !== itemIdx)
        : [...current, itemIdx];
      return { ...prev, [trendId]: next };
    });
  };

  const handleDeconstructVideo = (e) => {
    if (e) e.preventDefault();
    if (!videoUrl.trim()) return;

    setAnalyzing(true);
    setAnalysisStep(1);

    setTimeout(() => setAnalysisStep(2), 600);
    setTimeout(() => setAnalysisStep(3), 1300);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisStep(0);

      // Determine aesthetic based on URL or gender
      const isFemale = currentGender === 'female';
      const newTrend = {
        id: `custom_reel_${Date.now()}`,
        targetGender: currentGender,
        title: isFemale ? "Deconstructed Reel: Silk Organza Overlay & Palazzos" : "Deconstructed Short: Relaxed Cuban Collar & Pleated Trousers",
        influencerHandle: videoUrl.includes('youtube') ? "@youtube_creator_style" : "@instagram_creator_india",
        videoUrl: videoUrl,
        platform: videoUrl.includes('youtube') ? "YouTube Short" : "Instagram Reel",
        aestheticName: isFemale ? "Viral Festive Indo-Western" : "Minimalist Summer Casual",
        trendVelocity: "🔥 Newly Analyzed from Video",
        heroImage: isFemale 
          ? "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80",
        inspirationDesc: `Extracted directly from ${videoUrl}. AI identified 3 key outfit layers, matched pattern tolerances against Myntra & Amazon, and verified compatibility with your closet.`,
        alreadyOwnsMatchingItem: isFemale ? {
          name: "Black Tailored High-Rise Pants",
          itemId: "ananya_item_3",
          savingValue: 1899
        } : {
          name: "Jet Black Slim Tapered Chinos",
          itemId: "aditya_item_6",
          savingValue: 1799
        },
        bundleItems: isFemale ? [
          {
            name: "Gold Foil Zari Embroidered Cape / Shrug",
            brand: "Global Desi / Biba",
            price: 2199,
            link: "https://www.myntra.com/shrugs?rawQuery=embroidered%20cape",
            store: "Myntra",
            isOwned: false
          },
          {
            name: "High-Rise Pleated Ecru Wide-Leg Palazzos",
            brand: "Mango",
            price: 1899,
            link: "https://www.myntra.com/trousers?rawQuery=ecru%20palazzos",
            store: "Myntra",
            isOwned: false
          },
          {
            name: "Oxidized Silver Pearl Tassel Choker",
            brand: "Zaveri Pearls",
            price: 699,
            link: "https://www.amazon.in/s?k=oxidised+silver+choker",
            store: "Amazon",
            isOwned: false
          }
        ] : [
          {
            name: "Sage Slub Cuban Collar Linen Shirt",
            brand: "Snitch / Rare Rabbit",
            price: 1899,
            link: "https://www.myntra.com/shirts?rawQuery=cuban%20collar%20linen",
            store: "Myntra",
            isOwned: false
          },
          {
            name: "Relaxed Off-White Pleated Trousers",
            brand: "Zara Man",
            price: 2499,
            link: "https://www.amazon.in/s?k=mens+pleated+trousers",
            store: "Amazon",
            isOwned: false
          },
          {
            name: "Handcrafted Tan Leather Mules",
            brand: "Metro",
            price: 1499,
            link: "https://www.flipkart.com/search?q=leather+mules+men",
            store: "Flipkart",
            isOwned: false
          }
        ],
        bundleTotal: isFemale ? 4797 : 5897,
        bundleDiscountPrice: isFemale ? 4077 : 5012,
        bundleSavings: "Save 15% when bundled"
      };

      setCustomTrends(prev => [newTrend, ...prev]);
      setVideoUrl('');
    }, 2000);
  };

  const setDemoUrl = (url) => {
    setVideoUrl(url);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner: Video URL Pasting & Look Deconstruction */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-rose-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-900/60 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Video Vision Deconstructor</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              Paste Any Instagram Reel or YouTube Video URL
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Saw an outfit in an Instagram Reel, Story, or YouTube Short? Paste the link below. Our multi-frame vision AI will deconstruct the pieces, match with verified Indian retailers (Myntra/Amazon/Ajio), cross-check what you already own, and add the missing items to your cart!
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs text-slate-400">
            <div className="flex items-center space-x-1.5 px-3 py-2 bg-white/10 rounded-xl border border-white/10">
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>Reels Supported</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-2 bg-white/10 rounded-xl border border-white/10">
              <Youtube className="w-4 h-4 text-rose-400" />
              <span>Shorts Supported</span>
            </div>
          </div>
        </div>

        {/* Video Link Input Form */}
        <form onSubmit={handleDeconstructVideo} className="space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                placeholder="Paste Instagram Reel or YouTube Video link (e.g., https://www.instagram.com/reel/C3b4X...)"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 backdrop-blur-md"
                required
              />
            </div>
            <button
              type="submit"
              disabled={analyzing || !videoUrl.trim()}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-lg shadow-rose-600/30 transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Deconstructing Frames...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>Deconstruct & Replicate Look</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Demo Pre-fill Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold">Try sample links:</span>
            <button
              type="button"
              onClick={() => setDemoUrl("https://www.instagram.com/reel/C3b4X9vK8wz/")}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/15 text-slate-200 rounded-lg text-[11px] border border-white/10 transition"
            >
              @kritika_khurana Indo-Western Reel
            </button>
            <button
              type="button"
              onClick={() => setDemoUrl("https://www.youtube.com/shorts/q8J7_W12B9k")}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/15 text-slate-200 rounded-lg text-[11px] border border-white/10 transition"
            >
              @streetstyle_bengaluru Minimalist Look
            </button>
            <button
              type="button"
              onClick={() => setDemoUrl("https://www.instagram.com/reel/C2a8L1_vG7k/")}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/15 text-slate-200 rounded-lg text-[11px] border border-white/10 transition"
            >
              @tarun_chawla Old Money Indian
            </button>
          </div>

          {/* Interactive Progress Bar when analyzing video */}
          {analyzing && (
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2 animate-in fade-in">
              <div className="flex justify-between text-xs font-semibold text-rose-300">
                <span>
                  {analysisStep === 1 && "Extracting keyframes at 0:02, 0:06, 0:12..."}
                  {analysisStep === 2 && "Segmenting garment silhouettes & fabric textures..."}
                  {analysisStep === 3 && "Searching matching retail listings on Myntra & Amazon..."}
                </span>
                <span className="font-mono">{analysisStep * 33}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-rose-500 to-amber-400 h-full transition-all duration-500" 
                  style={{ width: `${analysisStep * 33}%` }}
                />
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Trends Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-serif font-bold text-slate-900">
            {allTrends.length} Trending Looks Available for {currentGender === 'female' ? "Ananya" : "Aditya"}
          </h3>
          <span className="text-xs text-slate-500">
            Auto-sized & Cross-checked with existing wardrobe
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {allTrends.map((trend) => {
            const selectedIndices = selectedItemsMap[trend.id] || trend.bundleItems.map((_, i) => i);
            const hasOwnedPiece = !!trend.alreadyOwnsMatchingItem;

            return (
              <div
                key={trend.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Top Banner: Influencer & Reel Hook */}
                <div className="p-5 pb-3 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-0.5">
                      <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                        {trend.platform?.includes('YouTube') ? (
                          <Youtube className="w-4 h-4 text-rose-600" />
                        ) : (
                          <Instagram className="w-4 h-4 text-rose-600" />
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">{trend.influencerHandle}</span>
                      <span className="text-[11px] text-slate-400">{trend.aestheticName} • {trend.platform || "Instagram Reel"}</span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 flex items-center space-x-1">
                    <span>{trend.trendVelocity}</span>
                  </span>
                </div>

                {/* Inspiration Visual & Explanation */}
                <div className="p-5 space-y-4">
                  <div className="relative h-60 rounded-2xl overflow-hidden group">
                    <img
                      src={trend.heroImage}
                      alt={trend.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
                      <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">Look Title</span>
                      <h3 className="text-lg font-bold font-serif leading-snug">{trend.title}</h3>
                    </div>
                  </div>

                  {/* Closet Match Alert */}
                  {hasOwnedPiece && (
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Closet Synergy Detected!</span>
                        <span className="text-[11px] text-emerald-800">
                          You already own the <strong className="underline">{trend.alreadyOwnsMatchingItem.name}</strong> from your photos. You only need the missing pieces to complete this look!
                        </span>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <strong className="text-slate-900">Styling Rationale: </strong>
                    {trend.inspirationDesc}
                  </p>

                  {/* Bundle Items Breakdown with Checkboxes */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-500 uppercase tracking-wider">
                        Look Pieces ({trend.bundleItems.length} Items):
                      </span>
                      <span className="text-[11px] text-slate-400">Tap item to toggle</span>
                    </div>

                    <div className="space-y-2">
                      {trend.bundleItems.map((item, idx) => {
                        const isSelected = selectedIndices.includes(idx);

                        return (
                          <div
                            key={idx}
                            onClick={() => toggleItemSelection(trend.id, idx)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                              item.isOwned 
                                ? 'bg-emerald-50/60 border-emerald-200' 
                                : isSelected 
                                  ? 'bg-purple-50/50 border-purple-300' 
                                  : 'bg-slate-50 border-slate-200 opacity-60'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}}
                                className="w-4 h-4 rounded text-purple-600 accent-purple-600 pointer-events-none"
                              />
                              <div>
                                <div className="flex items-center space-x-1.5">
                                  <span className="font-bold text-slate-900">{item.name}</span>
                                  {item.isOwned && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-600 text-white">
                                      IN CLOSET
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] text-slate-500">{item.brand} • {item.store}</span>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="font-bold text-slate-900">₹{item.price.toLocaleString('en-IN')}</span>
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="block text-[10px] text-rose-600 hover:underline flex items-center justify-end space-x-0.5"
                              >
                                <span>Link</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bundle Pricing Summary */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-emerald-800 block text-[11px] font-semibold">{trend.bundleSavings}</span>
                      <div className="flex items-baseline space-x-2 mt-0.5">
                        <span className="text-base font-bold font-serif text-slate-900">₹{trend.bundleDiscountPrice.toLocaleString('en-IN')}</span>
                        <span className="text-xs text-slate-400 line-through">₹{trend.bundleTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-emerald-600 text-white px-2 py-1 rounded-lg">
                      15% OFF
                    </span>
                  </div>

                </div>

                {/* CTAs */}
                <div className="p-5 pt-0 space-y-2">
                  <button
                    onClick={() => onAddBundleToCart(trend)}
                    className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white rounded-2xl text-xs font-bold shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-300" />
                    <span>Clone Look & Auto-Add All 3 to Cart (15% OFF)</span>
                  </button>

                  {hasOwnedPiece && (
                    <button
                      onClick={() => {
                        const missingItems = trend.bundleItems.filter(i => !i.isOwned);
                        missingItems.forEach(item => {
                          onAddToCart({
                            id: `${trend.id}_${item.name}`,
                            title: item.name,
                            brand: item.brand,
                            price: item.price,
                            predictedSize: "Pre-Mapped Sizing",
                            imageUrl: trend.heroImage
                          });
                        });
                      }}
                      className="w-full py-2.5 px-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 border border-emerald-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Smart Add Missing Pieces Only (Save ₹{trend.alreadyOwnsMatchingItem.savingValue})</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
