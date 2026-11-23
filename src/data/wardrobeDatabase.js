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
        weight: "74 kg",
        build: "Medium Athletic / Broad Shoulders",
        chest: "40 inches",
        waist: "34 inches",
        shoulder: "18 inches",
        inseam: "31 inches"
      },
      brandSizingFramework: {
        "Snitch": {
          predictedSize: "L",
          fitRecommendation: "Slim / Tapered Fit — Snitch runs snug in chest; Size L gives clean shoulder alignment without chest pull.",
          fitConfidence: 94
        },
        "Rare Rabbit": {
          predictedSize: "40 / L",
          fitRecommendation: "Tailored Slim — Chest 40 matches exactly; high armhole allows sharp posture.",
          fitConfidence: 92
        },
        "Zara India": {
          predictedSize: "M",
          fitRecommendation: "Regular Fit — Euro chest 39-41 provides modern drape; Size L sleeves would be 1.5 inches too long.",
          fitConfidence: 89
        },
        "Levi's": {
          predictedSize: "34W x 32L",
          fitRecommendation: "511 Slim or 512 Tapered — Mid-rise 34 natural waist prevents waist gap while allowing thigh room.",
          fitConfidence: 96
        },
        "Manyavar / FabIndia": {
          predictedSize: "40 (Medium)",
          fitRecommendation: "Ethnic Regular — Garment chest 43 inches allows 3 inches of traditional ease for festive movement.",
          fitConfidence: 95
        },
        "Marks & Spencer": {
          predictedSize: "M (Regular Fit)",
          fitRecommendation: "British Standard — True to size 40 inch chest, relaxed torso cut.",
          fitConfidence: 91
        }
      },
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
          name: "Structured Navy Pique Polo with Contrast Trim",
          category: "Tops",
          subCategory: "Polo T-Shirt",
          clothType: "Pique Combed Cotton (240 GSM)",
          wardrobeType: "Smart Casual / Office Hybrid",
          color: "Deep Navy with Heather Grey Collar & White Tipped Trim",
          conditionScore: 8.8,
          conditionLabel: "Excellent Condition",
          wearFrequency: "High (3-4 times/month)",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831523_a44ce8bf.jpg", "/wardrobe_assets/media_1794917831524_9a688f86.jpg"],
          status: "KEEP",
          statusReason: "Excellent collar structure retention, zero fabric pilling, versatile anchor for both tech meetings and casual dining.",
          pairingScore: 92,
          currentPairs: ["Medium Wash Straight Jeans", "Black Tapered Chinos"],
          brandEstimate: "US Polo / Tommy Hilfiger / Rare Rabbit",
          retailValueEst: "₹1,899"
        },
        {
          id: "aditya_item_2",
          name: "Pink & Sky Blue Checked Casual Shirt",
          category: "Tops",
          subCategory: "Casual Button-Down",
          clothType: "Woven Cotton Sheeting (Lightweight)",
          wardrobeType: "Weekend Casual / Outings",
          color: "Rose Pink, Cobalt Blue & White Check",
          conditionScore: 6.2,
          conditionLabel: "Worn & Faded Placket",
          wearFrequency: "Medium (1-2 times/month)",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831523_6728794e.jpg"],
          status: "REPLACE",
          statusReason: "Noticeable wash fade across collar points and cuffs; silhouette is boxy compared to modern Cuban collar relaxed linen shirts. Replace with breathable pastel linen.",
          pairingScore: 65,
          currentPairs: ["Light Wash Denim"],
          brandEstimate: "Highlander / Roadster",
          retailValueEst: "₹999"
        },
        {
          id: "aditya_item_3",
          name: "Monochrome Abstract Camo Marble Polo",
          category: "Tops",
          subCategory: "Polo T-Shirt",
          clothType: "Mercerised Cotton Jersey",
          wardrobeType: "Evening Social / Dinner",
          color: "Chalk White, Smoke Grey & Charcoal with Yellow Accent Collar",
          conditionScore: 7.9,
          conditionLabel: "Good Condition",
          wearFrequency: "Moderate (2 times/month)",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831790_7aa27a1f.jpg"],
          status: "KEEP",
          statusReason: "Unique contemporary pattern with contrast collar pop. Good drape and minimal fabric thinning.",
          pairingScore: 84,
          currentPairs: ["Black Tapered Chinos"],
          brandEstimate: "Monte Carlo / Jack & Jones",
          retailValueEst: "₹1,499"
        },
        {
          id: "aditya_item_4",
          name: "Textured Navy Linen-Cotton Short Kurta",
          category: "Ethnic & Festive",
          subCategory: "Mandarin Collar Kurta Shirt",
          clothType: "Slub Linen-Cotton Weave",
          wardrobeType: "Festive Occasion / Temple / Cultural",
          color: "Midnight Indigo",
          conditionScore: 9.3,
          conditionLabel: "Pristine / Crisp",
          wearFrequency: "Occasional (Festivals / Family)",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831823_7659c378.jpg"],
          status: "KEEP",
          statusReason: "Immaculate fabric lustre and sharp mandarin band. Perfect modern Indian silhouette for pujas and celebrations.",
          pairingScore: 95,
          currentPairs: ["Black Slim Chinos"],
          brandEstimate: "FabIndia / Manyavar / Jaypore",
          retailValueEst: "₹2,499"
        },
        {
          id: "aditya_item_5",
          name: "Medium-Wash Blue Straight-Leg Denim",
          category: "Bottoms",
          subCategory: "Jeans",
          clothType: "12 oz Ring-Spun Denim (99% Cotton, 1% Elastane)",
          wardrobeType: "Daily Essential",
          color: "Indigo Mid-Wash with Light Thigh Whisker Details",
          conditionScore: 7.5,
          conditionLabel: "Moderate Wear (Comfort Fit)",
          wearFrequency: "Very High (8-10 times/month)",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831524_9a688f86.jpg"],
          status: "KEEP",
          statusReason: "Broken-in comfort; seams are sound, standard workhorse bottom for tech workplace.",
          pairingScore: 90,
          currentPairs: ["Navy Polo", "Checked Shirt"],
          brandEstimate: "Levi's 511 / Flying Machine",
          retailValueEst: "₹2,799"
        },
        {
          id: "aditya_item_6",
          name: "Jet Black Slim Tapered Cotton Chinos",
          category: "Bottoms",
          subCategory: "Chinos",
          clothType: "Cotton Twill Stretch",
          wardrobeType: "Formal & Evening Semi-Formal",
          color: "Jet Black",
          conditionScore: 8.9,
          conditionLabel: "Great Shape & Deep Black Dye",
          wearFrequency: "High (5 times/month)",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831823_7659c378.jpg"],
          status: "KEEP",
          statusReason: "Deep dye retained without ash fade. Clean ankle break matches both ethnic kurtas and smart casual polos.",
          pairingScore: 98,
          currentPairs: ["Navy Kurta", "Marble Camo Polo", "Navy Polo"],
          brandEstimate: "Zara Man / Blackberrys",
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
          matchingArtefacts: [
            { name: "Minimalist Tan Suede Loafers", price: 2199, brand: "Red Tape / Woodland" },
            { name: "Matte Olive Canvas Belt", price: 599, brand: "Wrogn" }
          ]
        },
        {
          id: "rec_m_2",
          type: "REPLACE",
          title: "Sage Green Textured Relaxed Linen-Cotton Shirt",
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
          matchingArtefacts: [
            { name: "Off-White Relaxed Cotton Chinos", price: 1799, brand: "Snitch" },
            { name: "Handcrafted Tan Leather Mules / Kolhapuris", price: 1499, brand: "Metro" }
          ]
        },
        {
          id: "rec_m_3",
          type: "ADD",
          title: "Handcrafted Tan Leather Kolhapuri Mules with Padded Footbed",
          brand: "FabIndia / Metro",
          productUrl: "https://www.flipkart.com/search?q=men%20tan%20leather%20kolhapuri%20chappal",
          sourceStore: "Flipkart",
          price: 1890,
          originalPrice: 2899,
          discount: "35% OFF",
          rating: 4.5,
          ratingsCount: 2210,
          predictedSize: "UK / India 9 (Euro 43)",
          fitNote: "True to Indian sizing. Padded memory foam footbed prevents traditional Kolhapuri sole hardness.",
          imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80",
          whyBuyLogic: [
            "Fills the critical ethnic footwear void exposed in photo #6 (temple/palace namaste pose).",
            "Transforms the Navy short kurta into a complete head-to-toe traditional ensemble.",
            "Can also be styled effortlessly with rolled chinos and a white linen shirt."
          ],
          demographicProof: {
            acceptanceRate: "87% purchase rate for festive festive wear pairings in Karnataka & Maharashtra",
            returnsRate: "2.9% return rate",
            socialSentiment: "Top-rated comfort footwear for extended wedding & temple events."
          },
          matchingArtefacts: [
            { name: "Woven Brass Buckle Braided Belt", price: 799, brand: "Fossil" }
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
        weight: "52 kg",
        build: "Petite to Regular Indian Frame",
        bust: "34 inches",
        waist: "28 inches",
        hip: "36 inches",
        inseam: "28 inches"
      },
      brandSizingFramework: {
        "Zara": {
          predictedSize: "S (Tops) / 28 EU 36 (Bottoms)",
          fitRecommendation: "Standard S provides tailored shoulders without sleeve length dragging past wrist.",
          fitConfidence: 95
        },
        "Mango": {
          predictedSize: "XS - S",
          fitRecommendation: "Relaxed European cut; XS for fitted silhouette, S for fluid layering over t-shirts.",
          fitConfidence: 91
        },
        "Myntra Roadster / Tokyo Talkies": {
          predictedSize: "M",
          fitRecommendation: "Budget Indian fast fashion cuts run 1 size smaller in armhole depth; Size M prevents tightness.",
          fitConfidence: 93
        },
        "FabIndia / Biba / W": {
          predictedSize: "XS / 32",
          fitRecommendation: "Traditional ethnic sizing has significant ease; Size XS gives a neat, non-swamping fit for 5'3\" frame.",
          fitConfidence: 97
        },
        "Westside (Nuon / Wardrobe)": {
          predictedSize: "S",
          fitRecommendation: "Tailored for contemporary Indian urban proportions, true to size.",
          fitConfidence: 94
        }
      },
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
          name: "Fluid Open-Front Dusty Rose Longline Shrug",
          category: "Layering / Outerwear",
          subCategory: "Kimono Shrug / Longline Cardigan",
          clothType: "Rayon-Viscose Crepe (Fluid Drape)",
          wardrobeType: "Casual Layering / Travel",
          color: "Dusty Salmon Pink with Red Rose Applique Motif",
          conditionScore: 8.6,
          conditionLabel: "Great Shape & Flow",
          wearFrequency: "High (3-4 times/month)",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831523_6728794e.jpg"],
          status: "KEEP",
          statusReason: "Flattering vertical elongation for 5'3\" frame. Adds feminine color pop to casual t-shirt pairings.",
          pairingScore: 94,
          currentPairs: ["White Graphic Tee", "Black Ankle Trousers"],
          brandEstimate: "Aks / Global Desi / Vero Moda",
          retailValueEst: "₹1,699"
        },
        {
          id: "ananya_item_2",
          name: "Chalk White Typography Graphic T-Shirt",
          category: "Tops",
          subCategory: "Crew Neck Graphic Tee",
          clothType: "Lightweight Cotton Jersey (160 GSM)",
          wardrobeType: "Street Casual Core",
          color: "Chalk White with Pink/Magenta Bold Typography ('HERO/STYLE/PUNK')",
          conditionScore: 6.9,
          conditionLabel: "Slight Rib Neck Stretch & Wash Fade",
          wearFrequency: "High (Weekly)",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831523_6728794e.jpg"],
          status: "REPLACE",
          statusReason: "Neckband is beginning to ripple from wash cycles. Recommend upgrading to a heavyweight 220 GSM boxy minimalist tee in off-white.",
          pairingScore: 78,
          currentPairs: ["Dusty Rose Shrug", "Black Trousers"],
          brandEstimate: "Ginger by Lifestyle / Only",
          retailValueEst: "₹799"
        },
        {
          id: "ananya_item_3",
          name: "Black Tailored High-Rise Ankle Pants",
          category: "Bottoms",
          subCategory: "Trousers",
          clothType: "Poly-Viscose Spandex Stretch Weave",
          wardrobeType: "Universal Workhorse Bottom",
          color: "Solid Jet Black",
          conditionScore: 9.1,
          conditionLabel: "Pristine Cut & Seams",
          wearFrequency: "Very High (6-8 times/month)",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831523_6728794e.jpg"],
          status: "KEEP",
          statusReason: "The cornerstone of multiple outfits. High-waist silhouette flatters petite proportions and pairs seamlessly across western and fusion layers.",
          pairingScore: 98,
          currentPairs: ["Dusty Rose Shrug", "White Tee", "Embroidered Festive Jacket"],
          brandEstimate: "Marks & Spencer / H&M",
          retailValueEst: "₹2,299"
        },
        {
          id: "ananya_item_4",
          name: "Intricate Kashmiri-Inspired Multi-Floral Embroidered Jacket",
          category: "Indo-Western & Festive",
          subCategory: "Embroidered Shrug / Short Crop Jacket",
          clothType: "Black Chiffon/Georgette Base with Resham Thread Embroidery",
          wardrobeType: "Festive Evening / Indo-Western Fusion",
          color: "Jet Black with Multicolour Pastel Flowers (Rose Pink, Lemon, Lavender, Sky Blue)",
          conditionScore: 9.6,
          conditionLabel: "Showstopper Craftsmanship",
          wearFrequency: "Occasions / Festive Dinners",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831790_7aa27a1f.jpg"],
          status: "KEEP",
          statusReason: "High-value artisanal fusion piece. Rich floral needlework elevates any plain black inner into an Instagram-ready festive look.",
          pairingScore: 96,
          currentPairs: ["Black Inner Top", "Dangling Metallic Earrings"],
          brandEstimate: "Kashmiri Artisanal / Jaypore / FabIndia",
          retailValueEst: "₹3,799"
        },
        {
          id: "ananya_item_5",
          name: "Cozy Slate Blue Boucle Teddy Fleece Pullover",
          category: "Winterwear / Loungewear",
          subCategory: "Textured Sweater",
          clothType: "Sherpa Boucle Fleece Knit",
          wardrobeType: "Cozy Casual / Travel / Winter",
          color: "Slate / Dusty Powder Blue",
          conditionScore: 8.7,
          conditionLabel: "Soft Pile & Warm",
          wearFrequency: "Seasonal / Travel (3 times/month in cold weather)",
          detectedInPhotos: ["/wardrobe_assets/media_1794917831520_bfd43708.jpg"],
          status: "KEEP",
          statusReason: "Charming plush texture, flattering neckline for close-ups, cozy winter staple for hill trips and AC lounges.",
          pairingScore: 88,
          currentPairs: ["Denim Jeans", "Fleece Joggers"],
          brandEstimate: "H&M / Uniqlo Fleece / GAP",
          retailValueEst: "₹1,999"
        }
      ],
      recommendations: [
        {
          id: "rec_f_1",
          type: "ADD",
          title: "High-Waist Pleated Ecru Linen-Blend Wide-Leg Palazzos",
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
          matchingArtefacts: [
            { name: "Handcrafted Oxidized Silver Jhumka Hoops", price: 699, brand: "Tribe Amrapali / Zaveri" },
            { name: "Rose-Gold Metallic Strappy Flat Mules", price: 1299, brand: "Catwalk" }
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
          matchingArtefacts: [
            { name: "Minimalist Triple-Layer Gold Chain", price: 499, brand: "Giva" }
          ]
        },
        {
          id: "rec_f_3",
          type: "ADD",
          title: "Artisanal Oxidized Silver Mirror-Work Statement Choker & Earrings",
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
          matchingArtefacts: [
            { name: "Raw Silk Black Envelope Clutch with Zari Border", price: 999, brand: "Biba" }
          ]
        }
      ]
    }
  ],

  // Instagram Trending Looks that match and elevate the users' styles
  instagramTrends: [
    {
      id: "trend_1",
      targetGender: "female",
      title: "Boho-Chic Fusion: Embroidered Crop Shrug & Fluid Palazzos",
      influencerHandle: "@kritika_khurana_style",
      aestheticName: "Modern Desi Girl Aesthetic",
      trendVelocity: "🔥 Viral (2.4M Reels Views this week)",
      heroImage: "/wardrobe_assets/media_1794917831790_7aa27a1f.jpg",
      inspirationDesc: "Directly mimics Ananya's black floral embroidered jacket aesthetic, paired with breathable high-rise linen palazzos and oxidized silver jewellery for effortless street & festive elegance.",
      bundleItems: [
        {
          name: "Black Resham Floral Embroidered Crop Shrug",
          brand: "Jaypore / Aks",
          price: 2499,
          link: "https://www.myntra.com/shrugs?f=Color%3ABlack&rawQuery=embroidered%20shrug",
          store: "Myntra"
        },
        {
          name: "Ecru Pleated High-Rise Wide-Leg Trousers",
          brand: "Mango",
          price: 1899,
          link: "https://www.myntra.com/trousers?f=Color%3AOff%20White&rawQuery=pleated%20palazzo",
          store: "Myntra"
        },
        {
          name: "Boho Oxidized Silver Mirror Jhumkas",
          brand: "Zaveri Pearls",
          price: 599,
          link: "https://www.amazon.in/s?k=oxidised+jhumkas+for+women",
          store: "Amazon"
        }
      ],
      bundleTotal: 4997,
      bundleDiscountPrice: 4249,
      bundleSavings: "Save 15% (₹748 off) when bundled"
    },
    {
      id: "trend_2",
      targetGender: "female",
      title: "Airport & Hill-Station Cozy: Boucle Teddy Knit & Relaxed Denims",
      influencerHandle: "@komalpandeyofficial_edits",
      aestheticName: "Vanilla Girl & Cozy Luxe",
      trendVelocity: "📈 Trending (+48% search volume this month)",
      heroImage: "/wardrobe_assets/media_1794917831520_bfd43708.jpg",
      inspirationDesc: "Echoes Ananya's slate blue teddy fleece pullover, styled with relaxed straight denim and sleek mini sunglasses for off-duty comfort.",
      bundleItems: [
        {
          name: "Powder Blue Boucle Fleece Quarter-Zip Pullover",
          brand: "H&M / Uniqlo",
          price: 1999,
          link: "https://www.myntra.com/sweaters?f=Color%3ABlue&rawQuery=fleece%20pullover",
          store: "Myntra"
        },
        {
          name: "Vintage Wash High-Rise Straight Jeans",
          brand: "Levi's",
          price: 2699,
          link: "https://www.amazon.in/s?k=levis+women+straight+jeans",
          store: "Amazon"
        },
        {
          name: "Tortoise-Shell Oval Minimalist Acetate Sunglasses",
          brand: "Vincent Chase / Lenskart",
          price: 999,
          link: "https://www.flipkart.com/search?q=sunglasses+women+retro+oval",
          store: "Flipkart"
        }
      ],
      bundleTotal: 5697,
      bundleDiscountPrice: 4849,
      bundleSavings: "Save 15% (₹848 off) when bundled"
    },
    {
      id: "trend_3",
      targetGender: "male",
      title: "Old Money Casual: Mandarin Slub Kurta & Tapered Black Chinos",
      influencerHandle: "@tarun_chawla_men",
      aestheticName: "Modern Regal Indian Aesthetic",
      trendVelocity: "🔥 Viral (1.8M Reels Views)",
      heroImage: "/wardrobe_assets/media_1794917831823_7659c378.jpg",
      inspirationDesc: "Directly inspired by Aditya's navy mandarin-collar short kurta at the palace/temple. Upgraded with handcrafted tan leather footwear and a braided belt for an effortlessly suave look.",
      bundleItems: [
        {
          name: "Midnight Indigo Pure Slub Linen Short Kurta",
          brand: "FabIndia / Manyavar",
          price: 2199,
          link: "https://www.myntra.com/men-kurtas?f=Color%3ABlue&rawQuery=short%20kurta%20men",
          store: "Myntra"
        },
        {
          name: "Jet Black Tailored Stretch Chinos",
          brand: "Rare Rabbit / Zara",
          price: 2299,
          link: "https://www.amazon.in/s?k=mens+black+slim+chinos",
          store: "Amazon"
        },
        {
          name: "Handmade Tan Leather Padded Kolhapuris",
          brand: "Metro / Red Tape",
          price: 1699,
          link: "https://www.flipkart.com/search?q=men+leather+kolhapuri+mules",
          store: "Flipkart"
        }
      ],
      bundleTotal: 6197,
      bundleDiscountPrice: 5299,
      bundleSavings: "Save 15% (₹898 off) when bundled"
    },
    {
      id: "trend_4",
      targetGender: "male",
      title: "Urban Tech Casual: Structured Pique Polo & Clean Denim",
      influencerHandle: "@streetstyle_bengaluru",
      aestheticName: "Bangalore Founder / Tech Minimalist",
      trendVelocity: "⚡ Sustained Staple (#1 in Tier-1 IT Hubs)",
      heroImage: "/wardrobe_assets/media_1794917831524_9a688f86.jpg",
      inspirationDesc: "Refines Aditya's signature office polo & denim fit check into an optimized daily uniform with zero decision fatigue.",
      bundleItems: [
        {
          name: "Navy Tipped Collar 240 GSM Pique Polo",
          brand: "Snitch",
          price: 1299,
          link: "https://www.myntra.com/tshirts?f=Color%3ANavy%20Blue&rawQuery=snitch%20polo",
          store: "Myntra"
        },
        {
          name: "Mid-Wash Ring-Spun Slim 512 Jeans",
          brand: "Levi's",
          price: 2999,
          link: "https://www.amazon.in/s?k=levis+512+slim+tapered+men",
          store: "Amazon"
        },
        {
          name: "Minimalist Clean White Leather Low-Top Sneakers",
          brand: "Puma / HRX",
          price: 2499,
          link: "https://www.flipkart.com/search?q=white+leather+sneakers+men",
          store: "Flipkart"
        }
      ],
      bundleTotal: 6797,
      bundleDiscountPrice: 5799,
      bundleSavings: "Save 15% (₹998 off) when bundled"
    }
  ]
};
