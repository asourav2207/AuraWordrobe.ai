import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Sparkles, 
  RotateCw, 
  ShoppingBag, 
  CheckCircle2, 
  Layers, 
  Eye, 
  ShieldCheck, 
  Maximize2,
  Compass,
  Flame,
  Info,
  Ruler,
  HeartPulse,
  Activity,
  Play,
  Pause,
  ExternalLink,
  Camera,
  User,
  Sliders,
  Check,
  Smartphone,
  Share2,
  QrCode,
  Image as ImageIcon
} from 'lucide-react';

export default function ThreeDBodyTryOn({ 
  profile, 
  activeTryOnItem, 
  onAddToCart, 
  onAddBundleToCart 
}) {
  const mountRef = useRef(null);
  const isMale = profile.gender === 'male';

  // Interactive UI State
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [viewAngle, setViewAngle] = useState('front'); // 'front' | 'angle' | 'side' | 'back'
  const [activePose, setActivePose] = useState('shrug'); // 'shrug' | 'runway' | 'peace'
  const [showAntlers, setShowAntlers] = useState(true);
  const [showGlasses, setShowGlasses] = useState(true);
  const [showReferenceComparison, setShowReferenceComparison] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState('outerwear'); // 'outerwear' | 'innerwear' | 'bottoms' | 'shoes'

  // Current Equipped Outfit State (Defaults to the iconic Snapchat reference look!)
  const [equippedOutfit, setEquippedOutfit] = useState({
    outerwear: {
      id: 'snapchat_denim_jacket',
      name: 'Levi\'s Original Denim Trucker Jacket',
      brand: 'Levi\'s',
      color: '#416788',
      type: 'denim_jacket',
      price: 3499,
      isOwned: false,
      store: 'Levi\'s India',
      link: 'https://www.levi.in/men/clothing/jackets/original-trucker-jacket/723340134.html',
      thumbnail: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&auto=format&fit=crop&q=80'
    },
    innerwear: {
      id: 'snapchat_rugby_polo',
      name: 'Snitch Rugby Stripe Long-Sleeve Polo',
      brand: 'Snitch',
      color: '#2A364F',
      type: 'rugby_polo',
      price: 1299,
      isOwned: false,
      store: 'Snitch',
      link: 'https://www.snitch.co.in/collections/polo-t-shirts',
      thumbnail: '/wardrobe_assets/garments/studio_navy_polo.png'
    },
    bottoms: {
      id: 'snapchat_pleated_khaki',
      name: 'Zara Pleated Wide-Leg Trousers (Beige)',
      brand: 'Zara Man',
      color: '#C2B69D',
      type: 'pleated_chinos',
      price: 2990,
      isOwned: false,
      store: 'Zara',
      link: 'https://www.zara.com/in/en/pleated-wide-leg-trousers-p07545400.html',
      thumbnail: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&auto=format&fit=crop&q=80'
    },
    shoes: {
      id: 'snapchat_chunky_sneakers',
      name: 'Puma RS-X Chunky Lug Running Sneakers',
      brand: 'Puma',
      color: '#E5E7EB',
      type: 'chunky_sneakers',
      price: 4499,
      isOwned: false,
      store: 'Puma India',
      link: 'https://in.puma.com/in/en/pd/rs-x-efekt-sneakers/390776',
      thumbnail: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=300&auto=format&fit=crop&q=80'
    }
  });

  // Handle passed-in active try-on item from wardrobe cards
  useEffect(() => {
    if (!activeTryOnItem) return;

    if (activeTryOnItem.category === 'Tops' || activeTryOnItem.category === 'Ethnic & Festive') {
      let type = 'polo';
      if (activeTryOnItem.name.toLowerCase().includes('kurta')) type = 'kurta';
      else if (activeTryOnItem.name.toLowerCase().includes('check')) type = 'check_shirt';
      else if (activeTryOnItem.name.toLowerCase().includes('camo')) type = 'camo_polo';

      setEquippedOutfit(prev => ({
        ...prev,
        innerwear: {
          id: activeTryOnItem.id,
          name: activeTryOnItem.name,
          brand: activeTryOnItem.brand || 'Owned In Closet',
          color: activeTryOnItem.colorHex || '#1C2E4A',
          type: type,
          price: 0,
          isOwned: true,
          store: 'Closet',
          link: activeTryOnItem.productUrl,
          thumbnail: activeTryOnItem.garmentImageUrl
        }
      }));
    } else if (activeTryOnItem.category === 'Bottoms') {
      let type = 'chinos';
      if (activeTryOnItem.name.toLowerCase().includes('jean')) type = 'jeans';

      setEquippedOutfit(prev => ({
        ...prev,
        bottoms: {
          id: activeTryOnItem.id,
          name: activeTryOnItem.name,
          brand: activeTryOnItem.brand || 'Owned In Closet',
          color: activeTryOnItem.colorHex || '#111827',
          type: type,
          price: 0,
          isOwned: true,
          store: 'Closet',
          link: activeTryOnItem.productUrl,
          thumbnail: activeTryOnItem.garmentImageUrl
        }
      }));
    } else if (activeTryOnItem.category === 'Layering / Outerwear' || activeTryOnItem.category === 'Winterwear / Loungewear') {
      let type = 'shrug';
      if (activeTryOnItem.name.toLowerCase().includes('floral')) type = 'floral_cardigan';
      else if (activeTryOnItem.name.toLowerCase().includes('fleece')) type = 'fleece';

      setEquippedOutfit(prev => ({
        ...prev,
        outerwear: {
          id: activeTryOnItem.id,
          name: activeTryOnItem.name,
          brand: activeTryOnItem.brand || 'Owned In Closet',
          color: activeTryOnItem.colorHex || '#BE6B7B',
          type: type,
          price: 0,
          isOwned: true,
          store: 'Closet',
          link: activeTryOnItem.productUrl,
          thumbnail: activeTryOnItem.garmentImageUrl
        }
      }));
    }
  }, [activeTryOnItem]);

  // Catalog of Equippable Items: Outerwear, Tops, Bottoms, Footwear
  const outfitCatalog = {
    outerwear: [
      {
        id: 'snapchat_denim_jacket',
        name: 'Levi\'s Original Denim Trucker Jacket',
        brand: 'Levi\'s',
        color: '#416788',
        type: 'denim_jacket',
        price: 3499,
        isOwned: false,
        store: 'Levi\'s India',
        link: 'https://www.levi.in/men/clothing/jackets/original-trucker-jacket/723340134.html',
        thumbnail: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&auto=format&fit=crop&q=80',
        badge: 'Snapchat Reference Item'
      },
      {
        id: 'ananya_rose_shrug',
        name: 'Dusty Rose Embroidered Longline Shrug',
        brand: 'Biba',
        color: '#BE6B7B',
        type: 'shrug',
        price: 1899,
        isOwned: !isMale,
        store: 'Myntra',
        link: 'https://www.myntra.com/shrugs/biba/biba-women-dusty-rose-embroidered-open-front-longline-shrug/21045980/buy',
        thumbnail: '/wardrobe_assets/garments/studio_ananya_shrug.png',
        badge: isMale ? 'Suggestion' : 'In Ananya\'s Closet'
      },
      {
        id: 'ananya_floral_cardigan',
        name: 'Black Kashmiri Resham Embroidered Cardigan',
        brand: 'Jaypore',
        color: '#18181B',
        type: 'floral_cardigan',
        price: 2499,
        isOwned: !isMale,
        store: 'Jaypore',
        link: 'https://www.jaypore.com/black-embroidered-short-cardigan-jacket-s782910',
        thumbnail: '/wardrobe_assets/garments/studio_ananya_floral.png',
        badge: isMale ? 'Suggestion' : 'In Ananya\'s Closet'
      },
      {
        id: 'ananya_sherpa_fleece',
        name: 'Slate Blue Boucle Sherpa Quarter-Zip Fleece',
        brand: 'Uniqlo',
        color: '#5B7288',
        type: 'fleece',
        price: 1999,
        isOwned: !isMale,
        store: 'Uniqlo India',
        link: 'https://www.uniqlo.com/in/en/products/E450320-000',
        thumbnail: '/wardrobe_assets/garments/studio_ananya_fleece.png',
        badge: isMale ? 'Suggestion' : 'In Ananya\'s Closet'
      },
      {
        id: 'snitch_sand_overshirt',
        name: 'Snitch Sand Beige Relaxed Overshirt',
        brand: 'Snitch',
        color: '#CBBFA8',
        type: 'overshirt',
        price: 1499,
        isOwned: false,
        store: 'Snitch',
        link: 'https://www.snitch.co.in/collections/overshirts',
        thumbnail: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&auto=format&fit=crop&q=80',
        badge: 'Recommended Gap-Filler'
      }
    ],

    innerwear: [
      {
        id: 'snapchat_rugby_polo',
        name: 'Snitch Rugby Stripe Long-Sleeve Polo',
        brand: 'Snitch',
        color: '#2A364F',
        type: 'rugby_polo',
        price: 1299,
        isOwned: false,
        store: 'Snitch',
        link: 'https://www.snitch.co.in/collections/polo-t-shirts',
        thumbnail: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300&auto=format&fit=crop&q=80',
        badge: 'Snapchat Reference Item'
      },
      {
        id: 'aditya_navy_polo',
        name: 'Aditya\'s Navy Pique Polo with Grey Collar',
        brand: 'Owned (Snitch)',
        color: '#1C2E4A',
        type: 'navy_polo',
        price: 0,
        isOwned: isMale,
        store: 'Closet',
        link: 'https://www.snitch.co.in/products/navy-pique-tipping-polo',
        thumbnail: '/wardrobe_assets/garments/studio_navy_polo.png',
        badge: isMale ? 'In Aditya\'s Closet (Photo #3)' : 'Suggestion'
      },
      {
        id: 'aditya_pink_check',
        name: 'Aditya\'s Pink & Cobalt Buffalo Check Shirt',
        brand: 'Owned (US Polo)',
        color: '#D85C77',
        type: 'check_shirt',
        price: 0,
        isOwned: isMale,
        store: 'Closet',
        link: 'https://www.myntra.com/shirts/us-polo-assn/us-polo-men-pink-blue-check-casual-shirt/19482014/buy',
        thumbnail: '/wardrobe_assets/garments/studio_pink_check.png',
        badge: isMale ? 'In Aditya\'s Closet (Photo #2)' : 'Suggestion'
      },
      {
        id: 'aditya_indigo_kurta',
        name: 'Aditya\'s Deep Indigo Slub Linen Short Kurta',
        brand: 'Owned (FabIndia)',
        color: '#1B2A4A',
        type: 'kurta',
        price: 0,
        isOwned: isMale,
        store: 'Closet',
        link: 'https://www.fabindia.com/indigo-cotton-linen-short-kurta-10712349',
        thumbnail: '/wardrobe_assets/garments/studio_indigo_kurta.png',
        badge: isMale ? 'In Aditya\'s Closet (Photo #6)' : 'Suggestion'
      },
      {
        id: 'ananya_graphic_tee',
        name: 'Ananya\'s Typography Graphic Tee',
        brand: 'Owned (Zara)',
        color: '#F4F4F5',
        type: 'graphic_tee',
        price: 0,
        isOwned: !isMale,
        store: 'Closet',
        link: 'https://www.zara.com/in/en/printed-t-shirt-p01165001.html',
        thumbnail: '/wardrobe_assets/garments/studio_ananya_tshirt.png',
        badge: isMale ? 'Suggestion' : 'In Ananya\'s Closet (Photo #2)'
      }
    ],

    bottoms: [
      {
        id: 'snapchat_pleated_khaki',
        name: 'Zara Pleated Wide-Leg Trousers (Beige)',
        brand: 'Zara Man',
        color: '#C2B69D',
        type: 'pleated_chinos',
        price: 2990,
        isOwned: false,
        store: 'Zara',
        link: 'https://www.zara.com/in/en/pleated-wide-leg-trousers-p07545400.html',
        thumbnail: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&auto=format&fit=crop&q=80',
        badge: 'Snapchat Reference Item'
      },
      {
        id: 'aditya_black_chinos',
        name: 'Aditya\'s Jet Black Slim Tapered Chinos',
        brand: 'Owned (Snitch)',
        color: '#18181B',
        type: 'black_chinos',
        price: 0,
        isOwned: isMale,
        store: 'Closet',
        link: 'https://www.snitch.co.in/products/jet-black-stretch-chinos',
        thumbnail: '/wardrobe_assets/garments/studio_black_chinos.png',
        badge: isMale ? 'In Aditya\'s Closet (Photo #6)' : 'Suggestion'
      },
      {
        id: 'aditya_blue_jeans',
        name: 'Aditya\'s Distressed Medium-Wash Blue Denim',
        brand: 'Owned (Levi\'s)',
        color: '#4B6B94',
        type: 'blue_jeans',
        price: 0,
        isOwned: isMale,
        store: 'Closet',
        link: 'https://www.levi.in/men/clothing/jeans/511-slim-fit-jeans/045115291.html',
        thumbnail: '/wardrobe_assets/garments/studio_blue_jeans.png',
        badge: isMale ? 'In Aditya\'s Closet (Photo #4)' : 'Suggestion'
      },
      {
        id: 'ananya_black_pants',
        name: 'Ananya\'s High-Rise Cigarette Black Pants',
        brand: 'Owned (Mango)',
        color: '#18181B',
        type: 'black_pants',
        price: 0,
        isOwned: !isMale,
        store: 'Closet',
        link: 'https://shop.mango.com/in/women/trousers/high-waist-straight-trousers_57080277.html',
        thumbnail: '/wardrobe_assets/garments/studio_ananya_pants.png',
        badge: isMale ? 'Suggestion' : 'In Ananya\'s Closet (Photo #2)'
      }
    ],

    shoes: [
      {
        id: 'snapchat_chunky_sneakers',
        name: 'Puma RS-X Chunky Lug Running Sneakers',
        brand: 'Puma',
        color: '#E5E7EB',
        type: 'chunky_sneakers',
        price: 4499,
        isOwned: false,
        store: 'Puma India',
        link: 'https://in.puma.com/in/en/pd/rs-x-efekt-sneakers/390776',
        thumbnail: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=300&auto=format&fit=crop&q=80',
        badge: 'Snapchat Reference Item'
      },
      {
        id: 'tan_mojaris',
        name: 'Handcrafted Tan Leather Mojari Mules',
        brand: 'Mochi / Metro',
        color: '#8A583A',
        type: 'mojaris',
        price: 1499,
        isOwned: false,
        store: 'Metro',
        link: 'https://www.mochishoes.com/tan-traditional-mojaris',
        thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&auto=format&fit=crop&q=80',
        badge: 'Recommended Ethnic Pair'
      },
      {
        id: 'white_court_sneakers',
        name: 'Stan Smith Minimalist White Leather Sneakers',
        brand: 'Adidas Originals',
        color: '#FFFFFF',
        type: 'white_sneakers',
        price: 3999,
        isOwned: false,
        store: 'Myntra',
        link: 'https://www.myntra.com/sneakers/adidas-originals/stan-smith/buy',
        thumbnail: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&auto=format&fit=crop&q=80',
        badge: 'Clean Everyday Staple'
      }
    ]
  };

  // Three.js Scene Setup (Bitmoji Stylized Character in Cozy Room)
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 620;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF5EFE6); // Soft warm ambient tone

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.9, 3.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lights setup (Soft studio lighting with sunlight streaming from window)
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.2);
    scene.add(ambientLight);

    // Warm Sunbeam Light (Right window)
    const sunLight = new THREE.DirectionalLight(0xfff1d6, 1.8);
    sunLight.position.set(3, 4, 2);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);

    // Fill Light (Soft cool left fill)
    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.8);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    // Rim light from behind
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // 3. Room Environment (Snapchat Shiplap Wall, Window & Plant Shelf!)
    const roomGroup = new THREE.Group();

    // Procedural Vertical Wood Plank Texture for back wall
    const wallCanvas = document.createElement('canvas');
    wallCanvas.width = 512;
    wallCanvas.height = 512;
    const wCtx = wallCanvas.getContext('2d');
    wCtx.fillStyle = '#F8F6F0';
    wCtx.fillRect(0, 0, 512, 512);
    // Draw subtle vertical shiplap plank seams
    wCtx.strokeStyle = '#E5DFD3';
    wCtx.lineWidth = 3;
    for (let x = 0; x <= 512; x += 64) {
      wCtx.beginPath();
      wCtx.moveTo(x, 0);
      wCtx.lineTo(x, 512);
      wCtx.stroke();
    }
    const wallTexture = new THREE.CanvasTexture(wallCanvas);
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(4, 2);

    const backWallGeo = new THREE.PlaneGeometry(8, 6);
    const backWallMat = new THREE.MeshStandardMaterial({ map: wallTexture, roughness: 0.9 });
    const backWall = new THREE.Mesh(backWallGeo, backWallMat);
    backWall.position.set(0, 1.2, -1.8);
    backWall.receiveShadow = true;
    roomGroup.add(backWall);

    // Warm Wooden Floor
    const floorGeo = new THREE.PlaneGeometry(8, 8);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0xE8DFD5, roughness: 0.8 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.1;
    floor.receiveShadow = true;
    roomGroup.add(floor);

    // Right-side White French Window Frame
    const windowFrameGeo = new THREE.BoxGeometry(1.4, 1.9, 0.08);
    const windowFrameMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.3 });
    const windowFrame = new THREE.Mesh(windowFrameGeo, windowFrameMat);
    windowFrame.position.set(1.5, 1.2, -1.74);
    roomGroup.add(windowFrame);

    // Window Glass Pane with outdoor sky & garden foliage
    const glassCanvas = document.createElement('canvas');
    glassCanvas.width = 256;
    glassCanvas.height = 256;
    const gCtx = glassCanvas.getContext('2d');
    const grad = gCtx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#BAE6FD'); // sky blue
    grad.addColorStop(0.6, '#E0F2FE');
    grad.addColorStop(1, '#86EFAC'); // garden greens
    gCtx.fillStyle = grad;
    gCtx.fillRect(0, 0, 256, 256);
    // Tree leaves silhouette
    gCtx.fillStyle = '#22C55E';
    gCtx.beginPath();
    gCtx.arc(180, 200, 70, 0, Math.PI * 2);
    gCtx.arc(100, 230, 80, 0, Math.PI * 2);
    gCtx.fill();

    const glassTex = new THREE.CanvasTexture(glassCanvas);
    const glassGeo = new THREE.PlaneGeometry(1.26, 1.76);
    const glassMat = new THREE.MeshBasicMaterial({ map: glassTex });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.set(1.5, 1.2, -1.7);
    roomGroup.add(glass);

    // Window Muntins (cross bars)
    const muntinH = new THREE.Mesh(new THREE.BoxGeometry(1.26, 0.04, 0.02), windowFrameMat);
    muntinH.position.set(1.5, 1.2, -1.68);
    roomGroup.add(muntinH);
    const muntinV = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.76, 0.02), windowFrameMat);
    muntinV.position.set(1.5, 1.2, -1.68);
    roomGroup.add(muntinV);

    // Left-side Floating Display Shelf with Potted Plants
    const shelfGeo = new THREE.BoxGeometry(1.1, 0.04, 0.28);
    const shelfMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.4 });
    const shelf = new THREE.Mesh(shelfGeo, shelfMat);
    shelf.position.set(-1.45, 1.3, -1.6);
    shelf.castShadow = true;
    shelf.receiveShadow = true;
    roomGroup.add(shelf);

    // Potted Succulent 1
    const pot1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.12, 16), new THREE.MeshStandardMaterial({ color: 0xC27A56 }));
    pot1.position.set(-1.7, 1.4, -1.58);
    pot1.castShadow = true;
    roomGroup.add(pot1);
    const plant1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.09), new THREE.MeshStandardMaterial({ color: 0x4ADE80, roughness: 0.5 }));
    plant1.position.set(-1.7, 1.5, -1.58);
    roomGroup.add(plant1);

    // Potted Cactus 2
    const pot2 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.1, 16), new THREE.MeshStandardMaterial({ color: 0x1E3A8A }));
    pot2.position.set(-1.25, 1.39, -1.58);
    pot2.castShadow = true;
    roomGroup.add(pot2);
    const cactus = new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.1, 4, 8), new THREE.MeshStandardMaterial({ color: 0x15803D, roughness: 0.6 }));
    cactus.position.set(-1.25, 1.48, -1.58);
    roomGroup.add(cactus);

    // Framed Picture on Shelf
    const frameGeo = new THREE.BoxGeometry(0.16, 0.2, 0.02);
    const frame = new THREE.Mesh(frameGeo, new THREE.MeshStandardMaterial({ color: 0x334155 }));
    frame.position.set(-1.48, 1.44, -1.6);
    frame.rotation.y = 0.2;
    roomGroup.add(frame);

    scene.add(roomGroup);

    // 4. Stylized Bitmoji Humanoid Character Hierarchy
    const avatarGroup = new THREE.Group();
    avatarGroup.position.set(0, 0, 0);

    // Skin Material (Warm Wheatish Indian tone, soft subsurface feel)
    const skinColor = isMale ? 0xE8BA99 : 0xEDC4A8;
    const skinMat = new THREE.MeshStandardMaterial({
      color: skinColor,
      roughness: 0.65,
      metalness: 0.05
    });

    // A. Head & Stylized Face
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.95, 0);

    // Bitmoji Proportioned Head (Cute rounded cranial geometry)
    const headGeo = new THREE.SphereGeometry(0.24, 32, 32);
    headGeo.scale(1, 1.15, 0.95);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Cute Stylized Eyes
    const createEye = (x) => {
      const eyeGroup = new THREE.Group();
      eyeGroup.position.set(x, 0.04, 0.21);

      // Sclera (White)
      const whiteGeo = new THREE.SphereGeometry(0.045, 16, 16);
      whiteGeo.scale(1.2, 1, 0.4);
      const whiteMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
      const white = new THREE.Mesh(whiteGeo, whiteMat);
      eyeGroup.add(white);

      // Iris (Warm expressive brown)
      const irisGeo = new THREE.CircleGeometry(0.028, 16);
      const irisMat = new THREE.MeshBasicMaterial({ color: 0x452311 });
      const iris = new THREE.Mesh(irisGeo, irisMat);
      iris.position.set(0, 0, 0.018);
      eyeGroup.add(iris);

      // Pupil (Deep black)
      const pupilGeo = new THREE.CircleGeometry(0.016, 16);
      const pupilMat = new THREE.MeshBasicMaterial({ color: 0x0A0A0A });
      const pupil = new THREE.Mesh(pupilGeo, pupilMat);
      pupil.position.set(0, 0, 0.02);
      eyeGroup.add(pupil);

      // Catchlight Sparkle (Anime shine)
      const shineGeo = new THREE.CircleGeometry(0.007, 8);
      const shineMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
      const shine = new THREE.Mesh(shineGeo, shineMat);
      shine.position.set(0.008, 0.008, 0.022);
      eyeGroup.add(shine);

      return eyeGroup;
    };

    const leftEye = createEye(-0.08);
    const rightEye = createEye(0.08);
    headGroup.add(leftEye);
    headGroup.add(rightEye);

    // Eyebrows
    const browMat = new THREE.MeshBasicMaterial({ color: 0x382215 });
    const browGeo = new THREE.CapsuleGeometry(0.012, 0.05, 4, 8);
    const leftBrow = new THREE.Mesh(browGeo, browMat);
    leftBrow.rotation.z = Math.PI / 2.2;
    leftBrow.position.set(-0.08, 0.12, 0.21);
    headGroup.add(leftBrow);

    const rightBrow = new THREE.Mesh(browGeo, browMat);
    rightBrow.rotation.z = -Math.PI / 2.2;
    rightBrow.position.set(0.08, 0.12, 0.21);
    headGroup.add(rightBrow);

    // Cute Nose
    const noseGeo = new THREE.ConeGeometry(0.025, 0.04, 16);
    noseGeo.rotateX(Math.PI / 2);
    const nose = new THREE.Mesh(noseGeo, skinMat);
    nose.position.set(0, -0.02, 0.23);
    headGroup.add(nose);

    // Friendly Smile
    const mouthCanvas = document.createElement('canvas');
    mouthCanvas.width = 64;
    mouthCanvas.height = 64;
    const mCtx = mouthCanvas.getContext('2d');
    mCtx.strokeStyle = '#8E4338';
    mCtx.lineWidth = 4;
    mCtx.lineCap = 'round';
    mCtx.beginPath();
    mCtx.arc(32, 24, 18, 0.2 * Math.PI, 0.8 * Math.PI);
    mCtx.stroke();
    const mouthTex = new THREE.CanvasTexture(mouthCanvas);
    const mouthGeo = new THREE.PlaneGeometry(0.08, 0.08);
    const mouthMat = new THREE.MeshBasicMaterial({ map: mouthTex, transparent: true });
    const mouth = new THREE.Mesh(mouthGeo, mouthMat);
    mouth.position.set(0, -0.1, 0.215);
    headGroup.add(mouth);

    // Stylized Hair (Textured Brown Hair with Parting & Fringe)
    const hairColor = isMale ? 0x4A2E1B : 0x2A1810;
    const hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.85 });

    const hairCapGeo = new THREE.SphereGeometry(0.25, 24, 24);
    hairCapGeo.scale(1.02, 1.1, 1.05);
    const hairCap = new THREE.Mesh(hairCapGeo, hairMat);
    hairCap.position.set(0, 0.05, -0.02);
    headGroup.add(hairCap);

    // Hair Fringe Front Locks (Middle parted bangs like in reference)
    const fringeGeo1 = new THREE.ConeGeometry(0.07, 0.16, 12);
    fringeGeo1.rotateZ(0.5);
    const fringe1 = new THREE.Mesh(fringeGeo1, hairMat);
    fringe1.position.set(-0.11, 0.16, 0.19);
    headGroup.add(fringe1);

    const fringeGeo2 = new THREE.ConeGeometry(0.07, 0.16, 12);
    fringeGeo2.rotateZ(-0.5);
    const fringe2 = new THREE.Mesh(fringeGeo2, hairMat);
    fringe2.position.set(0.11, 0.16, 0.19);
    headGroup.add(fringe2);

    // Clear Rectangular Acetate Hipster Glasses (Signature Aditya & Reference look!)
    const glassesGroup = new THREE.Group();
    glassesGroup.position.set(0, 0.04, 0.22);
    const glassFrameMat = new THREE.MeshStandardMaterial({ 
      color: 0xFFFFFF, 
      roughness: 0.2, 
      transparent: true, 
      opacity: 0.75 
    });
    // Left rim
    const rimLeft = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.008, 8, 16), glassFrameMat);
    rimLeft.position.set(-0.08, 0, 0);
    rimLeft.scale.set(1.15, 0.9, 1);
    glassesGroup.add(rimLeft);
    // Right rim
    const rimRight = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.008, 8, 16), glassFrameMat);
    rimRight.position.set(0.08, 0, 0);
    rimRight.scale.set(1.15, 0.9, 1);
    glassesGroup.add(rimRight);
    // Bridge
    const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.06), glassFrameMat);
    bridge.rotation.z = Math.PI / 2;
    bridge.position.set(0, 0.01, 0);
    glassesGroup.add(bridge);
    glassesGroup.visible = showGlasses;
    headGroup.add(glassesGroup);

    // Festive Reindeer Antlers (As seen in the Snapchat reference photo!)
    const antlerGroup = new THREE.Group();
    antlerGroup.position.set(0, 0.26, 0.02);
    const antlerMat = new THREE.MeshStandardMaterial({ color: 0xE8D5B5, roughness: 0.6 });
    // Left antler
    const leftHorn = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.22, 12), antlerMat);
    leftHorn.rotation.z = 0.45;
    leftHorn.position.set(-0.13, 0.08, 0);
    const leftBranch = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.12, 12), antlerMat);
    leftBranch.rotation.z = -0.5;
    leftBranch.position.set(-0.15, 0.13, 0.02);
    antlerGroup.add(leftHorn);
    antlerGroup.add(leftBranch);
    // Right antler
    const rightHorn = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.22, 12), antlerMat);
    rightHorn.rotation.z = -0.45;
    rightHorn.position.set(0.13, 0.08, 0);
    const rightBranch = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.12, 12), antlerMat);
    rightBranch.rotation.z = 0.5;
    rightBranch.position.set(0.15, 0.13, 0.02);
    antlerGroup.add(rightHorn);
    antlerGroup.add(rightBranch);
    // Pine needle leaves & berries cluster at base
    const pineMat = new THREE.MeshStandardMaterial({ color: 0x1E5B3A });
    const berryMat = new THREE.MeshStandardMaterial({ color: 0xDC2626 });
    const leafL = new THREE.Mesh(new THREE.SphereGeometry(0.035), pineMat);
    leafL.position.set(-0.09, 0.01, 0.06);
    const leafR = new THREE.Mesh(new THREE.SphereGeometry(0.035), pineMat);
    leafR.position.set(0.09, 0.01, 0.06);
    const berry1 = new THREE.Mesh(new THREE.SphereGeometry(0.015), berryMat);
    berry1.position.set(-0.09, 0.04, 0.08);
    const berry2 = new THREE.Mesh(new THREE.SphereGeometry(0.015), berryMat);
    berry2.position.set(0.09, 0.04, 0.08);
    antlerGroup.add(leafL);
    antlerGroup.add(leafR);
    antlerGroup.add(berry1);
    antlerGroup.add(berry2);
    antlerGroup.visible = showAntlers;
    headGroup.add(antlerGroup);

    avatarGroup.add(headGroup);

    // B. Torso & Layered Apparel Meshes
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, 0.45, 0);

    // Dynamic Procedural Canvas Textures for Garments:
    // 1. Striped Rugby Polo Texture (Navy, Burgundy & White horizontal stripes)
    const rugbyCanvas = document.createElement('canvas');
    rugbyCanvas.width = 256;
    rugbyCanvas.height = 256;
    const rCtx = rugbyCanvas.getContext('2d');
    const stripeColors = ['#1E293B', '#7F1D1D', '#F8FAFC', '#1E293B', '#7F1D1D', '#F8FAFC'];
    for (let i = 0; i < stripeColors.length; i++) {
      rCtx.fillStyle = stripeColors[i];
      rCtx.fillRect(0, i * 42, 256, 42);
    }
    const rugbyTexture = new THREE.CanvasTexture(rugbyCanvas);

    // 2. Denim Trucker Jacket Texture (Denim weave with chest pocket seams & buttons)
    const denimCanvas = document.createElement('canvas');
    denimCanvas.width = 256;
    denimCanvas.height = 256;
    const dCtx = denimCanvas.getContext('2d');
    dCtx.fillStyle = '#3B6B92'; // classic medium blue denim
    dCtx.fillRect(0, 0, 256, 256);
    // Denim twill texture lines
    dCtx.strokeStyle = '#2D5676';
    dCtx.lineWidth = 1;
    for (let i = 0; i < 256; i += 4) {
      dCtx.beginPath();
      dCtx.moveTo(0, i);
      dCtx.lineTo(256, i + 10);
      dCtx.stroke();
    }
    // Front vertical placket seams
    dCtx.strokeStyle = '#FCD34D'; // gold contrast stitching
    dCtx.lineWidth = 2;
    dCtx.strokeRect(100, 20, 56, 220);
    // Twin chest pocket flaps
    dCtx.fillStyle = '#315C7E';
    dCtx.fillRect(25, 45, 65, 55);
    dCtx.strokeRect(25, 45, 65, 55);
    dCtx.fillRect(166, 45, 65, 55);
    dCtx.strokeRect(166, 45, 65, 55);
    // White logo tag on left pocket flap (just like in the reference!)
    dCtx.fillStyle = '#FFFFFF';
    dCtx.fillRect(80, 50, 10, 16);
    // Brass buttons
    dCtx.fillStyle = '#D97706';
    dCtx.beginPath();
    dCtx.arc(128, 60, 5, 0, Math.PI * 2);
    dCtx.arc(128, 110, 5, 0, Math.PI * 2);
    dCtx.arc(128, 160, 5, 0, Math.PI * 2);
    dCtx.arc(128, 210, 5, 0, Math.PI * 2);
    dCtx.fill();
    const denimTexture = new THREE.CanvasTexture(denimCanvas);

    // 3. Pink Buffalo Check Shirt Texture
    const checkCanvas = document.createElement('canvas');
    checkCanvas.width = 256;
    checkCanvas.height = 256;
    const chCtx = checkCanvas.getContext('2d');
    chCtx.fillStyle = '#E11D48';
    chCtx.fillRect(0, 0, 256, 256);
    chCtx.fillStyle = '#1E3A8A';
    for (let x = 0; x < 256; x += 64) {
      for (let y = 0; y < 256; y += 64) {
        chCtx.fillRect(x, y, 32, 32);
        chCtx.fillRect(x + 32, y + 32, 32, 32);
      }
    }
    const checkTexture = new THREE.CanvasTexture(checkCanvas);

    // Innerwear Mesh (The shirt underneath)
    let innerMaterial = new THREE.MeshStandardMaterial({ roughness: 0.7 });
    if (equippedOutfit.innerwear.type === 'rugby_polo') {
      innerMaterial.map = rugbyTexture;
    } else if (equippedOutfit.innerwear.type === 'check_shirt') {
      innerMaterial.map = checkTexture;
    } else {
      innerMaterial.color = new THREE.Color(equippedOutfit.innerwear.color || '#1C2E4A');
    }

    const innerTorsoGeo = new THREE.CylinderGeometry(0.24, 0.22, 0.52, 24);
    const innerTorso = new THREE.Mesh(innerTorsoGeo, innerMaterial);
    innerTorso.castShadow = true;
    torsoGroup.add(innerTorso);

    // Crisp White Polo Turn-Down Collar (As in reference!)
    const collarMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.3 });
    const collarLeft = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.04, 0.1), collarMat);
    collarLeft.position.set(-0.07, 0.25, 0.14);
    collarLeft.rotation.set(-0.2, 0.3, -0.2);
    torsoGroup.add(collarLeft);

    const collarRight = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.04, 0.1), collarMat);
    collarRight.position.set(0.07, 0.25, 0.14);
    collarRight.rotation.set(-0.2, -0.3, 0.2);
    torsoGroup.add(collarRight);

    // Outerwear Layer Mesh (e.g. Denim Jacket or Shrug or Overshirt)
    let outerMaterial = new THREE.MeshStandardMaterial({ roughness: 0.8 });
    if (equippedOutfit.outerwear.type === 'denim_jacket') {
      outerMaterial.map = denimTexture;
    } else {
      outerMaterial.color = new THREE.Color(equippedOutfit.outerwear.color || '#416788');
    }

    const outerJacketGeo = new THREE.CylinderGeometry(0.265, 0.245, 0.54, 24);
    const outerJacket = new THREE.Mesh(outerJacketGeo, outerMaterial);
    outerJacket.castShadow = true;
    torsoGroup.add(outerJacket);

    // Arms & Hands in the Iconic Snapchat Shrug Pose!
    const armMat = outerMaterial; // arms wear jacket sleeves
    const sleeveGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.32, 16);
    const forearmGeo = new THREE.CylinderGeometry(0.07, 0.065, 0.32, 16);
    const handGeo = new THREE.SphereGeometry(0.055, 16, 16);
    handGeo.scale(1.2, 0.6, 1.2);

    // Left Arm Hierarchy
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.28, 0.2, 0);

    const leftUpperArm = new THREE.Mesh(sleeveGeo, armMat);
    leftUpperArm.position.set(-0.08, -0.12, 0);
    leftUpperArm.rotation.z = activePose === 'shrug' ? 0.6 : 0.2;
    leftArmGroup.add(leftUpperArm);

    const leftForearmGroup = new THREE.Group();
    leftForearmGroup.position.set(-0.16, -0.24, 0);
    const leftForearm = new THREE.Mesh(forearmGeo, armMat);
    leftForearm.position.set(-0.08, 0.08, 0.1);
    leftForearm.rotation.set(-0.6, 0.4, -0.8);
    leftForearmGroup.add(leftForearm);

    // Hand open upwards (palm up)
    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.set(-0.18, 0.18, 0.22);
    leftForearmGroup.add(leftHand);

    leftArmGroup.add(leftForearmGroup);
    torsoGroup.add(leftArmGroup);

    // Right Arm Hierarchy (Mirror Shrug)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.28, 0.2, 0);

    const rightUpperArm = new THREE.Mesh(sleeveGeo, armMat);
    rightUpperArm.position.set(0.08, -0.12, 0);
    rightUpperArm.rotation.z = activePose === 'shrug' ? -0.6 : -0.2;
    rightArmGroup.add(rightUpperArm);

    const rightForearmGroup = new THREE.Group();
    rightForearmGroup.position.set(0.16, -0.24, 0);
    const rightForearm = new THREE.Mesh(forearmGeo, armMat);
    rightForearm.position.set(0.08, 0.08, 0.1);
    rightForearm.rotation.set(-0.6, -0.4, 0.8);
    rightForearmGroup.add(rightForearm);

    // Hand open upwards (palm up)
    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHand.position.set(0.18, 0.18, 0.22);
    rightForearmGroup.add(rightHand);

    rightArmGroup.add(rightForearmGroup);
    torsoGroup.add(rightArmGroup);

    avatarGroup.add(torsoGroup);

    // C. Legs & Pleated Wide-Leg Trousers (Matching Reference Beige Wide-Leg Cut!)
    const legsGroup = new THREE.Group();
    legsGroup.position.set(0, 0, 0);

    const pantMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(equippedOutfit.bottoms.color || '#C2B69D'),
      roughness: 0.8
    });

    // High-waisted pelvis band
    const pelvis = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.2, 24), pantMat);
    pelvis.position.set(0, 0.15, 0);
    legsGroup.add(pelvis);

    // Wide-Leg Cut (Straight/loose drape with bottom cuffs)
    const legGeo = new THREE.CylinderGeometry(0.115, 0.13, 0.85, 20);
    const leftLeg = new THREE.Mesh(legGeo, pantMat);
    leftLeg.position.set(-0.13, -0.35, 0);
    leftLeg.castShadow = true;
    legsGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, pantMat);
    rightLeg.position.set(0.13, -0.35, 0);
    rightLeg.castShadow = true;
    legsGroup.add(rightLeg);

    avatarGroup.add(legsGroup);

    // D. Chunky Lug Running Sneakers (Exact Match to Reference!)
    const shoesGroup = new THREE.Group();
    shoesGroup.position.set(0, -0.82, 0);

    const sneakerWhiteMat = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.4 });
    const sneakerSoleMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.8 }); // Black jagged tread
    const sneakerAccentMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, roughness: 0.5 }); // Grey accent

    const createChunkySneaker = (x) => {
      const sGroup = new THREE.Group();
      sGroup.position.set(x, 0, 0.04);

      // Upper main body
      const upper = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.12, 0.26), sneakerWhiteMat);
      upper.position.set(0, 0.06, 0.03);
      sGroup.add(upper);

      // Curved Toe cap
      const toe = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), sneakerAccentMat);
      toe.scale.set(1, 0.7, 1.4);
      toe.position.set(0, 0.05, 0.14);
      sGroup.add(toe);

      // Chunky White Midsole
      const midsole = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.05, 0.3), sneakerWhiteMat);
      midsole.position.set(0, 0.01, 0.03);
      sGroup.add(midsole);

      // Black Jagged Running Tread Lug Sole (As seen in reference!)
      const tread = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.04, 0.31), sneakerSoleMat);
      tread.position.set(0, -0.02, 0.03);
      tread.castShadow = true;
      sGroup.add(tread);

      return sGroup;
    };

    shoesGroup.add(createChunkySneaker(-0.13));
    shoesGroup.add(createChunkySneaker(0.13));
    avatarGroup.add(shoesGroup);

    // Shadow blob on floor beneath shoes
    const shadowGeo = new THREE.CircleGeometry(0.42, 32);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.22 });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(0, -0.86, 0.05);
    avatarGroup.add(shadow);

    scene.add(avatarGroup);

    // 5. Interactive Mouse/Touch Orbital Controls
    let isDragging = false;
    let prevMouseX = 0;
    let targetRotationY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const deltaX = clientX - prevMouseX;
      prevMouseX = clientX;
      targetRotationY += deltaX * 0.01;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const canvasElem = renderer.domElement;
    canvasElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    canvasElem.addEventListener('touchstart', onMouseDown, { passive: true });
    window.addEventListener('touchmove', onMouseMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // 6. Camera Snap Angle logic
    if (viewAngle === 'front') targetRotationY = 0;
    else if (viewAngle === 'angle') targetRotationY = 0.55;
    else if (viewAngle === 'side') targetRotationY = Math.PI / 2;
    else if (viewAngle === 'back') targetRotationY = Math.PI;

    // 7. Animation Loop with Gentle Bitmoji Breathing Sway
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Rotation Damping
      if (isAutoRotating) {
        targetRotationY += 0.01;
      }
      avatarGroup.rotation.y += (targetRotationY - avatarGroup.rotation.y) * 0.1;

      // Gentle subtle breathing sway (animates chest and head softly)
      const breath = Math.sin(elapsedTime * 2.5) * 0.008;
      torsoGroup.position.y = 0.45 + breath;
      headGroup.position.y = 0.95 + breath * 1.2;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 550;
      const newH = container.clientHeight || 620;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvasElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvasElem.removeEventListener('touchstart', onMouseDown);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [equippedOutfit, viewAngle, isAutoRotating, activePose, showAntlers, showGlasses, isMale]);

  // Calculate Outfit Bundle Financials
  const totalOutfitPrice = 
    (equippedOutfit.outerwear.price || 0) +
    (equippedOutfit.innerwear.price || 0) +
    (equippedOutfit.bottoms.price || 0) +
    (equippedOutfit.shoes.price || 0);

  const ownedItemsValue = 
    (equippedOutfit.outerwear.isOwned ? 2499 : 0) +
    (equippedOutfit.innerwear.isOwned ? 1899 : 0) +
    (equippedOutfit.bottoms.isOwned ? 2199 : 0) +
    (equippedOutfit.shoes.isOwned ? 1999 : 0);

  const discountedBundlePrice = Math.round(totalOutfitPrice * 0.85);

  const handleEquipItem = (categoryKey, item) => {
    setEquippedOutfit(prev => ({
      ...prev,
      [categoryKey]: item
    }));
  };

  const handleStageComplete3DOutfit = () => {
    const unownedItems = Object.values(equippedOutfit).filter(i => !i.isOwned && i.price > 0);
    if (!unownedItems.length) {
      alert("All items in this 3D look are already owned in your wardrobe! ₹0 spend required.");
      return;
    }

    const bundleRecord = {
      id: `3d_look_${Date.now()}`,
      title: `Snapchat Virtual Try-On Outfit (${profile.name})`,
      bundleItems: unownedItems.map(item => ({
        name: item.name,
        brand: item.brand,
        price: item.price,
        store: item.store,
        link: item.link,
        imageUrl: item.thumbnail
      })),
      bundleTotal: totalOutfitPrice,
      bundleDiscountPrice: discountedBundlePrice,
      bundleSavings: `₹${(totalOutfitPrice - discountedBundlePrice).toLocaleString('en-IN')} (15% Bundle Discount)`
    };

    onAddBundleToCart(bundleRecord);
  };

  return (
    <div className="space-y-6">

      {/* Top Banner: Snapchat Virtual Try-On Studio Header */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-3xl p-6 text-slate-900 shadow-lg border border-amber-400 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/10 text-slate-900 border border-black/10 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Snapchat 3D Bitmoji Virtual Try-On Studio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
            Aesthetic 3D Bitmoji Avatar Try-On
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 mt-1 max-w-2xl leading-relaxed">
            Replicated from your Snapchat virtual try-on character! Realistic 3D character in cozy shiplap room, layered denim jacket, rugby stripe polo, wide-leg pleated trousers, and chunky running sneakers.
          </p>
        </div>

        {/* Action Toggles: Reference Comparison & Snapcode */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowReferenceComparison(!showReferenceComparison)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-sm ${
              showReferenceComparison 
                ? 'bg-slate-900 text-white' 
                : 'bg-white/80 hover:bg-white text-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-rose-600" />
            <span>{showReferenceComparison ? 'Hide Pinterest Ref' : 'Compare with Ref'}</span>
          </button>

          <div className="px-3 py-2 bg-white/90 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm text-slate-900">
            <Smartphone className="w-4 h-4 text-amber-700" />
            <span>Snapchat Bitmoji 3D</span>
          </div>
        </div>
      </div>

      {/* Reference Comparison Drawer (If toggled) */}
      {showReferenceComparison && (
        <div className="p-5 bg-white rounded-3xl border-2 border-amber-400 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
              📌 Target Pinterest / Snapchat Reference Character:
            </span>
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 max-h-72 flex items-center justify-center">
              <img
                src="/wardrobe_assets/snapchat_ref.jpg"
                alt="Target Snapchat Bitmoji Try-On Reference"
                className="max-h-72 object-contain"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Note the light wood room, window with sunlight, floating shelf with plants, stylized glasses, reindeer antlers, shrug pose, denim jacket, striped rugby polo, pleated beige pants & chunky lug sneakers.
            </p>
          </div>

          <div className="space-y-3 flex flex-col justify-center">
            <h4 className="text-base font-bold text-slate-900 font-serif">
              How We Matched the Snapchat Character:
            </h4>
            <ul className="text-xs space-y-2 text-slate-700">
              <li className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Layered Outfits:</strong> Denim trucker jacket draped over a dark striped rugby polo with turn-down collar.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Pleated Khaki Trousers:</strong> High-waisted wide-leg cut with clean front pleats and cuffs.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Chunky Lug Sole Sneakers:</strong> Thick midsole with black jagged running tread.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Accessories:</strong> Modern clear acetate hipster glasses and festive reindeer antlers with pine leaves!</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>3D Room Environment:</strong> Shiplap plank back wall, sunlit French window, and potted plants shelf.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Main Studio Grid: 3D Viewport on Left, Wardrobe Customizer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: 3D THREE.JS SNAPCHAT STUDIO (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            
            {/* Top Snapchat Card Header Bar */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              
              {/* Profile Pill */}
              <div className="pointer-events-auto flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-md">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-900 font-bold text-xs flex items-center justify-center">
                  👻
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">
                    {profile.name} 🪐 &lt;/3 ✪
                  </span>
                  <span className="text-[10px] text-slate-500">
                    @{profile.gender === 'male' ? 'aditya_sourav' : 'ananya_fashion'}
                  </span>
                </div>
              </div>

              {/* View Angles & Auto-spin controls */}
              <div className="pointer-events-auto flex items-center space-x-1.5 bg-white/90 backdrop-blur-md p-1 rounded-2xl border border-slate-200 shadow-md text-xs">
                <button
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  className={`p-1.5 rounded-xl font-bold transition flex items-center space-x-1 ${
                    isAutoRotating ? 'bg-amber-500 text-slate-900' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  title="Toggle 360° Auto Spin"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} />
                  <span className="text-[11px] hidden sm:inline">{isAutoRotating ? 'Spinning' : '360°'}</span>
                </button>

                <div className="h-4 w-px bg-slate-200"></div>

                <button
                  onClick={() => setViewAngle('front')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition ${
                    viewAngle === 'front' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Front
                </button>
                <button
                  onClick={() => setViewAngle('angle')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition ${
                    viewAngle === 'angle' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  3/4
                </button>
                <button
                  onClick={() => setViewAngle('side')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition ${
                    viewAngle === 'side' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Side
                </button>
                <button
                  onClick={() => setViewAngle('back')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition ${
                    viewAngle === 'back' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Back
                </button>
              </div>

            </div>

            {/* Three.js 3D Canvas Mount */}
            <div 
              ref={mountRef} 
              className="w-full h-[520px] sm:h-[580px] cursor-grab active:cursor-grabbing bg-gradient-to-b from-[#F9F7F2] to-[#ECE5DC]"
            />

            {/* Bottom Floating Accessory Toggles & Snapchat Badge */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-2 pointer-events-none">
              
              {/* Accessories Toggles: Antlers, Glasses, Pose */}
              <div className="pointer-events-auto flex items-center space-x-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-lg text-xs">
                <button
                  onClick={() => setShowGlasses(!showGlasses)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition flex items-center space-x-1 ${
                    showGlasses ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <span>👓 Glasses</span>
                </button>

                <button
                  onClick={() => setShowAntlers(!showAntlers)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition flex items-center space-x-1 ${
                    showAntlers ? 'bg-amber-500 text-slate-900' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <span>🦌 Antlers</span>
                </button>

                <button
                  onClick={() => setActivePose(activePose === 'shrug' ? 'runway' : 'shrug')}
                  className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                >
                  <span>{activePose === 'shrug' ? '🤷‍♂️ Shrug Pose' : '🧍‍♂️ Model Pose'}</span>
                </button>
              </div>

              {/* Snapchat Snapcode Badge (Like in the reference!) */}
              <div className="pointer-events-auto flex items-center space-x-2 bg-yellow-400 text-slate-950 px-3 py-1.5 rounded-2xl shadow-lg border border-yellow-500 font-bold text-xs">
                <div className="w-5 h-5 bg-black rounded-lg flex items-center justify-center text-yellow-400 text-[10px]">
                  👻
                </div>
                <span>Add on Snapchat</span>
                <QrCode className="w-4 h-4 text-slate-900" />
              </div>

            </div>

          </div>

          {/* Orbit Instruction Pill */}
          <div className="text-center text-xs text-slate-500 flex items-center justify-center space-x-2">
            <Compass className="w-3.5 h-3.5 text-amber-600 animate-spin" />
            <span>Click & drag horizontally on the character to rotate 360° and inspect fabric fit</span>
          </div>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE WARDROBE TRY-ON CUSTOMIZER (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-md space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-serif font-bold text-slate-900">
                  Equip Garments to 3D Avatar
                </h3>
                <p className="text-xs text-slate-500">
                  Select items below to instantly dress your 3D Bitmoji
                </p>
              </div>

              <span className="text-[10px] font-bold uppercase bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full border border-purple-200">
                Live Dynamic Sync
              </span>
            </div>

            {/* Category Selector Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-2xl">
              <button
                onClick={() => setActiveCategoryTab('outerwear')}
                className={`py-2 text-xs font-bold rounded-xl transition ${
                  activeCategoryTab === 'outerwear' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🧥 Jacket
              </button>
              <button
                onClick={() => setActiveCategoryTab('innerwear')}
                className={`py-2 text-xs font-bold rounded-xl transition ${
                  activeCategoryTab === 'innerwear' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                👕 Tops
              </button>
              <button
                onClick={() => setActiveCategoryTab('bottoms')}
                className={`py-2 text-xs font-bold rounded-xl transition ${
                  activeCategoryTab === 'bottoms' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                👖 Pants
              </button>
              <button
                onClick={() => setActiveCategoryTab('shoes')}
                className={`py-2 text-xs font-bold rounded-xl transition ${
                  activeCategoryTab === 'shoes' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                👟 Shoes
              </button>
            </div>

            {/* Currently Equipped Item Summary for Active Tab */}
            <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <div 
                  className="w-4 h-4 rounded-full border border-black/20 shadow-xs"
                  style={{ backgroundColor: equippedOutfit[activeCategoryTab].color }}
                />
                <div>
                  <span className="font-bold text-slate-900 block truncate max-w-[200px]">
                    Equipped: {equippedOutfit[activeCategoryTab].name}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {equippedOutfit[activeCategoryTab].brand} • {equippedOutfit[activeCategoryTab].isOwned ? 'Owned in Closet (₹0)' : `₹${equippedOutfit[activeCategoryTab].price.toLocaleString('en-IN')}`}
                  </span>
                </div>
              </div>

              {equippedOutfit[activeCategoryTab].link && (
                <a
                  href={equippedOutfit[activeCategoryTab].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-rose-600 p-1.5 rounded-lg hover:bg-white transition"
                  title="View Product Page"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Garment Selection Cards for Current Category */}
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {outfitCatalog[activeCategoryTab].map((item) => {
                const isEquipped = equippedOutfit[activeCategoryTab].id === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => handleEquipItem(activeCategoryTab, item)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isEquipped 
                        ? 'border-amber-500 bg-amber-50/40 shadow-sm ring-1 ring-amber-400' 
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                        <img 
                          src={item.thumbnail} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-xs text-slate-900 leading-tight">
                            {item.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5">
                          <span>{item.brand}</span>
                          <span>•</span>
                          <span className={item.isOwned ? 'text-emerald-700 font-bold' : 'text-slate-900 font-serif font-semibold'}>
                            {item.isOwned ? 'In Closet (₹0)' : `₹${item.price.toLocaleString('en-IN')}`}
                          </span>
                        </div>
                        {item.badge && (
                          <span className={`inline-block text-[9px] font-bold px-1.5 py-0.2 rounded mt-1 ${
                            item.badge.includes('Snapchat') ? 'bg-yellow-100 text-yellow-900' :
                            item.badge.includes('Closet') ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 ml-2">
                      <button
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                          isEquipped 
                            ? 'bg-amber-500 text-slate-950 shadow-sm' 
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isEquipped ? 'Equipped ✓' : 'Wear 🎽'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Look Financials & 1-Click Cart Addition */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Total Visualized Outfit Value:</span>
                <span className="font-serif font-bold text-slate-900">₹{totalOutfitPrice.toLocaleString('en-IN')}</span>
              </div>

              {ownedItemsValue > 0 && (
                <div className="flex items-center justify-between text-xs text-emerald-700 font-medium">
                  <span>Reused from Your Closet (₹0 Spend):</span>
                  <span>-₹{ownedItemsValue.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Net Missing Items Bundle
                  </span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-xl font-bold font-serif text-amber-400">
                      ₹{discountedBundlePrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs line-through text-slate-500">
                      ₹{totalOutfitPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold block">
                    Includes 15% Multi-Item Bundle Discount
                  </span>
                </div>

                <button
                  onClick={handleStageComplete3DOutfit}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center space-x-1.5"
                >
                  <ShoppingBag className="w-4 h-4 text-slate-950" />
                  <span>Stage Look to Cart</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
