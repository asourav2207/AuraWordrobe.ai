import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  Camera, 
  Layers, 
  Cpu, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function PhotoScanModal({ isOpen, onClose, onFinishScan }) {
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  if (!isOpen) return null;

  const uploadedSamples = [
    {
      id: "img1",
      path: "/wardrobe_assets/media_1794917831520_bfd43708.jpg",
      detectedPerson: "Ananya",
      garment: "Slate Blue Fleece Pullover",
      status: "Classified"
    },
    {
      id: "img2",
      path: "/wardrobe_assets/media_1794917831523_6728794e.jpg",
      detectedPerson: "Aditya & Ananya",
      garment: "Check Shirt + Pink Shrug",
      status: "Segregated (2 Subjects)"
    },
    {
      id: "img3",
      path: "/wardrobe_assets/media_1794917831523_a44ce8bf.jpg",
      detectedPerson: "Aditya",
      garment: "Navy Pique Polo",
      status: "Classified"
    },
    {
      id: "img4",
      path: "/wardrobe_assets/media_1794917831524_9a688f86.jpg",
      detectedPerson: "Aditya",
      garment: "Navy Polo + Blue Straight Denim",
      status: "Proportions Calibrated"
    },
    {
      id: "img5",
      path: "/wardrobe_assets/media_1794917831790_7aa27a1f.jpg",
      detectedPerson: "Aditya & Ananya",
      garment: "Marble Camo Polo + Floral Jacket",
      status: "Segregated (2 Subjects)"
    },
    {
      id: "img6",
      path: "/wardrobe_assets/media_1794917831823_7659c378.jpg",
      detectedPerson: "Aditya",
      garment: "Textured Navy Kurta + Black Chinos",
      status: "Proportions Calibrated"
    }
  ];

  const handleRunScan = () => {
    setScanning(true);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 700);
    setTimeout(() => setScanStep(3), 1400);
    setTimeout(() => setScanStep(4), 2100);
    setTimeout(() => {
      setScanning(false);
      onFinishScan();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-700 flex items-center justify-center">
              <Camera className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-slate-900">
                AuraWardrobe Computer Vision Pipeline
              </h3>
              <p className="text-xs text-slate-500">
                Multi-subject separation, fabric detection & anthropometric calibration
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Active Photos Ingested */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Ingested Photos (6 Active Files Analyzed):
              </span>
              <span className="text-xs text-emerald-600 font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Ingested & Deconstructed</span>
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {uploadedSamples.map((sample) => (
                <div key={sample.id} className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-square">
                  <img
                    src={sample.path}
                    alt={sample.garment}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-1.5 text-white">
                    <span className="text-[9px] font-bold truncate block">{sample.detectedPerson}</span>
                    <span className="text-[8px] text-amber-300 truncate">{sample.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Pipeline Architecture Stages */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Multi-Stage AI Extraction Pipeline:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start space-x-2">
                <Cpu className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">1. Facial & Body Segregation</span>
                  <span className="text-slate-500 text-[11px]">Distinguishes individual subjects across coupled temple & evening photos.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start space-x-2">
                <Layers className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">2. Fabric & Silhouette Extraction</span>
                  <span className="text-slate-500 text-[11px]">Detects cotton slub, fleece, pique knit, rayon crepe, and Resham thread embroidery.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">3. Wear & Condition Scoring</span>
                  <span className="text-slate-500 text-[11px]">Identifies neckband curl, placket fading, and fabric lustre to assign 1-10 scores.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">4. Brand Sizing Synthesis</span>
                  <span className="text-slate-500 text-[11px]">Converts shoulder, chest, and inseam ratios into brand-specific size predictions.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scanning Progress if active */}
          {scanning && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-center animate-pulse">
              <div className="flex items-center justify-center space-x-2 text-amber-900 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
                <span>
                  {scanStep === 1 && "Segmenting individuals and extracting body landmarks..."}
                  {scanStep === 2 && "Analyzing fabric textures and condition degradation..."}
                  {scanStep === 3 && "Executing cross-brand pattern tolerance algorithms..."}
                  {scanStep === 4 && "Finalizing wardrobe catalog and gap calculations!"}
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Ready to re-audit catalog with calibrated parameters
          </span>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleRunScan}
              disabled={scanning}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition shadow-md flex items-center space-x-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{scanning ? 'Running Vision Engine...' : 'Re-Run Computer Vision Scan'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
