import React, { useState } from 'react';
import { Ruler, ShieldCheck, AlertCircle, Sparkles, Check, ChevronRight } from 'lucide-react';

export default function BrandSizingMatrix({ profile }) {
  const [selectedBrand, setSelectedBrand] = useState(Object.keys(profile.brandSizingFramework)[0]);

  const brands = Object.keys(profile.brandSizingFramework);
  const brandData = profile.brandSizingFramework[selectedBrand];

  return (
    <div className="space-y-8">
      
      {/* Intro Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Ruler className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cross-Brand Indian Anthropometric Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Why Size "M" in Zara is an "L" in Snitch
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            In India, nearly <strong>34% of fashion e-commerce returns</strong> happen due to erratic sizing discrepancies between fast-fashion European cuts, slim Gen-Z D2C brands, and relaxed traditional ethnic sizing. 
            AuraWardrobe maps {profile.name}'s exact physical measurements against the technical pattern cuts of India's top brands.
          </p>
        </div>

        {/* Current Proportions Summary Bar */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Height & Frame</span>
            <span className="font-bold text-slate-900">{profile.bodyProportions.height}</span>
            <span className="text-slate-500 block text-[10px]">{profile.bodyProportions.build}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Natural Chest / Bust</span>
            <span className="font-bold text-slate-900">{profile.gender === 'male' ? profile.bodyProportions.chest : profile.bodyProportions.bust}</span>
            <span className="text-slate-500 block text-[10px]">Circumference</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Natural Waist</span>
            <span className="font-bold text-slate-900">{profile.bodyProportions.waist}</span>
            <span className="text-slate-500 block text-[10px]">Mid-Rise Anchor</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Inseam / Shoulders</span>
            <span className="font-bold text-slate-900">{profile.gender === 'male' ? `Shoulder: ${profile.bodyProportions.shoulder}` : `Hip: ${profile.bodyProportions.hip}`}</span>
            <span className="text-slate-500 block text-[10px]">Inseam: {profile.bodyProportions.inseam}</span>
          </div>
        </div>
      </div>

      {/* Brand Tabs & Deep Fit Explainer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Brand Selector List */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-2">
            Select Indian / Global Brand:
          </span>
          {brands.map((brand) => {
            const isSelected = brand === selectedBrand;
            const data = profile.brandSizingFramework[brand];

            return (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`w-full p-4 rounded-2xl text-left transition-all border flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                }`}
              >
                <div>
                  <div className="font-bold text-sm">{brand}</div>
                  <div className={`text-xs mt-0.5 ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                    Predicted Size: <strong>{data.predictedSize}</strong>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700 font-bold'
                  }`}>
                    {data.fitConfidence}% Fit
                  </span>
                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Pattern Anatomy Card */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-rose-600 block">
                  Pattern Anatomy & Fit Diagnostics
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mt-0.5">
                  {selectedBrand} Tailoring Framework
                </h3>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Recommended Size</span>
                <span className="text-2xl font-black font-mono text-emerald-600">
                  {brandData.predictedSize}
                </span>
              </div>
            </div>

            {/* Fit Recommendation Note */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed">
              <div className="flex items-center space-x-2 font-bold mb-1">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Technical Pattern Rationale</span>
              </div>
              <p>{brandData.fitRecommendation}</p>
            </div>

            {/* Anthropometric Comparison Checklist */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Anthropometric Tolerance Checks for {profile.name}:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Shoulder Seam Alignment</span>
                    <span className="text-slate-500">Falls directly on acromion bone with 0.25" comfort margin.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Torso Drape & Button Placket</span>
                    <span className="text-slate-500">Zero gaping across mid-chest when seated or driving.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Sleeve Length Ratio</span>
                    <span className="text-slate-500">Terminates precisely at the base of the thumb joint.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Wash & Shrinkage Allowance</span>
                    <span className="text-slate-500">Pre-compensated for 1.5% hot wash cotton shrinkage.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guaranteed Fit Assurance Footer */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Auto-applied to any order from Myntra, Amazon, or Flipkart</span>
            </div>
            <span className="font-semibold text-slate-900">Zero Return Guarantee</span>
          </div>

        </div>

      </div>

    </div>
  );
}
