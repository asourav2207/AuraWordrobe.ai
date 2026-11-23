import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  Minus,
  ShieldCheck, 
  CheckCircle,
  ExternalLink,
  Users,
  Tag,
  Truck,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveItem, 
  onUpdateQuantity,
  onUpdateSize,
  onAddArtefactToCart,
  profile 
}) {
  const [couponApplied, setCouponApplied] = useState(true);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + ((item.price || 0) * (item.quantity || 1)), 0);
  const bundleDiscount = couponApplied && cartItems.length >= 1 ? Math.round(subtotal * 0.15) : 0;
  const deliveryFee = 0; // Free for AuraWardrobe verified orders
  const finalTotal = subtotal - bundleDiscount + deliveryFee;

  // Dynamic context-aware artifact matching based on cart content
  const hasEthnic = cartItems.some(item => (item.title || item.name || '').toLowerCase().includes('kurta') || (item.category || '').toLowerCase().includes('ethnic'));
  const hasFemaleGarment = profile.gender === 'female' || cartItems.some(item => (item.title || '').toLowerCase().includes('shrug') || (item.title || '').toLowerCase().includes('palazzo'));

  const pairingArtefacts = [
    {
      id: "art_kolhapuri",
      name: "Handcrafted Tan Leather Mojari Mules",
      brand: "Metro / FabIndia",
      price: 1499,
      category: "Footwear",
      matchReason: hasEthnic ? "Perfect traditional pairing with in-cart Kurta." : "Refined smart-casual ethnic footwear.",
      imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: "art_jhumkas",
      name: "Bohemian Oxidized Silver Mirror Jhumka Hoops",
      brand: "Zaveri Pearls",
      price: 599,
      category: "Jewellery",
      matchReason: hasFemaleGarment ? "Color harmonizes with floral embroidery & ecru palazzos." : "Traditional metallic touch.",
      imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: "art_watch",
      name: "Vintage Minimalist Brass Dial Leather Watch",
      brand: "Titan / Fossil",
      price: 2499,
      category: "Accessories",
      matchReason: "Anchor accessory for polo shirts & linen overshirts.",
      imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&auto=format&fit=crop&q=80"
    }
  ];

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      // Keep state open to show success
    }, 500);
  };

  const handleResetCheckout = () => {
    setOrderPlaced(false);
    setShowCheckoutModal(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Your Wardrobe Cart</h3>
                <span className="text-xs text-slate-500">{cartItems.length} curated pieces for {profile.name}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content Scrollable */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {cartItems.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">Your cart is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Add strategic wardrobe additions or clone an Instagram trending look to see live size pre-selection and matching artefacts.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item, idx) => {
                  const qty = item.quantity || 1;

                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col space-y-2 text-xs"
                    >
                      <div className="flex items-start space-x-3">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.title || item.name}
                            className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-slate-900 truncate">{item.title || item.name}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Brand: <strong>{item.brand}</strong>
                          </div>
                          
                          {/* Size Selection */}
                          <div className="flex items-center space-x-1.5 mt-1">
                            <span className="text-[11px] text-slate-500">Size:</span>
                            <span className="font-bold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded text-[11px]">
                              {item.selectedSize || item.predictedSize || 'Pre-Mapped'}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity & Price Row */}
                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                        <div className="flex items-center space-x-2 bg-white px-2 py-1 rounded-lg border border-slate-200">
                          <button
                            onClick={() => onUpdateQuantity && onUpdateQuantity(idx, Math.max(1, qty - 1))}
                            className="p-0.5 text-slate-500 hover:text-slate-900"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-slate-900 px-1">{qty}</span>
                          <button
                            onClick={() => onUpdateQuantity && onUpdateQuantity(idx, qty + 1)}
                            className="p-0.5 text-slate-500 hover:text-slate-900"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="font-bold text-slate-900 text-sm">
                          ₹{((item.price || 0) * qty).toLocaleString('en-IN')}
                        </div>
                      </div>

                    </div>
                  );
                })}

                {/* Auto Coupon Card */}
                <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs flex items-center justify-between text-rose-900">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-rose-600 shrink-0" />
                    <div>
                      <span className="font-bold block">AURAWARDROBE15 (15% OFF)</span>
                      <span className="text-[10px] text-rose-700">Multi-item wardrobe synergy applied</span>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                    APPLIED
                  </span>
                </div>

                {/* Peer Proof Banner in Cart */}
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center space-x-2">
                  <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>91% peer approval:</strong> Verified shoppers in {profile.city.split(',')[0]} kept this combination with zero size returns.
                  </span>
                </div>
              </div>
            )}

            {/* AUTOMATED CART PAIRING & ARTEFACT ENGINE */}
            {cartItems.length > 0 && (
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 flex items-center space-x-1.5 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Automated Matching Artefacts</span>
                  </span>
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                    Auto-Matched
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Discovered seamlessly based on in-cart silhouettes without manual keyword searching.
                </p>

                <div className="space-y-2">
                  {pairingArtefacts.map((art) => (
                    <div
                      key={art.id}
                      className="p-3 rounded-2xl bg-amber-50/50 border border-amber-200/80 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={art.imageUrl}
                          alt={art.name}
                          className="w-12 h-12 rounded-xl object-cover border border-amber-200 shrink-0"
                        />
                        <div className="max-w-[170px]">
                          <span className="font-bold text-slate-900 block truncate">{art.name}</span>
                          <span className="text-[10px] text-amber-900 font-medium block">{art.matchReason}</span>
                          <span className="font-bold text-slate-900">₹{art.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onAddArtefactToCart(art)}
                        className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-[11px] flex items-center space-x-1 shadow-sm transition"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Pair</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer Checkout & Pricing */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {bundleDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Bundle Multi-Item Discount (15%):</span>
                    <span>-₹{bundleDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Fit Assurance Sizing:</span>
                  <span className="text-emerald-700 font-semibold">FREE (Pre-Mapped)</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Estimated Total:</span>
                  <span className="font-serif">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => setShowCheckoutModal(true)}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-rose-600 via-amber-600 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-lg shadow-rose-600/25 transition flex items-center justify-center space-x-2"
              >
                <span>Proceed to Unified 1-Click Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero-Return Size Guarantee • Direct Dispatch from Authorized Retailers</span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* UNIFIED CHECKOUT MODAL */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 text-xs">
            {!orderPlaced ? (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-rose-600" />
                    <h3 className="font-bold text-base text-slate-900 font-serif">Unified 1-Click Dispatch</h3>
                  </div>
                  <button onClick={() => setShowCheckoutModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Delivery Address */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-slate-900">
                    <MapPin className="w-3.5 h-3.5 text-rose-600" />
                    <span>Delivery Address</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {profile.name} • Indiranagar 100ft Road, Bengaluru, Karnataka - 560038
                  </p>
                </div>

                {/* Multi-Merchant Split Dispatch */}
                <div className="space-y-2">
                  <span className="font-bold text-slate-700 block uppercase tracking-wider text-[11px]">
                    Optimized Multi-Merchant Dispatch Breakdown:
                  </span>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">Myntra Fast Logistics</span>
                      <span className="text-[11px] text-slate-500">Direct warehouse dispatch • Expected in 2 days</span>
                    </div>
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                      FREE PRIME
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">Amazon Fashion Fulfilled</span>
                      <span className="text-[11px] text-slate-500">Pre-inspected packaging • Delivery Tomorrow Morning</span>
                    </div>
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                      EXPRESS
                    </span>
                  </div>
                </div>

                {/* Zero Return Fit Certificate */}
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>AuraWardrobe Zero-Return Fit Guarantee</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 leading-tight">
                    Every garment in this bundle has been cross-mapped to {profile.name}'s exact chest & waist measurements. If an item doesn't fit flawlessly, return shipping is 100% free with doorstep exchange.
                  </p>
                </div>

                {/* Pricing Summary */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-slate-900">
                  <span>Total Payable:</span>
                  <span className="text-base font-serif text-rose-600">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold shadow-lg transition flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Confirm & Dispatch Unified Order</span>
                </button>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-serif">Order Dispatched Successfully!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Your curated wardrobe bundle (Order <strong>#AURA-BLR-84920</strong>) has been synchronized with Myntra, Amazon & Flipkart with auto-applied sizes for {profile.name}.
                </p>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-600">
                  Tracking updates will be sent via WhatsApp to registered Bengaluru number.
                </div>
                <button
                  onClick={handleResetCheckout}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition"
                >
                  Back to Wardrobe Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
