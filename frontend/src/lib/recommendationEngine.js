// Celoura Fashion - Advanced AI Fashion Stylist & Recommendation Engine
// Intelligent algorithmic scoring based on occasion, body silhouette, skin undertone, fabric, and budget

import { getSavedDesigns } from "./celouraData";

export const STYLIST_OCCASIONS = [
  {
    id: "bridal-wedding",
    label: "Bridal & Wedding",
    desc: "Royal wedding lehengas with rich handmade embroidery for your big day",
    recommendedCategories: ["Bridal Lehengas", "Saree Blouses"],
    vibeKeywords: ["royal", "heirloom", "zardozi", "dabka", "bridal", "opulence", "flared"],
    accentColor: "from-amber-500/20 to-yellow-600/10",
  },
  {
    id: "reception-gala",
    label: "Evening Reception & Gala",
    desc: "Glamorous evening gowns and dresses that shine under party lights",
    recommendedCategories: ["Bridal Lehengas", "Frocks & Gowns", "Couture Blouses"],
    vibeKeywords: ["evening", "gala", "crystals", "velvet", "trail", "corset", "satin"],
    accentColor: "from-purple-500/20 to-amber-600/10",
  },
  {
    id: "sangeet-cocktail",
    label: "Sangeet, Mehendi & Party",
    desc: "Lightweight, twirl-ready skirts and frocks that are easy to dance in",
    recommendedCategories: ["Designer Skirts", "Frocks & Gowns", "Bridal Lehengas", "Couture Blouses"],
    vibeKeywords: ["organza", "twirl", "ruffle", "movement", "contemporary", "fusion"],
    accentColor: "from-rose-500/20 to-amber-500/10",
  },
  {
    id: "festive-cultural",
    label: "Festivals & Traditional Events",
    desc: "Classic Sri Lankan sarees, skirts, and pure Banarasi brocade",
    recommendedCategories: ["Saree Blouses", "Designer Skirts", "Bridal Lehengas"],
    vibeKeywords: ["brocade", "banarasi", "aari", "traditional", "heritage", "paisley"],
    accentColor: "from-emerald-500/20 to-amber-500/10",
  },
  {
    id: "intimate-party",
    label: "Party & Dinner Outing",
    desc: "Modern fitted tops, party frocks, and stylish evening skirts",
    recommendedCategories: ["Frocks & Gowns", "Couture Blouses", "Designer Skirts"],
    vibeKeywords: ["party", "corset", "peplum", "velvet", "flared", "sleek"],
    accentColor: "from-blue-500/20 to-amber-500/10",
  },
];

export const BODY_SHAPES = [
  {
    id: "hourglass",
    label: "Hourglass (Curvy)",
    tagline: "Balanced bust and hips with a defined waist",
    silhouetteMatch: ["Structured Sweetheart", "Boned Corset", "Circular Flared (6-Meter Gher)", "Princess Cut"],
    stylingTip: "Highlights your waist with fitted tops and flowing flared skirts.",
    preferredNeckline: "Sweetheart Neck or Corset Plunge",
    preferredSleeve: "Elbow Length with Zari Border",
  },
  {
    id: "pear",
    label: "Pear (Fuller Hips)",
    tagline: "Slender shoulders and fuller hips",
    silhouetteMatch: ["Heavy A-Line Flare with Triple Can-Can", "Circular Flared (6-Meter Gher)", "Floor Length Flared Gown Frock"],
    stylingTip: "Balances your look with detailed blouses and flared A-line skirts.",
    preferredNeckline: "Boat Neck or Queen Anne Royal Neck",
    preferredSleeve: "Full Embellished Sleeve or Sheer Puff Sleeve",
  },
  {
    id: "apple",
    label: "Apple (Fuller Midsection)",
    tagline: "Fuller middle with slender arms and legs",
    silhouetteMatch: ["A-Line Flared Frock with Gilded Belt", "Floor Length Flared Gown Frock", "Flared Trail Skirt with Structured Waist"],
    stylingTip: "Lengthens your look with deep V-necks and flowing floor-length skirts.",
    preferredNeckline: "Deep V-Plunge or Sweetheart Plunge",
    preferredSleeve: "Full Fitted Sleeve with Zari Cuff",
  },
  {
    id: "athletic",
    label: "Straight / Athletic",
    tagline: "Even proportions from shoulders to hips",
    silhouetteMatch: ["Boned Corset Bodice with Peplum Flare", "Tiered Ruffle Silhouette", "Paneled Fluted Mermaid", "Circular Flared"],
    stylingTip: "Adds curves with peplum flares, ruffled skirts, and corset tops.",
    preferredNeckline: "Corset Structured Choli or Halter Neck",
    preferredSleeve: "Sheer Puff Sleeve or Flared Bell Sleeve",
  },
  {
    id: "petite",
    label: "Petite Frame",
    tagline: "Compact frame looking to add height",
    silhouetteMatch: ["Circular Flared Skirt (5-Meter Gher)", "Structured Sweetheart Saree Blouse with Dori", "A-Line Flared Frock"],
    stylingTip: "Makes you look taller with high-waisted skirts and long vertical embroidery.",
    preferredNeckline: "Scoop Sweetheart or High Neck with Keyhole",
    preferredSleeve: "Elbow Length or Cap Sleeve",
  },
];

export const UNDERTONES = [
  {
    id: "warm",
    label: "Warm Golden / Olive Skin",
    desc: "Looks best with gold jewelry, emerald green, warm gold, and rich red",
    recommendedColors: ["Imperial Gold", "Obsidian Black & 24K Gold", "Deep Emerald & Gold", "Crimson Velvet", "Banarasi Gold"],
    recommendedJewelry: "Antique 22K/24K Gold or Polki jewelry with emerald stones.",
    makeupRecommendation: "Warm bronzed skin, golden highlighter, and warm berry or red lips.",
  },
  {
    id: "cool",
    label: "Cool / Rosy Skin",
    desc: "Looks best with silver jewelry, deep wine red, peacock blue, and black",
    recommendedColors: ["Midnight Peacock", "Wine Burgundy & Antique Gold", "Royal Plum", "Obsidian Black", "Champagne Silver"],
    recommendedJewelry: "Silver, white gold, diamonds, or uncut polki with ruby drops.",
    makeupRecommendation: "Smokey eyes with soft blush and deep wine or ruby red lips.",
  },
  {
    id: "neutral",
    label: "Neutral Skin Tone",
    desc: "Looks great in both gold and silver, champagne ivory, and rose gold",
    recommendedColors: ["Champagne Gold & Ivory", "Rose Gold Hue", "Obsidian Black & Imperial Gold", "Italian Micro-Velvet"],
    recommendedJewelry: "Kundan, pearls, or rose-gold jewelry.",
    makeupRecommendation: "Soft glowing nude makeup with champagne shimmer.",
  },
  {
    id: "bold-dramatic",
    label: "Bold Black & Gold",
    desc: "High-contrast look: deep black fabric with shining 24K gold embroidery",
    recommendedColors: ["Obsidian Black & 24K Gold", "Jet Black with Fine Gold Resham", "Midnight Black & Matte Champagne"],
    recommendedJewelry: "Chunky antique gold necklaces and statement bracelets.",
    makeupRecommendation: "Bold eyeliner, glowing gold accents, and deep velvet lips.",
  },
];

export const EMBELLISHMENT_PREFERENCES = [
  {
    id: "heirloom-zardozi",
    label: "Handmade Gold Embroidery",
    desc: "Traditional heavy gold wire and thread work (Zardozi & Aari)",
    keywords: ["zardozi", "dabka", "aari", "bullion", "heirloom", "dense"],
  },
  {
    id: "crystal-glam",
    label: "Sparkling Crystals & Beads",
    desc: "Shining crystals, sparkling beadwork, and modern sequins",
    keywords: ["swarovski", "crystal", "cut-dana", "beaded", "sequin", "shimmer"],
  },
  {
    id: "woven-brocade",
    label: "Pure Silk & Brocade",
    desc: "Traditional Banarasi woven patterns and rich smooth raw silk",
    keywords: ["banarasi", "brocade", "woven", "raw silk", "jacquard", "pure silk"],
  },
  {
    id: "ethereal-minimalist",
    label: "Lightweight & Simple",
    desc: "Light organza fabric with clean lines and subtle gold borders",
    keywords: ["organza", "sheer", "scalloped", "minimal", "lightweight", "foil"],
  },
];

export const BUDGET_TIERS = [
  { id: "any", label: "Any Budget", min: 0, max: 999999 },
  { id: "tier1", label: "Under LKR 25,000", min: 0, max: 25000 },
  { id: "tier2", label: "LKR 25,000 – LKR 60,000", min: 25000, max: 60000 },
  { id: "tier3", label: "LKR 60,000 – LKR 150,000", min: 60000, max: 150000 },
  { id: "tier4", label: "Heirloom Couture (LKR 150,000+)", min: 150000, max: 999999 },
];

/**
 * Intelligent Multi-Factor Recommendation Engine
 * Evaluates Celoura catalog designs against customer styling inputs
 */
export function getFashionRecommendations({
  occasionId = "bridal-wedding",
  categoryFilter = "All",
  bodyShapeId = "hourglass",
  undertoneId = "warm",
  embellishmentId = "heirloom-zardozi",
  budgetId = "any",
  freeQuery = "",
  designsList = null,
} = {}) {
  const allDesigns = Array.isArray(designsList) && designsList.length > 0
    ? designsList
    : (typeof window !== "undefined" ? getSavedDesigns() : []);

  const occasion = STYLIST_OCCASIONS.find((o) => o.id === occasionId) || STYLIST_OCCASIONS[0];
  const bodyShape = BODY_SHAPES.find((b) => b.id === bodyShapeId) || BODY_SHAPES[0];
  const undertone = UNDERTONES.find((u) => u.id === undertoneId) || UNDERTONES[0];
  const embellishment = EMBELLISHMENT_PREFERENCES.find((e) => e.id === embellishmentId) || EMBELLISHMENT_PREFERENCES[0];
  const budget = BUDGET_TIERS.find((b) => b.id === budgetId) || BUDGET_TIERS[0];

  const searchTokens = freeQuery
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 2);

  const scoredDesigns = allDesigns.map((design) => {
    let score = 40; // baseline score

    // 1. Category Matching (0 - 25 points)
    if (categoryFilter && categoryFilter !== "All") {
      if (design.category === categoryFilter) {
        score += 25;
      } else {
        score -= 15;
      }
    } else {
      // Natural alignment with occasion recommended categories
      if (occasion.recommendedCategories.includes(design.category)) {
        score += 20;
      } else {
        score += 5;
      }
    }

    // 2. Occasion Vibe & Keyword Matching (0 - 20 points)
    const designText = `${design.title} ${design.category} ${design.fabric} ${design.color} ${design.embroidery} ${design.description} ${design.silhouette}`.toLowerCase();

    let occasionHits = 0;
    occasion.vibeKeywords.forEach((kw) => {
      if (designText.includes(kw)) occasionHits++;
    });
    score += Math.min(20, occasionHits * 5);

    // 3. Body Shape & Silhouette Harmony (0 - 20 points)
    let silhouetteHits = 0;
    bodyShape.silhouetteMatch.forEach((sm) => {
      if (designText.includes(sm.toLowerCase()) || (design.silhouette && design.silhouette.toLowerCase().includes(sm.toLowerCase()))) {
        silhouetteHits++;
      }
    });
    if (silhouetteHits > 0) {
      score += 20;
    } else if (design.category === "Bridal Lehengas" || design.category === "Frocks & Gowns") {
      score += 10;
    } else {
      score += 5;
    }

    // 4. Undertone & Color Palette Match (0 - 15 points)
    let colorHits = 0;
    undertone.recommendedColors.forEach((rc) => {
      const parts = rc.toLowerCase().split(/\s+/);
      parts.forEach((p) => {
        if (p.length > 3 && designText.includes(p)) colorHits++;
      });
    });
    score += Math.min(15, colorHits * 4);

    // 5. Embellishment Style Match (0 - 10 points)
    let embellishmentHits = 0;
    embellishment.keywords.forEach((kw) => {
      if (designText.includes(kw)) embellishmentHits++;
    });
    score += Math.min(10, embellishmentHits * 3.5);

    // 6. Budget Tier Match (0 - 10 points)
    if (budget.id !== "any") {
      if (design.price >= budget.min && design.price <= budget.max) {
        score += 10;
      } else {
        const diff = Math.min(
          Math.abs(design.price - budget.min),
          Math.abs(design.price - budget.max)
        );
        if (diff < 15000) {
          score += 4;
        } else {
          score -= 8;
        }
      }
    } else {
      score += 8;
    }

    // 7. Free-form text query bonus (0 - 15 points)
    if (searchTokens.length > 0) {
      let queryHits = 0;
      searchTokens.forEach((st) => {
        if (designText.includes(st)) queryHits++;
      });
      score += Math.min(15, queryHits * 5);
    }

    // Featured bonus (0 - 5 points)
    if (design.featured) {
      score += 5;
    }

    // Normalize to 75% - 99% range for realistic premium match percentages
    const clampedScore = Math.max(50, Math.min(125, score));
    const matchPercentage = Math.round(75 + ((clampedScore - 50) / 75) * 24);

    // Synthesize tailored AI styling verdict
    const whyItMatches = generatePersonalizedStylistNotes({
      design,
      occasion,
      bodyShape,
      undertone,
      embellishment,
    });

    const tailoringBlueprint = {
      recommendedNeckline: (design.necklineOptions && design.necklineOptions[0]) || bodyShape.preferredNeckline,
      recommendedSleeve: (design.sleeveOptions && design.sleeveOptions[0]) || bodyShape.preferredSleeve,
      recommendedFabric: design.fabric,
      recommendedColor: design.color,
      silhouette: design.silhouette || "Custom Flared Silhouette",
    };

    const hauteCoutureStyling = {
      jewelry: undertone.recommendedJewelry,
      makeup: undertone.makeupRecommendation,
      silhouetteTip: bodyShape.stylingTip,
      dupattaDrape: occasion.id === "bridal-wedding" 
        ? "Wear your shawl draped over one shoulder with a matching sheer gold veil over your head."
        : "Drape neatly over one shoulder and pin with a sparkling gold brooch.",
      footwear: "Comfortable gold heels or embroidered flats so you can dance and walk easily all evening.",
    };

    // Pre-calculated order query params for 1-click seamless ordering
    const orderQueryParams = new URLSearchParams({
      design: design.id,
      category: design.category,
      color: design.color,
      fabric: design.fabric,
      silhouette: tailoringBlueprint.silhouette,
      neckline: tailoringBlueprint.recommendedNeckline,
      sleeve: tailoringBlueprint.recommendedSleeve,
      stylistNotes: `Suggested by AI Stylist (${matchPercentage}% Match for ${occasion.label}): Styled for ${bodyShape.label} and ${undertone.label}. Recommended cut: ${bodyShape.preferredNeckline} with ${bodyShape.preferredSleeve}.`,
      source: "ai-stylist",
    }).toString();

    return {
      ...design,
      matchPercentage,
      whyItMatches,
      tailoringBlueprint,
      hauteCoutureStyling,
      orderUrl: `/order?${orderQueryParams}`,
    };
  });

  // Sort descending by match score
  scoredDesigns.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return {
    topPick: scoredDesigns[0],
    curatedRecommendations: scoredDesigns.slice(1, 4),
    allMatches: scoredDesigns,
    activeProfile: {
      occasion,
      bodyShape,
      undertone,
      embellishment,
      budget,
    },
  };
}

/**
 * Generate human-like haute couture stylist analysis text
 */
function generatePersonalizedStylistNotes({ design, occasion, bodyShape, undertone, embellishment }) {
  const occasionPhrases = {
    "bridal-wedding": `Great pick for your wedding day! It gives you a royal, unforgettable bridal look.`,
    "reception-gala": `Perfect for an evening reception or gala, giving you a stunning red-carpet look.`,
    "sangeet-cocktail": `Ideal for party and dancing—lightweight, easy to move in, and looks great twirling.`,
    "festive-cultural": `A wonderful traditional choice with authentic handmade Sri Lankan details.`,
    "intimate-party": `A chic, modern choice that looks elegant and stylish for any evening out.`,
  };

  const bodyNotes = `The ${design.silhouette || "flared cut"} fits your ${bodyShape.label} shape beautifully because it ${bodyShape.stylingTip.toLowerCase()}`;
  const colorNotes = `The ${design.color} colors match your ${undertone.label} skin tone so you look glowing in photos.`;
  const embroideryNotes = `Finished with ${design.embroidery}, hand-sewn by our tailors to fit your exact measurements.`;

  return `${occasionPhrases[occasion.id] || ""} ${bodyNotes} ${colorNotes} ${embroideryNotes}`;
}
