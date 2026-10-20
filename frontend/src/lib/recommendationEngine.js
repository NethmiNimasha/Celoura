// Celoura Fashion - Advanced AI Fashion Stylist & Recommendation Engine
// Intelligent algorithmic scoring based on occasion, body silhouette, skin undertone, fabric, and budget

import { INITIAL_DESIGNS, getSavedDesigns } from "./celouraData";

export const STYLIST_OCCASIONS = [
  {
    id: "bridal-wedding",
    label: "Bridal & Wedding",
    desc: "Heirloom royal lehengas, heavy handwork, and show-stopping bridal majesty",
    recommendedCategories: ["Bridal Lehengas", "Saree Blouses"],
    vibeKeywords: ["royal", "heirloom", "zardozi", "dabka", "bridal", "opulence", "flared"],
    accentColor: "from-amber-500/20 to-yellow-600/10",
  },
  {
    id: "reception-gala",
    label: "Grand Reception & Gala",
    desc: "Sophisticated red-carpet glamour, crystal shimmer, and dramatic flairs",
    recommendedCategories: ["Bridal Lehengas", "Frocks & Gowns", "Couture Blouses"],
    vibeKeywords: ["evening", "gala", "crystals", "velvet", "trail", "corset", "satin"],
    accentColor: "from-purple-500/20 to-amber-600/10",
  },
  {
    id: "sangeet-cocktail",
    label: "Sangeet, Mehendi & Cocktail",
    desc: "Fluid twirl-friendly silhouettes, ethereal organza, and modern vibrant chic",
    recommendedCategories: ["Designer Skirts", "Frocks & Gowns", "Bridal Lehengas", "Couture Blouses"],
    vibeKeywords: ["organza", "twirl", "ruffle", "movement", "contemporary", "fusion"],
    accentColor: "from-rose-500/20 to-amber-500/10",
  },
  {
    id: "festive-cultural",
    label: "Festive & Cultural Ceremonies",
    desc: "Traditional elegance, pure Banarasi brocades, and classic Aari embroidery",
    recommendedCategories: ["Saree Blouses", "Designer Skirts", "Bridal Lehengas"],
    vibeKeywords: ["brocade", "banarasi", "aari", "traditional", "heritage", "paisley"],
    accentColor: "from-emerald-500/20 to-amber-500/10",
  },
  {
    id: "intimate-party",
    label: "Bespoke Party & Evening Outing",
    desc: "Understated luxury, contemporary corset tops, and bespoke tailored frocks",
    recommendedCategories: ["Frocks & Gowns", "Couture Blouses", "Designer Skirts"],
    vibeKeywords: ["party", "corset", "peplum", "velvet", "flared", "sleek"],
    accentColor: "from-blue-500/20 to-amber-500/10",
  },
];

export const BODY_SHAPES = [
  {
    id: "hourglass",
    label: "Hourglass",
    tagline: "Balanced bust and hips with defined waist",
    silhouetteMatch: ["Structured Sweetheart", "Boned Corset", "Circular Flared (6-Meter Gher)", "Princess Cut"],
    stylingTip: "Accentuate your natural waistline with structured cholis, sweetheart cutouts, and high-waisted flared skirts that drape gracefully.",
    preferredNeckline: "Sweetheart Neck or Corset Plunge",
    preferredSleeve: "Elbow Length with Zari Border",
  },
  {
    id: "pear",
    label: "Pear / Triangle",
    tagline: "Slender shoulders & bust with fuller hips",
    silhouetteMatch: ["Heavy A-Line Flare with Triple Can-Can", "Circular Flared (6-Meter Gher)", "Floor Length Flared Gown Frock"],
    stylingTip: "Balance your lower body volume with heavily embellished blouses, statement sleeves, boat necklines, and dramatic A-line can-can skirts.",
    preferredNeckline: "Boat Neck or Queen Anne Royal Neck",
    preferredSleeve: "Full Embellished Sleeve or Sheer Puff Sleeve",
  },
  {
    id: "apple",
    label: "Apple / Round",
    tagline: "Fuller midsection with slender arms & legs",
    silhouetteMatch: ["A-Line Flared Frock with Gilded Belt", "Floor Length Flared Gown Frock", "Flared Trail Skirt with Structured Waist"],
    stylingTip: "Lengthen your silhouette with vertical bullion embroidery, plunging V-necks, flowing micro-velvet, and imperial high-waisted flared cuts.",
    preferredNeckline: "Deep V-Plunge or Sweetheart Plunge",
    preferredSleeve: "Full Fitted Sleeve with Zari Cuff",
  },
  {
    id: "athletic",
    label: "Athletic / Rectangle",
    tagline: "Uniform proportions with subtle curves",
    silhouetteMatch: ["Boned Corset Bodice with Peplum Flare", "Tiered Ruffle Silhouette", "Paneled Fluted Mermaid", "Circular Flared"],
    stylingTip: "Create visual dimension and feminine curves with peplum flares, boned corsets, ruffled organza volume, and scalloped waistlines.",
    preferredNeckline: "Corset Structured Choli or Halter Neck",
    preferredSleeve: "Sheer Puff Sleeve or Flared Bell Sleeve",
  },
  {
    id: "petite",
    label: "Petite Frame",
    tagline: "Compact proportions seeking height elongation",
    silhouetteMatch: ["Circular Flared Skirt (5-Meter Gher)", "Structured Sweetheart Saree Blouse with Dori", "A-Line Flared Frock"],
    stylingTip: "Opt for monochromatic palettes, high-waisted skirts, elongated vertical embroidery lines, and avoid overly heavy border breaks.",
    preferredNeckline: "Scoop Sweetheart or High Neck with Keyhole",
    preferredSleeve: "Elbow Length or Cap Sleeve",
  },
];

export const UNDERTONES = [
  {
    id: "warm",
    label: "Warm Golden / Olive",
    desc: "Golden, peachy, or olive undertones with gold jewelry affinity",
    recommendedColors: ["Imperial Gold", "Obsidian Black & 24K Gold", "Deep Emerald & Gold", "Crimson Velvet", "Banarasi Gold"],
    recommendedJewelry: "Antique 22K/24K Gold, Polki with emerald accents, or heirloom temple jewellery.",
    makeupRecommendation: "Warm bronzed contour, gilded champagne highlighter, and rich terra-cotta or berry lips.",
  },
  {
    id: "cool",
    label: "Cool Undertone / Rose",
    desc: "Pink, blue, or cool undertones that radiate with silver and rich jewel tones",
    recommendedColors: ["Midnight Peacock", "Wine Burgundy & Antique Gold", "Royal Plum", "Obsidian Black", "Champagne Silver"],
    recommendedJewelry: "Antique blackened gold, diamonds, Swarovski crystal accents, or uncut polki with ruby drops.",
    makeupRecommendation: "Smokey eyes with charcoal accents, cool berry blush, and wine or deep ruby red lips.",
  },
  {
    id: "neutral",
    label: "Neutral / Balanced",
    desc: "Balanced undertones flattered by both metallic warmth and rich darks",
    recommendedColors: ["Champagne Gold & Ivory", "Rose Gold Hue", "Obsidian Black & Imperial Gold", "Italian Micro-Velvet"],
    recommendedJewelry: "Kundan set in dual-tone gold, pearls, or rose-gold filigree.",
    makeupRecommendation: "Soft nude glam, dewy luminous skin, champagne eyelids, and soft mauve lips.",
  },
  {
    id: "bold-dramatic",
    label: "Dramatic Contrast",
    desc: "Craving high-contrast impact, midnight hues, and glittering gold bullion",
    recommendedColors: ["Obsidian Black & 24K Gold", "Jet Black with Fine Gold Resham", "Midnight Black & Matte Champagne"],
    recommendedJewelry: "High-contrast antique matte gold chokers, chunky statement hathphool, and matching maang tikka.",
    makeupRecommendation: "Defined winged eyeliner, gilded inner corner highlight, and bold velvet lips.",
  },
];

export const EMBELLISHMENT_PREFERENCES = [
  {
    id: "heirloom-zardozi",
    label: "Royal Heirloom Handwork",
    desc: "Antique Zardozi, Dabka bullion wire, and rich Aari threadwork",
    keywords: ["zardozi", "dabka", "aari", "bullion", "heirloom", "dense"],
  },
  {
    id: "crystal-glam",
    label: "Swarovski Crystals & Modern Glam",
    desc: "Sparkling crystal beadwork, cut-dana, and glistening sequins",
    keywords: ["swarovski", "crystal", "cut-dana", "beaded", "sequin", "shimmer"],
  },
  {
    id: "woven-brocade",
    label: "Heirloom Woven Brocade & Silk",
    desc: "Banarasi floral borders, zari weaves, and lustrous pure silks",
    keywords: ["banarasi", "brocade", "woven", "raw silk", "jacquard", "pure silk"],
  },
  {
    id: "ethereal-minimalist",
    label: "Ethereal & Lightweight Flow",
    desc: "Airy organza, delicate scalloped borders, and refined minimalist accents",
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
} = {}) {
  const allDesigns = typeof window !== "undefined" ? getSavedDesigns() : INITIAL_DESIGNS;

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
        ? "Dual-dupatta royal draping: heavy velvet pleated across one shoulder with sheer gold tissue veil over head."
        : "Contemporary single-shoulder pleated drape pinned with heirloom Celoura brooch.",
      footwear: "Embroidered velvet juttis or metallic gold block heels for comfortable all-evening elegance.",
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
      stylistNotes: `AI Stylist Recommendation (${matchPercentage}% Match for ${occasion.label}): Styled for ${bodyShape.label} frame and ${undertone.label} undertone. Tailoring focus: ${bodyShape.preferredNeckline} with ${bodyShape.preferredSleeve}.`,
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
    "bridal-wedding": `Selected as your premier bridal centerpiece for unmatched ceremonial majesty.`,
    "reception-gala": `Curated for grand evening entry, casting an aura of royal red-carpet sophistication.`,
    "sangeet-cocktail": `Ideal for festive movement and dancing, providing graceful fluid flare with high visual impact.`,
    "festive-cultural": `Embodying Sri Lankan cultural grandeur with timeless heirloom threadwork.`,
    "intimate-party": `The definitive modern luxury statement, balancing chic structure with artisanal detailing.`,
  };

  const bodyNotes = `The ${design.silhouette || "structured flare"} is architecturally chosen for your ${bodyShape.label} frame: it balances proportions by drawing focus to ${bodyShape.stylingTip.toLowerCase()}`;
  const colorNotes = `The rich ${design.color} harmonizes seamlessly with your ${undertone.label} undertone, reflecting warmth under venue lighting.`;
  const embroideryNotes = `Embellished with ${design.embroidery}, tailored strictly to Celoura's bespoke master standards.`;

  return `${occasionPhrases[occasion.id] || ""} ${bodyNotes} ${colorNotes} ${embroideryNotes}`;
}
