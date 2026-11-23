import React from 'react';
import { ShoppingBag, Sparkles, Shirt, Camera, Compass, Box, UserCheck, BookOpen, Cloud, ArrowUpRight } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  cartCount, 
  onOpenCart, 
  activeProfile,
  onOpenScanModal 
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('wardrobe')}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-rose-600 via-amber-600 to-amber-500 flex items-center justify-center shadow-md shadow-rose-600/20 text-white font-serif font-bold text-xl">
              A
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-slate-900">
                  AuraWardrobe<span className="text-rose-600">.ai</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full border border-rose-200">
                  India OS
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                3D Virtual Try-On, Biometric Sizing & Anti-Decision Fatigue
              </p>
            </div>
          </div>

          {/* Navigation Tabs (All 7 First-Class Features) */}
          <nav className="hidden xl:flex items-center space-x-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTab('wardrobe')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'wardrobe'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Shirt className="w-4 h-4 text-rose-600" />
              <span>Wardrobe</span>
            </button>

            {/* 3D AR Try-On Studio Tab */}
            <button
              onClick={() => setActiveTab('tryon')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'tryon'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Box className="w-4 h-4 text-purple-600" />
              <span>3D Virtual Try-On</span>
              <span className="text-[9px] bg-purple-600 text-white px-1.5 py-0.5 rounded-full font-extrabold uppercase">
                3D
              </span>
            </button>

            <button
              onClick={() => setActiveTab('recommendations')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'recommendations'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Shop for Me</span>
            </button>

            <button
              onClick={() => setActiveTab('trends')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'trends'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Compass className="w-4 h-4 text-pink-600" />
              <span>Reel Cloner</span>
            </button>

            <button
              onClick={() => setActiveTab('sizing')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'sizing'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Biometric Sizing</span>
            </button>

            {/* Google Photos API Tab */}
            <button
              onClick={() => {
                setActiveTab('wardrobe');
                onOpenScanModal();
              }}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-blue-700 hover:text-blue-900 hover:bg-blue-50/80 transition-all border border-blue-200/50"
              title="Google Photos Ingestion API"
            >
              <Cloud className="w-4 h-4 text-blue-600" />
              <span>Photos API</span>
              <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.5 rounded-full font-bold">
                OAuth
              </span>
            </button>

            {/* Executive Dossier Tab */}
            <button
              onClick={() => setActiveTab('dossier')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'dossier'
                  ? 'bg-amber-100/90 text-amber-950 font-bold border border-amber-300 shadow-sm'
                  : 'text-amber-800 hover:text-amber-950 hover:bg-amber-50/80'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>Executive Dossier</span>
            </button>
          </nav>

          {/* Action CTAs: Google Photos Ingest, Executive Dossier & Cart */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            
            {/* Quick Dossier Button */}
            <button
              onClick={() => setActiveTab('dossier')}
              className={`flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition shadow-sm ${
                activeTab === 'dossier'
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'text-amber-900 bg-amber-50 hover:bg-amber-100 border-amber-300'
              }`}
              title="View In-Depth Executive Dossier"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">Dossier</span>
              <span className="sm:hidden text-[11px]">Docs</span>
            </button>

            {/* Quick Google Photos Sync Button */}
            <button
              onClick={onOpenScanModal}
              className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition shadow-sm"
              title="Sync Google Photos or Upload"
            >
              <Camera className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Google Photos</span>
              <span className="sm:hidden text-[11px]">Photos</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 sm:px-3.5 sm:py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl transition flex items-center space-x-2 border border-rose-200"
            >
              <ShoppingBag className="w-4 h-4 text-rose-600" />
              <span className="hidden sm:inline text-xs font-bold">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 sm:relative sm:top-auto sm:right-auto bg-rose-600 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile & Tablet Navigation bar with ALL tabs */}
        <div className="flex xl:hidden overflow-x-auto space-x-1.5 py-2.5 border-t border-slate-100 no-scrollbar">
          <button
            onClick={() => setActiveTab('wardrobe')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'wardrobe' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Wardrobe
          </button>
          <button
            onClick={() => setActiveTab('tryon')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 transition ${
              activeTab === 'tryon' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700'
            }`}
          >
            <Box className="w-3 h-3" />
            <span>3D Try-On</span>
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'recommendations' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Shop for Me
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'trends' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Reel Cloner
          </button>
          <button
            onClick={() => setActiveTab('sizing')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'sizing' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Sizing
          </button>
          <button
            onClick={() => {
              setActiveTab('wardrobe');
              onOpenScanModal();
            }}
            className="whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 flex items-center space-x-1"
          >
            <Cloud className="w-3 h-3 text-blue-600" />
            <span>Photos Sync</span>
          </button>
          <button
            onClick={() => setActiveTab('dossier')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition ${
              activeTab === 'dossier' 
                ? 'bg-amber-600 text-white' 
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            <span>Executive Dossier</span>
          </button>
        </div>

      </div>
    </header>
  );
}
