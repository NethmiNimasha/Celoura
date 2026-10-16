// Celoura Fashion - Core Data & State Management

export const BUSINESS_INFO = {
  name: "Celoura Fashion",
  tagline: "Your Dream Outfit, Designed Your Way.",
  specialty: "Custom Lehenga designs, women's fashion, and personalized dress tailoring.",
  address: "No. 129, Yakabedda, Matara road, Akuressa, Sri Lanka",
  phone: "0771699754",
  displayPhone: "+94 771699754",
  openingHours: "8:00 AM – 6:00 PM",
  email: "contact@celourafashion.com",
  whatsappUrl: "https://wa.me/94717602641?text=Hello%20Celoura%20Fashion,%20I%20would%20like%20to%20inquire%20about%20a%20custom%20Lehenga%20order.",
};

export const ORDER_STATUSES = [
  { key: "Pending", label: "Pending", desc: "The order request has been submitted and is awaiting review." },
  { key: "Confirmed", label: "Confirmed", desc: "The order requirements have been reviewed and accepted." },
  { key: "In Progress", label: "In Progress", desc: "The dress is being prepared and handcrafted by master tailors." },
  { key: "Ready", label: "Ready", desc: "The dress is ready for the agreed collection, fitting or handover." },
  { key: "Completed", label: "Completed", desc: "The outfit has been completed and delivered to customer." },
  { key: "Cancelled", label: "Cancelled", desc: "The order has been cancelled." },
];

export const INITIAL_DESIGNS = [
  {
    id: "CEL-DSG-01",
    title: "The Royal Empress Bridal Lehenga",
    category: "Bridal Lehengas",
    price: 185000,
    priceFormatted: "LKR 185,000",
    image: "/images/hero-lehenga.jpg",
    fabric: "Raw Silk & Zari Mesh",
    color: "Obsidian Black & Imperial Gold",
    embroidery: "Handcrafted Antique Gold Zardozi & Dabka",
    featured: true,
    description: "An awe-inspiring masterpiece crafted for the modern royal bride. Features multi-layered circular flare with hand-embellished peacock and floral motifs in 24K antique bullion thread. Paired with a sculpted sweetheart blouse and scalloped dupatta.",
    silhouette: "Circular Flared (6-Meter Gher)",
    necklineOptions: ["Sweetheart Neck", "Deep V-Plunge", "Queen Anne", "Round Neck"],
    sleeveOptions: ["Elbow Length", "Full Sleeve with Zari Cuff", "Cap Sleeve", "Sleeveless"],
    customizable: true,
  },
  {
    id: "CEL-DSG-02",
    title: "Maharani Velvet Couture Lehenga",
    category: "Royal Velvet",
    price: 165000,
    priceFormatted: "LKR 165,000",
    image: "/images/velvet-lehenga.jpg",
    fabric: "Italian Micro Velvet",
    color: "Deep Black Velvet & Muted Gold",
    embroidery: "Intricate Antique Dabka, Resham & Sequin Filigree",
    featured: true,
    description: "Exquisite heavyweight black velvet tailored to perfection. Intricately adorned with heirloom floral jaal and zardozi borders that glisten under evening chandeliers. Includes complementary sheer organza veil with heavy embroidered matha-patti borders.",
    silhouette: "Heavy A-Line Flare with Triple Can-Can",
    necklineOptions: ["Scoop Sweetheart", "Boat Neck", "Square Neck"],
    sleeveOptions: ["Half Sleeve", "Full Embellished Sleeve"],
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

export const INITIAL_ORDERS = [
  {
    id: "CEL-8291",
    customerName: "Ayesha Jayawardena",
    customerPhone: "0771234567",
    customerEmail: "ayesha.j@example.com",
    designTitle: "The Royal Empress Bridal Lehenga",
    designId: "CEL-DSG-01",
    colour: "Obsidian Black & Imperial Gold",
    fabric: "Raw Silk & Zari Mesh",
    silhouette: "Circular Flared (6-Meter Gher)",
    neckline: "Sweetheart Neck",
    sleeve: "Full Sleeve with Zari Cuff",
    status: "In Progress",
    totalAmount: 185000,
    depositPaid: 92500,
    eventDate: "2026-11-20",
    orderDate: "2026-10-12",
    estimatedCompletion: "2026-11-10",
    measurements: {
      bust: "36",
      waist: "29",
      hip: "39",
      shoulder: "14.5",
      armhole: "16",
      sleeveLength: "21",
      blouseLength: "14.5",
      lehengaWaist: "30",
      lehengaLength: "42",
      unit: "inches",
    },
    notes: "Please add extra 2-inch interior seam margins for final fitting. Extra gold latkans on dupatta.",
    assignedArtisan: "Master Tailor Sugath (Kirindiwela Workshop)",
  },
  {
    id: "CEL-8292",
    customerName: "Rashmi Fernando",
    customerPhone: "0719876543",
    customerEmail: "rashmi.f@example.com",
    designTitle: "Maharani Velvet Couture Lehenga",
    designId: "CEL-DSG-02",
    colour: "Deep Black Velvet & Muted Gold",
    fabric: "Italian Micro Velvet",
    silhouette: "Heavy A-Line Flare with Triple Can-Can",
    neckline: "Scoop Sweetheart",
    sleeve: "Half Sleeve",
    status: "Ready",
    totalAmount: 165000,
    depositPaid: 165000,
    eventDate: "2026-10-28",
    orderDate: "2026-09-25",
    estimatedCompletion: "2026-10-15",
    measurements: {
      bust: "34",
      waist: "27",
      hip: "37",
      shoulder: "14",
      armhole: "15",
      sleeveLength: "11",
      blouseLength: "14",
      lehengaWaist: "28",
      lehengaLength: "41",
      unit: "inches",
    },
    notes: "Boutique fitting session scheduled for this Saturday at Kirindiwela.",
    assignedArtisan: "Master Embroiderer Kamala",
  },
  {
    id: "CEL-8293",
    customerName: "Dilrukshi Perera",
    customerPhone: "0765544332",
    customerEmail: "dilrukshi.p@example.com",
    designTitle: "Auric Royale Bridal Splendor",
    designId: "CEL-DSG-03",
    colour: "Champagne Gold & Warm Auric",
    fabric: "Pure Tissue Silk & Metallic Georgette",
    silhouette: "Flared Trail Skirt with Structured Waistband",
    neckline: "Corset Choli",
    sleeve: "Full Fitted Sheer",
    status: "Confirmed",
    totalAmount: 220000,
    depositPaid: 100000,
    eventDate: "2026-12-05",
    orderDate: "2026-10-14",
    estimatedCompletion: "2026-11-25",
    measurements: {
      bust: "38",
      waist: "32",
      hip: "42",
      shoulder: "15",
      armhole: "17",
      sleeveLength: "22",
      blouseLength: "15",
      lehengaWaist: "33",
      lehengaLength: "43",
      unit: "inches",
    },
    notes: "Double dupatta preference with custom gold tassels. Second veil in sheer ivory.",
    assignedArtisan: "Senior Couturier Bandara",
  },
  {
    id: "CEL-8294",
    customerName: "Nethmi Nimasha",
    customerPhone: "0717602641",
    customerEmail: "nethmi@celourafashion.com",
    designTitle: "Gilded Blossom Festive Ensemble",
    designId: "CEL-DSG-06",
    colour: "Rose-Gold Infused Champagne & Black",
    fabric: "Banarasi Brocade & Lurex Jacquard",
    silhouette: "Classic A-Line with Latkan Tassels",
    neckline: "Sweetheart",
    sleeve: "Elbow Length",
    status: "Pending",
    totalAmount: 95000,
    depositPaid: 0,
    eventDate: "2026-11-15",
    orderDate: "2026-10-16",
    estimatedCompletion: "2026-11-05",
    measurements: {
      bust: "35",
      waist: "28",
      hip: "38",
      shoulder: "14",
      armhole: "15.5",
      sleeveLength: "11.5",
      blouseLength: "14",
      lehengaWaist: "29",
      lehengaLength: "41.5",
      unit: "inches",
    },
    notes: "Sweetheart neckline with sheer back details and antique gold hand tassels.",
    assignedArtisan: "Awaiting assignment",
  },
];

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
  if (typeof window === "undefined") return INITIAL_ORDERS;
  try {
    const data = localStorage.getItem("celoura_orders");
    return data ? JSON.parse(data) : INITIAL_ORDERS;
  } catch (e) {
    return INITIAL_ORDERS;
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
