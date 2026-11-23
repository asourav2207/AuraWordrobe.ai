import React, { useState } from 'react';
import { 
  Filter, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  PlusCircle, 
  Trash2, 
  Eye, 
  Layers, 
  ShieldAlert,
  Search,
  Plus,
  X,
  LayoutGrid,
  List,
  Check,
  ExternalLink,
  Camera,
  Tag,
  ArrowRight
} from 'lucide-react';

export default function WardrobeAuditor({ 
  profile, 
  items, 
  onUpdateItemStatus, 
  onDeleteItem, 
  onAddNewItem, 
  onSwitchToRecommendations,
  onOpenTryOn
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [previewPhotoItem, setPreviewPhotoItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New item form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Tops');
  const [newItemBrand, setNewItemBrand] = useState('Snitch');
  const [newItemPrice, setNewItemPrice] = useState(1499);
  const [newItemFabric, setNewItemFabric] = useState('100% Breathable Cotton');
  const [newItemOccasion, setNewItemOccasion] = useState('Smart Casual');
  const [newItemColor, setNewItemColor] = useState('Beige / Sand');
  const [newItemCondition, setNewItemCondition] = useState(9.0);

  const categories = ['All', 'Tops', 'Bottoms', 'Layering / Outerwear', 'Ethnic & Festive', 'Winterwear / Loungewear'];
  const statuses = ['All', 'KEEP', 'REPLACE'];

  // Current active items
  const activeItems = items || profile.items;

  const filteredItems = activeItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (item.brand && item.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.clothType && item.clothType.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.color && item.color.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const keepCount = activeItems.filter(i => i.status === 'KEEP').length;
  const replaceCount = activeItems.filter(i => i.status === 'REPLACE').length;

  const handleCreateItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const created = {
      id: `custom_${Date.now()}`,
      name: newItemName,
      category: newItemCategory,
      subCategory: "Custom Garment",
      clothType: newItemFabric,
      wardrobeType: newItemOccasion,
      color: newItemColor,
      colorHex: 0x334155,
      brand: newItemBrand,
      currentPrice: parseInt(newItemPrice) || 1499,
      productUrl: `https://www.myntra.com/${newItemCategory.toLowerCase()}?rawQuery=${encodeURIComponent(newItemName)}`,
      garmentImageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80",
      detectedInPhotos: [profile.avatar || "/wardrobe_assets/garments/studio_ananya_shrug.png"],
      detectedLocationNote: "Manually registered into closet inventory",
      fitType: "Tailored Regular Fit",
      description: `High-durability ${newItemFabric} designed for ${newItemOccasion} styling. Verified compatible with existing wardrobe pieces.`,
      conditionScore: parseFloat(newItemCondition),
      conditionLabel: newItemCondition >= 8.5 ? "Pristine" : newItemCondition >= 7 ? "Good Condition" : "Worn Placket",
      wearFrequency: "3-4x / month",
      status: "KEEP",
      statusReason: "Manually inventoried into active rotation.",
      pairingScore: 90,
      currentPairs: ["Black Chinos", "Denim"],
      brandEstimate: newItemBrand,
      retailValueEst: `₹${parseInt(newItemPrice || 1499).toLocaleString('en-IN')}`
    };

    onAddNewItem(created);
    setShowAddModal(false);
    setNewItemName('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Standardized Wardrobe Stats */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              {profile.name}'s Digitized Wardrobe
            </h2>
            <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2.5 py-0.5 rounded-full border border-slate-200">
              {activeItems.length} Verified Garments
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Studio-isolated garment cards with fabric weave, retail links, lifecycle triage, and 1-click 3D Virtual Try-On.
          </p>
        </div>

        {/* Triage Pills & Actions */}
        <div className="flex items-center space-x-2.5 self-start md:self-auto">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-bold">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{keepCount} Keep</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-50 text-amber-800 rounded-xl border border-amber-200 text-xs font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>{replaceCount} Replace</span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1 shadow-sm transition"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>+ Add Item</span>
          </button>
        </div>
      </div>

      {/* Standardized Toolbar: Search, Filters, & View Toggle */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by brand, fabric, color, or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-slate-50/50"
          />
        </div>

        {/* Filter & View Mode Controls */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
          {/* Status Pills */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-bold transition ${
                  selectedStatus === st
                    ? st === 'KEEP' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Grid vs List View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Category Pills Strip */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* STANDARDIZED GRID VIEW - FEATURING ONLY THE GARMENT */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isKeep = item.status === 'KEEP';
            const isReplace = item.status === 'REPLACE';
            const garmentImg = item.garmentImageUrl || item.imageUrl || "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80";
            const priceDisplay = item.currentPrice ? `₹${item.currentPrice.toLocaleString('en-IN')}` : (item.retailValueEst || "₹1,499");
            const brandDisplay = item.brand || item.brandEstimate || "Retail Brand";

            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl border transition-all hover:shadow-xl flex flex-col justify-between overflow-hidden group ${
                  isReplace ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'
                }`}
              >
                {/* 1. GARMENT ONLY IMAGE CONTAINER (Clean Studio Backdrop) */}
                <div className="relative h-60 bg-gradient-to-b from-slate-50 via-white to-slate-100/70 p-4 flex items-center justify-center overflow-hidden border-b border-slate-100">
                  <img
                    src={garmentImg}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-md shadow-sm">
                      {item.category}
                    </span>

                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm ${
                      isKeep ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white animate-pulse'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  {/* Condition Badge Bottom Left */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-slate-800 flex items-center space-x-1.5 text-[11px] border border-slate-200 shadow-sm">
                    <span className="font-bold font-serif text-slate-900">{item.conditionScore}</span>
                    <span className="text-slate-400 text-[10px]">/ 10</span>
                    <span className="text-amber-700 text-[10px] font-semibold">({item.conditionLabel})</span>
                  </div>

                  {/* Brand & Price Tag Bottom Right */}
                  <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-white text-[11px] font-bold shadow-sm">
                    {priceDisplay}
                  </div>
                </div>

                {/* 2. CARD BODY: BRAND, TITLE, PRICE, FABRIC, FIT & DEEP DESCRIPTION */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    
                    {/* Brand Pill & Store Product Page Link */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                        {brandDisplay}
                      </span>

                      {item.productUrl && (
                        <a
                          href={item.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-[11px] font-bold text-slate-800 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 px-2 py-0.5 rounded-lg border border-slate-200 transition"
                          title="Open official retailer product page"
                        >
                          <span>Product Page</span>
                          <ExternalLink className="w-3 h-3 text-rose-600" />
                        </a>
                      )}
                    </div>

                    {/* Garment Title */}
                    <h3 className="font-bold text-sm text-slate-900 leading-snug" title={item.name}>
                      {item.name}
                    </h3>

                    {/* SubCategory, Occasion & Wear Frequency */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                      <span className="text-slate-600 font-medium">{item.wardrobeType || "Smart Casual"}</span>
                      <span className="text-slate-400 font-mono">{item.wearFrequency || "3-4x / month"}</span>
                    </div>

                    {/* Technical Specs: Fabric & Fit Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium border border-slate-200">
                        🧵 {item.clothType}
                      </span>
                      {item.fitType && (
                        <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium border border-slate-200">
                          📐 {item.fitType}
                        </span>
                      )}
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                        🎨 {item.color}
                      </span>
                    </div>

                    {/* Deep Garment Description */}
                    {item.description && (
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 pt-1">
                        {item.description}
                      </p>
                    )}

                    {/* Diagnostic Lifecycle Note */}
                    <p className={`text-[11px] leading-tight p-2.5 rounded-xl ${
                      isReplace ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-slate-50 text-slate-700 border border-slate-100'
                    }`}>
                      <strong>Analysis:</strong> {item.statusReason}
                    </p>
                  </div>

                  {/* 3. CARD FOOTER: VIEW IN PHOTO & 3D TRY ON BUTTONS */}
                  <div className="pt-3 border-t border-slate-100 space-y-2.5">
                    
                    {/* Primary Interactive Row: View Worn in Photo + 3D Try On */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setPreviewPhotoItem(item)}
                        className="w-full px-2.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition border border-slate-200"
                        title="Inspect original photo where you wore this garment"
                      >
                        <Camera className="w-3.5 h-3.5 text-slate-500" />
                        <span>📸 Worn in Photo</span>
                      </button>

                      <button
                        onClick={() => onOpenTryOn && onOpenTryOn(item)}
                        className="w-full px-2.5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/20 transition flex items-center justify-center space-x-1.5"
                        title="Visualize this garment on your 3D digital twin"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>🎽 3D Try On</span>
                      </button>
                    </div>

                    {/* Secondary Triage Status Actions */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => onUpdateItemStatus(item.id, isReplace ? 'KEEP' : 'REPLACE')}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition ${
                            isReplace 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100' 
                              : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                          }`}
                        >
                          {isReplace ? 'Mark as Kept' : 'Mark to Replace'}
                        </button>

                        <button
                          onClick={() => onDeleteItem(item.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                          title="Archive from inventory"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {isReplace ? (
                        <button
                          onClick={onSwitchToRecommendations}
                          className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-rose-600 text-white rounded-lg text-[11px] font-bold shadow-sm hover:from-amber-600 hover:to-rose-700 transition flex items-center space-x-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Upgrade</span>
                        </button>
                      ) : (
                        <button
                          onClick={onSwitchToRecommendations}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition"
                        >
                          Pair Outfits
                        </button>
                      )}
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* STANDARDIZED COMPACT LIST VIEW */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
          {filteredItems.map((item) => {
            const isKeep = item.status === 'KEEP';
            const isReplace = item.status === 'REPLACE';
            const garmentImg = item.garmentImageUrl || item.imageUrl || "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80";
            const priceDisplay = item.currentPrice ? `₹${item.currentPrice.toLocaleString('en-IN')}` : (item.retailValueEst || "₹1,499");
            const brandDisplay = item.brand || item.brandEstimate || "Retail Brand";

            return (
              <div key={item.id} className="p-4 hover:bg-slate-50/80 transition flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                
                {/* Left: Garment Image & Info */}
                <div className="flex items-center space-x-4 min-w-0 flex-1">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={garmentImg}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-[10px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {brandDisplay}
                      </span>
                      <span className="font-serif font-bold text-slate-900">{priceDisplay}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 font-medium">{item.category}</span>
                      {item.productUrl && (
                        <>
                          <span className="text-slate-400">•</span>
                          <a
                            href={item.productUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-0.5 text-[10px] font-bold text-rose-600 hover:underline"
                            title="Open retailer product page"
                          >
                            <span>Product Page</span>
                            <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                          </a>
                        </>
                      )}
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm truncate">{item.name}</h4>
                    <p className="text-[11px] text-slate-500 truncate">
                      🧵 {item.clothType} • 📐 {item.fitType || "Regular Fit"} • {item.wardrobeType}
                    </p>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => setPreviewPhotoItem(item)}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1 border border-slate-200 transition"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Photo</span>
                  </button>

                  <button
                    onClick={() => onOpenTryOn && onOpenTryOn(item)}
                    className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1 shadow-sm transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>3D Try On</span>
                  </button>

                  <button
                    onClick={() => onUpdateItemStatus(item.id, isReplace ? 'KEEP' : 'REPLACE')}
                    className={`px-2 py-1 rounded-lg font-bold text-[10px] border transition ${
                      isReplace ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-amber-50 text-amber-700 border-amber-300'
                    }`}
                  >
                    {item.status}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* MODAL 1: VIEW WORN IN PHOTO MODAL */}
      {previewPhotoItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-rose-100 text-rose-700 rounded-xl">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    Source Photo Verification: {previewPhotoItem.name}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {previewPhotoItem.detectedLocationNote || "Extracted by Computer Vision Landmark Detection"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setPreviewPhotoItem(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Uploaded Photo Display */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 max-h-[460px] flex items-center justify-center">
                <img
                  src={previewPhotoItem.detectedInPhotos[0] || previewPhotoItem.garmentImageUrl}
                  alt={previewPhotoItem.name}
                  className="max-h-[440px] w-auto object-contain"
                />
                
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs border border-white/20">
                  <span className="text-amber-400 font-bold block">Detected Garment:</span>
                  <span>{previewPhotoItem.name} ({previewPhotoItem.color})</span>
                </div>
              </div>

              {/* Garment Verification Bar */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">Garment Classification Verified</span>
                  <span className="text-slate-600">
                    Fabric: <strong>{previewPhotoItem.clothType}</strong> • Condition: <strong>{previewPhotoItem.conditionScore}/10</strong> ({previewPhotoItem.conditionLabel})
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const item = previewPhotoItem;
                      setPreviewPhotoItem(null);
                      if (onOpenTryOn) onOpenTryOn(item);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold shadow-md flex items-center space-x-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Try on 3D Body</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: ADD NEW GARMENT INVENTORY MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 font-serif">Add Garment to Closet</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Garment Name</label>
                <input
                  type="text"
                  placeholder="e.g. Crisp White Linen Overshirt"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Brand</label>
                  <input
                    type="text"
                    value={newItemBrand}
                    onChange={(e) => setNewItemBrand(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Estimated Retail (₹)</label>
                  <input
                    type="number"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Color / Tone</label>
                  <input
                    type="text"
                    value={newItemColor}
                    onChange={(e) => setNewItemColor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Fabric / Weave</label>
                <input
                  type="text"
                  value={newItemFabric}
                  onChange={(e) => setNewItemFabric(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-md"
                >
                  Save Garment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
