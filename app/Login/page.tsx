'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FcGoogle, } from "react-icons/fc";
import { FiFacebook } from "react-icons/fi";
import { RiTwitterXFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e: any) => {
        e.preventDefault();
        // Implement login functionality here
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-700 px-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
                {/* Logo Section */}
                <div className="flex justify-center mb-8">
                    <Image src="/image/1.jpg" alt="Site Logo" width={100} height={100} className="w-20 h-20 rounded-2xl" />
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Welcome Back</h2>

                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full text-black px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your password"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center mt-6 pr-3 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 
                            <FaEyeSlash />
                             : 
                            <FaEye />
                            }
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
                    >
                        Log In
                    </button>
                </form>

                {/* Additional Links */}
                <div className="text-center mt-6">
                    <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                        Forgot your password?
                    </Link>
                    <p className="mt-4 text-gray-600">
                        Don’t have an account?{' '}
                        <Link href="/register" className="text-blue-500 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>

                {/* Social Media Logins */}
                <div className="flex items-center justify-center mt-8">
                    <span className="text-gray-500">Or sign in with</span>
                    <div className="flex gap-4 ml-4">
                        <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition duration-200">
                            <FcGoogle />
                        </button>
                        <button className="p-2 border border-gray-30 text-blue-500 rounded-full hover:bg-gray-100 transition duration-200">
                            <FiFacebook />
                        </button>
                        <button className="p-2 border border-gray-300 rounded-full text-black hover:bg-gray-100 transition duration-200">
                            <RiTwitterXFill />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
