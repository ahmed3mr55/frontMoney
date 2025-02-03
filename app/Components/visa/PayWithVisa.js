"use client";
import Link from 'next/link';
import React from 'react'

const PayWithVisa = () => {
  return (
    <Link href="/store/pay" className='inline-block mt-4 px-6 py-2 bg-green-500 text-white font-bold rounded-md text-sm hover:bg-green-600 transition-colors'>
      Go to Store
    </Link>
  )
}

export default PayWithVisa
