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
