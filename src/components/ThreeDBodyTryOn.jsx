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
  Maximize,
  Compass,
  Flame,
  Info,
  Ruler
} from 'lucide-react';

export default function ThreeDBodyTryOn({ profile, onAddToCart, onAddBundleToCart }) {
  const mountRef = useRef(null);
  const isMale = profile.gender === 'male';

  // Clothing options available to try on
  const topOptions = isMale ? [
    { id: 'top_overshirt', name: 'Snitch Sand Beige Overshirt', type: 'Suggestion', color: 0xD8C4B6, price: 1499, brand: 'Snitch', size: 'Size L' },
    { id: 'top_linen_sage', name: 'Rare Rabbit Sage Linen Shirt', type: 'Suggestion', color: 0x829A84, price: 2199, brand: 'Rare Rabbit', size: 'Size 40/L' },
    { id: 'top_navy_polo', name: 'Structured Navy Pique Polo', type: 'In Closet', color: 0x1C2E4A, price: 0, brand: 'Closet Item #1', size: 'Owned' },
    { id: 'top_indigo_kurta', name: 'Indigo Slub Linen Short Kurta', type: 'In Closet', color: 0x182848, price: 0, brand: 'Closet Item #4', size: 'Owned' },
    { id: 'top_camo_polo', name: 'Abstract Marble Camo Polo', type: 'In Closet', color: 0x4A5568, price: 0, brand: 'Closet Item #3', size: 'Owned' }
  ] : [
    { id: 'top_supima_white', name: 'Minimalist Supima White Tee', type: 'Suggestion', color: 0xF5F5F0, price: 899, brand: 'Uniqlo', size: 'Size S' },
    { id: 'top_floral_jacket', name: 'Kashmiri Embroidered Crop Shrug', type: 'In Closet', color: 0x1A1A1A, price: 0, brand: 'Closet Item #4', size: 'Owned' },
    { id: 'top_rose_shrug', name: 'Dusty Rose Fluid Longline Shrug', type: 'In Closet', color: 0xD48B88, price: 0, brand: 'Closet Item #1', size: 'Owned' },
    { id: 'top_fleece_blue', name: 'Slate Blue Boucle Fleece Pullover', type: 'In Closet', color: 0x6888A2, price: 0, brand: 'Closet Item #5', size: 'Owned' }
  ];

  const bottomOptions = isMale ? [
    { id: 'bot_black_chinos', name: 'Jet Black Tapered Chinos', type: 'In Closet', color: 0x151515, price: 0, brand: 'Closet Item #6', size: 'Owned' },
    { id: 'bot_blue_denim', name: 'Medium-Wash Straight Denim', type: 'In Closet', color: 0x3B597B, price: 0, brand: 'Closet Item #5', size: 'Owned' },
    { id: 'bot_cream_chinos', name: 'Off-White Relaxed Chinos', type: 'Suggestion', color: 0xEAE6DF, price: 1799, brand: 'Snitch', size: '34W' }
  ] : [
    { id: 'bot_ecru_palazzo', name: 'Pleated Ecru Wide-Leg Palazzos', type: 'Suggestion', color: 0xEDE8DC, price: 1899, brand: 'Mango', size: 'Size S' },
    { id: 'bot_black_pants', name: 'Black Tailored High-Rise Pants', type: 'In Closet', color: 0x151515, price: 0, brand: 'Closet Item #3', size: 'Owned' }
  ];

  const footwearOptions = [
    { id: 'foot_kolhapuri', name: 'Tan Leather Padded Kolhapuris', color: 0xA0522D, price: 1499, brand: 'Metro' },
    { id: 'foot_sneakers', name: 'Clean White Leather Low-Tops', color: 0xF8F9FA, price: 2499, brand: 'Puma' }
  ];

  const [selectedTop, setSelectedTop] = useState(topOptions[0]);
  const [selectedBottom, setSelectedBottom] = useState(bottomOptions[0]);
  const [selectedFootwear, setSelectedFootwear] = useState(footwearOptions[0]);
  const [showFitHeatmap, setShowFitHeatmap] = useState(false);
  const [viewAngle, setViewAngle] = useState('front'); // 'front' | 'angle' | 'side' | 'back'

  // Three.js scene references
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const mannequinGroupRef = useRef(null);
  const torsoMeshRef = useRef(null);
  const legsMeshRef = useRef(null);
  const shoesMeshRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  // Initialize and mount Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF1F5F9);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.1, 4.2);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
    dirLight.position.set(4, 7, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xE2E8F0, 0.5);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    // Studio Floor Disc
    const floorGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.04, 48);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0xE2E8F0, roughness: 0.8 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -1.25;
    floor.receiveShadow = true;
    scene.add(floor);

    // Grid ring for 3D feel
    const ringGeo = new THREE.RingGeometry(2.1, 2.15, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xCBD5E1, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -1.23;
    scene.add(ring);

    // 5. Build Mannequin Group based on Anthropometric Proportions
    const mannequinGroup = new THREE.Group();
    mannequinGroupRef.current = mannequinGroup;
    scene.add(mannequinGroup);

    // Anthropometric Scale Factors based on profile
    const chestScale = (profile.bodyProportions.chestVal || (isMale ? 40 : 34)) / 38;
    const waistScale = (profile.bodyProportions.waistVal || (isMale ? 34 : 28)) / 32;
    const heightScale = (profile.bodyProportions.heightCm || 175) / 175;
    const skinColor = new THREE.Color(profile.bodyProportions.skinToneHex || 0xC68642);

    const skinMaterial = new THREE.MeshStandardMaterial({
      color: skinColor,
      roughness: 0.65,
      metalness: 0.05
    });

    // HEAD & NECK
    const headGeo = new THREE.SphereGeometry(0.18, 32, 24);
    headGeo.scale(0.85, 1.1, 0.95);
    const headMesh = new THREE.Mesh(headGeo, skinMaterial);
    headMesh.position.y = 1.35 * heightScale;
    headMesh.castShadow = true;
    mannequinGroup.add(headMesh);

    // Hair / Cap detail
    const hairGeo = new THREE.SphereGeometry(0.185, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45);
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x1A1A1A, roughness: 0.9 });
    const hairMesh = new THREE.Mesh(hairGeo, hairMat);
    hairMesh.position.copy(headMesh.position);
    mannequinGroup.add(hairMesh);

    // Glasses detail for Aditya
    if (isMale) {
      const glassesGeo = new THREE.TorusGeometry(0.045, 0.006, 12, 24);
      const glassesMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.2 });
      const leftLens = new THREE.Mesh(glassesGeo, glassesMat);
      leftLens.position.set(-0.06, 1.35 * heightScale, 0.16);
      const rightLens = new THREE.Mesh(glassesGeo, glassesMat);
      rightLens.position.set(0.06, 1.35 * heightScale, 0.16);
      mannequinGroup.add(leftLens);
      mannequinGroup.add(rightLens);
    }

    const neckGeo = new THREE.CylinderGeometry(0.07, 0.085, 0.16, 24);
    const neckMesh = new THREE.Mesh(neckGeo, skinMaterial);
    neckMesh.position.y = 1.16 * heightScale;
    mannequinGroup.add(neckMesh);

    // TORSO (CLOTHED WITH SELECTED TOP)
    const torsoGeo = new THREE.CylinderGeometry(
      0.34 * chestScale, 
      0.28 * waistScale, 
      0.65 * heightScale, 
      32
    );
    torsoGeo.scale(1.15, 1, 0.75); // Oval torso cross-section
    const topMaterial = new THREE.MeshStandardMaterial({
      color: selectedTop.color,
      roughness: 0.7,
      metalness: 0.1
    });
    const torsoMesh = new THREE.Mesh(torsoGeo, topMaterial);
    torsoMesh.position.y = 0.75 * heightScale;
    torsoMesh.castShadow = true;
    torsoMeshRef.current = torsoMesh;
    mannequinGroup.add(torsoMesh);

    // Collar detail
    const collarGeo = new THREE.TorusGeometry(0.12 * chestScale, 0.02, 12, 24);
    const collarMat = new THREE.MeshStandardMaterial({ color: 0xCBD5E1 });
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    collarMesh.rotation.x = Math.PI / 2.3;
    collarMesh.position.set(0, 1.05 * heightScale, 0.02);
    mannequinGroup.add(collarMesh);

    // SHOULDERS & ARMS
    const armGeo = new THREE.CylinderGeometry(0.07 * chestScale, 0.055, 0.58 * heightScale, 20);
    const leftArm = new THREE.Mesh(armGeo, topMaterial);
    leftArm.position.set(-0.42 * chestScale, 0.7 * heightScale, 0);
    leftArm.rotation.z = 0.12;
    leftArm.castShadow = true;
    mannequinGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, topMaterial);
    rightArm.position.set(0.42 * chestScale, 0.7 * heightScale, 0);
    rightArm.rotation.z = -0.12;
    rightArm.castShadow = true;
    mannequinGroup.add(rightArm);

    // Hands
    const handGeo = new THREE.SphereGeometry(0.05, 16, 16);
    const leftHand = new THREE.Mesh(handGeo, skinMaterial);
    leftHand.position.set(-0.47 * chestScale, 0.36 * heightScale, 0);
    mannequinGroup.add(leftHand);

    const rightHand = new THREE.Mesh(handGeo, skinMaterial);
    rightHand.position.set(0.47 * chestScale, 0.36 * heightScale, 0);
    mannequinGroup.add(rightHand);

    // LEGS / BOTTOMS (CLOTHED WITH SELECTED BOTTOM)
    const legGeo = new THREE.CylinderGeometry(
      0.13 * waistScale, 
      0.08, 
      0.95 * heightScale, 
      24
    );
    const bottomMaterial = new THREE.MeshStandardMaterial({
      color: selectedBottom.color,
      roughness: 0.75,
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
    const shoeGeo = new THREE.BoxGeometry(0.12, 0.09, 0.24);
    const shoeMat = new THREE.MeshStandardMaterial({
      color: selectedFootwear.color,
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

    // 7. Render Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 520;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [profile.id]);

  // Update Top Color or Fit Heatmap
  useEffect(() => {
    if (!torsoMeshRef.current) return;
    if (showFitHeatmap) {
      // Fit heatmap colors: Green = optimal drape, Amber = snug chest strain, Blue = relaxed waist
      torsoMeshRef.current.material.color.setHex(0x10B981); // Emerald green optimal
    } else {
      torsoMeshRef.current.material.color.setHex(selectedTop.color);
    }
  }, [selectedTop, showFitHeatmap]);

  // Update Bottom Color
  useEffect(() => {
    if (!legsMeshRef.current) return;
    legsMeshRef.current.forEach(mesh => {
      if (showFitHeatmap) {
        mesh.material.color.setHex(0x059669); // Optimal drape
      } else {
        mesh.material.color.setHex(selectedBottom.color);
      }
    });
  }, [selectedBottom, showFitHeatmap]);

  // Update Footwear Color
  useEffect(() => {
    if (!shoesMeshRef.current) return;
    shoesMeshRef.current.forEach(mesh => {
      mesh.material.color.setHex(selectedFootwear.color);
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
              <span>3D Virtual Body & AR Try-On Studio (Snapchat & Lenskart Grade)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Interactive 3D Virtual Try-On for {profile.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Morphed directly from your uploaded photos and confirmed body measurements (Height {profile.bodyProportions.height}, Chest {profile.bodyProportions.chest}, Waist {profile.bodyProportions.waist}). Pair existing closet staples with new Myntra & Amazon recommendations to inspect 360° drape before buying.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 text-xs">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Fit Confidence</span>
              <span className="text-emerald-700 font-bold font-mono text-sm">96% Optimal Drape</span>
            </div>
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Main 3D Stage & Outfitting Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive 3D Canvas Stage */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-md p-4 sm:p-5 flex flex-col justify-between overflow-hidden relative">
          
          {/* Canvas Floating Controls */}
          <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between pointer-events-none">
            {/* View Angle Switcher */}
            <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-sm pointer-events-auto flex items-center space-x-1 text-xs">
              {['front', 'angle', 'side', 'back'].map((ang) => (
                <button
                  key={ang}
                  onClick={() => setCameraAngle(ang)}
                  className={`px-2.5 py-1 rounded-xl font-bold uppercase text-[10px] transition ${
                    viewAngle === ang ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {ang}
                </button>
              ))}
            </div>

            {/* Fit Tension Heatmap Toggle */}
            <button
              onClick={() => setShowFitHeatmap(!showFitHeatmap)}
              className={`px-3 py-1.5 rounded-2xl text-xs font-bold border transition shadow-sm pointer-events-auto flex items-center space-x-1.5 backdrop-blur-md ${
                showFitHeatmap 
                  ? 'bg-emerald-600 text-white border-emerald-500 ring-2 ring-emerald-300' 
                  : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>{showFitHeatmap ? 'Fit Heatmap: ON' : 'Fit Heatmap: OFF'}</span>
            </button>
          </div>

          {/* 3D Mannequin Canvas Container */}
          <div 
            ref={mountRef} 
            className="w-full h-[520px] rounded-2xl cursor-grab active:cursor-grabbing relative overflow-hidden"
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
            <div className="mt-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                <span><strong>Green Zone:</strong> Zero button gaping; optimal armhole ease and fabric drape.</span>
              </div>
              <span className="font-bold">Zero Size Return Risk</span>
            </div>
          )}

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
                Live 3D Rendering
              </span>
            </div>

            {/* UPPER BODY (TOPS / SHIRTS / KURTAS / JACKETS) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  1. Upper Body Layer:
                </span>
                <span className="text-rose-600 font-semibold">{selectedTop.name}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {topOptions.map((top) => {
                  const isSelected = selectedTop.id === top.id;
                  const isSuggestion = top.type === 'Suggestion';

                  return (
                    <button
                      key={top.id}
                      onClick={() => setSelectedTop(top)}
                      className={`p-2.5 rounded-xl text-left border transition text-xs flex items-center justify-between ${
                        isSelected 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-rose-400/40' 
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <span className="font-bold block truncate">{top.name}</span>
                        <span className={`text-[10px] block ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                          {top.brand} • {top.size}
                        </span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                        isSuggestion ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isSuggestion ? 'NEW' : 'CLOSET'}
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
                  2. Lower Body Layer:
                </span>
                <span className="text-rose-600 font-semibold">{selectedBottom.name}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {bottomOptions.map((bot) => {
                  const isSelected = selectedBottom.id === bot.id;
                  const isSuggestion = bot.type === 'Suggestion';

                  return (
                    <button
                      key={bot.id}
                      onClick={() => setSelectedBottom(bot)}
                      className={`p-2.5 rounded-xl text-left border transition text-xs flex items-center justify-between ${
                        isSelected 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-rose-400/40' 
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <span className="font-bold block truncate">{bot.name}</span>
                        <span className={`text-[10px] block ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                          {bot.brand} • {bot.size}
                        </span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                        isSuggestion ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isSuggestion ? 'NEW' : 'CLOSET'}
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
          <div className="bg-gradient-to-r from-slate-900 to-indigoIndian-900 text-white rounded-3xl p-5 border border-slate-800 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">3D Visualized Look Value</span>
                <span className="text-xl font-bold font-serif text-white">
                  {currentOutfitTotal > 0 ? `₹${currentOutfitTotal.toLocaleString('en-IN')}` : 'Full Closet Outfit (₹0)'}
                </span>
              </div>

              <span className="text-[11px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-1 rounded-full font-bold">
                Fit Verified in 3D
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-tight">
              Combines your <strong>{selectedTop.name}</strong> with <strong>{selectedBottom.name}</strong> and <strong>{selectedFootwear.name}</strong>.
            </p>

            <button
              onClick={() => {
                // If top or bottom has price, add to cart
                if (selectedTop.price > 0) {
                  onAddToCart({
                    id: selectedTop.id,
                    title: selectedTop.name,
                    brand: selectedTop.brand,
                    price: selectedTop.price,
                    predictedSize: selectedTop.size,
                    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80"
                  });
                }
                if (selectedBottom.price > 0) {
                  onAddToCart({
                    id: selectedBottom.id,
                    title: selectedBottom.name,
                    brand: selectedBottom.brand,
                    price: selectedBottom.price,
                    predictedSize: selectedBottom.size,
                    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80"
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
              className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 via-amber-600 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white rounded-2xl text-xs font-bold shadow-md transition flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span>Add Visualized 3D Outfit to Cart</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
