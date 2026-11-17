// PayHere JavaScript Checkout Helper for Celoura Haute Couture Platform

/**
 * Dynamically load PayHere JavaScript SDK if not already loaded
 */
export function loadPayHereScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if (window.payhere) {
      resolve(true);
      return;
    }

    const existing = document.querySelector('script[src*="payhere.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => reject(new Error("Failed to load PayHere SDK.")));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Failed to load PayHere SDK. Please check your internet connection."));
    document.body.appendChild(script);
  });
}

/**
 * Launch PayHere popup modal checkout
 */
export async function launchPayHereCheckout({
  checkoutConfig,
  onCompleted,
  onDismissed,
  onError,
}) {
  await loadPayHereScript();

  if (typeof window === "undefined" || !window.payhere) {
    throw new Error("PayHere payment modal could not be initialized.");
  }

  const returnUrl = checkoutConfig.returnUrl || 
    `${window.location.origin}/order/payment-success?orderId=${encodeURIComponent(checkoutConfig.orderId)}`;
  const cancelUrl = checkoutConfig.cancelUrl || 
    `${window.location.origin}/order/payment-cancelled?orderId=${encodeURIComponent(checkoutConfig.orderId)}`;

  const paymentPayload = {
    sandbox: checkoutConfig.sandbox !== undefined ? Boolean(checkoutConfig.sandbox) : true,
    merchant_id: checkoutConfig.merchantId,
    return_url: returnUrl,
    cancel_url: cancelUrl,
    notify_url: checkoutConfig.notifyUrl,
    order_id: checkoutConfig.orderId,
    items: checkoutConfig.items || "Celoura Custom Dress Order",
    amount: Number(checkoutConfig.amount).toFixed(2),
    currency: checkoutConfig.currency || "LKR",
    hash: checkoutConfig.hash,
    first_name: checkoutConfig.firstName || "Valued",
    last_name: checkoutConfig.lastName || "Customer",
    email: checkoutConfig.email || "",
    phone: checkoutConfig.phone || "",
    address: checkoutConfig.address || "Sri Lanka",
    city: checkoutConfig.city || "Akuressa",
    country: checkoutConfig.country || "Sri Lanka",
  };

  window.payhere.onCompleted = function (orderId) {
    if (onCompleted) {
      onCompleted(orderId);
    } else {
      window.location.href = returnUrl;
    }
  };

  window.payhere.onDismissed = function () {
    if (onDismissed) {
      onDismissed();
    }
  };

  window.payhere.onError = function (error) {
    if (onError) {
      onError(error);
    } else {
      console.error("PayHere checkout error:", error);
    }
  };

  window.payhere.startPayment(paymentPayload);
}

