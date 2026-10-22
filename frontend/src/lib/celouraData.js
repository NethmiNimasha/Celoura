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

// All designs are stored dynamically in PostgreSQL and fetched via /api/designs.
// No hard-coded mock designs.
export const INITIAL_DESIGNS = [];

export const INITIAL_ORDERS = [];

const LEGACY_SAMPLE_IDS = new Set(["CEL-DSG-07", "CEL-DSG-08", "CEL-DSG-10", "CEL-DSG-12", "CEL-DSG-01"]);

export function getSavedDesigns() {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("celoura_designs");
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    const cleaned = parsed.filter((d) => d && !LEGACY_SAMPLE_IDS.has(d.id));
    if (cleaned.length !== parsed.length) {
      localStorage.setItem("celoura_designs", JSON.stringify(cleaned));
    }
    return cleaned;
  } catch (e) {
    return [];
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

// Initial verified patron reviews
export const INITIAL_REVIEWS = [
  {
    id: 1,
    customerName: "Ayesha Jayawardena",
    customerEmail: "ayesha.j@example.com",
    designTitle: "Royal Empress Bridal Ensemble",
    rating: 5,
    reviewTitle: "Breathtaking Masterpiece & Exact Fit!",
    comment: "My bridal lehenga from Celoura was beyond my wildest dreams! The antique 24K gold zardozi embroidery was intricately handcrafted. Master tailors in the Akuressa atelier ensured the measurements fit like a second skin.",
    garmentCategory: "Bridal Lehengas",
    location: "Colombo, Sri Lanka",
    verifiedPurchase: true,
    createdAt: "2026-10-15T10:30:00"
  },
  {
    id: 2,
    customerName: "Dilani Wickramasinghe",
    customerEmail: "dilani.w@example.com",
    designTitle: "Handcrafted Aari Saree Blouse",
    rating: 5,
    reviewTitle: "Exquisite Neckline & Premium Silk",
    comment: "I ordered a customized sweetheart Aari embroidery saree blouse for a family wedding. The finish, sleeve embroidery, and piping were flawless. Delivered right on time!",
    garmentCategory: "Saree Blouses",
    location: "Galle, Sri Lanka",
    verifiedPurchase: true,
    createdAt: "2026-10-18T14:15:00"
  },
  {
    id: 3,
    customerName: "Shenaya Fernando",
    customerEmail: "shenaya.f@example.com",
    designTitle: "Velvet Couture Evening Frock",
    rating: 5,
    reviewTitle: "Royal Black & Gold Elegance",
    comment: "The Italian micro-velvet fabric combined with gold threadwork felt so opulent. Everyone at the evening reception asked where I got it custom-made. Celoura is my go-to haute couture brand!",
    garmentCategory: "Frocks & Gowns",
    location: "Matara, Sri Lanka",
    verifiedPurchase: true,
    createdAt: "2026-10-19T16:45:00"
  },
  {
    id: 4,
    customerName: "Kavindi Perera",
    customerEmail: "kavindi.p@example.com",
    designTitle: "Flared Brocade Designer Skirt",
    rating: 5,
    reviewTitle: "Gorgeous 6-Meter Flare!",
    comment: "The flare and can-can structure gave the skirt such an elegant royal sway. Their online custom measurement guidance made ordering seamless and effortless.",
    garmentCategory: "Designer Skirts",
    location: "Kandy, Sri Lanka",
    verifiedPurchase: true,
    createdAt: "2026-10-20T09:20:00"
  }
];

export function getSavedReviews() {
  if (typeof window === "undefined") return INITIAL_REVIEWS;
  try {
    const data = localStorage.getItem("celoura_reviews");
    return data ? JSON.parse(data) : INITIAL_REVIEWS;
  } catch (e) {
    return INITIAL_REVIEWS;
  }
}

export function saveReviews(reviews) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("celoura_reviews", JSON.stringify(reviews));
  } catch (e) {
    console.error(e);
  }
}

export function addReview(newReview) {
  const reviews = getSavedReviews();
  const updated = [newReview, ...reviews];
  saveReviews(updated);
  return updated;
}

export function getSavedDesignRatings() {
  if (typeof window === "undefined") return {};
  try {
    const data = localStorage.getItem("celoura_design_ratings");
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
}

export function saveDesignRating(designId, rating) {
  if (typeof window === "undefined") return { rating: Number(rating), count: 1, userRated: Number(rating) };
  try {
    const allRatings = getSavedDesignRatings();
    const current = allRatings[designId] || { sum: 5.0, count: 1, rating: 5.0 };
    const prevSum = current.sum || (current.rating ? current.rating * (current.count || 1) : 5.0);
    const prevCount = current.count || 1;
    const newSum = prevSum + Number(rating);
    const newCount = prevCount + 1;
    const newAverage = Math.round((newSum / newCount) * 10) / 10;

    const updated = {
      ...allRatings,
      [designId]: {
        sum: newSum,
        count: newCount,
        rating: newAverage,
        userRated: Number(rating),
      },
    };
    localStorage.setItem("celoura_design_ratings", JSON.stringify(updated));
    return updated[designId];
  } catch (e) {
    console.error(e);
    return { rating: Number(rating), count: 1, userRated: Number(rating) };
  }
}
