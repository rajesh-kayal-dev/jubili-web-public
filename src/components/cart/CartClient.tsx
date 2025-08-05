'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { CartItem } from '@/components/cart/CartItem';
import CustomButton from '@/components/ui/CustomButton';
import { FaTrash } from 'react-icons/fa';

export const CartClient = () => {
  const { cart, loading, error, fetchCart } = useCart();
  const [voucher, setVoucher] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="text-lg font-medium text-gray-700">Loading cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">{error}</div>
    );
  }

  if (!cart || cart.totalItems === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
        <CustomButton
          label="Continue Shopping"
          loading={false}
          onClick={() => window.location.href = '/'}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="py-4 text-4xl font-bold">
        What&apos;s in your Bag?
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Cart Items */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-300 p-0 overflow-hidden">
            <div className="hidden md:grid grid-cols-12 items-center px-6 py-3 border-b border-gray-300 text-gray-500 font-semibold text-sm">
              <div className="col-span-5">Product Info</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
              <div className="col-span-2 text-center">Action</div>
            </div>

            {cart.items.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center ml-2 md:ml-6 mr-2 md:mr-6 py-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4 col-span-5 w-full md:w-auto mb-2 md:mb-0">
                  <img src={item.imageUrl} alt={item.productName} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-base text-gray-900 break-words max-w-[150px] md:max-w-none">{item.productName}</div>
                    <div className="text-xs text-gray-500">Set : Colour: {item.color || "-"}</div>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2 col-span-3 w-full md:justify-center mb-2 md:mb-0">
                  <button className="w-8 h-8 rounded-full border border-gray-300 text-lg font-bold flex items-center justify-center hover:bg-gray-100 transition" disabled>-</button>
                  <span className="mx-2 font-medium text-base">{item.quantity}</span>
                  <button className="w-8 h-8 rounded-full border border-gray-300 text-lg font-bold flex items-center justify-center hover:bg-gray-100 transition" disabled>+</button>
                </div>

                {/* Total */}
                <div className="flex items-center col-span-2 w-full md:justify-center mb-2 md:mb-0">
                  <span className="font-semibold text-lg text-gray-900">
                    ₹{item.totalDiscountedPrice.toLocaleString()}
                  </span>
                </div>

                {/* Action */}
                <div className="flex items-center col-span-2 w-full md:justify-center">
                  <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500" disabled>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-300 p-6 mb-6">
            <div className="font-semibold mb-4">Order Summary</div>

            {/* Voucher input */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Discount voucher"
                className="flex-1 w-full rounded-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 pr-28"
                value={voucher}
                onChange={e => setVoucher(e.target.value)}
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-gray-900 text-white px-7 py-2 text-sm font-semibold hover:bg-black transition shadow"
                style={{ minWidth: 80 }}
              >
                Apply
              </button>
            </div>

            {/* Summary items */}
            <div className="flex justify-between mb-2 text-sm">
              <span>Sub Total</span>
              <span>₹{cart.totalOriginalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm text-green-700">
              <span>Discount</span>
              <span>-₹{cart.totalDiscount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Shipping</span>
              <span>₹{cart.shippingCharge.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mt-4 mb-2 text-lg font-bold">
              <span>Total</span>
              <span>₹{cart.finalTotal.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <span className="inline-block w-4 h-4 rounded-full border border-gray-300 flex-shrink-0 flex items-center justify-center mr-1">✓</span>
              Read t&c before purchasing
              <span className="underline cursor-pointer">Details</span>
            </div>

            <CustomButton
              label="Checkout Now"
              loading={false}
              onClick={() => window.location.href = '/pay'}
            //   className="w-full mt-2 bg-black text-white rounded-full py-3 font-semibold text-lg hover:bg-gray-900 transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
