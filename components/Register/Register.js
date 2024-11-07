'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Implement registration functionality here
    };

    return (
        <section className="flex min-h-screen">
            {/* Left Side Image */}
            <div className="w-1/2 relative hidden lg:block">
                <Image
                    src="/image/REGISTRATION.jpeg" // Replace with your image path
                    alt="Registration Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-l-lg"
                />
            </div>

            {/* Right Side Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-300 p-8 rounded-r-lg shadow-md">
                <form onSubmit={handleRegister} className="space-y-6 w-full max-w-sm">
                    <div className="flex justify-center mb-6">
                        <Image src="/image/1.jpg" alt="Site Logo" width={100} height={100} className="rounded-3xl" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 text-center">Create an Account</h2>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="phone"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full text-black px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full text-black px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full text-black px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Confirm your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full text-black border border-blue-500 hover:bg-blue-600 hover:text-white font-semibold py-2 rounded transition duration-300"
                    >
                        Register
                    </button>

                    <div className="text-center text-sm text-gray-500">
                        Already have an account?
                        <Link href="/Login" className="text-blue-500 hover:underline"> Log in</Link>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default RegistrationPage;
