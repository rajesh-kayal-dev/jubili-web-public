"use client";
import { CartClient } from '@/components/cart/CartClient';
import Navbar from '@/components/layout/Navbar';
import { use } from 'react';

export default function CartPage() {
  return (
    <>
      <Navbar />
      <CartClient />
    </>
  );
}