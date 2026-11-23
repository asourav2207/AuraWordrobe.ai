import React from 'react';
import { 
  Instagram, 
  Sparkles, 
  ShoppingBag, 
  Flame, 
  ArrowRight, 
  Check, 
  ExternalLink,
  Layers,
  Heart
} from 'lucide-react';

export default function InstaTrendCloner({ trends, currentGender, onAddBundleToCart }) {
  // Filter trends by profile gender or prioritize gender
  const filteredTrends = trends.filter(t => t.targetGender === currentGender);

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

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <strong className="text-slate-900">Wardrobe Match Note: </strong>
                  {trend.inspirationDesc}
                </p>

                {/* Bundle Items Breakdown */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Curated Look Bundle (3 Items):
                  </span>

                  <div className="space-y-2">
                    {trend.bundleItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <div>
                            <span className="font-bold text-slate-800 block">{item.name}</span>
                            <span className="text-[10px] text-slate-400">{item.brand} • {item.store}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-bold text-slate-900">₹{item.price.toLocaleString('en-IN')}</span>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-[10px] text-rose-600 hover:underline flex items-center justify-end space-x-0.5"
                          >
                            <span>Link</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    ))}
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

              {/* 1-Click CTA */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onAddBundleToCart(trend)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white rounded-2xl text-xs font-bold shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-300" />
                  <span>Clone Look & Auto-Add All 3 to Cart</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
