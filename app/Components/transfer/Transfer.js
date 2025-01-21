"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Transfer = ({ onTransferSuccess }) => {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = Cookies.get("token");
    const [amount, setAmount] = useState(0);
    const [receiverUsername, setReceiverUsername] = useState('');
    const [success, setSuccess] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false); // نافذة التأكيد

    useEffect(() => {
        if(error){
            const timer = setTimeout(() => {
                setError(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    });

    useEffect(() => {
        if(success){
            const timer = setTimeout(() => {
                setSuccess(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    });

    const confirmTransfer = async () => {
        setShowConfirmation(false);
        setLoading(true);
        try {
            const req = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/transfer/transfermony`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ amount, receiverUsername }),
            });
            const data = await req.json();
            if (req.ok) {
                setSuccess(true);
                setError(null);
                setAmount(0);
                setReceiverUsername('');
                onTransferSuccess();
            } else {
                setError(data.message || "An error occurred");
            }
        } catch (error) {
            setError(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleTransfer = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    return (
        <div className='p-6'>
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">Transfer successful!</span>
                </div>
            )}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            {loading && (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">Loading...</span>
                </div>
            )}

            <div className="bg-white shadow-xl rounded-lg p-8 flex flex-col gap-6 w-full md:flex-row md:items-center md:justify-between max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left">Transfer Money</h2>
                <form className="flex flex-col gap-4 w-full md:flex-row md:gap-6" onSubmit={handleTransfer}>
                    <input
                        className="flex-1 border border-gray-300 px-6 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        type="number"
                        placeholder="Amount (EGP)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <input
                        className="flex-1 border border-gray-300 px-6 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        type="text"
                        placeholder="Recipient Username"
                        value={receiverUsername}
                        onChange={(e) => setReceiverUsername(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition-all duration-300"
                        type="submit"
                    >
                        Transfer
                    </button>
                </form>
            </div>

            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Transfer</h2>
                        <p className="text-lg mb-4 text-gray-600">
                            Are you sure you want to transfer <strong>{amount} EGP</strong> to <strong>{receiverUsername}</strong>?
                        </p>
                        <div className="flex justify-end gap-6">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-md"
                                onClick={() => setShowConfirmation(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                                onClick={confirmTransfer}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transfer;
