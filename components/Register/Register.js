'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { userService } from '../../app/api/userService/userService';
import { registerUser } from '../../app/api/register/registerRoute';
import { userRoleService } from '@/app/api/rbac/userRoleCreate';


// const defaultRoleName="fan";
const defaultRoleId="8164fc60-f0c5-4d51-bc38-681d2397507b";
const checkUsernameExists = async (username) => {
    try {
        const isExisting = await userService.getUserByUserName(username);
        if (isExisting?.data !== "User not found") {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}
const checkIfEmailExists = async (email) => {
    try {
        const isExisting = await userService.checkIfUserExists(email);
        if (isExisting?.data !== "User not found") {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}
const checkIfIsEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordRegex.test(password);
}

const comparePasswords = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return false;
    }
    return true;
}
const RegistrationPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
    const [errorMessage, setErrorMessage] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const isEmailExists = await checkIfEmailExists(email);
        const isUsernameExists = await checkUsernameExists(username);

        if (email.length > 0) {
            if (!checkIfIsEmailValid(email)) {
                setErrorMessage('Invalid email format');
                return;
            }

            if (isEmailExists) {
                setErrorMessage('Email already exists');
                return;
            }
        }
        if (username.length === 0) {
            setErrorMessage('Please enter a username');
            return;
        }

        if (isUsernameExists) {
            setErrorMessage('Username already Taken please try another one');
            return;
        }

        if (!validatePassword(password)) {
            setErrorMessage('Password does not meet the requirements');
            return;
        }
        if (!comparePasswords(password, confirmPassword)) {
            setErrorMessage('Passwords do not match');
            return;
        }
        const response = await registerUser({ data: { username, email, password, phone } });
        if (response) {
            const dataForRole = {
                email: email,
                id: response.id,
                username: username,
                role: defaultRoleId,
                // role_id: defaultRoleId
            }
            const responseForRole = await userRoleService.createRole(dataForRole);
            if(responseForRole?.data?.data){
                // console.log(response)
                localStorage.setItem('user', JSON.stringify(response));
                router.push('/Login'); 
            }
            
        }

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
                    <p className="text-sm text-gray-600 text-center"><span className="text-red-500">*</span> Indicates required fields</p>
                    {errorMessage && (
                        <div className="text-red-500 text-sm text-center">
                            {errorMessage}
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full text-black px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter your email"

                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username <span className="text-red-500">*</span></label>
                        <input
                            type="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full text-black px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter your username"

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
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full text-black px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Enter your password"

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
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full text-black px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Confirm your password"

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
