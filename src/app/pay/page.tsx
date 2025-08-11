"use client";

import { useState } from "react";
import Script from "next/script";

// Extend the window type so TypeScript knows about Razorpay
declare global {
  interface Window {
    Razorpay: new (options: object) => { open: () => void };
  }
}

export default function PayPage() {
  // State for payment amount and loading status
  const [amount, setAmount] = useState<number>(1); // default ₹1
  const [loading, setLoading] = useState(false);

  /**
   * Start the Razorpay payment flow
   */
  const startPayment = () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }

    setLoading(true);

    // Razorpay options (test mode)
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_1234567890", // test key
      amount: amount * 100, // convert to paise
      currency: "INR",
      name: "Jubili Store",
      description: "Dummy product purchase",
      handler: function (response: {
        razorpay_payment_id: string;
      }) {
        alert(
          `✅ Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`
        );
        setLoading(false);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    // Open Razorpay checkout modal
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <>
      {/* Razorpay's checkout.js script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
      />

      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>💳 Make a Payment</h1>

        {/* Amount input field */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount in ₹"
          style={{
            padding: "10px",
            marginBottom: "10px",
            width: "200px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <br />

        {/* Payment button */}
        <button
          onClick={startPayment}
          disabled={loading}
          style={{
            padding: "10px 20px",
            background: "#3399cc",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Processing..." : `Pay ₹${amount}`}
        </button>
      </div>
    </>
  );
}

