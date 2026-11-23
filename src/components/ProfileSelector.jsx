import React from 'react';
import { User, Sparkles, MapPin, Ruler, Activity, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ProfileSelector({ profiles, activeProfileId, onSelectProfile }) {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigoIndian-900 to-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-slate-800 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left: Persona Switcher */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Subject Vision Classifier</span>
            </span>
            <span className="text-xs text-slate-400">
              2 Unique Subjects Segregated from 6 Photos
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            Select Active Wardrobe Profile
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Computer vision automatically segregated the uploaded photos into distinct individuals with tailored Indian brand sizing and closet diagnostics.
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            {profiles.map((profile) => {
              const isSelected = profile.id === activeProfileId;
              return (
                <button
                  key={profile.id}
                  onClick={() => onSelectProfile(profile.id)}
                  className={`flex items-center space-x-3.5 p-2.5 sm:px-4 sm:py-3 rounded-2xl transition-all border ${
                    isSelected
                      ? 'bg-rose-600/90 text-white border-rose-400 shadow-lg shadow-rose-600/30 ring-2 ring-rose-400/50'
                      : 'bg-white/10 hover:bg-white/15 text-slate-200 border-white/10'
                  }`}
                >
                  {profile.avatar && profile.id !== 'user_ananya' ? (
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-white/50 shadow"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-600 to-purple-600 flex items-center justify-center border-2 border-white/50 shadow text-white font-serif font-bold text-lg">
                      {profile.name[0]}
                    </div>
                  )}
                  <div className="text-left">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-sm sm:text-base">{profile.name}</span>
                      <span className="text-[11px] px-1.5 py-0.5 rounded bg-black/30 font-medium text-slate-200 uppercase">
                        {profile.gender}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-300" />}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-300 mt-0.5">
                      <span>{profile.age} yrs</span>
                      <span>•</span>
                      <span>{profile.profession.split(' ')[0]}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Profile Body Proportions & Diagnostics Card */}
        {(() => {
          const current = profiles.find(p => p.id === activeProfileId);
          if (!current) return null;

          return (
            <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10 lg:w-[420px] backdrop-blur-sm">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2 text-xs text-amber-400 font-semibold">
                  <Ruler className="w-4 h-4" />
                  <span>Proportions & Indian Sizing Matrix</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>94% Fit Confidence</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Height & Build:</span>
                  <span className="font-medium text-slate-100">{current.bodyProportions.height} ({current.bodyProportions.build})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Key Measurements:</span>
                  <span className="font-medium text-slate-100">
                    {current.gender === 'male' 
                      ? `Chest ${current.bodyProportions.chest} • Waist ${current.bodyProportions.waist}`
                      : `Bust ${current.bodyProportions.bust} • Waist ${current.bodyProportions.waist} • Hip ${current.bodyProportions.hip}`
                    }
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Demographic Peer Group:</span>
                  <span className="font-medium text-amber-200">{current.demographicTag}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Wardrobe Health:</span>
                  <span className="font-bold text-emerald-400">{current.wardrobeHealth.healthScore} / 100</span>
                  <span className="text-[10px] text-slate-400 ml-1.5">
                    ({current.wardrobeHealth.keepCount} Keep • {current.wardrobeHealth.replaceCount} Replace • {current.wardrobeHealth.addCount} Gaps)
                  </span>
                </div>
              </div>

              {/* Color Bias Alert */}
              <div className="mt-3 pt-3 border-t border-white/10 text-[11px] text-slate-300">
                <span className="font-semibold text-rose-300">Closet Imbalance Notice: </span>
                {current.wardrobeHealth.diversityDeficit}
              </div>

            </div>
          );
        })()}

      </div>
    </div>
  );
}
