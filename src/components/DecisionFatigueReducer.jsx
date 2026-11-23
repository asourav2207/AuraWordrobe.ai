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
  Plus
} from 'lucide-react';

export default function DecisionFatigueReducer({ profile, onAddToCart, onPairArtifacts }) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [expandedPermutations, setExpandedPermutations] = useState({});

  const togglePermutations = (recId) => {
    setExpandedPermutations(prev => ({
      ...prev,
      [recId]: !prev[recId]
    }));
  };

  const filteredRecs = profile.recommendations.filter(rec => {
    if (activeFilter === 'ALL') return true;
    return rec.type === activeFilter;
  });

  return (
    <div className="space-y-8">
      
      {/* Editorial Explainer on Cutting Decision Fatigue */}
      <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-orange-50 border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Anti-Decision Fatigue Algorithm</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Only 3 Targeted Additions. Zero Endless Scrolling.
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Standard Indian shopping portals bombard you with 50,000 algorithmic results. 
              Our engine audits your exact closet gaps, cross-references with peer demographic data in Bengaluru, 
              and predicts your size across <strong className="text-slate-900">Myntra, Amazon, and Flipkart</strong> so you buy with total conviction.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-amber-200/60 shadow-sm flex flex-col justify-center space-y-2 text-xs">
            <div className="flex items-center space-x-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Rationalized "Why Buy":</strong> Solves specific wardrobe imbalance</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-700">
              <Users className="w-4 h-4 text-rose-600 shrink-0" />
              <span><strong>Peer Social Proof:</strong> In-cart validation from similar age cohort</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span><strong>Zero Guess Sizing:</strong> Pre-calculated for Indian brand cuts</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 mt-6 pt-5 border-t border-amber-200/60">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">Filter Recommendations:</span>
          {['ALL', 'ADD', 'REPLACE'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition ${
                activeFilter === filter
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {filter === 'ALL' ? 'All (3)' : filter === 'ADD' ? 'Gap Additions (2)' : 'Replacements (1)'}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {filteredRecs.map((rec) => {
          const isExpanded = !!expandedPermutations[rec.id];

          return (
            <div
              key={rec.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Product Top: Image & Store Badge */}
              <div className="relative h-64 bg-slate-100 overflow-hidden">
                <img
                  src={rec.imageUrl}
                  alt={rec.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md ${
                    rec.type === 'REPLACE' 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-rose-600 text-white'
                  }`}>
                    {rec.type === 'REPLACE' ? 'Direct Replacement' : 'Strategic Wardrobe Add'}
                  </span>

                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/95 text-slate-900 shadow-sm border border-slate-200 flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{rec.sourceStore}</span>
                  </span>
                </div>

                {/* Price & Rating Tag */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl border border-slate-200 shadow-lg flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-lg font-bold font-serif text-slate-900">₹{rec.price.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-slate-400 line-through">₹{rec.originalPrice.toLocaleString('en-IN')}</span>
                      <span className="text-xs font-bold text-emerald-600">({rec.discount})</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{rec.rating}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({rec.ratingsCount})</span>
                  </div>
                </div>
              </div>

              {/* Product Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-bold text-rose-600 tracking-wider uppercase">
                    {rec.brand}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1 line-clamp-2 leading-snug">
                    {rec.title}
                  </h3>

                  {/* Sizing Intelligence for Indian Body */}
                  <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Recommended Indian Sizing</span>
                      </span>
                      <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-emerald-600 text-white font-mono">
                        {rec.predictedSize}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                      {rec.fitNote}
                    </p>
                  </div>

                  {/* Backing Logical Analysis: "Why Buy" */}
                  <div className="mt-3 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Backing Logical Analysis (Cuts Decision Fatigue):
                    </span>
                    <ul className="space-y-1">
                      {rec.whyBuyLogic.map((logic, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                          <span>{logic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* OUTFIT PERMUTATIONS SIMULATOR (Solves Decision Fatigue) */}
                  {rec.permutations && rec.permutations.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => togglePermutations(rec.id)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold transition border border-purple-200/80"
                      >
                        <div className="flex items-center space-x-1.5">
                          <Layers className="w-3.5 h-3.5 text-purple-600" />
                          <span>Simulate {rec.permutations.length} Outfits With Your Closet</span>
                        </div>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-2.5 space-y-2.5 p-3 rounded-2xl bg-purple-50/50 border border-purple-200/60 animate-in fade-in duration-200">
                          {rec.permutations.map((perm, pIdx) => (
                            <div key={pIdx} className="bg-white p-3 rounded-xl border border-purple-100 shadow-sm text-xs space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-900">{perm.title}</span>
                                <span className="text-[10px] bg-purple-100 text-purple-800 font-semibold px-2 py-0.5 rounded-full">
                                  {perm.occasion}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 leading-tight">
                                {perm.description}
                              </p>
                              <div className="flex flex-wrap gap-1 pt-1">
                                {perm.pieces.map((p, idx) => (
                                  <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium border border-slate-200">
                                    {p}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Demographic & In-Cart Social Proof */}
                  <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200/60">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-900 mb-1">
                      <Users className="w-3.5 h-3.5 text-rose-600" />
                      <span>In-Cart Demographic Proof ({profile.city.split(',')[0]} Cohort)</span>
                    </div>
                    <p className="text-[11px] text-slate-800 font-medium">
                      {rec.demographicProof.acceptanceRate}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5 pt-1 border-t border-rose-200/40">
                      <span>{rec.demographicProof.returnsRate}</span>
                      <span className="font-semibold text-rose-700">Verified Peer Choice</span>
                    </div>
                  </div>
                </div>

                {/* CTAs: Add to Cart with Auto-Size & External Web Link */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => onAddToCart(rec, rec.predictedSize)}
                    className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    <span>Add to Cart ({rec.predictedSize})</span>
                  </button>

                  <a
                    href={rec.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center justify-center space-x-1.5 border border-slate-200"
                  >
                    <span>View Live on {rec.sourceStore}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
