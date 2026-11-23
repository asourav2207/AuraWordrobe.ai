import React from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  ShieldCheck, 
  CheckCircle,
  ExternalLink,
  Users
} from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveItem, 
  onAddArtefactToCart,
  profile 
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);
  const bundleDiscount = cartItems.length >= 2 ? Math.round(subtotal * 0.10) : 0;
  const finalTotal = subtotal - bundleDiscount;

  // Artifact pairing recommendations based on in-cart items
  const pairingArtefacts = [
    {
      id: "art_1",
      name: "Handcrafted Tan Leather Mojari Mules",
      brand: "Metro / FabIndia",
      price: 1499,
      category: "Footwear",
      matchReason: "Matches Indian ethnic kurtas & rolled chinos in cart.",
      imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: "art_2",
      name: "Bohemian Oxidized Silver Mirror Jhumka Hoops",
      brand: "Zaveri Pearls",
      price: 599,
      category: "Jewellery",
      matchReason: "Harmonizes with floral embroidered jackets & high-waist palazzos.",
      imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: "art_3",
      name: "Vintage Minimalist Brass Dial Leather Watch",
      brand: "Fossil / Titan",
      price: 2499,
      category: "Accessories",
      matchReason: "Anchor accessory for polo shirts & linen overshirts.",
      imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&auto=format&fit=crop&q=80"
    }
  ];

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
                <span className="text-xs text-slate-500">{cartItems.length} items curated for {profile.name}</span>
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
                {cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center space-x-3 text-xs"
                  >
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
                        Brand: <strong>{item.brand}</strong> • Size: <strong className="text-emerald-700">{item.selectedSize || 'Pre-Calculated'}</strong>
                      </div>
                      <div className="font-bold text-slate-900 text-sm mt-1">
                        ₹{item.price?.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Peer Proof Banner in Cart */}
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center space-x-2">
                  <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>91% peer approval:</strong> People of your profile in {profile.city.split(',')[0]} kept this combination with zero size returns.
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
                    <span>Bundle Multi-Item Discount (10%):</span>
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
                onClick={() => alert(`Redirecting to unified checkout for Myntra, Amazon & Flipkart with auto-applied sizing for ${profile.name}!`)}
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
    </div>
  );
}
