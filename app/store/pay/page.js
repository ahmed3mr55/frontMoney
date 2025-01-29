'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Page = () => {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const token = Cookies.get('token');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/pay/visa/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cardNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('OTP sent successfully');
        setSuccess('OTP sent successfully. Check your email inbox.');
        setError('');
      } else {
        setError(data.message || 'Failed to send OTP.');
        setSuccess('');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while sending OTP.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/pay/visa/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            otp,
            cardNumber : Number(cardNumber),
            cvv : Number(cvv),
            expiryDate,
            amount: Number(amount),
          }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Payment successful');
        setSuccess('Payment successful.');
      } else {
        setError(data.message || 'Payment failed.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred during payment.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 3000);
    }
  })

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-96 bg-slate-900 p-5 rounded-md">
        <h2 className="text-white text-center bg-gray-950 p-2 rounded">
          Payment using Visa Card on the App Money
        </h2>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-white">Card Number</label>
            <input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="p-1 rounded-md"
              type="number"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="flex gap-2">
            <div>
              <label className="text-white">CVV</label>
              <input
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="p-1 rounded-md"
                type="number"
                placeholder="123"
              />
            </div>
            <div>
              <label className="text-white">Expiration Date</label>
              <input
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="p-1 rounded-md w-full"
                type="text"
                placeholder="MM/YY"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-around">
            <div className="flex flex-col">
              <label className="text-white">Amount</label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-1 rounded-md w-28"
                type="number"
                placeholder="0.00 EGP"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white">OTP</label>
              <div className="flex items-center gap-2">
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="p-1 rounded-md w-28"
                  type="text"
                  placeholder="1234"
                />
                <button
                  onClick={handleSendOtp}
                  className="bg-blue-400 p-1 rounded text-white hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-400 p-2 rounded-md text-white hover:bg-blue-600" 
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Pay'}
          </button>
        </form>
        {success && <p className="text-green-500 mt-2">{success}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Page;
