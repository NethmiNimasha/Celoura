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
