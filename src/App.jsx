import React, { useState } from 'react';
import Header from './components/Header';
import ProfileSelector from './components/ProfileSelector';
import WardrobeAuditor from './components/WardrobeAuditor';
import DecisionFatigueReducer from './components/DecisionFatigueReducer';
import BrandSizingMatrix from './components/BrandSizingMatrix';
import InstaTrendCloner from './components/InstaTrendCloner';
import ThreeDBodyTryOn from './components/ThreeDBodyTryOn';
import CartDrawer from './components/CartDrawer';
import PhotoScanModal from './components/PhotoScanModal';
import { wardrobeDatabase } from './data/wardrobeDatabase';
import { Sparkles, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeProfileId, setActiveProfileId] = useState('user_aditya');
  const [activeTab, setActiveTab] = useState('wardrobe');
  
  // Dynamic per-profile wardrobe state so users can add, toggle, and delete items
  const [wardrobeState, setWardrobeState] = useState(() => {
    const initialMap = {};
    wardrobeDatabase.profiles.forEach(p => {
      initialMap[p.id] = [...p.items];
    });
    return initialMap;
  });

  const [cartItems, setCartItems] = useState([
    {
      id: "init_item",
      title: "Breathable Sand Beige Textured Overshirt",
      brand: "Snitch",
      price: 1499,
      quantity: 1,
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
  const currentItems = wardrobeState[activeProfileId] || currentProfile.items;

  // Add to Cart
  const handleAddToCart = (product, selectedSize) => {
    const existingIdx = cartItems.findIndex(i => (i.title === product.title || i.name === product.title));
    if (existingIdx >= 0) {
      setCartItems(prev => {
        const next = [...prev];
        next[existingIdx].quantity = (next[existingIdx].quantity || 1) + 1;
        return next;
      });
      showToast(`Updated quantity for ${product.title || product.name} in cart!`);
    } else {
      setCartItems(prev => [
        ...prev,
        {
          ...product,
          quantity: 1,
          selectedSize: selectedSize || product.predictedSize || "Pre-Mapped Sizing"
        }
      ]);
      showToast(`Added ${product.title || product.name} to cart (${selectedSize || product.predictedSize || 'Pre-Mapped'})!`);
    }
    setIsCartOpen(true);
  };

  // Add Complete Instagram Bundle to Cart
  const handleAddBundleToCart = (trend) => {
    const itemsToAdd = trend.bundleItems.map((item, idx) => ({
      id: `${trend.id}_${idx}_${Date.now()}`,
      title: item.name,
      brand: item.brand,
      price: item.price,
      quantity: 1,
      selectedSize: "Pre-Mapped Sizing",
      imageUrl: trend.heroImage
    }));

    setCartItems(prev => [...prev, ...itemsToAdd]);
    showToast(`Cloned Look: Added all 3 bundle pieces for ${trend.title} to cart with 15% discount!`);
    setIsCartOpen(true);
  };

  // Add Paired Complementary Artefact
  const handleAddArtefactToCart = (artefact) => {
    setCartItems(prev => [
      ...prev,
      {
        id: `art_${Date.now()}`,
        title: artefact.name,
        brand: artefact.brand,
        price: artefact.price,
        quantity: 1,
        selectedSize: "Standard / Free Size",
        imageUrl: artefact.imageUrl
      }
    ]);
    showToast(`Paired artefact ${artefact.name} added to cart!`);
  };

  // Cart Management
  const handleRemoveFromCart = (index) => {
    setCartItems(prev => prev.filter((_, idx) => idx !== index));
    showToast("Item removed from cart");
  };

  const handleUpdateQuantity = (index, newQty) => {
    setCartItems(prev => {
      const next = [...prev];
      next[index].quantity = newQty;
      return next;
    });
  };

  // Wardrobe Management
  const handleUpdateItemStatus = (itemId, newStatus) => {
    setWardrobeState(prev => {
      const currentList = prev[activeProfileId] || [];
      const updatedList = currentList.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            status: newStatus,
            statusReason: newStatus === 'KEEP' 
              ? "Re-verified as active wardrobe rotation staple." 
              : "Marked for replacement due to visible fabric degradation."
          };
        }
        return item;
      });
      return { ...prev, [activeProfileId]: updatedList };
    });
    showToast(`Item status updated to ${newStatus}`);
  };

  const handleDeleteItem = (itemId) => {
    setWardrobeState(prev => {
      const currentList = prev[activeProfileId] || [];
      const updatedList = currentList.filter(item => item.id !== itemId);
      return { ...prev, [activeProfileId]: updatedList };
    });
    showToast("Item retired and archived from closet");
  };

  const handleAddNewItem = (newItem) => {
    setWardrobeState(prev => {
      const currentList = prev[activeProfileId] || [];
      return { ...prev, [activeProfileId]: [newItem, ...currentList] };
    });
    showToast(`Added ${newItem.name} to ${currentProfile.name}'s digitized wardrobe!`);
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

      {/* Main Header with 3D Try-On Tab */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)}
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

        {/* Tab 1: Standardized Wardrobe Auditor */}
        {activeTab === 'wardrobe' && (
          <WardrobeAuditor
            profile={currentProfile}
            items={currentItems}
            onUpdateItemStatus={handleUpdateItemStatus}
            onDeleteItem={handleDeleteItem}
            onAddNewItem={handleAddNewItem}
            onSwitchToRecommendations={() => setActiveTab('recommendations')}
          />
        )}

        {/* Tab 2: 3D Virtual Body & AR Try-On Studio (NEW!) */}
        {activeTab === 'tryon' && (
          <ThreeDBodyTryOn
            profile={currentProfile}
            onAddToCart={handleAddToCart}
            onAddBundleToCart={handleAddBundleToCart}
          />
        )}

        {/* Tab 3: Decision Fatigue Reducer & Logical "Why Buy" */}
        {activeTab === 'recommendations' && (
          <DecisionFatigueReducer
            profile={currentProfile}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* Tab 4: Instagram & YouTube Video Look Replicator with URL Pasting */}
        {activeTab === 'trends' && (
          <InstaTrendCloner
            trends={wardrobeDatabase.instagramTrends}
            currentGender={currentProfile.gender}
            onAddBundleToCart={handleAddBundleToCart}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* Tab 5: Biometric Sizing & Cloth Size Guesser */}
        {activeTab === 'sizing' && (
          <BrandSizingMatrix
            profile={currentProfile}
          />
        )}

      </main>

      {/* Cart Drawer with Dynamic Artefact Pairing Engine & Checkout Modal */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
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
