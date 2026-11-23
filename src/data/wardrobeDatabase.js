export const calculateBrandSizes = (gender, chest, waist, height, armLength, inseam, bodyType) => {
  const chestNum = parseInt(chest) || (gender === 'male' ? 40 : 34);
  const waistNum = parseInt(waist) || (gender === 'male' ? 34 : 28);

  if (gender === 'male') {
    let snitchSize = 'M';
    if (chestNum <= 37) snitchSize = 'S';
    else if (chestNum <= 39) snitchSize = 'M';
    else if (chestNum <= 41) snitchSize = 'L';
    else if (chestNum <= 43) snitchSize = 'XL';
    else snitchSize = 'XXL';

    let rareRabbitSize = '38 / M';
    if (chestNum <= 37) rareRabbitSize = '36 / S';
    else if (chestNum <= 39) rareRabbitSize = '38 / M';
    else if (chestNum <= 41) rareRabbitSize = '40 / L';
    else if (chestNum <= 43) rareRabbitSize = '42 / XL';
    else rareRabbitSize = '44 / XXL';

    let zaraSize = 'S';
    if (chestNum <= 38) zaraSize = 'S';
    else if (chestNum <= 41) zaraSize = 'M';
    else if (chestNum <= 44) zaraSize = 'L';
    else zaraSize = 'XL';

    let levisSize = `${waistNum}W x 32L`;

    let ethnicSize = '38 / S';
    if (chestNum <= 37) ethnicSize = '38 / S';
    else if (chestNum <= 40) ethnicSize = '40 / M';
    else if (chestNum <= 43) ethnicSize = '42 / L';
    else ethnicSize = '44 / XL';

    let msSize = 'M (Regular)';
    if (chestNum <= 38) msSize = 'S (Regular)';
    else if (chestNum <= 41) msSize = 'M (Regular)';
    else if (chestNum <= 44) msSize = 'L (Regular)';
    else msSize = 'XL (Regular)';

    return {
      "Snitch": {
        predictedSize: snitchSize,
        fitRecommendation: `Slim Athletic Pattern — For a ${chestNum}" chest, Size ${snitchSize} gives clean shoulder alignment without button gaping.`,
        fitConfidence: 94
      },
      "Rare Rabbit": {
        predictedSize: rareRabbitSize,
        fitRecommendation: `Tailored Slim — Chest ${chestNum}" matches ${rareRabbitSize}; high armhole allows sharp posture.`,
        fitConfidence: 92
      },
      "Zara India": {
        predictedSize: zaraSize,
        fitRecommendation: `Euro Regular Fit — Size ${zaraSize} provides modern torso drape without excessive sleeve length.`,
        fitConfidence: 89
      },
      "Levi's": {
        predictedSize: levisSize,
        fitRecommendation: `511 Slim or 512 Tapered — Mid-rise ${waistNum} waistband matches your natural waist without gap.`,
        fitConfidence: 96
      },
      "Manyavar / FabIndia": {
        predictedSize: ethnicSize,
        fitRecommendation: `Ethnic Regular — Garment chest allows 3 inches of traditional ease over your ${chestNum}" chest for festive seating.`,
        fitConfidence: 95
      },
      "Marks & Spencer": {
        predictedSize: msSize,
        fitRecommendation: `British Standard Cut — True to size comfort fit for ${chestNum}" chest.`,
        fitConfidence: 91
      }
    };
  } else {
    // Female
    let bustNum = chestNum;
    let zaraSize = 'S';
    if (bustNum <= 32) zaraSize = 'XS';
    else if (bustNum <= 34) zaraSize = 'S';
    else if (bustNum <= 37) zaraSize = 'M';
    else zaraSize = 'L';

    let mangoSize = 'XS';
    if (bustNum <= 33) mangoSize = 'XS';
    else if (bustNum <= 35) mangoSize = 'S';
    else if (bustNum <= 38) mangoSize = 'M';
    else mangoSize = 'L';

    let roadsterSize = 'M';
    if (bustNum <= 32) roadsterSize = 'S';
    else if (bustNum <= 35) roadsterSize = 'M';
    else if (bustNum <= 38) roadsterSize = 'L';
    else roadsterSize = 'XL';

    let ethnicSize = 'XS / 32';
    if (bustNum <= 33) ethnicSize = 'XS / 32';
    else if (bustNum <= 35) ethnicSize = 'S / 34';
    else if (bustNum <= 38) ethnicSize = 'M / 36';
    else ethnicSize = 'L / 38';

    let westsideSize = 'S';
    if (bustNum <= 33) westsideSize = 'XS';
    else if (bustNum <= 35) westsideSize = 'S';
    else if (bustNum <= 38) westsideSize = 'M';
    else westsideSize = 'L';

    return {
      "Zara": {
        predictedSize: `${zaraSize} (Tops) / ${waistNum <= 27 ? '26' : waistNum <= 29 ? '28' : '30'} EU 36 (Bottoms)`,
        fitRecommendation: `Standard ${zaraSize} provides tailored shoulders without sleeve length dragging past wrist.`,
        fitConfidence: 95
      },
      "Mango": {
        predictedSize: mangoSize,
        fitRecommendation: `Relaxed European cut; Size ${mangoSize} provides fluid drape over t-shirts and camis.`,
        fitConfidence: 91
      },
      "Myntra Roadster / Tokyo Talkies": {
        predictedSize: roadsterSize,
        fitRecommendation: `Indian fast fashion cuts run 1 size smaller in armhole depth; Size ${roadsterSize} prevents chest pull.`,
        fitConfidence: 93
      },
      "FabIndia / Biba / W": {
        predictedSize: ethnicSize,
        fitRecommendation: `Traditional ethnic sizing has significant ease; Size ${ethnicSize} gives a neat, non-swamping fit.`,
        fitConfidence: 97
      },
      "Westside (Nuon / Wardrobe)": {
        predictedSize: westsideSize,
        fitRecommendation: `Tailored for contemporary Indian urban proportions, true to size.`,
        fitConfidence: 94
      }
    };
  }
};

export const wardrobeDatabase = {
  profiles: [
    {
      id: "user_aditya",
      name: "Aditya",
      gender: "male",
      age: 26,
      profession: "Senior Software Engineer",
      city: "Bengaluru, Karnataka",
      demographicTag: "Tier-1 Tech Professional (24-29 Yrs)",
      avatar: "/wardrobe_assets/media_1794917831523_a44ce8bf.jpg",
      bodyProportions: {
        height: "5'9\" (175 cm)",
        heightCm: 175,
        weight: "74 kg",
        weightKg: 74,
        build: "Medium Athletic / Broad Shoulders",
        chest: "40 inches",
        chestVal: 40,
        waist: "34 inches",
        waistVal: 34,
        shoulder: "18 inches",
        shoulderVal: 18,
        armLength: "25 inches",
        armLengthVal: 25,
        inseam: "31 inches",
        inseamVal: 31,
        neck: "15.5 inches",
        neckVal: 15.5,
        bodyType: "Athletic Mesomorph",
        bmi: 24.2,
        obesityCategory: "Normal / Lean Athletic",
        skinToneHex: "#C68642",
        skinToneName: "Warm Golden Indian Wheatish",
        skinUndertone: "Warm Golden / Olive",
        colorSeason: "Warm Autumn (Earthy neutrals, deep navy, olive, terracotta)"
      },
      detectedWornSizes: [
        {
          garment: "Structured Navy Pique Polo (Photo #3 & #4)",
          detectedFit: "Snug in chest armholes, optimal torso length",
          estimatedWornSize: "Size L in Snitch / Size M in Zara",
          brandAccuracy: "94% Confidence",
          fitVerdict: "Ideal chest alignment without button gaping"
        },
        {
          garment: "Medium-Wash Straight Jeans (Photo #4)",
          detectedFit: "Mid-rise, 1 break at ankle",
          estimatedWornSize: "34W x 32L in Levi's 511 Slim",
          brandAccuracy: "96% Confidence",
          fitVerdict: "True to natural waist, zero waist gap"
        },
        {
          garment: "Indigo Slub Linen Short Kurta (Photo #6)",
          detectedFit: "Clean mandarin collar, relaxed 3\" torso drape",
          estimatedWornSize: "Size 40 (M) in FabIndia / Manyavar",
          brandAccuracy: "95% Confidence",
          fitVerdict: "Traditional festive ease preserved"
        }
      ],
      brandSizingFramework: calculateBrandSizes('male', 40, 34, "5'9\"", 25, 31, "Athletic Mesomorph"),
      wardrobeHealth: {
        healthScore: 78,
        totalItemsDetected: 6,
        keepCount: 4,
        replaceCount: 1,
        addCount: 2,
        purgeCount: 0,
        dominantPalette: ["Deep Navy", "Sky Blue", "Heather Grey", "Jet Black", "Charcoal"],
        diversityDeficit: "Monochrome Blue & Dark Neutral Overload (65% blue-spectrum bias). Lacks warm neutrals (oatmeal, olive, terracotta) for Indian climate balance."
      },
      items: [
        {
          id: "aditya_item_1",
          name: "Navy Pique Polo with Grey Collar",
          category: "Tops",
          subCategory: "Polo T-Shirt",
          clothType: "Pique Cotton (240 GSM)",
          wardrobeType: "Smart Casual / Office",
          color: "Deep Navy with Heather Grey Collar",
          conditionScore: 8.8,
          conditionLabel: "Pristine Structure",
          wearFrequency: "3-4x / month",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831523_a44ce8bf.jpg", "/wardrobe_assets/media_1794917831524_9a688f86.jpg"],
          status: "KEEP",
          statusReason: "Excellent collar retention, zero fabric pilling. High versatility workhorse.",
          pairingScore: 92,
          currentPairs: ["Blue Denim", "Black Chinos"],
          brandEstimate: "US Polo / Snitch",
          retailValueEst: "₹1,899"
        },
        {
          id: "aditya_item_2",
          name: "Pink & Sky Blue Checked Shirt",
          category: "Tops",
          subCategory: "Casual Button-Down",
          clothType: "Woven Cotton Sheeting",
          wardrobeType: "Weekend Casual",
          color: "Rose Pink & Cobalt Check",
          conditionScore: 6.2,
          conditionLabel: "Faded Placket & Collar",
          wearFrequency: "1-2x / month",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831523_6728794e.jpg"],
          status: "REPLACE",
          statusReason: "Noticeable wash fade across collar points. Replace with breathable slub linen shirt.",
          pairingScore: 65,
          currentPairs: ["Light Wash Denim"],
          brandEstimate: "Highlander / Roadster",
          retailValueEst: "₹999"
        },
        {
          id: "aditya_item_3",
          name: "Abstract Camo Marble Polo",
          category: "Tops",
          subCategory: "Polo T-Shirt",
          clothType: "Mercerised Cotton Jersey",
          wardrobeType: "Evening Social",
          color: "Chalk White, Grey & Charcoal",
          conditionScore: 7.9,
          conditionLabel: "Good Condition",
          wearFrequency: "2x / month",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831790_7aa27a1f.jpg"],
          status: "KEEP",
          statusReason: "Contemporary contrast collar pop. Clean fabric drape.",
          pairingScore: 84,
          currentPairs: ["Black Chinos"],
          brandEstimate: "Jack & Jones",
          retailValueEst: "₹1,499"
        },
        {
          id: "aditya_item_4",
          name: "Indigo Slub Linen Short Kurta",
          category: "Ethnic & Festive",
          subCategory: "Short Kurta Shirt",
          clothType: "Slub Linen-Cotton Weave",
          wardrobeType: "Festive Occasion / Temple",
          color: "Midnight Indigo",
          conditionScore: 9.3,
          conditionLabel: "Crisp & Pristine",
          wearFrequency: "Festive / Family",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831823_7659c378.jpg"],
          status: "KEEP",
          statusReason: "Sharp mandarin band and deep dye. Modern Indian festive silhouette.",
          pairingScore: 95,
          currentPairs: ["Black Chinos"],
          brandEstimate: "FabIndia / Manyavar",
          retailValueEst: "₹2,499"
        },
        {
          id: "aditya_item_5",
          name: "Medium-Wash Straight Denim",
          category: "Bottoms",
          subCategory: "Jeans",
          clothType: "12 oz Ring-Spun Denim",
          wardrobeType: "Daily Essential",
          color: "Indigo Mid-Wash",
          conditionScore: 7.5,
          conditionLabel: "Comfort Fit Wear",
          wearFrequency: "8-10x / month",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831524_9a688f86.jpg"],
          status: "KEEP",
          statusReason: "Broken-in comfort; seams are sound, standard workhorse bottom for tech workplace.",
          pairingScore: 90,
          currentPairs: ["Navy Polo", "Checked Shirt"],
          brandEstimate: "Levi's 511 Slim",
          retailValueEst: "₹2,799"
        },
        {
          id: "aditya_item_6",
          name: "Jet Black Slim Tapered Chinos",
          category: "Bottoms",
          subCategory: "Chinos",
          clothType: "Cotton Twill Stretch",
          wardrobeType: "Formal & Evening Semi-Formal",
          color: "Jet Black",
          conditionScore: 8.9,
          conditionLabel: "Deep Black Dye",
          wearFrequency: "5x / month",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831823_7659c378.jpg"],
          status: "KEEP",
          statusReason: "Deep dye retained without ash fade. Clean ankle break matches both ethnic kurtas and polos.",
          pairingScore: 98,
          currentPairs: ["Navy Kurta", "Camo Polo", "Navy Polo"],
          brandEstimate: "Zara Man",
          retailValueEst: "₹2,299"
        }
      ],
      recommendations: [
        {
          id: "rec_m_1",
          type: "ADD",
          title: "Breathable Sand Beige Textured Overshirt",
          brand: "Snitch",
          productUrl: "https://www.myntra.com/overshirts?f=Color%3ABeige%2CKhaki&rawQuery=mens%20beige%20overshirt",
          sourceStore: "Myntra",
          price: 1499,
          originalPrice: 2499,
          discount: "40% OFF",
          rating: 4.4,
          ratingsCount: 3820,
          predictedSize: "Size L (Snitch)",
          fitNote: "Slim cut with structured shoulder. Size L fits 40-inch chest without boxiness.",
          imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80",
          whyBuyLogic: [
            "Solves your 65% monochrome blue over-reliance by introducing a high-contrast warm neutral.",
            "Unlocks 5 completely new outfit combinations using your existing Navy Polo, Black Chinos, and Blue Denim.",
            "Ideal for air-conditioned Bengaluru offices and breezy evening outings."
          ],
          demographicProof: {
            acceptanceRate: "89% of tech professionals in Bengaluru kept this item",
            returnsRate: "Only 3.8% return rate (industry avg: 32%)",
            socialSentiment: "Ranked #1 Top-Rated Layer on Myntra for young working men."
          },
          permutations: [
            {
              title: "Smart Casual Office Hybrid",
              pieces: ["Sand Beige Overshirt", "Navy Pique Polo (#1)", "Jet Black Chinos (#6)"],
              description: "Sharp color separation between dark inner and outerwear. Perfect for sprint reviews and Indiranagar dinners.",
              occasion: "Office & Dining"
            },
            {
              title: "Weekend Cafe & Travel",
              pieces: ["Sand Beige Overshirt", "White Inner Tee", "Medium-Wash Jeans (#5)"],
              description: "Relaxed street-style silhouette with rolled cuffs. Breathable cotton weave keeps you comfortable in midday traffic.",
              occasion: "Weekend Chill"
            },
            {
              title: "Contemporary Fusion Layer",
              pieces: ["Sand Beige Overshirt", "Navy Slub Kurta (#4)", "Black Chinos (#6)"],
              description: "Earthy beige layered over rich indigo kurta creates a distinguished modern Indian aesthetic.",
              occasion: "Festive Evening"
            }
          ],
          matchingArtefacts: [
            { id: "art_tan_loafers", name: "Minimalist Tan Suede Loafers", price: 2199, brand: "Red Tape", imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&auto=format&fit=crop&q=80" },
            { id: "art_canvas_belt", name: "Matte Olive Canvas Belt", price: 599, brand: "Wrogn", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=80" }
          ]
        },
        {
          id: "rec_m_2",
          type: "REPLACE",
          title: "Sage Green Textured Relaxed Linen Shirt",
          brand: "Rare Rabbit",
          productUrl: "https://www.amazon.in/s?k=rare+rabbit+linen+shirt+men",
          sourceStore: "Amazon Fashion",
          price: 2199,
          originalPrice: 3999,
          discount: "45% OFF",
          rating: 4.6,
          ratingsCount: 1940,
          predictedSize: "Size 40 / L (Rare Rabbit)",
          fitNote: "Tailored chest cut. Flattering taper across the waist.",
          imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80",
          whyBuyLogic: [
            "Direct 1-to-1 replacement for the faded pink check shirt in photo #2.",
            "Breathable slub linen suppresses sweat marks in Bengaluru's unpredictable weather.",
            "Elevates weekend outings from college-student check to mature smart-casual."
          ],
          demographicProof: {
            acceptanceRate: "92% in-cart conversion for male shoppers aged 25-28",
            returnsRate: "4.1% return rate",
            socialSentiment: "Praised in 400+ reviews for wrinkle-resistant slub texture."
          },
          permutations: [
            {
              title: "Earthy Weekend Outdoor",
              pieces: ["Sage Green Linen Shirt", "Medium-Wash Blue Jeans (#5)", "White Leather Sneakers"],
              description: "Replaces the worn plaid shirt with an organic, subtle sage hue that flatters Indian skin tones.",
              occasion: "Weekend Day Out"
            },
            {
              title: "Cocktail Evening",
              pieces: ["Sage Green Linen Shirt", "Jet Black Chinos (#6)", "Dark Brown Belt"],
              description: "Clean tucked-in look with collar unbuttoned two buttons for an effortless European drape.",
              occasion: "Date Night"
            }
          ],
          matchingArtefacts: [
            { id: "art_chinos_cream", name: "Off-White Relaxed Cotton Chinos", price: 1799, brand: "Snitch", imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&auto=format&fit=crop&q=80" },
            { id: "art_kolhapuri_tan", name: "Handcrafted Tan Leather Mules / Kolhapuris", price: 1499, brand: "Metro", imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&auto=format&fit=crop&q=80" }
          ]
        },
        {
          id: "rec_m_3",
          type: "ADD",
          title: "Handcrafted Tan Leather Kolhapuri Mules",
          brand: "FabIndia / Metro",
          productUrl: "https://www.flipkart.com/search?q=men%20tan%20leather%20kolhapuri%20chappal",
          sourceStore: "Flipkart",
          price: 1890,
          originalPrice: 2899,
          discount: "35% OFF",
          rating: 4.5,
          ratingsCount: 2210,
          predictedSize: "UK / India 9 (Euro 43)",
          fitNote: "True to Indian sizing. Padded memory foam footbed prevents traditional sole hardness.",
          imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80",
          whyBuyLogic: [
            "Fills the critical ethnic footwear void exposed in photo #6 (temple/palace namaste pose).",
            "Transforms the Navy short kurta into a complete head-to-toe traditional ensemble.",
            "Can also be styled effortlessly with rolled chinos and a white linen shirt."
          ],
          demographicProof: {
            acceptanceRate: "87% purchase rate for festive wear pairings in Karnataka & Maharashtra",
            returnsRate: "2.9% return rate",
            socialSentiment: "Top-rated comfort footwear for extended wedding & temple events."
          },
          permutations: [
            {
              title: "Temple & Traditional Puja Ensemble",
              pieces: ["Tan Leather Kolhapuris", "Navy Slub Linen Kurta (#4)", "Jet Black Chinos (#6)"],
              description: "Solves the exact bare-foot/slip-on footwear void seen in temple photo #6.",
              occasion: "Religious / Family"
            }
          ],
          matchingArtefacts: [
            { id: "art_braided_belt", name: "Woven Brass Buckle Braided Belt", price: 799, brand: "Fossil", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=80" }
          ]
        }
      ]
    },
    {
      id: "user_ananya",
      name: "Ananya",
      gender: "female",
      age: 25,
      profession: "Creative & Brand Strategist",
      city: "Bengaluru, Karnataka",
      demographicTag: "Urban Creative Professional (23-28 Yrs)",
      avatar: "/wardrobe_assets/media_1794917831520_bfd43708.jpg",
      bodyProportions: {
        height: "5'3\" (160 cm)",
        heightCm: 160,
        weight: "52 kg",
        weightKg: 52,
        build: "Petite to Regular Indian Frame",
        chest: "34 inches",
        chestVal: 34,
        waist: "28 inches",
        waistVal: 28,
        shoulder: "15 inches",
        shoulderVal: 15,
        armLength: "21 inches",
        armLengthVal: 21,
        inseam: "28 inches",
        inseamVal: 28,
        neck: "13.5 inches",
        neckVal: 13.5,
        bodyType: "Petite Hourglass / Rectangle",
        bmi: 20.3,
        obesityCategory: "Normal / Lean Petite",
        skinToneHex: "#D9A066",
        skinToneName: "Medium Warm Indian Tan",
        skinUndertone: "Warm Golden / Peach",
        colorSeason: "Warm Spring (Soft coral, dusty rose, ecru, rich black, sage)"
      },
      detectedWornSizes: [
        {
          garment: "Boucle Teddy Fleece Pullover (Photo #1)",
          detectedFit: "Relaxed drop-shoulder cut, cozy neck framing",
          estimatedWornSize: "Size S in Uniqlo / H&M",
          brandAccuracy: "95% Confidence",
          fitVerdict: "Ideal drape without drowning 5'3\" frame"
        },
        {
          garment: "Dusty Rose Longline Shrug & Trousers (Photo #2)",
          detectedFit: "Vertical open drape + High-rise ankle break",
          estimatedWornSize: "Size S (Shrug) / Size 28 (Pants in Zara)",
          brandAccuracy: "93% Confidence",
          fitVerdict: "Flattering torso lengthening"
        },
        {
          garment: "Floral Embroidered Black Jacket (Photo #5)",
          detectedFit: "Cropped bolero length, tailored shoulder points",
          estimatedWornSize: "Free Size / XS-S in Jaypore / Kashmiri Artisanal",
          brandAccuracy: "96% Confidence",
          fitVerdict: "Exquisite artisanal posture fit"
        }
      ],
      brandSizingFramework: calculateBrandSizes('female', 34, 28, "5'3\"", 21, 28, "Petite Hourglass"),
      wardrobeHealth: {
        healthScore: 84,
        totalItemsDetected: 5,
        keepCount: 4,
        replaceCount: 1,
        addCount: 2,
        purgeCount: 0,
        dominantPalette: ["Dusty Rose / Coral", "Jet Black", "Chalk White", "Slate Blue", "Multi Floral"],
        diversityDeficit: "Heavy reliance on a single black bottom silhouette. Lacks fluid light-toned bottoms (ecru/ivory wide leg) and fusion oxidized jewellery."
      },
      items: [
        {
          id: "ananya_item_1",
          name: "Dusty Rose Open-Front Longline Shrug",
          category: "Layering / Outerwear",
          subCategory: "Kimono Shrug",
          clothType: "Rayon-Viscose Crepe",
          wardrobeType: "Casual Layering / Travel",
          color: "Dusty Salmon Pink with Red Rose Motif",
          conditionScore: 8.6,
          conditionLabel: "Fluid Flow",
          wearFrequency: "3-4x / month",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831523_6728794e.jpg"],
          status: "KEEP",
          statusReason: "Flattering vertical elongation for 5'3\" frame. Adds feminine color pop.",
          pairingScore: 94,
          currentPairs: ["White Graphic Tee", "Black Trousers"],
          brandEstimate: "Global Desi / Vero Moda",
          retailValueEst: "₹1,699"
        },
        {
          id: "ananya_item_2",
          name: "Typography White Graphic Tee",
          category: "Tops",
          subCategory: "Crew Neck Graphic Tee",
          clothType: "Lightweight Cotton (160 GSM)",
          wardrobeType: "Street Casual",
          color: "Chalk White with Pink Typography",
          conditionScore: 6.9,
          conditionLabel: "Rib Neck Stretch",
          wearFrequency: "Weekly",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831523_6728794e.jpg"],
          status: "REPLACE",
          statusReason: "Neckband is beginning to ripple from wash cycles. Recommend upgrading to heavyweight 220 GSM boxy tee.",
          pairingScore: 78,
          currentPairs: ["Dusty Rose Shrug", "Black Trousers"],
          brandEstimate: "Ginger by Lifestyle",
          retailValueEst: "₹799"
        },
        {
          id: "ananya_item_3",
          name: "Black Tailored High-Rise Pants",
          category: "Bottoms",
          subCategory: "Trousers",
          clothType: "Poly-Viscose Stretch Weave",
          wardrobeType: "Universal Workhorse",
          color: "Solid Jet Black",
          conditionScore: 9.1,
          conditionLabel: "Pristine Seams",
          wearFrequency: "6-8x / month",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831523_6728794e.jpg"],
          status: "KEEP",
          statusReason: "Anchor piece. High-waist silhouette flatters petite proportions and pairs seamlessly across western and fusion layers.",
          pairingScore: 98,
          currentPairs: ["Dusty Rose Shrug", "White Tee", "Embroidered Festive Jacket"],
          brandEstimate: "Marks & Spencer / H&M",
          retailValueEst: "₹2,299"
        },
        {
          id: "ananya_item_4",
          name: "Kashmiri Resham Embroidered Jacket",
          category: "Indo-Western & Festive",
          subCategory: "Embroidered Crop Jacket",
          clothType: "Black Base with Silk Resham Needlework",
          wardrobeType: "Festive Evening / Fusion",
          color: "Jet Black with Multicolour Pastel Flowers",
          conditionScore: 9.6,
          conditionLabel: "Showstopper Craft",
          wearFrequency: "Festive Dinners",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831790_7aa27a1f.jpg"],
          status: "KEEP",
          statusReason: "High-value artisanal fusion piece. Rich floral needlework elevates any plain black inner into an Instagram-ready look.",
          pairingScore: 96,
          currentPairs: ["Black Inner Top", "Dangling Earrings"],
          brandEstimate: "Kashmiri Artisanal / Jaypore",
          retailValueEst: "₹3,799"
        },
        {
          id: "ananya_item_5",
          name: "Slate Blue Boucle Teddy Fleece Pullover",
          category: "Winterwear / Loungewear",
          subCategory: "Textured Sweater",
          clothType: "Sherpa Boucle Fleece Knit",
          wardrobeType: "Cozy Casual / Travel",
          color: "Slate / Dusty Powder Blue",
          conditionScore: 8.7,
          conditionLabel: "Soft Plush Pile",
          wearFrequency: "Seasonal / Travel",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831520_bfd43708.jpg"],
          status: "KEEP",
          statusReason: "Charming plush texture, flattering neckline for close-ups, cozy winter staple for hill trips and AC lounges.",
          pairingScore: 88,
          currentPairs: ["Denim Jeans", "Fleece Joggers"],
          brandEstimate: "Uniqlo Fleece / H&M",
          retailValueEst: "₹1,999"
        }
      ],
      recommendations: [
        {
          id: "rec_f_1",
          type: "ADD",
          title: "High-Waist Pleated Ecru Wide-Leg Palazzos",
          brand: "Mango / FabAlley",
          productUrl: "https://www.myntra.com/trousers?f=Color%3AOff%20White%2CCream&rawQuery=women%20ecru%20wide%20leg%20trousers",
          sourceStore: "Myntra",
          price: 1899,
          originalPrice: 3290,
          discount: "42% OFF",
          rating: 4.5,
          ratingsCount: 4120,
          predictedSize: "Size S / 28 (Mango)",
          fitNote: "Elasticated back waistband accommodates 28-inch waist while giving dramatic wide-leg flow.",
          imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80",
          whyBuyLogic: [
            "Instantly breaks your reliance on black pants (photo #2).",
            "Creates a stunning bright contrast with the black multi-floral embroidered jacket (photo #5).",
            "Combines with the dusty rose shrug to create an airy bohemian daytime look."
          ],
          demographicProof: {
            acceptanceRate: "91% of female creatives in Bengaluru & Mumbai kept this item",
            returnsRate: "3.2% return rate (wide-leg has highest fit tolerance)",
            socialSentiment: "Trend #1 on Instagram Reels for 'Indo-Western Workwear'."
          },
          permutations: [
            {
              title: "Bohemian Festive Showstopper",
              pieces: ["Ecru Wide-Leg Palazzos", "Black Floral Embroidered Jacket (#4)", "Oxidized Silver Earrings"],
              description: "Light cream base makes the colorful pastel Resham embroidery pop dramatically.",
              occasion: "Festive Dinner & Cocktail"
            },
            {
              title: "Airy Sunday Brunch",
              pieces: ["Ecru Wide-Leg Palazzos", "Dusty Rose Shrug (#1)", "White Core Tee (#2)"],
              description: "Creates an elongating, breathable silhouette that looks graceful in outdoor cafe settings.",
              occasion: "Weekend Outing"
            }
          ],
          matchingArtefacts: [
            { id: "art_silver_jhumkas", name: "Handcrafted Oxidized Silver Jhumka Hoops", price: 699, brand: "Zaveri Pearls", imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&auto=format&fit=crop&q=80" },
            { id: "art_rose_mules", name: "Rose-Gold Metallic Strappy Flat Mules", price: 1299, brand: "Catwalk", imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&auto=format&fit=crop&q=80" }
          ]
        },
        {
          id: "rec_f_2",
          type: "REPLACE",
          title: "Minimalist Heavyweight Boxy Supima Cotton Tee (240 GSM)",
          brand: "The Souled Store / Uniqlo",
          productUrl: "https://www.amazon.in/s?k=women+supima+cotton+white+tshirt",
          sourceStore: "Amazon Fashion",
          price: 899,
          originalPrice: 1499,
          discount: "40% OFF",
          rating: 4.6,
          ratingsCount: 5820,
          predictedSize: "Size S (Boxy Fit)",
          fitNote: "Dropped shoulder cut. Thick rib neckband will not warp over 50+ wash cycles.",
          imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
          whyBuyLogic: [
            "Replaces the rippling graphic tee from photo #2 with an enduring clean-girl wardrobe foundation.",
            "Neutral canvas allows the dusty rose shrug or any statement jacket to be the hero.",
            "Zero print cracking or color bleed."
          ],
          demographicProof: {
            acceptanceRate: "95% repeat purchase rate",
            returnsRate: "1.9% return rate",
            socialSentiment: "Celebrated across fashion subreddits as the ultimate opaque white t-shirt."
          },
          permutations: [
            {
              title: "Clean Girl Core",
              pieces: ["Heavyweight Supima Tee", "Black Tailored Pants (#3)", "Minimal Gold Chain"],
              description: "Structured, non-see-through cotton gives a sophisticated minimalist workplace uniform.",
              occasion: "Creative Agency Work"
            }
          ],
          matchingArtefacts: [
            { id: "art_gold_chain", name: "Minimalist Triple-Layer Gold Chain", price: 499, brand: "Giva", imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&auto=format&fit=crop&q=80" }
          ]
        },
        {
          id: "rec_f_3",
          type: "ADD",
          title: "Artisanal Oxidized Silver Mirror-Work Statement Set",
          brand: "Jaypore / Sangeeta Boochra",
          productUrl: "https://www.flipkart.com/search?q=oxidised%20silver%20jewellery%20set%20women",
          sourceStore: "Flipkart",
          price: 1199,
          originalPrice: 2499,
          discount: "52% OFF",
          rating: 4.7,
          ratingsCount: 1640,
          predictedSize: "Adjustable Free Size with Dori",
          fitNote: "German silver alloy with skin-safe anti-tarnish coating.",
          imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80",
          whyBuyLogic: [
            "Specifically curated to complement your black multi-floral embroidered jacket (photo #5).",
            "Creates viral Instagram aesthetic when worn with black crop top and high-waist bottoms.",
            "Traditional Indian heritage touch that transitions effortlessly into cocktail evenings."
          ],
          demographicProof: {
            acceptanceRate: "93% buyer satisfaction in festive & wedding seasons",
            returnsRate: "1.5% return rate",
            socialSentiment: "Featured in top 10 Indo-Western bridal/festive guest edits."
          },
          permutations: [
            {
              title: "Royal Indo-Western Glam",
              pieces: ["Mirror Choker Set", "Floral Embroidered Jacket (#4)", "Black High-Rise Pants (#3)"],
              description: "Harmonizes mirror reflection with Resham thread embroidery for festive evenings.",
              occasion: "Diwali / Wedding Reception"
            }
          ],
          matchingArtefacts: [
            { id: "art_silk_clutch", name: "Raw Silk Black Envelope Clutch with Zari Border", price: 999, brand: "Biba", imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=80" }
          ]
        }
      ]
    }
  ],

  instagramTrends: [
    {
      id: "trend_1",
      targetGender: "female",
      title: "Boho-Chic Fusion: Embroidered Crop Shrug & Fluid Palazzos",
      influencerHandle: "@kritika_khurana_style",
      videoUrl: "https://www.instagram.com/reel/C3b4X9vK8wz/",
      platform: "Instagram Reel",
      aestheticName: "Modern Desi Girl Aesthetic",
      trendVelocity: "🔥 Viral (2.4M Reels Views this week)",
      heroImage: "/wardrobe_assets/media_1794917831790_7aa27a1f.jpg",
      inspirationDesc: "Directly mimics Ananya's black floral embroidered jacket aesthetic, paired with breathable high-rise linen palazzos and oxidized silver jewellery for effortless street & festive elegance.",
      alreadyOwnsMatchingItem: {
        name: "Black Resham Floral Embroidered Jacket",
        itemId: "ananya_item_4",
        savingValue: 2499
      },
      bundleItems: [
        {
          name: "Black Resham Floral Embroidered Crop Shrug",
          brand: "Jaypore / Aks",
          price: 2499,
          link: "https://www.myntra.com/shrugs?f=Color%3ABlack&rawQuery=embroidered%20shrug",
          store: "Myntra",
          isOwned: true
        },
        {
          name: "Ecru Pleated High-Rise Wide-Leg Trousers",
          brand: "Mango",
          price: 1899,
          link: "https://www.myntra.com/trousers?f=Color%3AOff%20White&rawQuery=pleated%20palazzo",
          store: "Myntra",
          isOwned: false
        },
        {
          name: "Boho Oxidized Silver Mirror Jhumkas",
          brand: "Zaveri Pearls",
          price: 599,
          link: "https://www.amazon.in/s?k=oxidised+jhumkas+for+women",
          store: "Amazon",
          isOwned: false
        }
      ],
      bundleTotal: 4997,
      bundleDiscountPrice: 4249,
      smartNetPrice: 2199,
      bundleSavings: "Save 15% (₹748 off) when bundled"
    },
    {
      id: "trend_2",
      targetGender: "female",
      title: "Airport & Hill-Station Cozy: Boucle Teddy Knit & Relaxed Denims",
      influencerHandle: "@komalpandeyofficial_edits",
      videoUrl: "https://www.youtube.com/shorts/v7k2_YcoP-E",
      platform: "YouTube Shorts",
      aestheticName: "Vanilla Girl & Cozy Luxe",
      trendVelocity: "📈 Trending (+48% search volume this month)",
      heroImage: "/wardrobe_assets/media_1794917831520_bfd43708.jpg",
      inspirationDesc: "Echoes Ananya's slate blue teddy fleece pullover, styled with relaxed straight denim and sleek mini sunglasses for off-duty comfort.",
      alreadyOwnsMatchingItem: {
        name: "Slate Blue Teddy Boucle Fleece Pullover",
        itemId: "ananya_item_5",
        savingValue: 1999
      },
      bundleItems: [
        {
          name: "Powder Blue Boucle Fleece Quarter-Zip Pullover",
          brand: "H&M / Uniqlo",
          price: 1999,
          link: "https://www.myntra.com/sweaters?f=Color%3ABlue&rawQuery=fleece%20pullover",
          store: "Myntra",
          isOwned: true
        },
        {
          name: "Vintage Wash High-Rise Straight Jeans",
          brand: "Levi's",
          price: 2699,
          link: "https://www.amazon.in/s?k=levis+women+straight+jeans",
          store: "Amazon",
          isOwned: false
        },
        {
          name: "Tortoise-Shell Oval Minimalist Acetate Sunglasses",
          brand: "Vincent Chase",
          price: 999,
          link: "https://www.flipkart.com/search?q=sunglasses+women+retro+oval",
          store: "Flipkart",
          isOwned: false
        }
      ],
      bundleTotal: 5697,
      bundleDiscountPrice: 4849,
      smartNetPrice: 3299,
      bundleSavings: "Save 15% (₹848 off) when bundled"
    },
    {
      id: "trend_3",
      targetGender: "male",
      title: "Old Money Casual: Mandarin Slub Kurta & Tapered Black Chinos",
      influencerHandle: "@tarun_chawla_men",
      videoUrl: "https://www.instagram.com/reel/C2a8L1_vG7k/",
      platform: "Instagram Reel",
      aestheticName: "Modern Regal Indian Aesthetic",
      trendVelocity: "🔥 Viral (1.8M Reels Views)",
      heroImage: "/wardrobe_assets/media_1794917831823_7659c378.jpg",
      inspirationDesc: "Directly inspired by Aditya's navy mandarin-collar short kurta at the palace/temple. Upgraded with handcrafted tan leather footwear and a braided belt for an effortlessly suave look.",
      alreadyOwnsMatchingItem: {
        name: "Indigo Slub Linen Short Kurta",
        itemId: "aditya_item_4",
        savingValue: 2199
      },
      bundleItems: [
        {
          name: "Midnight Indigo Pure Slub Linen Short Kurta",
          brand: "FabIndia / Manyavar",
          price: 2199,
          link: "https://www.myntra.com/men-kurtas?f=Color%3ABlue&rawQuery=short%20kurta%20men",
          store: "Myntra",
          isOwned: true
        },
        {
          name: "Jet Black Tailored Stretch Chinos",
          brand: "Rare Rabbit / Zara",
          price: 2299,
          link: "https://www.amazon.in/s?k=mens+black+slim+chinos",
          store: "Amazon",
          isOwned: true
        },
        {
          name: "Handmade Tan Leather Padded Kolhapuris",
          brand: "Metro / Red Tape",
          price: 1699,
          link: "https://www.flipkart.com/search?q=men+leather+kolhapuri+mules",
          store: "Flipkart",
          isOwned: false
        }
      ],
      bundleTotal: 6197,
      bundleDiscountPrice: 5299,
      smartNetPrice: 1699,
      bundleSavings: "Save 15% (₹898 off) when bundled"
    },
    {
      id: "trend_4",
      targetGender: "male",
      title: "Urban Tech Casual: Structured Pique Polo & Clean Denim",
      influencerHandle: "@streetstyle_bengaluru",
      videoUrl: "https://www.youtube.com/shorts/q8J7_W12B9k",
      platform: "YouTube Shorts",
      aestheticName: "Bangalore Founder / Tech Minimalist",
      trendVelocity: "⚡ Sustained Staple (#1 in Tier-1 IT Hubs)",
      heroImage: "/wardrobe_assets/media_1794917831524_9a688f86.jpg",
      inspirationDesc: "Refines Aditya's signature office polo & denim fit check into an optimized daily uniform with zero decision fatigue.",
      alreadyOwnsMatchingItem: {
        name: "Structured Navy Pique Polo",
        itemId: "aditya_item_1",
        savingValue: 1299
      },
      bundleItems: [
        {
          name: "Navy Tipped Collar 240 GSM Pique Polo",
          brand: "Snitch",
          price: 1299,
          link: "https://www.myntra.com/tshirts?f=Color%3ANavy%20Blue&rawQuery=snitch%20polo",
          store: "Myntra",
          isOwned: true
        },
        {
          name: "Mid-Wash Ring-Spun Slim 512 Jeans",
          brand: "Levi's",
          price: 2999,
          link: "https://www.amazon.in/s?k=levis+512+slim+tapered+men",
          store: "Amazon",
          isOwned: true
        },
        {
          name: "Minimalist Clean White Leather Low-Top Sneakers",
          brand: "Puma / HRX",
          price: 2499,
          link: "https://www.flipkart.com/search?q=white+leather+sneakers+men",
          store: "Flipkart",
          isOwned: false
        }
      ],
      bundleTotal: 6797,
      bundleDiscountPrice: 5799,
      smartNetPrice: 2499,
      bundleSavings: "Save 15% (₹998 off) when bundled"
    }
  ]
};
