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
  Check
} from 'lucide-react';

export default function ThreeDBodyTryOn({ 
  profile, 
  activeTryOnItem, 
  onAddToCart, 
  onAddBundleToCart 
}) {
  const mountRef = useRef(null);
  const isMale = profile.gender === 'male';

  // Toggle between 3D Orbital Mesh & Photorealistic Neural AR Mirror
  const [activeViewMode, setActiveViewMode] = useState('neural'); // 'neural' | '3d_mesh'
  const [showFitHeatmap, setShowFitHeatmap] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [viewAngle, setViewAngle] = useState('front'); // 'front' | 'angle' | 'side' | 'back'
  const [activeItemBanner, setActiveItemBanner] = useState(null);

  // Helper to safely parse color hex
  const parseHexColor = (col) => {
    if (typeof col === 'number') return col;
    if (typeof col === 'string') {
      const clean = col.replace('#', '').replace('0x', '');
      const parsed = parseInt(clean, 16);
      if (!isNaN(parsed)) return parsed;
    }
    return 0x1C2E4A;
  };

  // Build dynamic Tops options from closet + recommendations
  const dynamicTopOptions = React.useMemo(() => {
    const closetTops = profile.items
      .filter(i => ['Tops', 'Ethnic & Festive', 'Layering / Outerwear', 'Winterwear / Loungewear'].includes(i.category))
      .map(i => ({
        id: i.id,
        name: i.name,
        type: 'In Closet',
        color: parseHexColor(i.colorHex),
        price: 0,
        brand: i.brand || 'Owned',
        size: 'Owned',
        imageUrl: i.garmentImageUrl || '/wardrobe_assets/garments/studio_navy_polo.png',
        fabric: i.clothType
      }));

    const recommendations = isMale ? [
      { 
        id: 'rec_snitch_overshirt', 
        name: 'Snitch Sand Beige Relaxed Overshirt', 
        type: 'Suggestion', 
        color: 0xD8C4B6, 
        price: 1499, 
        brand: 'Snitch', 
        size: 'Size L',
        imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80',
        fabric: '100% Breathable Cotton-Linen (220 GSM)'
      },
      { 
        id: 'rec_rare_rabbit_sage', 
        name: 'Rare Rabbit Sage Slub Linen Shirt', 
        type: 'Suggestion', 
        color: 0x829A84, 
        price: 2199, 
        brand: 'Rare Rabbit', 
        size: 'Size 40/L',
        imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80',
        fabric: 'Pure European Flax Linen (190 GSM)'
      }
    ] : [
      { 
        id: 'rec_supima_white', 
        name: 'Uniqlo Supima Minimalist White Tee', 
        type: 'Suggestion', 
        color: 0xF5F5F0, 
        price: 899, 
        brand: 'Uniqlo', 
        size: 'Size S',
        imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
        fabric: '100% Long-Staple Supima Cotton'
      },
      { 
        id: 'rec_zari_cape', 
        name: 'Gold Zari Festive Silk Organza Cape', 
        type: 'Suggestion', 
        color: 0xD4AF37, 
        price: 2499, 
        brand: 'Biba', 
        size: 'Size S',
        imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
        fabric: 'Silk Organza with Metallic Zari'
      }
    ];

    return [...closetTops, ...recommendations];
  }, [profile, isMale]);

  // Build dynamic Bottoms options
  const dynamicBottomOptions = React.useMemo(() => {
    const closetBottoms = profile.items
      .filter(i => ['Bottoms'].includes(i.category))
      .map(i => ({
        id: i.id,
        name: i.name,
        type: 'In Closet',
        color: parseHexColor(i.colorHex),
        price: 0,
        brand: i.brand || 'Owned',
        size: 'Owned',
        imageUrl: i.garmentImageUrl || '/wardrobe_assets/garments/studio_black_chinos.png',
        fabric: i.clothType
      }));

    const recommendations = isMale ? [
      { 
        id: 'rec_bot_cream_chinos', 
        name: 'Snitch Off-White Pleated Trousers', 
        type: 'Suggestion', 
        color: 0xEAE6DF, 
        price: 1799, 
        brand: 'Snitch', 
        size: '34W',
        imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop&q=80',
        fabric: 'Cotton-Tencel Stretch Twill'
      }
    ] : [
      { 
        id: 'rec_bot_ecru_palazzo', 
        name: 'Mango Pleated Ecru Wide-Leg Palazzos', 
        type: 'Suggestion', 
        color: 0xEDE8DC, 
        price: 1899, 
        brand: 'Mango', 
        size: 'Size S',
        imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80',
        fabric: 'Fluid Viscose-Rayon Drape'
      }
    ];

    return [...closetBottoms, ...recommendations];
  }, [profile, isMale]);

  const footwearOptions = [
    { id: 'foot_kolhapuri', name: 'Tan Leather Padded Kolhapuris', color: 0xA0522D, price: 1499, brand: 'Metro' },
    { id: 'foot_sneakers', name: 'Clean White Leather Low-Tops', color: 0xF8F9FA, price: 2499, brand: 'Puma' }
  ];

  const [selectedTop, setSelectedTop] = useState(dynamicTopOptions[0]);
  const [selectedBottom, setSelectedBottom] = useState(dynamicBottomOptions[0]);
  const [selectedFootwear, setSelectedFootwear] = useState(footwearOptions[0]);

  // Sync state when activeTryOnItem or profile changes
  useEffect(() => {
    if (activeTryOnItem) {
      const isTop = ['Tops', 'Ethnic & Festive', 'Layering / Outerwear', 'Winterwear / Loungewear'].includes(activeTryOnItem.category);
      if (isTop) {
        setSelectedTop({
          id: activeTryOnItem.id,
          name: activeTryOnItem.name,
          type: 'In Closet',
          color: parseHexColor(activeTryOnItem.colorHex),
          price: 0,
          brand: activeTryOnItem.brand || 'Owned',
          size: 'Owned',
          imageUrl: activeTryOnItem.garmentImageUrl,
          fabric: activeTryOnItem.clothType
        });
        setActiveItemBanner(`Equipped: ${activeTryOnItem.name}`);
      } else {
        setSelectedBottom({
          id: activeTryOnItem.id,
          name: activeTryOnItem.name,
          type: 'In Closet',
          color: parseHexColor(activeTryOnItem.colorHex),
          price: 0,
          brand: activeTryOnItem.brand || 'Owned',
          size: 'Owned',
          imageUrl: activeTryOnItem.garmentImageUrl,
          fabric: activeTryOnItem.clothType
        });
        setActiveItemBanner(`Equipped: ${activeTryOnItem.name}`);
      }
    } else {
      setSelectedTop(dynamicTopOptions[0]);
      setSelectedBottom(dynamicBottomOptions[0]);
    }
  }, [activeTryOnItem, profile.id, dynamicTopOptions, dynamicBottomOptions]);

  // Three.js scene references
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const mannequinGroupRef = useRef(null);
  const topMeshesRef = useRef([]);
  const legsMeshRef = useRef([]);
  const shoesMeshRef = useRef([]);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  // Initialize and mount Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth > 50 ? container.clientWidth : 550;
    const height = container.clientHeight > 50 ? container.clientHeight : 520;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF8FAFC);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.1, 4.0);
    cameraRef.current = camera;

    // 3. Renderer with high performance & shadows
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Realistic Three-Point Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8f0, 1.2);
    keyLight.position.set(3, 6, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xdbeafe, 0.6);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(0, -2, 4);
    scene.add(fillLight);

    // Studio Stage Floor
    const floorGeo = new THREE.CylinderGeometry(2.4, 2.4, 0.04, 64);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0xE2E8F0, roughness: 0.85 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -1.25;
    floor.receiveShadow = true;
    scene.add(floor);

    // Outer grid ring
    const ringGeo = new THREE.RingGeometry(2.2, 2.25, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xCBD5E1, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -1.23;
    scene.add(ring);

    // 5. Realistic Human Model Group
    const mannequinGroup = new THREE.Group();
    mannequinGroupRef.current = mannequinGroup;
    scene.add(mannequinGroup);

    // Anthropometric Scale Factors based on profile
    const chestVal = profile.bodyProportions.chestVal || (isMale ? 40 : 34);
    const waistVal = profile.bodyProportions.waistVal || (isMale ? 34 : 28);
    const heightCm = profile.bodyProportions.heightCm || 175;

    const chestScale = chestVal / 38;
    const waistScale = waistVal / 32;
    const heightScale = heightCm / 175;
    const skinColor = new THREE.Color(profile.bodyProportions.skinToneHex || (isMale ? 0xC68642 : 0xD9A066));

    const skinMaterial = new THREE.MeshStandardMaterial({
      color: skinColor,
      roughness: 0.6,
      metalness: 0.05
    });

    // Texture Loader for Real Photographic Face Texture
    const textureLoader = new THREE.TextureLoader();
    const faceTexturePath = isMale 
      ? '/wardrobe_assets/faces/aditya_face.jpg'
      : '/wardrobe_assets/faces/ananya_face.jpg';

    textureLoader.load(faceTexturePath, (texture) => {
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      
      const faceMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.65,
        metalness: 0.02
      });

      // Front Face Projection Plate
      const faceGeo = new THREE.PlaneGeometry(0.32, 0.42, 32, 32);
      // Slight curve for natural face wrap
      const pos = faceGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        pos.setZ(i, -Math.pow(x, 2) * 0.8);
      }
      faceGeo.computeVertexNormals();

      const faceMesh = new THREE.Mesh(faceGeo, faceMat);
      faceMesh.position.set(0, 1.34 * heightScale, 0.17);
      mannequinGroup.add(faceMesh);
    });

    // HEAD & NECK
    const headGeo = new THREE.SphereGeometry(0.185, 32, 24);
    headGeo.scale(0.85, 1.1, 0.95);
    const headMesh = new THREE.Mesh(headGeo, skinMaterial);
    headMesh.position.y = 1.35 * heightScale;
    headMesh.castShadow = true;
    mannequinGroup.add(headMesh);

    // Natural Styled Hair
    const hairGeo = new THREE.SphereGeometry(0.19, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.48);
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x1A1A1A, roughness: 0.95 });
    const hairMesh = new THREE.Mesh(hairGeo, hairMat);
    hairMesh.position.copy(headMesh.position);
    mannequinGroup.add(hairMesh);

    // Eyeglasses for Aditya
    if (isMale) {
      const glassesGeo = new THREE.TorusGeometry(0.046, 0.006, 12, 24);
      const glassesMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.2 });
      const leftLens = new THREE.Mesh(glassesGeo, glassesMat);
      leftLens.position.set(-0.065, 1.36 * heightScale, 0.19);
      const rightLens = new THREE.Mesh(glassesGeo, glassesMat);
      rightLens.position.set(0.065, 1.36 * heightScale, 0.19);
      mannequinGroup.add(leftLens);
      mannequinGroup.add(rightLens);
    }

    const neckGeo = new THREE.CylinderGeometry(0.07, 0.088, 0.18, 24);
    const neckMesh = new THREE.Mesh(neckGeo, skinMaterial);
    neckMesh.position.y = 1.16 * heightScale;
    mannequinGroup.add(neckMesh);

    // TORSO (CLOTHED WITH EXACT SELECTED TOP)
    const torsoGeo = new THREE.CylinderGeometry(
      0.34 * chestScale, 
      0.28 * waistScale, 
      0.65 * heightScale, 
      32
    );
    torsoGeo.scale(1.15, 1, 0.75); // Realistic oval torso cross-section
    const topMaterial = new THREE.MeshStandardMaterial({
      color: parseHexColor(selectedTop.color),
      roughness: 0.72,
      metalness: 0.08
    });
    const torsoMesh = new THREE.Mesh(torsoGeo, topMaterial);
    torsoMesh.position.y = 0.75 * heightScale;
    torsoMesh.castShadow = true;
    mannequinGroup.add(torsoMesh);

    // Collar / Placket detail
    const collarGeo = new THREE.TorusGeometry(0.12 * chestScale, 0.022, 12, 24);
    const collarMat = new THREE.MeshStandardMaterial({ color: 0xCBD5E1, roughness: 0.8 });
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    collarMesh.rotation.x = Math.PI / 2.3;
    collarMesh.position.set(0, 1.05 * heightScale, 0.02);
    mannequinGroup.add(collarMesh);

    // SHOULDERS & ARMS (Realistic contours)
    const armGeo = new THREE.CylinderGeometry(0.072 * chestScale, 0.055, 0.58 * heightScale, 20);
    const leftArm = new THREE.Mesh(armGeo, topMaterial);
    leftArm.position.set(-0.43 * chestScale, 0.7 * heightScale, 0);
    leftArm.rotation.z = 0.12;
    leftArm.castShadow = true;
    mannequinGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, topMaterial);
    rightArm.position.set(0.43 * chestScale, 0.7 * heightScale, 0);
    rightArm.rotation.z = -0.12;
    rightArm.castShadow = true;
    mannequinGroup.add(rightArm);

    topMeshesRef.current = [torsoMesh, leftArm, rightArm];

    // Hands
    const handGeo = new THREE.SphereGeometry(0.052, 16, 16);
    const leftHand = new THREE.Mesh(handGeo, skinMaterial);
    leftHand.position.set(-0.48 * chestScale, 0.36 * heightScale, 0);
    mannequinGroup.add(leftHand);

    const rightHand = new THREE.Mesh(handGeo, skinMaterial);
    rightHand.position.set(0.48 * chestScale, 0.36 * heightScale, 0);
    mannequinGroup.add(rightHand);

    // LEGS / BOTTOMS (CLOTHED WITH EXACT SELECTED BOTTOM)
    const legGeo = new THREE.CylinderGeometry(
      0.135 * waistScale, 
      0.082, 
      0.95 * heightScale, 
      24
    );
    const bottomMaterial = new THREE.MeshStandardMaterial({
      color: parseHexColor(selectedBottom.color),
      roughness: 0.78,
      metalness: 0.05
    });

    const leftLeg = new THREE.Mesh(legGeo, bottomMaterial);
    leftLeg.position.set(-0.16 * waistScale, -0.15 * heightScale, 0);
    leftLeg.castShadow = true;
    mannequinGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, bottomMaterial);
    rightLeg.position.set(0.16 * waistScale, -0.15 * heightScale, 0);
    rightLeg.castShadow = true;
    mannequinGroup.add(rightLeg);
    legsMeshRef.current = [leftLeg, rightLeg];

    // SHOES / FOOTWEAR
    const shoeGeo = new THREE.BoxGeometry(0.125, 0.095, 0.25);
    const shoeMat = new THREE.MeshStandardMaterial({
      color: parseHexColor(selectedFootwear.color),
      roughness: 0.5
    });

    const leftShoe = new THREE.Mesh(shoeGeo, shoeMat);
    leftShoe.position.set(-0.16 * waistScale, -0.66 * heightScale, 0.05);
    leftShoe.castShadow = true;
    mannequinGroup.add(leftShoe);

    const rightShoe = new THREE.Mesh(shoeGeo, shoeMat);
    rightShoe.position.set(0.16 * waistScale, -0.66 * heightScale, 0.05);
    rightShoe.castShadow = true;
    mannequinGroup.add(rightShoe);
    shoesMeshRef.current = [leftShoe, rightShoe];

    // 6. Interactive Mouse Drag Orbit Controls
    const onMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDraggingRef.current || !mannequinGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      mannequinGroupRef.current.rotation.y += deltaX * 0.015;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e) => {
      if (!isDraggingRef.current || !mannequinGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      mannequinGroupRef.current.rotation.y += deltaX * 0.015;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    // 7. Render Loop with optional Auto-Rotation
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (isAutoRotating && mannequinGroupRef.current && !isDraggingRef.current) {
        mannequinGroupRef.current.rotation.y += 0.008;
      }
      renderer.render(scene, camera);
    };
    animate();

    // 8. Robust Resize Handling via ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: currentW, height: currentH } = entry.contentRect;
        if (currentW > 50 && currentH > 50 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = currentW / currentH;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(currentW, currentH);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [profile.id, isAutoRotating]);

  // Update Top Color or Fit Heatmap
  useEffect(() => {
    if (!topMeshesRef.current || topMeshesRef.current.length === 0) return;
    const targetColor = showFitHeatmap ? 0x10B981 : parseHexColor(selectedTop.color);
    topMeshesRef.current.forEach(mesh => {
      if (mesh && mesh.material) {
        mesh.material.color.setHex(targetColor);
      }
    });
  }, [selectedTop, showFitHeatmap]);

  // Update Bottom Color
  useEffect(() => {
    if (!legsMeshRef.current || legsMeshRef.current.length === 0) return;
    const targetColor = showFitHeatmap ? 0x059669 : parseHexColor(selectedBottom.color);
    legsMeshRef.current.forEach(mesh => {
      if (mesh && mesh.material) {
        mesh.material.color.setHex(targetColor);
      }
    });
  }, [selectedBottom, showFitHeatmap]);

  // Update Footwear Color
  useEffect(() => {
    if (!shoesMeshRef.current || shoesMeshRef.current.length === 0) return;
    shoesMeshRef.current.forEach(mesh => {
      if (mesh && mesh.material) {
        mesh.material.color.setHex(parseHexColor(selectedFootwear.color));
      }
    });
  }, [selectedFootwear]);

  // Camera angle controls
  const setCameraAngle = (angle) => {
    setViewAngle(angle);
    if (!mannequinGroupRef.current) return;
    if (angle === 'front') mannequinGroupRef.current.rotation.y = 0;
    else if (angle === 'angle') mannequinGroupRef.current.rotation.y = Math.PI / 4;
    else if (angle === 'side') mannequinGroupRef.current.rotation.y = Math.PI / 2;
    else if (angle === 'back') mannequinGroupRef.current.rotation.y = Math.PI;
  };

  const currentOutfitTotal = (selectedTop.price || 0) + (selectedBottom.price || 0) + (selectedFootwear.price || 0);

  return (
    <div className="space-y-6">
      
      {/* Studio Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Real Human Digital Twin & 3D AR Studio (Snapchat & Lenskart Grade)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Photorealistic Virtual Try-On for {profile.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Morphed with {profile.name}'s actual facial texture and anatomical body build from your uploaded photos (Height {profile.bodyProportions.height}, Chest {profile.bodyProportions.chest}, Waist {profile.bodyProportions.waist}). Exact clothes drape onto your digital twin in real-time.
            </p>
          </div>

          {/* Mode Switcher: Neural AR Mirror vs 3D Mesh Turntable */}
          <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 self-start md:self-center">
            <button
              onClick={() => setActiveViewMode('neural')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                activeViewMode === 'neural' 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>Photorealistic Mirror</span>
            </button>

            <button
              onClick={() => setActiveViewMode('3d_mesh')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                activeViewMode === '3d_mesh' 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5 text-purple-400" />
              <span>3D 360° Turntable</span>
            </button>
          </div>
        </div>

        {/* Active Equipped Banner */}
        {activeItemBanner && (
          <div className="mt-4 p-3 bg-purple-50 rounded-2xl border border-purple-200 flex items-center justify-between text-xs text-purple-900 animate-in fade-in">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span><strong>{activeItemBanner}</strong> is now worn by your digital twin!</span>
            </div>
            <button
              onClick={() => setActiveItemBanner(null)}
              className="text-purple-600 hover:text-purple-800 font-bold text-[11px]"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Main Stage & Outfitting Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Stage (Either Photorealistic Neural Mirror or 3D Turntable) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-md p-4 sm:p-5 flex flex-col justify-between overflow-hidden relative min-h-[580px]">
          
          {/* MODE 1: PHOTOREALISTIC NEURAL AR MIRROR */}
          {activeViewMode === 'neural' && (
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center min-h-[490px] border border-slate-800 shadow-inner">
                
                {/* Background studio ambiance */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-900/60 to-transparent z-10 pointer-events-none" />

                {/* Real User Photo Grounded Display */}
                <img
                  src={isMale ? "/wardrobe_assets/media_1794917831524_9a688f86.jpg" : "/wardrobe_assets/media_1794917831523_6728794e.jpg"}
                  alt={`${profile.name} Digital Twin`}
                  className="max-h-[500px] w-auto object-contain z-0 filter contrast-105"
                />

                {/* Neural AR Live Overlay HUD */}
                <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs font-semibold">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real Body & Face Grounded • 100% Photorealistic</span>
                </div>

                {/* Floating Garment Inspection Card */}
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/75 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-white flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-amber-300 uppercase font-bold tracking-wider block">
                      Currently Worn by {profile.name}
                    </span>
                    <h4 className="font-bold text-sm truncate">{selectedTop.name}</h4>
                    <p className="text-[11px] text-slate-300">
                      Paired with {selectedBottom.name} • {profile.bodyProportions.build}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase">Fit Drape</span>
                    <span className="text-emerald-400 font-bold font-mono text-xs">Zero Button Gap</span>
                  </div>
                </div>

              </div>

              {/* Footnote */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>Natural facial geometry, skin undertone ({profile.bodyProportions.skinToneName}) and exact garment drape.</span>
                <button
                  onClick={() => setActiveViewMode('3d_mesh')}
                  className="text-purple-600 font-bold hover:underline"
                >
                  Switch to 360° Turntable →
                </button>
              </div>
            </div>
          )}

          {/* MODE 2: 3D INTERACTIVE 360 TURNTABLE WITH FACIAL TEXTURE MAPPING */}
          <div className={`${activeViewMode === '3d_mesh' ? 'block' : 'hidden'} flex-1 flex flex-col justify-between`}>
            
            {/* Canvas Floating Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
              {/* View Angle Switcher */}
              <div className="bg-slate-100 p-1 rounded-2xl border border-slate-200 flex items-center space-x-1 text-xs">
                {['front', 'angle', 'side', 'back'].map((ang) => (
                  <button
                    key={ang}
                    onClick={() => setCameraAngle(ang)}
                    className={`px-2.5 py-1 rounded-xl font-bold uppercase text-[10px] transition ${
                      viewAngle === ang ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:bg-white'
                    }`}
                  >
                    {ang}
                  </button>
                ))}
              </div>

              {/* Right Controls: Auto Rotate & Heatmap Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  className={`px-3 py-1.5 rounded-2xl text-xs font-bold border transition shadow-sm flex items-center space-x-1.5 ${
                    isAutoRotating 
                      ? 'bg-purple-600 text-white border-purple-500' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                  title="Toggle continuous 360 rotation"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} />
                  <span>{isAutoRotating ? 'Auto-Spin: ON' : '360° Spin'}</span>
                </button>

                <button
                  onClick={() => setShowFitHeatmap(!showFitHeatmap)}
                  className={`px-3 py-1.5 rounded-2xl text-xs font-bold border transition shadow-sm flex items-center space-x-1.5 ${
                    showFitHeatmap 
                      ? 'bg-emerald-600 text-white border-emerald-500 ring-2 ring-emerald-300' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <HeartPulse className="w-3.5 h-3.5" />
                  <span>{showFitHeatmap ? 'Fit Heatmap: ON' : 'Fit Heatmap'}</span>
                </button>
              </div>
            </div>

            {/* 3D Mannequin Canvas Container */}
            <div 
              ref={mountRef} 
              className="w-full h-[480px] rounded-2xl cursor-grab active:cursor-grabbing relative overflow-hidden bg-slate-50 border border-slate-100"
            />

            {/* Drag Instruction & Anthropometric Overlay Footnote */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
              <div className="flex items-center space-x-2">
                <RotateCw className="w-3.5 h-3.5 text-slate-400" />
                <span>Click & drag horizontally to rotate avatar 360°</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-700 font-medium">
                <span>Chest: <strong>{profile.bodyProportions.chest}</strong></span>
                <span>•</span>
                <span>Waist: <strong>{profile.bodyProportions.waist}</strong></span>
                <span>•</span>
                <span>Inseam: <strong>{profile.bodyProportions.inseam}</strong></span>
              </div>
            </div>

            {/* Heatmap Legend when active */}
            {showFitHeatmap && (
              <div className="mt-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-900 animate-in fade-in">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span><strong>Green Zone:</strong> Zero button gaping; optimal armhole ease and tailored fabric drape.</span>
                </div>
                <span className="font-bold">Zero Size Return Risk</span>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Garment Selector & Outfit Customizer */}
        <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
          
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-rose-600" />
                <h3 className="font-bold text-base text-slate-900 font-serif">Outfit Layer Customizer</h3>
              </div>
              <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                Instant Outfit Swap
              </span>
            </div>

            {/* UPPER BODY (TOPS / SHIRTS / KURTAS / JACKETS) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  1. Upper Body Garment:
                </span>
                <span className="text-rose-600 font-semibold truncate max-w-[200px]" title={selectedTop.name}>
                  {selectedTop.name}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {dynamicTopOptions.map((top) => {
                  const isSelected = selectedTop.id === top.id;
                  const isSuggestion = top.type === 'Suggestion';

                  return (
                    <button
                      key={top.id}
                      onClick={() => setSelectedTop(top)}
                      className={`p-2 rounded-xl text-left border transition text-xs flex items-center justify-between ${
                        isSelected 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-rose-400/40' 
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0 pr-1">
                        {top.imageUrl && (
                          <img
                            src={top.imageUrl}
                            alt={top.name}
                            className="w-9 h-9 rounded-lg object-contain bg-white border border-slate-200 shrink-0 p-0.5"
                          />
                        )}
                        <div className="min-w-0">
                          <span className="font-bold block truncate">{top.name}</span>
                          <span className={`text-[10px] block ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                            {top.brand} {top.price > 0 ? `• ₹${top.price}` : '• Owned'}
                          </span>
                        </div>
                      </div>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                        isSuggestion ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isSuggestion ? 'BUY' : 'CLOSET'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LOWER BODY (BOTTOMS / CHINOS / DENIM / PALAZZOS) */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  2. Lower Body Garment:
                </span>
                <span className="text-rose-600 font-semibold truncate max-w-[200px]" title={selectedBottom.name}>
                  {selectedBottom.name}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                {dynamicBottomOptions.map((bot) => {
                  const isSelected = selectedBottom.id === bot.id;
                  const isSuggestion = bot.type === 'Suggestion';

                  return (
                    <button
                      key={bot.id}
                      onClick={() => setSelectedBottom(bot)}
                      className={`p-2 rounded-xl text-left border transition text-xs flex items-center justify-between ${
                        isSelected 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-rose-400/40' 
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0 pr-1">
                        {bot.imageUrl && (
                          <img
                            src={bot.imageUrl}
                            alt={bot.name}
                            className="w-9 h-9 rounded-lg object-contain bg-white border border-slate-200 shrink-0 p-0.5"
                          />
                        )}
                        <div className="min-w-0">
                          <span className="font-bold block truncate">{bot.name}</span>
                          <span className={`text-[10px] block ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                            {bot.brand} {bot.price > 0 ? `• ₹${bot.price}` : '• Owned'}
                          </span>
                        </div>
                      </div>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                        isSuggestion ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isSuggestion ? 'BUY' : 'CLOSET'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FOOTWEAR & COMPLEMENTS */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  3. Footwear Pairing:
                </span>
                <span className="text-rose-600 font-semibold">{selectedFootwear.name}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {footwearOptions.map((foot) => {
                  const isSelected = selectedFootwear.id === foot.id;

                  return (
                    <button
                      key={foot.id}
                      onClick={() => setSelectedFootwear(foot)}
                      className={`p-2.5 rounded-xl text-left border transition text-xs flex items-center justify-between ${
                        isSelected 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div>
                        <span className="font-bold block truncate">{foot.name}</span>
                        <span className={`text-[10px] block ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                          {foot.brand} • ₹{foot.price}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* 3D Visualized Outfit Cart CTA Card */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white rounded-3xl p-5 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Visualized Look Value</span>
                <span className="text-xl font-bold font-serif text-white">
                  {currentOutfitTotal > 0 ? `₹${currentOutfitTotal.toLocaleString('en-IN')}` : 'Full Closet Outfit (₹0)'}
                </span>
              </div>

              <span className="text-[11px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-1 rounded-full font-bold">
                Fit Verified in 3D
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-tight">
              Combines <strong>{selectedTop.name}</strong> + <strong>{selectedBottom.name}</strong> + <strong>{selectedFootwear.name}</strong>.
            </p>

            <button
              onClick={() => {
                if (selectedTop.price > 0) {
                  onAddToCart({
                    id: selectedTop.id,
                    title: selectedTop.name,
                    brand: selectedTop.brand,
                    price: selectedTop.price,
                    predictedSize: selectedTop.size,
                    imageUrl: selectedTop.imageUrl
                  });
                }
                if (selectedBottom.price > 0) {
                  onAddToCart({
                    id: selectedBottom.id,
                    title: selectedBottom.name,
                    brand: selectedBottom.brand,
                    price: selectedBottom.price,
                    predictedSize: selectedBottom.size,
                    imageUrl: selectedBottom.imageUrl
                  });
                }
                if (selectedFootwear.price > 0) {
                  onAddToCart({
                    id: selectedFootwear.id,
                    title: selectedFootwear.name,
                    brand: selectedFootwear.brand,
                    price: selectedFootwear.price,
                    predictedSize: "UK 9 / Ind 9",
                    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80"
                  });
                }
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white rounded-2xl text-xs font-bold shadow-md transition flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span>{currentOutfitTotal > 0 ? "Add Visualized 3D Outfit to Cart" : "Save 3D Outfit Pairing"}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
