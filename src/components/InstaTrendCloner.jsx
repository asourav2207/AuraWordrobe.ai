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
  RotateCw,
  Clock,
  Film
} from 'lucide-react';

export default function InstaTrendCloner({ trends, currentGender, onAddBundleToCart, onAddToCart }) {
  const [videoUrl, setVideoUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [customTrends, setCustomTrends] = useState([]);
  const [selectedItemsMap, setSelectedItemsMap] = useState({});
  const [recentlyDeconstructedId, setRecentlyDeconstructedId] = useState(null);

  // Combine custom analyzed trends with catalog trends
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

  const runDeconstructPipeline = (urlToProcess) => {
    const targetUrl = (urlToProcess || videoUrl).trim();
    if (!targetUrl) return;

    setVideoUrl(targetUrl);
    setAnalyzing(true);
    setAnalysisStep(1);

    setTimeout(() => setAnalysisStep(2), 600);
    setTimeout(() => setAnalysisStep(3), 1300);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisStep(0);

      const isFemale = currentGender === 'female';
      const isYoutube = targetUrl.toLowerCase().includes('youtube') || targetUrl.toLowerCase().includes('youtu.be');
      const newTrendId = `custom_reel_${Date.now()}`;

      const newTrend = {
        id: newTrendId,
        targetGender: currentGender,
        title: isFemale ? "Deconstructed Viral Reel: Silk Organza Cape & High-Rise Palazzos" : "Deconstructed Look: Relaxed Cuban Linen & Pleated Trousers",
        influencerHandle: isYoutube ? "@style_in_focus_india" : "@kritika_khurana_lookbook",
        videoUrl: targetUrl,
        platform: isYoutube ? "YouTube Short" : "Instagram Reel",
        aestheticName: isFemale ? "Modern Royal Indo-Western" : "Minimalist Summer Casual",
        trendVelocity: "🔥 Just Deconstructed from Video",
        heroImage: isFemale 
          ? "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80",
        keyframes: [
          { time: "0:02", label: "Silhouette Detection", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300&auto=format&fit=crop&q=80" },
          { time: "0:06", label: "Fabric & Drape", img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&auto=format&fit=crop&q=80" },
          { time: "0:12", label: "Retail Item Matching", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&auto=format&fit=crop&q=80" }
        ],
        inspirationDesc: `Computer Vision multi-frame model processed ${targetUrl}. AI detected 3 distinct outfit pieces, verified color and texture tolerances against Myntra & Amazon, and detected that you already own 1 closet item to complete this look!`,
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
        bundleSavings: "Save 15% bundled"
      };

      setCustomTrends(prev => [newTrend, ...prev]);
      setRecentlyDeconstructedId(newTrendId);
    }, 2000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    runDeconstructPipeline();
  };

  const handleSampleClick = (url) => {
    runDeconstructPipeline(url);
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
        <form onSubmit={handleFormSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Paste Instagram Reel or YouTube Video link (e.g., https://www.instagram.com/reel/C3b4X...)"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 backdrop-blur-md"
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
                  <span>Deconstructing Video Frames...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>Deconstruct & Replicate Look</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Demo Pre-fill Chips with Instant 1-Click Execution */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold">Try sample links (1-click):</span>
            <button
              type="button"
              onClick={() => handleSampleClick("https://www.instagram.com/reel/C3b4X9vK8wz/")}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-slate-200 rounded-lg text-[11px] border border-white/15 transition flex items-center space-x-1"
            >
              <Instagram className="w-3 h-3 text-pink-400" />
              <span>@kritika_khurana Indo-Western Reel</span>
            </button>
            <button
              type="button"
              onClick={() => handleSampleClick("https://www.youtube.com/shorts/q8J7_W12B9k")}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-slate-200 rounded-lg text-[11px] border border-white/15 transition flex items-center space-x-1"
            >
              <Youtube className="w-3 h-3 text-rose-400" />
              <span>@theformaledit Cuban Collar Short</span>
            </button>
            <button
              type="button"
              onClick={() => handleSampleClick("https://www.instagram.com/reel/C2a8L1_vG7k/")}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-slate-200 rounded-lg text-[11px] border border-white/15 transition flex items-center space-x-1"
            >
              <Instagram className="w-3 h-3 text-pink-400" />
              <span>@streetstyle_bengaluru Minimalist Look</span>
            </button>
          </div>

          {/* Interactive Progress Bar when analyzing video */}
          {analyzing && (
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2 animate-in fade-in">
              <div className="flex justify-between text-xs font-semibold text-rose-300">
                <span className="flex items-center space-x-1.5">
                  <Film className="w-3.5 h-3.5 animate-pulse" />
                  <span>
                    {analysisStep === 1 && "Step 1: Extracting keyframes at 0:02, 0:06, 0:12..."}
                    {analysisStep === 2 && "Step 2: AI Computer Vision segmenting silhouettes & drape..."}
                    {analysisStep === 3 && "Step 3: Querying Myntra & Amazon retail listings..."}
                  </span>
                </span>
                <span className="font-mono">{analysisStep * 33}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-rose-500 via-pink-400 to-amber-400 h-full transition-all duration-500" 
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
            const isNewlyDeconstructed = trend.id === recentlyDeconstructedId;

            return (
              <div
                key={trend.id}
                className={`bg-white rounded-3xl border shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  isNewlyDeconstructed ? 'ring-2 ring-purple-500 border-purple-400' : 'border-slate-200'
                }`}
              >
                {/* Top Banner: Influencer & Reel Hook */}
                <div className="p-5 pb-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
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

                  {/* If custom video deconstructed, show keyframe reel */}
                  {trend.keyframes && (
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <span className="text-[11px] font-bold text-slate-700 flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-rose-500" />
                        <span>Extracted Video Frames:</span>
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {trend.keyframes.map((kf, i) => (
                          <div key={i} className="rounded-xl overflow-hidden border border-slate-200 bg-white">
                            <img src={kf.img} alt={kf.label} className="w-full h-16 object-cover" />
                            <div className="p-1 text-center bg-slate-900 text-white text-[9px] font-mono">
                              {kf.time} • {kf.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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

                  {/* Inspiration Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {trend.inspirationDesc}
                  </p>

                  {/* Deconstructed Outfit Breakdown */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Deconstructed Garment Pieces ({trend.bundleItems.length})
                    </span>

                    <div className="space-y-2">
                      {trend.bundleItems.map((item, idx) => {
                        const isSelected = selectedIndices.includes(idx);

                        return (
                          <div
                            key={idx}
                            className={`p-3 rounded-2xl border transition-all flex items-center justify-between text-xs ${
                              isSelected 
                                ? 'bg-slate-50/90 border-slate-200 text-slate-900' 
                                : 'bg-slate-50/40 border-slate-100 text-slate-400'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleItemSelection(trend.id, idx)}
                                className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500 border-slate-300"
                              />
                              <div>
                                <span className={`font-bold block ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                                  {item.name}
                                </span>
                                <div className="flex items-center space-x-2 text-[11px]">
                                  <span className="text-slate-500">{item.brand}</span>
                                  <span>•</span>
                                  <span className="text-rose-600 font-semibold">{item.store}</span>
                                  {item.link && (
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center text-slate-400 hover:text-rose-600"
                                      title="Open merchant product page"
                                    >
                                      <ExternalLink className="w-3 h-3 ml-0.5" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>

                            <span className="font-serif font-bold text-slate-900">
                              ₹{item.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Card Footer: 1-Click Cart Addition */}
                <div className="p-5 pt-0">
                  <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl text-white flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Bundle</span>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-lg font-bold font-serif">
                          ₹{trend.bundleDiscountPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs line-through text-slate-400">
                          ₹{trend.bundleTotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[10px] text-amber-400 font-bold block">{trend.bundleSavings}</span>
                    </div>

                    <button
                      onClick={() => onAddBundleToCart(trend)}
                      className="px-4 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/30 transition flex items-center space-x-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                      <span>Clone Look to Cart</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
