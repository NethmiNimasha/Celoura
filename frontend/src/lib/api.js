// Celoura API Client - Connecting Next.js Frontend to Spring Boot Backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

/**
 * Register a new customer or admin account
 */
export async function registerUser({ name, email, phone, password }) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Registration failed. Please try again.");
    }

    if (typeof window !== "undefined" && data) {
      localStorage.setItem("celoura_user", JSON.stringify(data));
      if (data.token) {
        localStorage.setItem("celoura_token", data.token);
      }
    }

    return data;
  } catch (err) {
    throw err;
  }
}

/**
 * Sign in existing user (customer or admin)
 */
export async function loginUser({ email, password }) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Invalid email or password.");
    }

    if (typeof window !== "undefined" && data) {
      localStorage.setItem("celoura_user", JSON.stringify(data));
      if (data.token) {
        localStorage.setItem("celoura_token", data.token);
      }
    }

    return data;
  } catch (err) {
    throw err;
  }
}

/**
 * Sign in specifically as Admin
 */
export async function loginAdmin({ email, password }) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/admin/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Invalid admin credentials.");
    }

    if (typeof window !== "undefined" && data) {
      localStorage.setItem("celoura_user", JSON.stringify(data));
      if (data.token) {
        localStorage.setItem("celoura_token", data.token);
      }
    }

    return data;
  } catch (err) {
    throw err;
  }
}

/**
 * Get current stored session
 */
export function getStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("celoura_user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

/**
 * Sign out user
 */
export function logoutUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("celoura_user");
  localStorage.removeItem("celoura_token");
}

/**
 * Fetch customer profile details from backend
 */
export async function getUserProfile(email) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/profile?email=${encodeURIComponent(email)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error("Failed to load profile details.");
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
}

/**
 * Update customer profile (name, phone, address, and optional password)
 */
export async function updateUserProfile(email, profileData) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/profile?email=${encodeURIComponent(email)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileData),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to update profile.");
    }

    // Update stored local session
    if (typeof window !== "undefined") {
      const existing = getStoredUser() || {};
      const updated = {
        ...existing,
        name: data.name || profileData.name || existing.name,
        phone: data.phone || profileData.phone || existing.phone,
        address: data.address || profileData.address || existing.address,
      };
      localStorage.setItem("celoura_user", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    }

    return data;
  } catch (err) {
    throw err;
  }
}

/**
 * ========================================================
 * ORDERS REST API (Spring Boot Backend -> /api/orders)
 * ========================================================
 */

/**
 * Create a new custom order on the backend
 */
export async function createOrderApi(orderData) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to create order on server.");
    }
    return data;
  } catch (err) {
    console.warn("Backend order creation failed, relying on local fallback:", err);
    throw err;
  }
}

/**
 * Fetch all orders (admin or filtered by email/phone/status)
 */
export async function getAllOrdersApi(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.email) query.set("email", params.email);
    if (params.phone) query.set("phone", params.phone);
    if (params.status) query.set("status", params.status);

    const url = `${API_BASE_URL}/orders${query.toString() ? `?${query.toString()}` : ""}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders from server.");
    }
    return await res.json();
  } catch (err) {
    console.warn("Backend fetch orders failed:", err);
    throw err;
  }
}

/**
 * Fetch orders for a specific customer by email
 */
export async function getOrdersByEmailApi(email) {
  if (!email) return [];
  return await getAllOrdersApi({ email });
}

/**
 * Fetch a single order by ID
 */
export async function getOrderByIdApi(id) {
  if (!id) return null;
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${encodeURIComponent(id)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to load order.");
    }
    return await res.json();
  } catch (err) {
    console.warn("Backend getOrderById failed:", err);
    throw err;
  }
}

/**
 * Update order status (Admin workflow: Pending -> Confirmed -> In Progress -> Ready -> Completed)
 */
export async function updateOrderStatusApi(id, status) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${encodeURIComponent(id)}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to update order status.");
    }
    return data;
  } catch (err) {
    console.warn("Backend updateOrderStatus failed:", err);
    throw err;
  }
}

/**
 * Full update for an order (e.g. editing assigned artisan, notes, deposit)
 */
export async function updateOrderApi(id, orderData) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to update order details.");
    }
    return data;
  } catch (err) {
    console.warn("Backend updateOrder failed:", err);
    throw err;
  }
}

/**
 * Delete an order
 */
export async function deleteOrderApi(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to delete order.");
    }
    return data;
  } catch (err) {
    console.warn("Backend deleteOrder failed:", err);
    throw err;
  }
}

/**
 * Get dashboard order counts and statistics
 */
export async function getOrderStatsApi() {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/stats`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch order statistics.");
    }
    return await res.json();
  } catch (err) {
    console.warn("Backend getOrderStats failed:", err);
    throw err;
  }
}

/**
 * ========================================================
 * DESIGNS REST API (Spring Boot Backend -> /api/designs)
 * ========================================================
 */

/**
 * Fetch all designs from backend
 */
export async function getAllDesignsApi() {
  try {
    const res = await fetch(`${API_BASE_URL}/designs`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch designs.");
    }
    return await res.json();
  } catch (err) {
    console.warn("Backend getAllDesigns failed, fallback to local:", err);
    throw err;
  }
}

/**
 * Create a new design in backend
 */
export async function createDesignApi(designData) {
  try {
    const res = await fetch(`${API_BASE_URL}/designs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(designData),
    });
    if (!res.ok) {
      throw new Error("Failed to create design on backend.");
    }
    return await res.json();
  } catch (err) {
    console.warn("Backend createDesign failed:", err);
    throw err;
  }
}

/**
 * Update an existing design on backend
 */
export async function updateDesignApi(id, designData) {
  try {
    const res = await fetch(`${API_BASE_URL}/designs/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(designData),
    });
    if (!res.ok) {
      throw new Error("Failed to update design on backend.");
    }
    return await res.json();
  } catch (err) {
    console.warn("Backend updateDesign failed:", err);
    throw err;
  }
}

/**
 * Delete a design by ID
 */
export async function deleteDesignApi(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/designs/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error("Failed to delete design.");
    }
    return true;
  } catch (err) {
    console.warn("Backend deleteDesign failed:", err);
    throw err;
  }
}

/**
 * ========================================================
 * REVIEWS & RATINGS REST API (Spring Boot Backend -> /api/reviews)
 * ========================================================
 */

/**
 * Fetch all customer ratings & reviews
 */
export async function getAllReviewsApi() {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error("Failed to load reviews from backend.");
    }
    return await res.json();
  } catch (err) {
    console.warn("getAllReviewsApi failed, fallback to local:", err);
    return null;
  }
}

/**
 * Fetch reviews for a specific design
 */
export async function getReviewsByDesignApi(designId) {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews/design/${encodeURIComponent(designId)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error("Failed to load design reviews.");
    }
    return await res.json();
  } catch (err) {
    console.warn("getReviewsByDesignApi failed:", err);
    return [];
  }
}

/**
 * Fetch overall rating stats (average, counts, recommendation rate)
 */
export async function getReviewStatsApi() {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews/stats`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error("Failed to load review stats.");
    }
    return await res.json();
  } catch (err) {
    console.warn("getReviewStatsApi failed:", err);
    return null;
  }
}

/**
 * Submit a new customer rating & review
 */
export async function createReviewApi(reviewData) {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });
    if (!res.ok) {
      throw new Error("Failed to submit review.");
    }
    return await res.json();
  } catch (err) {
    console.warn("createReviewApi failed:", err);
    throw err;
  }
}

/**
 * Delete a review (Admin action)
 */
export async function deleteReviewApi(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error("Failed to delete review.");
    }
    return true;
  } catch (err) {
    console.warn("deleteReviewApi failed:", err);
    throw err;
  }
}

/**
 * ========================================================
 * PAYHERE ONLINE PAYMENT GATEWAY REST APIS
 * ========================================================
 */

/**
 * Initiate a PayHere payment (50% Deposit, Balance, or Full Payment)
 */
export async function initiatePayHerePaymentApi({ orderId, paymentType = "DEPOSIT" }) {
  try {
    const res = await fetch(`${API_BASE_URL}/payments/payhere/initiate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, paymentType }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to initiate PayHere checkout.");
    }
    return data;
  } catch (err) {
    console.error("PayHere initiate error:", err);
    throw err;
  }
}

/**
 * Retrieve all payment transactions for an order
 */
export async function getOrderPaymentsApi(orderId) {
  if (!orderId) return [];
  try {
    const res = await fetch(`${API_BASE_URL}/payments/order/${encodeURIComponent(orderId)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return [];
    }
    return await res.json();
  } catch (err) {
    console.warn("getOrderPaymentsApi failed:", err);
    return [];
  }
}





