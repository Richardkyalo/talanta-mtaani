'use client';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowRoundBack, IoIosLogIn } from 'react-icons/io';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordText, setShowPasswordText] = useState(false); // Toggle for password text visibility

    const handleContinue = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setShowPassword(true); // Show password field after clicking continue
    };

    const handleBack = () => {
        setShowPassword(false); // Hide password field after clicking back
    };

    const handleLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Implement login functionality here
    };

    const togglePasswordVisibility = () => {
        setShowPasswordText((prev) => !prev);
    };

    return (
        <section className="flex min-h-screen">
            {/* Left Side Image */}
            <div className="w-1/2 relative hidden lg:block">
                <Image
                    src="/image/login.jpeg" // Replace with your image path
                    alt="Login Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-l-lg"
                />
            </div>

            {/* Right Side Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8 rounded-r-lg shadow-md">
                <div className="w-full max-w-sm">
                    {/* Title */}
                    <div className="flex justify-center mb-6">
                        <Image src="/image/1.jpg" alt="Site Logo" width={100} height={100} className="rounded-3xl" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Welcome Back</h2>

                    <form onSubmit={showPassword ? handleLogin : handleContinue} className="space-y-4">
                        {/* Conditional Input Field */}
                        {showPassword ? (
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPasswordText ? "text" : "password"}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full text-black px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                                    >
                                        {showPasswordText ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email or mobile phone number</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full text-black px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        )}

                        {/* Button */}
                        <div>
                            {!showPassword ? (
                                <button
                                    type="submit"
                                    className="w-full px-4 bg-white border border-blue-500 hover:bg-blue-600 text-black hover:text-white font-semibold py-1 rounded transition duration-300"
                                >
                                    Continue
                                </button>
                            ) : (
                                <div className='flex flex-row justify-between space-x-2'>
                                    <button
                                        type='button'
                                        onClick={handleBack}
                                        className="w-full px-4 bg-white border border-blue-500 hover:bg-blue-600 text-black hover:text-white font-semibold py-1 rounded transition duration-300"
                                    >
                                        <IoIosArrowRoundBack className="inline-block mr-2" /> Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-full px-4 bg-white border border-blue-500 hover:bg-blue-600 text-black hover:text-white font-semibold py-1 rounded transition duration-300"
                                    >
                                        <IoIosLogIn className="inline-block mr-2" /> Login
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>

                    {/* Links */}
                    <div className="mt-4 text-xs text-gray-500 text-center">
                        By continuing, you agree to our
                        <Link href="/conditions-of-use" className="text-blue-500 hover:underline"> Conditions of Use</Link>
                        and
                        <Link href="/privacy-notice" className="text-blue-500 hover:underline"> Privacy Notice</Link>.
                    </div>

                    {/* Divider */}
                    <hr className="my-4 border border-red-500" />

                    {/* Create Account Section */}
                    <div className="text-center">
                        <p className="text-xs text-gray-500">New to Kuza Talanta?</p>
                        <Link href="/Register">
                            <button
                                type="button"
                                className="w-full mt-2 border border-blue-500 text-gray-700 py-2 rounded font-semibold hover:bg-gray-100 transition duration-300"
                            >
                                Create your account
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
