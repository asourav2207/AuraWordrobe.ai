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
  ShieldCheck,
  Image as ImageIcon,
  Check,
  RefreshCw,
  FolderOpen,
  Cloud,
  CheckSquare,
  Square,
  Trash2,
  AlertTriangle
} from 'lucide-react';

export default function PhotoScanModal({ isOpen, onClose, onFinishScan }) {
  const [activeTab, setActiveTab] = useState('google'); // 'google' | 'local'
  const [isGoogleConnected, setIsGoogleConnected] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [selectedPhotoIds, setSelectedPhotoIds] = useState(['gp2', 'gp3', 'gp4', 'gp5', 'gp6']);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [customPhotos, setCustomPhotos] = useState([]);

  // Initial Google Photos Library Dataset (Personal portrait removed; clean studio flatlay used)
  const initialGooglePhotos = [
    {
      id: "gp1",
      album: "closet",
      path: "/wardrobe_assets/garments/studio_ananya_fleece.png",
      date: "Nov 21, 2026",
      detectedPerson: "Wardrobe Flatlay",
      garment: "Slate Blue Fleece Pullover",
      status: "Detected: Upper Layering (96% conf)"
    },
    {
      id: "gp2",
      album: "festive",
      path: "/wardrobe_assets/media_1794917831523_6728794e.jpg",
      date: "Nov 19, 2026",
      detectedPerson: "Aditya & Ananya",
      garment: "Check Shirt + Rose Longline Shrug",
      status: "Detected: 2 Persons (Full Body)"
    },
    {
      id: "gp3",
      album: "fashion",
      path: "/wardrobe_assets/media_1794917831523_a44ce8bf.jpg",
      date: "Nov 15, 2026",
      detectedPerson: "Aditya",
      garment: "Navy Pique Polo (Tipping Collar)",
      status: "Detected: Polo Shirt + Glasses"
    },
    {
      id: "gp4",
      album: "fashion",
      path: "/wardrobe_assets/media_1794917831524_9a688f86.jpg",
      date: "Nov 12, 2026",
      detectedPerson: "Aditya",
      garment: "Navy Polo + Straight Denim",
      status: "Detected: Anthropometrics Calibrated"
    },
    {
      id: "gp5",
      album: "festive",
      path: "/wardrobe_assets/media_1794917831790_7aa27a1f.jpg",
      date: "Nov 08, 2026",
      detectedPerson: "Aditya & Ananya",
      garment: "Marble Camo Polo + Floral Cardigan",
      status: "Detected: 2 Persons (Evening Light)"
    },
    {
      id: "gp6",
      album: "festive",
      path: "/wardrobe_assets/media_1794917831823_7659c378.jpg",
      date: "Oct 29, 2026",
      detectedPerson: "Aditya",
      garment: "Textured Navy Kurta + Black Chinos",
      status: "Detected: Traditional Bandhgala Kurta"
    },
    {
      id: "gp7",
      album: "closet",
      path: "/wardrobe_assets/garments/studio_navy_polo.png",
      date: "Oct 24, 2026",
      detectedPerson: "Wardrobe Flatlay",
      garment: "Pique Polo Studio Capture",
      status: "Detected: Isolated Garment Shot"
    },
    {
      id: "gp8",
      album: "closet",
      path: "/wardrobe_assets/garments/studio_pink_check.png",
      date: "Oct 20, 2026",
      detectedPerson: "Wardrobe Flatlay",
      garment: "Buffalo Check Shirt Studio",
      status: "Detected: Plaid Weave Garment"
    },
    {
      id: "gp9",
      album: "closet",
      path: "/wardrobe_assets/garments/studio_ananya_shrug.png",
      date: "Oct 15, 2026",
      detectedPerson: "Wardrobe Flatlay",
      garment: "Rose Longline Shrug Studio",
      status: "Detected: Embroidered Rose Motif"
    }
  ];

  const [photosList, setPhotosList] = useState(initialGooglePhotos);

  if (!isOpen) return null;

  // Filter photos by selected album
  const visiblePhotos = selectedAlbum === 'all'
    ? photosList
    : photosList.filter(p => p.album === selectedAlbum);

  const toggleSelectPhoto = (id) => {
    setSelectedPhotoIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allIds = visiblePhotos.map(p => p.id);
    setSelectedPhotoIds(allIds);
  };

  const handleDeselectAll = () => {
    setSelectedPhotoIds([]);
  };

  // Delete a single photo from Google Photos library
  const handleDeletePhoto = (e, photoId) => {
    e.stopPropagation();
    setPhotosList(prev => prev.filter(p => p.id !== photoId));
    setSelectedPhotoIds(prev => prev.filter(id => id !== photoId));
  };

  // Batch delete all currently selected photos
  const handleDeleteSelectedPhotos = () => {
    if (!selectedPhotoIds.length) return;
    if (window.confirm(`Delete ${selectedPhotoIds.length} selected photos from this library?`)) {
      setPhotosList(prev => prev.filter(p => !selectedPhotoIds.includes(p.id)));
      setSelectedPhotoIds([]);
    }
  };

  // Delete a locally uploaded custom photo
  const handleDeleteCustomPhoto = (e, customId) => {
    e.stopPropagation();
    setCustomPhotos(prev => prev.filter(p => p.id !== customId));
  };

  const handleResetPhotos = () => {
    setPhotosList(initialGooglePhotos);
    setSelectedPhotoIds(['gp2', 'gp3', 'gp4', 'gp5', 'gp6']);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newEntries = files.map((file, idx) => ({
      id: `uploaded_${Date.now()}_${idx}`,
      path: URL.createObjectURL(file),
      detectedPerson: "Local Upload",
      garment: file.name,
      status: "Uploaded (Ready to Scan)"
    }));

    setCustomPhotos(prev => [...prev, ...newEntries]);
  };

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[92vh] flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-700 flex items-center justify-center shadow-sm">
              <Camera className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-serif font-bold text-slate-900">
                  Wardrobe Photo Ingestion & Vision Audit
                </h3>
                <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
                  Google Photos API v1
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Sync or upload lifestyle photos & mirror selfies to automatically catalog your wardrobe
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

        {/* Tab Switcher: Google Photos vs Local Upload */}
        <div className="px-6 pt-4 pb-2 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('google')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'google'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5V0H7a5 5 0 0 0 5 5z"/>
                <path fill="#4285F4" d="M19 12h5V7a5 5 0 0 0-5 5z"/>
                <path fill="#34A853" d="M12 19v5h5a5 5 0 0 0-5-5z"/>
                <path fill="#FBBC05" d="M5 12H0v5a5 5 0 0 0 5-5z"/>
              </svg>
              <span>Google Photos Sync</span>
              <span className="text-[9px] bg-rose-600 text-white px-1.5 py-0.2 rounded-full uppercase font-extrabold">
                Recommended
              </span>
            </button>

            <button
              onClick={() => setActiveTab('local')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'local'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Local Device / Camera</span>
              {customPhotos.length > 0 && (
                <span className="text-[10px] bg-slate-700 text-white px-1.5 rounded-full">
                  {customPhotos.length}
                </span>
              )}
            </button>
          </div>

          {activeTab === 'google' && isGoogleConnected && (
            <div className="hidden sm:flex items-center space-x-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-600 font-medium">Connected: <strong>aditya.sourav@gmail.com</strong></span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: GOOGLE PHOTOS INTEGRATION */}
          {activeTab === 'google' && (
            <div className="space-y-4">
              
              {/* Connection Status Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/60 via-indigo-50/60 to-purple-50/60 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center border border-slate-100">
                    <Cloud className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs font-bold text-slate-900">Google Photos Cloud Library</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-slate-500">
                      OAuth 2.0 Secure Token • Delete unwanted images or ingest selected for vision audit
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsGoogleConnected(!isGoogleConnected)}
                    className="text-xs font-semibold px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl transition shadow-xs"
                  >
                    {isGoogleConnected ? 'Switch Account' : 'Connect Google Photos'}
                  </button>
                </div>
              </div>

              {/* Album Filter Chips & Selection Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                    Albums:
                  </span>
                  <button
                    onClick={() => setSelectedAlbum('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      selectedAlbum === 'all'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All Photos ({photosList.length})
                  </button>
                  <button
                    onClick={() => setSelectedAlbum('fashion')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      selectedAlbum === 'fashion'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    👗 Outfits & Full Body ({photosList.filter(p => p.album === 'fashion').length})
                  </button>
                  <button
                    onClick={() => setSelectedAlbum('festive')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      selectedAlbum === 'festive'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    ✨ Festive & Social ({photosList.filter(p => p.album === 'festive').length})
                  </button>
                  <button
                    onClick={() => setSelectedAlbum('closet')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      selectedAlbum === 'closet'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    🧥 Studio Flat-Lays ({photosList.filter(p => p.album === 'closet').length})
                  </button>
                </div>

                {/* Selection & Batch Delete Controls */}
                <div className="flex items-center space-x-2 text-xs">
                  <button
                    onClick={handleSelectAll}
                    className="text-rose-600 font-bold hover:underline flex items-center space-x-1"
                  >
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Select All</span>
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    onClick={handleDeselectAll}
                    className="text-slate-500 font-semibold hover:underline flex items-center space-x-1"
                  >
                    <Square className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>

                  {/* Batch Delete Selected Images Button */}
                  {selectedPhotoIds.length > 0 && (
                    <>
                      <span className="text-slate-300">|</span>
                      <button
                        onClick={handleDeleteSelectedPhotos}
                        className="text-red-600 hover:text-red-700 font-bold flex items-center space-x-1 bg-red-50 hover:bg-red-100 px-2 py-0.5 rounded-lg border border-red-200 transition"
                        title="Delete selected photos"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete ({selectedPhotoIds.length})</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Photo Grid with Checkboxes & Individual Delete Buttons */}
              {visiblePhotos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[380px] overflow-y-auto p-1">
                  {visiblePhotos.map((photo) => {
                    const isSelected = selectedPhotoIds.includes(photo.id);
                    return (
                      <div
                        key={photo.id}
                        onClick={() => toggleSelectPhoto(photo.id)}
                        className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all aspect-square group ${
                          isSelected 
                            ? 'border-rose-600 shadow-md ring-2 ring-rose-500/30' 
                            : 'border-slate-200 hover:border-slate-300 opacity-80'
                        }`}
                      >
                        <img
                          src={photo.path}
                          alt={photo.garment}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        
                        {/* Checkbox badge */}
                        <div className="absolute top-2 left-2 z-10">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition shadow-sm ${
                            isSelected ? 'bg-rose-600 text-white' : 'bg-white/80 text-slate-400'
                          }`}>
                            {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>
                        </div>

                        {/* Top Right: Delete Button on Card */}
                        <div className="absolute top-2 right-2 z-20 flex items-center space-x-1">
                          <button
                            onClick={(e) => handleDeletePhoto(e, photo.id)}
                            className="w-6 h-6 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition shadow-md opacity-90 group-hover:opacity-100 hover:scale-110"
                            title="Delete this photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Bottom Info Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-2.5 text-white pointer-events-none">
                          <span className="text-xs font-bold truncate block">{photo.detectedPerson}</span>
                          <span className="text-[10px] text-amber-300 truncate">{photo.garment}</span>
                          <span className="text-[9px] text-slate-300 truncate block mt-0.5">{photo.status}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
                  <Trash2 className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-sm font-semibold text-slate-700">No photos in this album (all deleted or empty)</p>
                  <button
                    onClick={handleResetPhotos}
                    className="px-3.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
                  >
                    Restore Sample Photos
                  </button>
                </div>
              )}

              {/* Quick stats on selected photos */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2">
                <span>
                  <strong>{selectedPhotoIds.length}</strong> of {photosList.length} photos selected for AI ingestion
                </span>
                <span className="text-emerald-700 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subject Segregation & Garment Extraction Ready</span>
                </span>
              </div>

            </div>
          )}

          {/* TAB 2: LOCAL DEVICE UPLOAD */}
          {activeTab === 'local' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-3xl p-8 text-center transition bg-slate-50 hover:bg-amber-50/20 group cursor-pointer relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center mx-auto text-amber-600 mb-3 group-hover:scale-110 transition">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  Drop custom lifestyle photos or closet snaps here
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Upload full-body photos, selfie mirror shots, or flat-lays. Supports JPG, PNG, WEBP, HEIC up to 25MB each.
                </p>
                <div className="inline-flex items-center space-x-1 text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full mt-4">
                  <span>Browse Local Device Files</span>
                </div>
              </div>

              {customPhotos.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600">
                      Locally Uploaded Files ({customPhotos.length}):
                    </span>
                    <button
                      onClick={() => setCustomPhotos([])}
                      className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete All Uploads</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {customPhotos.map((item) => (
                      <div key={item.id} className="relative rounded-xl overflow-hidden border border-slate-200 aspect-square group">
                        <img src={item.path} alt="" className="w-full h-full object-cover" />
                        
                        {/* Delete single custom upload button */}
                        <button
                          onClick={(e) => handleDeleteCustomPhoto(e, item.id)}
                          className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 text-white rounded-md transition shadow z-10 opacity-90 group-hover:opacity-100"
                          title="Delete photo"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>

                        <div className="absolute inset-0 bg-black/50 flex items-end p-1 text-[9px] text-white truncate pointer-events-none">
                          {item.garment}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Neural Processing Progress Modal */}
          {scanning && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Running Vision Intelligence Pipeline
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">Step {scanStep} of 4</span>
              </div>

              {/* Steps Progress */}
              <div className="space-y-2 text-xs">
                <div className={`flex items-center space-x-2 ${scanStep >= 1 ? 'text-white' : 'text-slate-500'}`}>
                  <CheckCircle2 className={`w-4 h-4 ${scanStep >= 1 ? 'text-emerald-400' : 'text-slate-600'}`} />
                  <span>1. Ingesting {selectedPhotoIds.length} high-res images from Google Photos API & EXIF metadata...</span>
                </div>
                <div className={`flex items-center space-x-2 ${scanStep >= 2 ? 'text-white' : 'text-slate-500'}`}>
                  <CheckCircle2 className={`w-4 h-4 ${scanStep >= 2 ? 'text-emerald-400' : 'text-slate-600'}`} />
                  <span>2. Facial recognition & multi-subject segregation (Aditya vs. Ananya)...</span>
                </div>
                <div className={`flex items-center space-x-2 ${scanStep >= 3 ? 'text-white' : 'text-slate-500'}`}>
                  <CheckCircle2 className={`w-4 h-4 ${scanStep >= 3 ? 'text-emerald-400' : 'text-slate-600'}`} />
                  <span>3. Cloth texture, weave GSM & wear degradation scoring (1–10)...</span>
                </div>
                <div className={`flex items-center space-x-2 ${scanStep >= 4 ? 'text-white' : 'text-slate-500'}`}>
                  <CheckCircle2 className={`w-4 h-4 ${scanStep >= 4 ? 'text-emerald-400' : 'text-slate-600'}`} />
                  <span>4. Calibrating anthropometrics across Indian brand sizing frameworks...</span>
                </div>
              </div>

              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-rose-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${(scanStep / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Strict Client-Side Encryption • Zero permanent photo storage</span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleRunScan}
              disabled={scanning || (activeTab === 'google' && selectedPhotoIds.length === 0)}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white text-xs font-bold transition shadow-md shadow-rose-600/20 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {activeTab === 'google'
                  ? `Ingest & Audit ${selectedPhotoIds.length} Selected Photos`
                  : 'Start Vision Pipeline'}
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
