import React, { useState } from 'react';
import Header from './components/Header';
import ProfileSelector from './components/ProfileSelector';
import WardrobeAuditor from './components/WardrobeAuditor';
import DecisionFatigueReducer from './components/DecisionFatigueReducer';
import BrandSizingMatrix from './components/BrandSizingMatrix';
import InstaTrendCloner from './components/InstaTrendCloner';
import CartDrawer from './components/CartDrawer';
import PhotoScanModal from './components/PhotoScanModal';
import { wardrobeDatabase } from './data/wardrobeDatabase';
import { Sparkles, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeProfileId, setActiveProfileId] = useState('user_aditya');
  const [activeTab, setActiveTab] = useState('wardrobe');
  const [cartItems, setCartItems] = useState([
    {
      id: "init_item",
      title: "Breathable Sand Beige Textured Overshirt",
      brand: "Snitch",
      price: 1499,
      selectedSize: "Size L (Snitch)",
      imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80"
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const currentProfile = wardrobeDatabase.profiles.find(p => p.id === activeProfileId) || wardrobeDatabase.profiles[0];

  const handleAddToCart = (product, selectedSize) => {
    setCartItems(prev => [
      ...prev,
      {
        ...product,
        selectedSize: selectedSize || product.predictedSize
      }
    ]);
    showToast(`Added ${product.title || product.name} to cart with size ${selectedSize || product.predictedSize}!`);
    setIsCartOpen(true);
  };

  const handleAddBundleToCart = (trend) => {
    const itemsToAdd = trend.bundleItems.map((item, idx) => ({
      id: `${trend.id}_${idx}`,
      title: item.name,
      brand: item.brand,
      price: item.price,
      selectedSize: "Pre-Mapped Sizing",
      imageUrl: trend.heroImage
    }));

    setCartItems(prev => [...prev, ...itemsToAdd]);
    showToast(`Cloned Look: Added all 3 bundle pieces for ${trend.title} to cart with 15% discount!`);
    setIsCartOpen(true);
  };

  const handleAddArtefactToCart = (artefact) => {
    setCartItems(prev => [
      ...prev,
      {
        id: `art_${Date.now()}`,
        title: artefact.name,
        brand: artefact.brand,
        price: artefact.price,
        selectedSize: "Standard / Free Size",
        imageUrl: artefact.imageUrl
      }
    ]);
    showToast(`Paired artefact ${artefact.name} added to cart!`);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(prev => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-between text-slate-900 selection:bg-rose-100 selection:text-rose-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-slate-700 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        activeProfile={currentProfile}
        onOpenScanModal={() => setIsScanModalOpen(true)}
      />

      {/* Main App Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full">
        
        {/* Profile Switcher (Aditya vs Ananya) */}
        <ProfileSelector
          profiles={wardrobeDatabase.profiles}
          activeProfileId={activeProfileId}
          onSelectProfile={(id) => {
            setActiveProfileId(id);
            showToast(`Switched active profile to ${wardrobeDatabase.profiles.find(p => p.id === id).name}`);
          }}
        />

        {/* Tab 1: Wardrobe Auditor */}
        {activeTab === 'wardrobe' && (
          <WardrobeAuditor
            profile={currentProfile}
            onSwitchToRecommendations={() => setActiveTab('recommendations')}
          />
        )}

        {/* Tab 2: Decision Fatigue Reducer & Logical "Why Buy" */}
        {activeTab === 'recommendations' && (
          <DecisionFatigueReducer
            profile={currentProfile}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* Tab 3: Instagram Influencer Look Replicator */}
        {activeTab === 'trends' && (
          <InstaTrendCloner
            trends={wardrobeDatabase.instagramTrends}
            currentGender={currentProfile.gender}
            onAddBundleToCart={handleAddBundleToCart}
          />
        )}

        {/* Tab 4: Brand Sizing Frameworks */}
        {activeTab === 'sizing' && (
          <BrandSizingMatrix
            profile={currentProfile}
          />
        )}

      </main>

      {/* Cart Drawer with Automated Pairing Engine */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onAddArtefactToCart={handleAddArtefactToCart}
        profile={currentProfile}
      />

      {/* Computer Vision Scan Modal */}
      <PhotoScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onFinishScan={() => {
          setIsScanModalOpen(false);
          showToast("Computer vision re-calibration complete! Wardrobe health refreshed.");
        }}
      />

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-serif font-bold text-slate-800 text-sm">AuraWardrobe.ai</span>
            <span>•</span>
            <span>Next-Gen Fashion Commerce OS for India</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Direct Myntra, Flipkart, Amazon & D2C Integration</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">Zero Sizing Returns Guarantee</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
