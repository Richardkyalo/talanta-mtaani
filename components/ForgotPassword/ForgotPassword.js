'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement the logic for sending password reset email here
        setMessage('If an account with that email exists, we have sent a password reset link to your email.');
    };

    return (
        <section className="flex items-center justify-center bg-gray-100 min-h-screen">
            <div className="bg-white rounded-lg shadow-md w-full max-w-sm p-6">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                <Image src="/image/1.jpg" alt="Site Logo" width={100} height={100} className="rounded-3xl" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Forgot Password</h2>

                {/* Message */}
                {message && (
                    <div className="mb-4 text-green-500 text-sm text-center">
                        {message}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full text-black px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 border border-blue-500 hover:bg-blue-700 text-black hover:text-white font-semibold py-2 rounded transition duration-300"
                    >
                        Send Password Reset Link
                    </button>
                </form>

                {/* Links */}
                <div className="mt-4 text-xs text-gray-500 text-center">
                    Remember your password? 
                    <Link href="/Login" className="text-blue-500 hover:underline"> Log in</Link>.
                </div>
            </div>
        </section>
    );
};

export default ForgotPasswordPage;
