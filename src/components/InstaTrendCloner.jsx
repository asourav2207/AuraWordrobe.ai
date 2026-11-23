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
  CheckCircle2
} from 'lucide-react';

export default function InstaTrendCloner({ trends, currentGender, onAddBundleToCart, onAddToCart }) {
  // Filter trends by profile gender
  const filteredTrends = trends.filter(t => t.targetGender === currentGender);
  const [selectedItemsMap, setSelectedItemsMap] = useState({});

  const toggleItemSelection = (trendId, itemIdx) => {
    setSelectedItemsMap(prev => {
      const current = prev[trendId] || [0, 1, 2];
      const next = current.includes(itemIdx)
        ? current.filter(i => i !== itemIdx)
        : [...current, itemIdx];
      return { ...prev, [trendId]: next };
    });
  };

  return (
    <div className="space-y-8">
      
      {/* Editorial Header */}
      <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-rose-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-pink-300 border border-white/20 text-xs font-bold uppercase tracking-wider mb-2">
              <Instagram className="w-3.5 h-3.5" />
              <span>Viral Influencer Look Replicator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              Replicate Viral Instagram Aesthetics in 1 Click
            </h2>
            <p className="text-sm text-purple-200 mt-2 leading-relaxed">
              Curated specifically for Indian social aesthetics: effortless Indo-Western fusion, modern Desi Girl layers, and Bangalore founder minimalist neutrals. 
              Clone complete looks with auto-matched items from Myntra, Amazon, and Ajio with an exclusive 15% bundle discount.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-xs space-y-2 text-purple-100 shrink-0">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Matched against your wardrobe silhouettes</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 text-pink-300" />
              <span>1-Click Bundle Add with Auto-Sizing</span>
            </div>
            <div className="flex items-center space-x-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Updated daily from 200+ Indian fashion creators</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trends Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredTrends.map((trend) => {
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
                      <Instagram className="w-4 h-4 text-rose-600" />
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block">{trend.influencerHandle}</span>
                    <span className="text-[11px] text-slate-400">{trend.aestheticName}</span>
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
                      // Add only non-owned items
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
  );
}
