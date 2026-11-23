import React, { useState } from 'react';
import { 
  Filter, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  PlusCircle, 
  Trash2, 
  Tag, 
  Eye, 
  Layers, 
  Share2,
  Calendar,
  ShieldAlert,
  Search,
  Plus,
  X,
  RefreshCw,
  Archive
} from 'lucide-react';

export default function WardrobeAuditor({ 
  profile, 
  items, 
  onUpdateItemStatus, 
  onDeleteItem, 
  onAddNewItem, 
  onSwitchToRecommendations 
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New item form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Tops');
  const [newItemFabric, setNewItemFabric] = useState('100% Breathable Cotton');
  const [newItemOccasion, setNewItemOccasion] = useState('Smart Casual');
  const [newItemColor, setNewItemColor] = useState('Beige / Sand');
  const [newItemCondition, setNewItemCondition] = useState(9.0);

  const categories = ['All', 'Tops', 'Bottoms', 'Layering / Outerwear', 'Ethnic & Festive', 'Winterwear / Loungewear'];
  const statuses = ['All', 'KEEP', 'REPLACE', 'ADD'];
  const occasions = ['All', 'Smart Casual / Office', 'Weekend Casual', 'Festive Occasion', 'Evening Social', 'Winterwear / Travel'];

  // Current active items
  const activeItems = items || profile.items;

  const filteredItems = activeItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    const matchesOccasion = selectedOccasion === 'All' || (item.wardrobeType && item.wardrobeType.toLowerCase().includes(selectedOccasion.toLowerCase().split('/')[0].trim()));
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.clothType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.color.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesOccasion && matchesSearch;
  });

  const keepCount = activeItems.filter(i => i.status === 'KEEP').length;
  const replaceCount = activeItems.filter(i => i.status === 'REPLACE').length;
  const addCount = 2; // strategic gaps

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
      conditionScore: parseFloat(newItemCondition),
      conditionLabel: newItemCondition >= 8.5 ? "Pristine / Crisp" : newItemCondition >= 7 ? "Good Condition" : "Moderate Wear",
      wearFrequency: "Regular (3-4 times/month)",
      detectedInPhotos: [profile.avatar],
      status: "KEEP",
      statusReason: "User manually inventoried into active wardrobe rotation.",
      pairingScore: 90,
      currentPairs: ["Black Tapered Chinos", "Denim Jeans"],
      brandEstimate: "Custom / Retail",
      retailValueEst: "₹1,999"
    };

    onAddNewItem(created);
    setShowAddModal(false);
    setNewItemName('');
  };

  return (
    <div className="space-y-6">
      
      {/* Overview Banner & Quick Metrics */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              {profile.name}'s Digitized Wardrobe Audit
            </h2>
            <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-0.5 rounded-full border border-slate-300">
              {activeItems.length} Extracted Garments
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Condition scoring, wear frequency, and lifecycle triage extracted directly from real photo metadata.
          </p>
        </div>

        {/* Quick Triage Counts & Add Garment CTA */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-bold">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{keepCount} Keep</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-50 text-amber-800 rounded-xl border border-amber-200 text-xs font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>{replaceCount} Replace</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 rounded-xl border border-blue-200 text-xs font-bold">
            <PlusCircle className="w-4 h-4 text-blue-600" />
            <span>{addCount} Gaps</span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>+ Add Garment</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        
        {/* Search & Status Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by fabric, color, or garment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status:</span>
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold transition ${
                  selectedStatus === st
                    ? st === 'KEEP' ? 'bg-emerald-600 text-white' : st === 'REPLACE' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 border-t border-slate-100 pt-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Item Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isKeep = item.status === 'KEEP';
          const isReplace = item.status === 'REPLACE';
          const mainPhoto = item.detectedInPhotos[0] || profile.avatar;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl border transition-all hover:shadow-lg flex flex-col overflow-hidden ${
                isReplace ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'
              }`}
            >
              {/* Card Header Image / Detected Context */}
              <div className="relative h-56 bg-slate-100 overflow-hidden group">
                <img
                  src={mainPhoto}
                  alt={item.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay Badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20">
                      {item.category}
                    </span>

                    {/* Status Pill */}
                    <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md ${
                      isKeep 
                        ? 'bg-emerald-500 text-white' 
                        : isReplace 
                          ? 'bg-amber-500 text-white animate-pulse' 
                          : 'bg-blue-600 text-white'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  {/* Condition Metric Pill */}
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <span className="text-[11px] text-slate-300 block">Condition Rating</span>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-lg font-bold font-serif">{item.conditionScore}</span>
                        <span className="text-xs text-slate-300">/ 10</span>
                        <span className="text-[11px] font-medium text-amber-300 ml-1">({item.conditionLabel})</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setPreviewPhoto(mainPhoto)}
                      className="p-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition"
                      title="Inspect Source Photo"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-rose-600">{item.wardrobeType}</span>
                    <span className="font-mono text-slate-400">{item.brandEstimate}</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mt-1 line-clamp-1">
                    {item.name}
                  </h3>

                  {/* Fabric & Color specification */}
                  <div className="mt-2.5 space-y-1 text-xs">
                    <div className="flex items-start space-x-1.5 text-slate-600">
                      <span className="font-semibold text-slate-700 min-w-[70px]">Fabric:</span>
                      <span className="text-slate-600">{item.clothType}</span>
                    </div>
                    <div className="flex items-start space-x-1.5 text-slate-600">
                      <span className="font-semibold text-slate-700 min-w-[70px]">Color:</span>
                      <span className="text-slate-600">{item.color}</span>
                    </div>
                    <div className="flex items-start space-x-1.5 text-slate-600">
                      <span className="font-semibold text-slate-700 min-w-[70px]">Rotation:</span>
                      <span className="text-slate-600">{item.wearFrequency}</span>
                    </div>
                  </div>

                  {/* Logical Audit Reason */}
                  <div className={`mt-3 p-3 rounded-2xl text-xs ${
                    isReplace ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-slate-50 text-slate-700 border border-slate-100'
                  }`}>
                    <div className="flex items-center space-x-1.5 font-bold mb-1">
                      {isReplace ? <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> : <Sparkles className="w-3.5 h-3.5 text-emerald-600" />}
                      <span>{isReplace ? 'Upgrade Recommendation' : 'Wardrobe Utility Note'}</span>
                    </div>
                    <p className="leading-relaxed">{item.statusReason}</p>
                  </div>

                  {/* Current Active Pairings */}
                  <div className="mt-3">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Current In-Closet Pairings:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.currentPairs && item.currentPairs.map((pair, idx) => (
                        <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200">
                          {pair}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer with Functional Status Toggle & Delete */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {/* Toggle Status Button */}
                    <button
                      onClick={() => onUpdateItemStatus(item.id, isReplace ? 'KEEP' : 'REPLACE')}
                      className={`text-[11px] font-bold px-2 py-1 rounded-lg border transition ${
                        isReplace 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100' 
                          : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                      }`}
                      title="Click to toggle Keep / Replace triage"
                    >
                      {isReplace ? 'Mark as Kept' : 'Mark to Replace'}
                    </button>

                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                      title="Retire / Archive item from closet"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {isReplace ? (
                    <button
                      onClick={onSwitchToRecommendations}
                      className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-rose-600 text-white rounded-xl text-xs font-bold shadow-md hover:from-amber-600 hover:to-rose-700 transition flex items-center space-x-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>View Replacements</span>
                    </button>
                  ) : (
                    <button
                      onClick={onSwitchToRecommendations}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center space-x-1"
                    >
                      <span>Find Gaps</span>
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Add Custom Garment */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Add Garment to {profile.name}'s Closet</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Garment Name</label>
                <input
                  type="text"
                  placeholder="e.g. Olive Utility Overshirt"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Layering / Outerwear">Layering</option>
                    <option value="Ethnic & Festive">Ethnic</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Occasion</label>
                  <select
                    value={newItemOccasion}
                    onChange={(e) => setNewItemOccasion(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="Smart Casual / Office">Smart Casual</option>
                    <option value="Weekend Casual">Weekend</option>
                    <option value="Festive Occasion">Festive</option>
                    <option value="Evening Social">Evening</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Fabric & Weave</label>
                <input
                  type="text"
                  placeholder="e.g. Slub Linen / Twill Cotton"
                  value={newItemFabric}
                  onChange={(e) => setNewItemFabric(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Color Palette</label>
                  <input
                    type="text"
                    value={newItemColor}
                    onChange={(e) => setNewItemColor(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Condition Score (1-10)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="10"
                    value={newItemCondition}
                    onChange={(e) => setNewItemCondition(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end space-x-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold shadow-md hover:bg-slate-800"
                >
                  Save to Wardrobe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Photo Inspection */}
      {previewPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewPhoto(null)}
        >
          <div className="relative max-w-2xl max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl p-2 border border-slate-700">
            <img 
              src={previewPhoto} 
              alt="Source Photo Extraction" 
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl" 
            />
            <div className="p-3 text-center text-xs text-slate-300">
              Source Photo Extraction • Click anywhere to dismiss
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
