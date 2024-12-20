'use client';

import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-blue-600 text-white py-20">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/image/blogCover.jpeg)' }}>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-xl mb-6">We are here to assist you. Whether you have questions or need support, feel free to reach out to us.</p>
                    <a href="#contact-form" className="text-lg font-semibold bg-blue-800 px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300">
                        Get in Touch
                    </a>
                </div>
            </section>

            {/* Contact Form Section */}
            <div id="contact-form" className="container mx-auto py-12 px-6">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Section - Information */}
                    <div className="space-y-4">
                        <p className="text-lg text-gray-600">
                            Have any questions or need assistance? We are here to help you. Whether you&apos;re looking to get more information about the tournament, register a team, or simply want to reach out, feel free to contact us.
                        </p>

                        <h3 className="text-2xl text-gray-700 font-semibold">General Inquiries</h3>
                        <p className="text-gray-600">
                            Email: <a href="mailto:info@kuzatalanta.com" className="text-blue-600">info@kuzatalanta.com</a>
                        </p>
                        <p className="text-gray-600">
                            Phone: <a href="tel:+1234567890" className="text-blue-600">0721838205</a>
                        </p>

                        {/* Location Map */}
                        <div className="mt-6">
                            <h3 className="text-2xl text-gray-600 font-semibold">Location</h3>
                            <div className="w-full h-64 mb-6">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3985.99047845072!2d38.217425073814724!3d-2.5099946381856286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x183ba5c82523eda9%3A0x6715f29d63c1f40f!2sYINDUNDU%20PRI!5e0!3m2!1sen!2ske!4v1734701016675!5m2!1sen!2ske"
                                    width="100%"
                                    height="100%"
                                    allowFullScreen
                                    //   aria-hidden="false"
                                    title="Kuza Talanta Tournament Location"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Contact Form */}
                    <div>
                        <h3 className="text-2xl text-black font-semibold mb-4">Send Us a Message</h3>
                        <form onSubmit={handleSubmit} className="text-black space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    rows="4"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
