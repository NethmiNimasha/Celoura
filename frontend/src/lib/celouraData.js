// Celoura Fashion - Core Data & State Management

export const BUSINESS_INFO = {
  name: "Celoura Fashion",
  tagline: "Your Dream Outfit, Designed Your Way.",
  specialty: "Custom frocks, skirts, designer blouses, saree blouses, and bridal lehengas.",
  address: "No. 129, Yakabedda, Matara road, Akuressa, Sri Lanka",
  phone: "0771699754",
  displayPhone: "+94 77 169 9754",
  openingHours: "8:00 AM – 6:00 PM",
  email: "nethunanayakkara315@gmail.com",
  whatsappUrl: "https://wa.me/94771699754?text=Hello%20Celoura%20Fashion,%20I%20would%20like%20to%20inquire%20about%20a%20custom%20order.",
};

export const ORDER_STATUSES = [
  { key: "Pending", label: "Pending", desc: "The order request has been submitted and is awaiting review." },
  { key: "Confirmed", label: "Confirmed", desc: "The order requirements have been reviewed and accepted." },
  { key: "In Progress", label: "In Progress", desc: "The dress is being prepared and handcrafted by master tailors." },
  { key: "Ready", label: "Ready", desc: "The dress is ready for the agreed collection, fitting or handover." },
  { key: "Completed", label: "Completed", desc: "The outfit has been completed and delivered to customer." },
  { key: "Cancelled", label: "Cancelled", desc: "The order has been cancelled." },
];

export const GARMENT_TYPES = [
  { id: "all", label: "All Designs" },
  { id: "Frocks & Gowns", label: "Frocks & Gowns" },
  { id: "Saree Blouses", label: "Saree Blouses" },
  { id: "Designer Skirts", label: "Designer Skirts" },
  { id: "Couture Blouses", label: "Blouses & Tops" },
  { id: "Bridal Lehengas", label: "Bridal Lehengas" },
];

export const INITIAL_DESIGNS = [
  {
    id: "CEL-DSG-07",
    title: "Aurelia Gold Velvet Evening Frock",
    category: "Frocks & Gowns",
    price: 28000,
    priceFormatted: "LKR 28,000",
    image: "/images/frock-evening.jpg",
    fabric: "Italian Micro-Velvet & Zari",
    color: "Obsidian Black & 24K Gold",
    embroidery: "Handcrafted Zari Florals & Gilded Belt Detailing",
    featured: true,
    description: "A show-stopping tailored evening frock crafted with an A-line flounce skirt, hand-embroidered golden waistline belt, and intricate sleeve cuffs.",
    silhouette: "A-Line Flared Frock with Gilded Belt",
    necklineOptions: ["Round Neck", "Sweetheart Neck", "Boat Neck", "V-Neck"],
    sleeveOptions: ["Full Embellished Sleeve", "Elbow Length", "Sleeveless"],
    customizable: true,
  },
  {
    id: "CEL-DSG-08",
    title: "Royal Aari Bridal Saree Blouse",
    category: "Saree Blouses",
    price: 16500,
    priceFormatted: "LKR 16,500",
    image: "/images/saree-blouse.jpg",
    fabric: "Pure Raw Silk & Black Velvet",
    color: "Deep Black Velvet & Antique Gold",
    embroidery: "Dense Aari Maggam Handwork, Paisley Sleeve & Scalloped Neck",
    featured: true,
    description: "Handcrafted bridal saree blouse featuring heirloom aari and zardozi threadwork, structured sweetheart bustline, and custom dori tie-backs with latkan tassels.",
    silhouette: "Structured Sweetheart Saree Blouse with Dori",
    necklineOptions: ["Sweetheart Neck", "Deep Round Back", "Keyhole Back", "Princess Cut"],
    sleeveOptions: ["Elbow Length Paisley", "Short Cap Sleeve", "Full Fitted Sleeve"],
    customizable: true,
  },
  {
    id: "CEL-DSG-10",
    title: "Noor Obsidian Flared Designer Skirt",
    category: "Designer Skirts",
    price: 18500,
    priceFormatted: "LKR 18,500",
    image: "/images/skirt-flare.jpg",
    fabric: "Heavy Silk & Banarasi Brocade Border",
    color: "Midnight Obsidian & Gold",
    embroidery: "Wide Antique Bullion Zari Border",
    featured: true,
    description: "High-waisted flared maxi skirt with a 5-meter circle sweep and built-in can-can volume. Perfect for pairing with ethnic crop tops or contemporary blouses.",
    silhouette: "Circular Flared Skirt (5-Meter Gher)",
    necklineOptions: ["N/A - Waist Fitted"],
    sleeveOptions: ["N/A - Separate Garment"],
    customizable: true,
  },
  {
    id: "CEL-DSG-12",
    title: "Valerie Corset Peplum Couture Blouse",
    category: "Couture Blouses",
    price: 14000,
    priceFormatted: "LKR 14,000",
    image: "/images/blouse-designer.jpg",
    fabric: "Structured Duchess Satin & Sheer Organza",
    color: "Obsidian Black & Champagne Gold",
    embroidery: "Crystal Beaded Boning & Scalloped Sweetheart",
    featured: true,
    description: "Bespoke boned corset blouse top with sheer puff sleeves and hand-embroidered gold filigree across the bustier.",
    silhouette: "Boned Corset Bodice with Peplum Flare",
    necklineOptions: ["Sweetheart Corset", "Square Neck", "Off-Shoulder"],
    sleeveOptions: ["Sheer Puff Sleeve", "Full Fitted Sleeve", "Sleeveless"],
    customizable: true,
  },
  {
    id: "CEL-DSG-01",
    title: "The Royal Empress Bridal Lehenga",
    category: "Bridal Lehengas",
    price: 185000,
    priceFormatted: "LKR 185,000",
    image: "/images/royal-bloom.jpg",
    fabric: "Raw Silk & Zari Mesh",
    color: "Obsidian Black & Imperial Gold",
    embroidery: "Handcrafted Antique Gold Zardozi & Dabka",
    featured: true,
    description: "An awe-inspiring masterpiece crafted for the modern royal bride. Features multi-layered circular flare with hand-embellished peacock and floral motifs in 24K antique bullion thread.",
    silhouette: "Circular Flared (6-Meter Gher)",
    necklineOptions: ["Sweetheart Neck", "Deep V-Plunge", "Queen Anne", "Round Neck"],
    sleeveOptions: ["Elbow Length", "Full Sleeve with Zari Cuff", "Cap Sleeve", "Sleeveless"],
    customizable: true,
  },
  {
    id: "CEL-DSG-02",
    title: "Emerald Grace Couture Evening Frock",
    category: "Frocks & Gowns",
    price: 32000,
    priceFormatted: "LKR 32,000",
    image: "/images/emerald-grace.jpg",
    fabric: "Italian Micro Velvet",
    color: "Deep Emerald & Gold",
    embroidery: "Antique Dabka, Resham & Sequin Filigree",
    featured: true,
    description: "Floor-length royal velvet tailored evening frock with sweetheart neckline and flowing pleated flair.",
    silhouette: "Floor Length Flared Gown Frock",
    necklineOptions: ["Sweetheart Plunge", "Scoop Sweetheart", "Square Neck"],
    sleeveOptions: ["Full Embellished Sleeve", "Elbow Length"],
    customizable: true,
  },
  {
    id: "CEL-DSG-09",
    title: "Zardozi Sweetheart Bridal Saree Blouse",
    category: "Saree Blouses",
    price: 18000,
    priceFormatted: "LKR 18,000",
    image: "/images/saree-blouse.jpg",
    fabric: "Raw Silk & Gold Thread",
    color: "Royal Black & Gold",
    embroidery: "Scalloped Beadwork & Floral Jaal",
    featured: false,
    description: "Bespoke bridal blouse cut to your exact shoulder and bust measurements with elbow-length zardozi cuffs.",
    silhouette: "Princess Cut Bridal Blouse",
    necklineOptions: ["Deep Sweetheart", "Round Neck", "High Neck Keyhole"],
    sleeveOptions: ["Elbow Length with Heavy Cuff", "Short Sleeve"],
    customizable: true,
  },
  {
    id: "CEL-DSG-11",
    title: "Zari Pleated Brocade Flare Skirt",
    category: "Designer Skirts",
    price: 22000,
    priceFormatted: "LKR 22,000",
    image: "/images/skirt-flare.jpg",
    fabric: "Pure Brocade & Silk Linings",
    color: "Emerald & Gold Resham",
    embroidery: "Intricate Paisley Motifs",
    featured: false,
    description: "Regal pleated flared skirt tailored with an adjustable hook waistband and concealed side pockets.",
    silhouette: "Heavy Box Pleated Flare",
    necklineOptions: ["N/A"],
    sleeveOptions: ["N/A"],
    customizable: true,
  },
  {
    id: "CEL-DSG-14",
    title: "Wine Elegance Velvet Lehenga",
    category: "Bridal Lehengas",
    price: 31000,
    priceFormatted: "LKR 31,000",
    image: "/images/wine-elegance.jpg",
    fabric: "Italian Velvet & Zardozi",
    color: "Wine Burgundy & Antique Gold",
    embroidery: "Heirloom Antique Zari",
    featured: false,
    description: "Regal wine burgundy heavy velvet bridal lehenga bordered with traditional antique gold motifs.",
    silhouette: "Circular Flared (6-Meter Gher)",
    necklineOptions: ["Sweetheart", "U-Neck"],
    sleeveOptions: ["Elbow Length", "Full Sleeve"],
    customizable: true,
  },
  {
    id: "CEL-DSG-04",
    title: "Auric Royale Ivory Gown Lehenga",
    category: "Bridal Lehengas",
    price: 30000,
    priceFormatted: "LKR 30,000",
    image: "/images/ivory-dream.jpg",
    fabric: "Pure Tissue Silk & Metallic Georgette",
    color: "Champagne Gold & Ivory",
    embroidery: "Bullion Zari, Swarovski Crystals",
    featured: false,
    description: "Pure opulence rendered in glistening gold tissue. Designed for wedding receptions and grand walk-ins.",
    silhouette: "Flared Trail Skirt with Structured Waistband",
    necklineOptions: ["Corset Choli", "Plunging Sweetheart"],
    sleeveOptions: ["Full Fitted Sheer", "Sleeveless"],
    customizable: true,
  },
  {
    id: "CEL-DSG-03",
    title: "Auric Royale Bridal Splendor",
    category: "Bridal Lehengas",
    price: 220000,
    priceFormatted: "LKR 220,000",
    image: "/images/bridal-gold.jpg",
    fabric: "Pure Tissue Silk & Metallic Georgette",
    color: "Champagne Gold & Warm Auric",
    embroidery: "Bullion Zari, Swarovski Crystals & Cut-dana",
    featured: true,
    description: "Pure opulence rendered in glistening gold tissue. Designed for wedding receptions and grand walk-ins, this bespoke gown sparkles with thousands of hand-stitched crystals, paired with a royal sweeping trail dupatta.",
    silhouette: "Flared Trail Skirt with Structured Waistband",
    necklineOptions: ["Plunging Sweetheart", "Corset Choli", "V-Neck"],
    sleeveOptions: ["Full Fitted Sheer", "Sleeveless"],
    customizable: true,
  },
  {
    id: "CEL-DSG-04",
    title: "Noor-E-Zari Black Organza Ensemble",
    category: "Silk & Zari",
    price: 115000,
    priceFormatted: "LKR 115,000",
    image: "/images/hero-lehenga.jpg",
    fabric: "Sheer Organza over Satin Silk",
    color: "Jet Black with Fine Gold Resham",
    embroidery: "Gold Foil Thread & Scalloped Cutwork",
    featured: false,
    description: "Ethereal, lightweight, and modern. Layers of ethereal black organza with gilded foil motifs that float gracefully with every movement. Ideal for sangeet nights and cocktail receptions.",
    silhouette: "Tiered Ruffle Flare",
    necklineOptions: ["Halter Neck", "High Neck", "Sweetheart"],
    sleeveOptions: ["Sleeveless", "Flared Bell Sleeve"],
    customizable: true,
  },
  {
    id: "CEL-DSG-05",
    title: "Mirage Gold & Obsidian Fusion",
    category: "Contemporary Fusion",
    price: 135000,
    priceFormatted: "LKR 135,000",
    image: "/images/velvet-lehenga.jpg",
    fabric: "Georgette with Banarasi Brocade Panel",
    color: "Midnight Black & Matte Champagne",
    embroidery: "Geometric Gold Resham & Mirror Accents",
    featured: false,
    description: "A contemporary silhouette that bridges traditional craftsmanship with runway chic. Features an asymmetric choli cape with high-slit skirt panels and waist cutout detailing.",
    silhouette: "Paneled Mermaid Fluted Skirt",
    necklineOptions: ["One-Shoulder Drape", "Square Neck", "Corset Cut"],
    sleeveOptions: ["Single Cape Sleeve", "Sleeveless"],
    customizable: true,
  },
  {
    id: "CEL-DSG-06",
    title: "Gilded Blossom Festive Ensemble",
    category: "Festive Pastel",
    price: 95000,
    priceFormatted: "LKR 95,000",
    image: "/images/bridal-gold.jpg",
    fabric: "Banarasi Brocade & Lurex Jacquard",
    color: "Rose-Gold Infused Champagne & Black",
    embroidery: "Woven Zari Botanicals & Pearl Beads",
    featured: false,
    description: "Classic woven Banarasi heritage modernized with a lightweight silhouette. Perfect for festive celebrations, engagement ceremonies, and bridesmaids looking for bespoke elegance.",
    silhouette: "Classic A-Line with Latkan Tassels",
    necklineOptions: ["U-Neck", "Sweetheart", "Keyhole Back"],
    sleeveOptions: ["Elbow Length", "Cap Sleeve"],
    customizable: true,
  },
];

export const INITIAL_ORDERS = [];

// Helper functions for persistent local state
export function getSavedDesigns() {
  if (typeof window === "undefined") return INITIAL_DESIGNS;
  try {
    const data = localStorage.getItem("celoura_designs");
    return data ? JSON.parse(data) : INITIAL_DESIGNS;
  } catch (e) {
    return INITIAL_DESIGNS;
  }
}

export function saveDesigns(designs) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("celoura_designs", JSON.stringify(designs));
  } catch (e) {
    console.error(e);
  }
}

export function getSavedOrders() {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("celoura_orders");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}


export function saveOrders(orders) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("celoura_orders", JSON.stringify(orders));
  } catch (e) {
    console.error(e);
  }
}

export function getOrderById(id) {
  const orders = getSavedOrders();
  return orders.find((o) => o.id.toLowerCase() === id.trim().toLowerCase());
}

export function updateOrderStatus(orderId, newStatus) {
  const orders = getSavedOrders();
  const updated = orders.map((o) => {
    if (o.id.toLowerCase() === orderId.trim().toLowerCase()) {
      return { ...o, status: newStatus };
    }
    return o;
  });
  saveOrders(updated);
  return updated;
}

export function addOrder(newOrder) {
  const orders = getSavedOrders();
  const updated = [newOrder, ...orders];
  saveOrders(updated);
  return updated;
}
