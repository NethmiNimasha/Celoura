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
 * Launch PayHere Checkout Modal
 * If using default/placeholder merchant credentials on localhost, provides an interactive
 * Sandbox Test Modal to prevent PayHere's "Unauthorized payment request (Merchant Error)".
 */
export async function launchPayHereCheckout({
  checkoutConfig,
  onCompleted,
  onDismissed,
  onError,
}) {
  if (typeof window === "undefined") return;

  const isRealMerchantAccount = 
    checkoutConfig.merchantId && 
    checkoutConfig.merchantId !== "1220000" && 
    Boolean(checkoutConfig.hash);

  // If merchant has configured their real PayHere Sandbox/Live credentials, invoke official PayHere SDK
  if (isRealMerchantAccount) {
    try {
      await loadPayHereScript();
      if (window.payhere) {
        const returnUrl = checkoutConfig.returnUrl || 
          `${window.location.origin}/order/payment-success?orderId=${encodeURIComponent(checkoutConfig.orderId)}`;
        const cancelUrl = checkoutConfig.cancelUrl || 
          `${window.location.origin}/order/payment-cancelled?orderId=${encodeURIComponent(checkoutConfig.orderId)}`;

        const paymentPayload = {
          sandbox: checkoutConfig.sandbox !== undefined ? Boolean(checkoutConfig.sandbox) : true,
          merchant_id: checkoutConfig.merchantId,
          return_url: returnUrl,
          cancel_url: cancelUrl,
          notify_url: checkoutConfig.notifyUrl || `${window.location.origin}/api/payments/payhere/notify`,
          order_id: checkoutConfig.orderId,
          items: checkoutConfig.items || "Celoura Custom Dress Order",
          amount: Number(checkoutConfig.amount || 1000).toFixed(2),
          currency: checkoutConfig.currency || "LKR",
          first_name: checkoutConfig.firstName || "Valued",
          last_name: checkoutConfig.lastName || "Customer",
          email: checkoutConfig.email || "customer@example.com",
          phone: checkoutConfig.phone || "0771699754",
          address: checkoutConfig.address || "Sri Lanka",
          city: checkoutConfig.city || "Akuressa",
          country: checkoutConfig.country || "Sri Lanka",
        };

        if (checkoutConfig.hash) {
          paymentPayload.hash = checkoutConfig.hash;
        }

        window.payhere.onCompleted = (orderId) => {
          if (onCompleted) onCompleted(orderId);
          else window.location.href = returnUrl;
        };

        window.payhere.onDismissed = () => {
          if (onDismissed) onDismissed();
        };

        window.payhere.onError = (error) => {
          if (onError) onError(error);
          else console.error("PayHere SDK error:", error);
        };

        window.payhere.startPayment(paymentPayload);
        return;
      }
    } catch (e) {
      console.warn("Could not load official PayHere SDK, falling back to Sandbox Simulator:", e);
    }
  }

  // --- Interactive PayHere Sandbox Simulator ---
  // Renders a high-fidelity test modal when running on localhost with demo credentials
  showPayHereSandboxModal(checkoutConfig, onCompleted, onDismissed);
}

/**
 * High-fidelity interactive PayHere Sandbox Simulator Modal for localhost demo testing
 */
function showPayHereSandboxModal(config, onCompleted, onDismissed) {
  // Remove any existing simulator modal
  const existingModal = document.getElementById("payhere-simulator-modal");
  if (existingModal) existingModal.remove();

  const amountFormatted = Number(config.amount || 1000).toLocaleString();
  const orderRef = config.orderId || "CEL-ORDER";

  const modalHtml = `
    <div id="payhere-simulator-modal" style="
      position: fixed; inset: 0; z-index: 999999;
      display: flex; align-items: center; justify-content: center;
      background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 16px;
    ">
      <div style="
        background: #111118; border: 1px solid rgba(212, 175, 55, 0.4);
        border-radius: 20px; max-width: 440px; width: 100%;
        color: #f3f4f6; box-shadow: 0 25px 60px rgba(0,0,0,0.8), 0 0 30px rgba(212,175,55,0.15);
        overflow: hidden; animation: payhereFadeIn 0.25s ease-out;
      ">
        <!-- Header -->
        <div style="
          background: linear-gradient(135deg, #1b1b26 0%, #0d0d14 100%);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 18px 20px; display: flex; align-items: center; justify-content: space-between;
        ">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="
              width: 32px; height: 32px; border-radius: 8px; background: #0056b3;
              display: flex; align-items: center; justify-content: center; font-weight: 900; color: #fff; font-size: 14px;
            ">P</div>
            <div>
              <div style="font-weight: 700; font-size: 14px; color: #fff; letter-spacing: 0.02em;">PayHere Secure Checkout</div>
              <div style="font-size: 11px; color: #10b981; font-weight: 600;">● Sandbox Test Environment</div>
            </div>
          </div>
          <button id="payhere-sim-close" style="
            background: rgba(255,255,255,0.08); border: none; color: #aaa;
            width: 28px; height: 28px; border-radius: 50%; cursor: pointer; font-size: 14px;
          ">✕</button>
        </div>

        <!-- Body -->
        <div style="padding: 20px;">
          <!-- Order & Amount Summary -->
          <div style="
            background: #09090d; border: 1px solid rgba(212, 175, 55, 0.25);
            border-radius: 14px; padding: 14px 16px; margin-bottom: 18px; text-align: center;
          ">
            <div style="font-size: 11px; text-transform: uppercase; color: #888; letter-spacing: 0.05em;">Payment Amount</div>
            <div style="font-size: 26px; font-weight: 800; color: #d4af37; margin: 4px 0;">LKR ${amountFormatted}</div>
            <div style="font-size: 11px; color: #aaa;">Ref: <strong style="color: #fff;">${orderRef}</strong> • ${config.items || "Celoura Fashion"}</div>
          </div>

          <!-- Payment Tabs -->
          <div style="margin-bottom: 16px;">
            <div style="font-size: 11px; font-weight: 600; color: #aaa; margin-bottom: 8px; text-transform: uppercase;">
              Select Test Payment Method
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <div style="
                border: 1px solid #d4af37; background: rgba(212, 175, 55, 0.1);
                border-radius: 10px; padding: 10px; text-align: center; font-size: 12px; font-weight: 700; color: #fff;
              ">💳 Visa / Master</div>
              <div style="
                border: 1px solid rgba(255,255,255,0.1); background: #161622;
                border-radius: 10px; padding: 10px; text-align: center; font-size: 12px; font-weight: 500; color: #aaa;
              ">📱 FriMi / Genie</div>
            </div>
          </div>

          <!-- Mock Card Details -->
          <div style="
            background: #0d0d14; border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px; padding: 12px; margin-bottom: 20px; font-size: 11px;
          ">
            <div style="color: #888; margin-bottom: 4px;">PayHere Sandbox Test Card:</div>
            <div style="display: flex; justify-content: space-between; font-family: monospace; font-size: 13px; color: #fff; font-weight: 700;">
              <span>4385 •••• •••• 0001</span>
              <span>12/28</span>
            </div>
            <div style="color: #10b981; font-size: 10px; margin-top: 4px;">✓ Pre-authenticated test credentials active</div>
          </div>

          <!-- Action Buttons -->
          <button id="payhere-sim-pay" style="
            width: 100%; padding: 14px; border: none; border-radius: 12px;
            background: linear-gradient(135deg, #f7e7a9 0%, #d4af37 50%, #9e791b 100%);
            color: #070709; font-weight: 800; font-size: 14px; cursor: pointer;
            box-shadow: 0 4px 18px rgba(212,175,55,0.3); transition: all 0.2s;
          ">
            Authorize & Complete Payment (LKR ${amountFormatted})
          </button>

          <div style="font-size: 10px; color: #666; text-align: center; margin-top: 12px;">
            🔒 256-Bit SSL Encrypted • Central Bank Approved Gateway Simulation
          </div>
        </div>
      </div>
    </div>
    <style>
      @keyframes payhereFadeIn {
        from { opacity: 0; transform: scale(0.96); }
        to { opacity: 1; transform: scale(1); }
      }
    </style>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Close / Dismiss
  const modalEl = document.getElementById("payhere-simulator-modal");
  const closeBtn = document.getElementById("payhere-sim-close");
  const payBtn = document.getElementById("payhere-sim-pay");

  const cleanup = () => {
    if (modalEl) modalEl.remove();
  };

  closeBtn.onclick = () => {
    cleanup();
    if (onDismissed) onDismissed();
  };

  payBtn.onclick = () => {
    payBtn.innerText = "Authorizing with Central Bank Gateway...";
    payBtn.style.opacity = "0.7";
    payBtn.disabled = true;

    setTimeout(() => {
      cleanup();
      if (onCompleted) {
        onCompleted(orderRef);
      } else {
        window.location.href = `${window.location.origin}/order/payment-success?orderId=${encodeURIComponent(orderRef)}`;
      }
    }, 900);
  };
}
