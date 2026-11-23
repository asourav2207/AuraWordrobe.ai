import React from 'react';
import { ShoppingBag, Sparkles, Shirt, Camera, Compass, Box, UserCheck } from 'lucide-react';

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

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
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
              <span>Why Buy Gaps</span>
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
          </nav>

          {/* Action CTAs: Scan Photo & Cart */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onOpenScanModal}
              className="hidden sm:flex items-center space-x-2 text-xs font-semibold px-3 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition shadow-sm"
              title="Scan Wardrobe Photos"
            >
              <Camera className="w-4 h-4 text-amber-400" />
              <span>Scan Photo</span>
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2.5 sm:px-4 sm:py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl transition flex items-center space-x-2 border border-rose-200"
            >
              <ShoppingBag className="w-5 h-5 text-rose-600" />
              <span className="hidden sm:inline text-xs font-bold">Cart & Pairings</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 sm:relative sm:top-auto sm:right-auto bg-rose-600 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden overflow-x-auto space-x-2 py-2 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('wardrobe')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'wardrobe' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Wardrobe
          </button>
          <button
            onClick={() => setActiveTab('tryon')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 ${
              activeTab === 'tryon' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700'
            }`}
          >
            <Box className="w-3 h-3" />
            <span>3D Try-On</span>
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'recommendations' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Why Buy
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'trends' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Reel Cloner
          </button>
          <button
            onClick={() => setActiveTab('sizing')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'sizing' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Sizing
          </button>
        </div>

      </div>
    </header>
  );
}
