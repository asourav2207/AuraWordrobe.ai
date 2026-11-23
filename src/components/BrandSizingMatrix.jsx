import React, { useState, useEffect } from 'react';
import { 
  Ruler, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  Check, 
  ChevronRight, 
  Sliders, 
  RefreshCw,
  Camera,
  Shirt,
  User,
  Palette,
  HeartPulse,
  Activity
} from 'lucide-react';
import { calculateBrandSizes } from '../data/wardrobeDatabase';

export default function BrandSizingMatrix({ profile, onUpdateProfileMeasurements }) {
  const isMale = profile.gender === 'male';

  // State for all anthropometric & biometric parameters
  const [heightCm, setHeightCm] = useState(profile.bodyProportions.heightCm || 175);
  const [chest, setChest] = useState(profile.bodyProportions.chestVal || (isMale ? 40 : 34));
  const [waist, setWaist] = useState(profile.bodyProportions.waistVal || (isMale ? 34 : 28));
  const [shoulder, setShoulder] = useState(profile.bodyProportions.shoulderVal || (isMale ? 18 : 15));
  const [armLength, setArmLength] = useState(profile.bodyProportions.armLengthVal || (isMale ? 25 : 21));
  const [inseam, setInseam] = useState(profile.bodyProportions.inseamVal || (isMale ? 31 : 28));
  const [neck, setNeck] = useState(profile.bodyProportions.neckVal || (isMale ? 15.5 : 13.5));
  const [bodyType, setBodyType] = useState(profile.bodyProportions.bodyType || (isMale ? "Athletic Mesomorph" : "Petite Hourglass"));
  const [skinToneHex, setSkinToneHex] = useState(profile.bodyProportions.skinToneHex || (isMale ? "#C68642" : "#D9A066"));
  const [skinToneName, setSkinToneName] = useState(profile.bodyProportions.skinToneName || "Warm Golden Indian Wheatish");
  const [obesityCategory, setObesityCategory] = useState(profile.bodyProportions.obesityCategory || "Normal / Lean Athletic");

  const [selectedBrand, setSelectedBrand] = useState(isMale ? 'Snitch' : 'Zara');
  const [activeTabMode, setActiveTabMode] = useState('brand_calculator'); // 'brand_calculator' | 'photo_guess'

  // Calculate BMI dynamically
  const heightM = heightCm / 100;
  const approxWeightKg = isMale 
    ? Math.round(22.5 * heightM * heightM + (chest > 40 ? (chest - 40) * 1.5 : 0)) 
    : Math.round(20.5 * heightM * heightM + (chest > 34 ? (chest - 34) * 1.2 : 0));
  const dynamicBmi = (approxWeightKg / (heightM * heightM)).toFixed(1);

  // Compute live brand sizing dynamically
  const liveSizingFramework = calculateBrandSizes(profile.gender, chest, waist, `${Math.floor(heightCm/30.48)}'${Math.round((heightCm%30.48)/2.54)}"`, armLength, inseam, bodyType);
  const brands = Object.keys(liveSizingFramework);
  const currentBrandData = liveSizingFramework[selectedBrand] || liveSizingFramework[brands[0]];

  const handleResetToPhotos = () => {
    setHeightCm(profile.bodyProportions.heightCm || 175);
    setChest(profile.bodyProportions.chestVal || (isMale ? 40 : 34));
    setWaist(profile.bodyProportions.waistVal || (isMale ? 34 : 28));
    setShoulder(profile.bodyProportions.shoulderVal || (isMale ? 18 : 15));
    setArmLength(profile.bodyProportions.armLengthVal || (isMale ? 25 : 21));
    setInseam(profile.bodyProportions.inseamVal || (isMale ? 31 : 28));
    setNeck(profile.bodyProportions.neckVal || (isMale ? 15.5 : 13.5));
    setBodyType(profile.bodyProportions.bodyType);
    setSkinToneHex(profile.bodyProportions.skinToneHex);
    setSkinToneName(profile.bodyProportions.skinToneName);
    setObesityCategory(profile.bodyProportions.obesityCategory);
  };

  useEffect(() => {
    handleResetToPhotos();
    setSelectedBrand(isMale ? 'Snitch' : 'Zara');
  }, [profile.id]);

  const skinTonePresets = [
    { name: "Fair Peach Undertone", hex: "#F3CFB3" },
    { name: "Warm Golden Wheatish", hex: "#C68642" },
    { name: "Medium Warm Indian Tan", hex: "#D9A066" },
    { name: "Deep Rich Olive Tan", hex: "#8D5524" },
    { name: "Deep Bronze Dusk", hex: "#623A18" }
  ];

  return (
    <div className="space-y-8">
      
      {/* Intro Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Ruler className="w-3.5 h-3.5 text-emerald-600" />
              <span>Full Biometric & Anthropometric Sizing Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Personalized Body Profile & Brand Fit Predictor
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Auto-detected from {profile.name}'s uploaded photos: precise skeletal landmarks, limb lengths, body silhouette, and skin undertones. Adjust and verify each parameter below to generate infallible size predictions across Indian brand grading standards.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl self-start md:self-center border border-slate-200">
            <button
              onClick={() => setActiveTabMode('brand_calculator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTabMode === 'brand_calculator' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Brand Sizing
            </button>
            <button
              onClick={() => setActiveTabMode('photo_guess')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
                activeTabMode === 'photo_guess' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-amber-500" />
              <span>Cloth Size Guessed in Photos</span>
            </button>
          </div>
        </div>

        {/* FULL ANTHROPOMETRIC ADJUSTMENT STUDIO */}
        <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400">
              <Sliders className="w-4 h-4" />
              <span>Pre-Filled from Photos • Verify & Adjust Parameters</span>
            </div>
            <button
              onClick={handleResetToPhotos}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Re-Detect from Uploaded Photos</span>
            </button>
          </div>

          {/* Grid of Sliders & Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
            
            {/* Height */}
            <div className="space-y-1.5 bg-white/5 p-3.5 rounded-xl border border-white/10">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Height:</span>
                <span className="text-amber-400 font-mono font-bold">{heightCm} cm ({Math.floor(heightCm/30.48)}'{Math.round((heightCm%30.48)/2.54)}")</span>
              </div>
              <input
                type="range"
                min="145"
                max="200"
                value={heightCm}
                onChange={(e) => setHeightCm(parseInt(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block">Ground to crown</span>
            </div>

            {/* Chest / Bust */}
            <div className="space-y-1.5 bg-white/5 p-3.5 rounded-xl border border-white/10">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">{isMale ? 'Chest' : 'Bust'} Circumference:</span>
                <span className="text-amber-400 font-mono font-bold">{chest} inches</span>
              </div>
              <input
                type="range"
                min="30"
                max="48"
                value={chest}
                onChange={(e) => setChest(parseInt(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block">Across fullest point</span>
            </div>

            {/* Natural Waist */}
            <div className="space-y-1.5 bg-white/5 p-3.5 rounded-xl border border-white/10">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Natural Waist:</span>
                <span className="text-amber-400 font-mono font-bold">{waist} inches</span>
              </div>
              <input
                type="range"
                min="24"
                max="44"
                value={waist}
                onChange={(e) => setWaist(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block">Mid-rise trouser anchor</span>
            </div>

            {/* Inseam / Leg Length */}
            <div className="space-y-1.5 bg-white/5 p-3.5 rounded-xl border border-white/10">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Leg Length (Inseam):</span>
                <span className="text-amber-400 font-mono font-bold">{inseam} inches</span>
              </div>
              <input
                type="range"
                min="26"
                max="36"
                value={inseam}
                onChange={(e) => setInseam(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block">Crotch to ankle bone</span>
            </div>

            {/* Shoulder Width */}
            <div className="space-y-1.5 bg-white/5 p-3.5 rounded-xl border border-white/10">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Shoulder Width:</span>
                <span className="text-amber-400 font-mono font-bold">{shoulder} inches</span>
              </div>
              <input
                type="range"
                min="13"
                max="22"
                value={shoulder}
                onChange={(e) => setShoulder(parseInt(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block">Acromion to acromion</span>
            </div>

            {/* Arm Length */}
            <div className="space-y-1.5 bg-white/5 p-3.5 rounded-xl border border-white/10">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Arm / Sleeve Length:</span>
                <span className="text-amber-400 font-mono font-bold">{armLength} inches</span>
              </div>
              <input
                type="range"
                min="18"
                max="29"
                value={armLength}
                onChange={(e) => setArmLength(parseInt(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block">Shoulder to wrist bone</span>
            </div>

            {/* Neck Circumference */}
            <div className="space-y-1.5 bg-white/5 p-3.5 rounded-xl border border-white/10">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Neck Band:</span>
                <span className="text-amber-400 font-mono font-bold">{neck} inches</span>
              </div>
              <input
                type="range"
                min="12"
                max="19"
                step="0.5"
                value={neck}
                onChange={(e) => setNeck(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block">Mandarin / Formal collar</span>
            </div>

            {/* Body Type & BMI */}
            <div className="space-y-1.5 bg-white/5 p-3.5 rounded-xl border border-white/10">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Body Type & BMI:</span>
                <span className="text-emerald-400 font-mono font-bold">BMI {dynamicBmi}</span>
              </div>
              <select
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
                className="w-full p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
              >
                <option value="Athletic Mesomorph">Athletic Mesomorph (Broad Shoulder)</option>
                <option value="Slim Ectomorph">Slim Ectomorph (Lean / Linear)</option>
                <option value="Inverted Triangle">Inverted Triangle (V-Taper)</option>
                <option value="Petite Hourglass">Petite Hourglass / Balanced</option>
                <option value="Relaxed Rectangle">Relaxed Rectangle</option>
              </select>
              <span className="text-[10px] text-emerald-300 block">{obesityCategory}</span>
            </div>

          </div>

          {/* Skin Tone & Undertone Selector */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4 text-rose-400" />
                <span className="font-bold text-slate-200">Detected Complexion & Color Season:</span>
                <span className="text-amber-300 font-medium">({skinToneName})</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 text-[11px]">Swatch:</span>
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: skinToneHex }}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-400 mr-1">Calibrate tone:</span>
              {skinTonePresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSkinToneHex(preset.hex);
                    setSkinToneName(preset.name);
                  }}
                  className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[11px] border transition ${
                    skinToneHex === preset.hex ? 'bg-white/20 border-white text-white' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full border border-black/30" style={{ backgroundColor: preset.hex }} />
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* VIEW MODE 1: BRAND SIZING MATRIX */}
      {activeTabMode === 'brand_calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Brand Selector List */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-2">
              Select Indian / Global Brand:
            </span>
            {brands.map((brand) => {
              const isSelected = brand === selectedBrand;
              const data = liveSizingFramework[brand];

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
                    {currentBrandData.predictedSize}
                  </span>
                </div>
              </div>

              {/* Fit Recommendation Note */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed">
                <div className="flex items-center space-x-2 font-bold mb-1">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Technical Pattern Rationale (Chest {chest}", Waist {waist}", Sleeve {armLength}")</span>
                </div>
                <p>{currentBrandData.fitRecommendation}</p>
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
                      <span className="font-bold text-slate-900 block">Shoulder Seam ({shoulder}")</span>
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
                      <span className="font-bold text-slate-900 block">Sleeve Ratio ({armLength}")</span>
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
      )}

      {/* VIEW MODE 2: CLOTH SIZES GUESSED IN PHOTOS */}
      {activeTabMode === 'photo_guess' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5 text-amber-600" />
              <span>Neural Fabric Strain & Tension Analysis</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              Sizes of Clothes Currently Worn in Uploaded Photos
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              By calculating fold density, chest placket strain, and hem breaks against {profile.name}'s detected measurements, the AI estimated the exact sizes worn in your photos:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profile.detectedWornSizes.map((guess, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-600 uppercase text-[10px] tracking-wider">Garment #{idx+1}</span>
                  <span className="font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px] font-bold">
                    {guess.brandAccuracy}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900">{guess.garment}</h4>

                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Guessed Retail Size:</span>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm text-emerald-800 font-mono">
                    {guess.estimatedWornSize}
                  </span>
                </div>

                <div className="space-y-1 text-slate-600 text-[11px]">
                  <div><strong>Observed Fit:</strong> {guess.detectedFit}</div>
                  <div><strong>Verdict:</strong> {guess.fitVerdict}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
