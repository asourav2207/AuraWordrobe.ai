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
  Check
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
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
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
  const statuses = ['All', 'KEEP', 'REPLACE'];

  // Current active items
  const activeItems = items || profile.items;

  const filteredItems = activeItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.clothType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.color.toLowerCase().includes(searchQuery.toLowerCase());
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
      conditionScore: parseFloat(newItemCondition),
      conditionLabel: newItemCondition >= 8.5 ? "Pristine" : newItemCondition >= 7 ? "Good Condition" : "Worn Placket",
      wearFrequency: "3-4x / month",
      detectedInPhotos: [profile.avatar],
      status: "KEEP",
      statusReason: "Manually inventoried into active rotation.",
      pairingScore: 90,
      currentPairs: ["Black Chinos", "Denim"],
      brandEstimate: "Custom / Retail",
      retailValueEst: "₹1,999"
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
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Deconstructed from your lifestyle photos with fabric, condition scoring, and lifecycle triage.
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
            placeholder="Search by fabric, color, or name..."
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
              className={`p-1 rounded-lg transition ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded-lg transition ${
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

      {/* STANDARDIZED GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const isKeep = item.status === 'KEEP';
            const isReplace = item.status === 'REPLACE';
            const mainPhoto = item.detectedInPhotos[0] || profile.avatar;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl border transition-all hover:shadow-lg flex flex-col justify-between overflow-hidden group ${
                  isReplace ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'
                }`}
              >
                {/* Standardized Image Header with Badges */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={mainPhoto}
                    alt={item.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20">
                      {item.category}
                    </span>

                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm ${
                      isKeep ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white animate-pulse'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  {/* Condition Badge Bottom Left */}
                  <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-xl text-white flex items-center space-x-1.5 text-[11px] border border-white/20">
                    <span className="font-bold font-serif">{item.conditionScore}</span>
                    <span className="text-slate-300 text-[10px]">/ 10</span>
                    <span className="text-amber-300 text-[10px] font-medium">({item.conditionLabel})</span>
                  </div>

                  <button
                    onClick={() => setPreviewPhoto(mainPhoto)}
                    className="absolute bottom-2.5 right-2.5 p-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition"
                    title="Inspect Source Photo"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Standardized Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-bold text-rose-600">{item.wardrobeType}</span>
                      <span className="text-slate-400 font-mono">{item.wearFrequency}</span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 mt-1 truncate" title={item.name}>
                      {item.name}
                    </h3>

                    {/* Standardized Fabric & Color Badges */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {item.clothType}
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        {item.color}
                      </span>
                    </div>

                    {/* Standardized Diagnostic Note */}
                    <p className={`mt-2.5 text-[11px] leading-tight p-2.5 rounded-xl ${
                      isReplace ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-slate-50 text-slate-600 border border-slate-100'
                    }`}>
                      {item.statusReason}
                    </p>
                  </div>

                  {/* Standardized Action Footer */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onUpdateItemStatus(item.id, isReplace ? 'KEEP' : 'REPLACE')}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition ${
                          isReplace 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100' 
                            : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                        }`}
                      >
                        {isReplace ? 'Mark Kept' : 'Mark Replace'}
                      </button>

                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                        title="Archive Item"
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
                        Pair
                      </button>
                    )}
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
            const mainPhoto = item.detectedInPhotos[0] || profile.avatar;

            return (
              <div key={item.id} className="p-3.5 sm:p-4 hover:bg-slate-50/80 transition flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center space-x-3.5 min-w-0">
                  <img
                    src={mainPhoto}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 truncate">{item.name}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        isKeep ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                      {item.category} • {item.clothType} • Condition: <strong className="text-slate-800">{item.conditionScore}/10</strong> ({item.conditionLabel})
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => onUpdateItemStatus(item.id, isReplace ? 'KEEP' : 'REPLACE')}
                    className="px-2 py-1 rounded-lg border text-[10px] font-bold bg-slate-50 text-slate-700 hover:bg-slate-100"
                  >
                    {isReplace ? 'Keep' : 'Replace'}
                  </button>
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

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
                  <label className="font-bold text-slate-700 block mb-1">Color</label>
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
