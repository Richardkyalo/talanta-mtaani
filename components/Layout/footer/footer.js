import React from 'react';
import { FaFacebook,  FaInstagram } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
const Footer = () => {
    return (

        <footer className="bg-[#157ebc] text-white py-8">
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 px-4">
                {/* About Tournament Column */}
                <div>
                    <h4 className="font-semibold mb-4">About Tournament</h4>
                    <ul className='text-sm'>
                        <li className="mb-2"><a href="#" className="hover:underline">About Kuza Talanta Mtaani</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">History</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Past Winners</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Organizers</a></li>
                        <li><a href="#" className="hover:underline">Contact Us</a></li>
                    </ul>
                </div>

                {/* Teams & Fixtures Column */}
                <div>
                    <h4 className="font-semibold mb-4">Teams & Fixtures</h4>
                    <ul className='text-sm'>
                        <li className="mb-2"><a href="#" className="hover:underline">Participating Teams</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Match Schedules</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Results</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Group Standings</a></li>
                        <li><a href="#" className="hover:underline">Top Scorers</a></li>
                    </ul>
                </div>

                {/* Media Column */}
                <div>
                    <h4 className="font-semibold mb-4">Media</h4>
                    <ul className='text-sm'>
                        <li className="mb-2"><a href="#" className="hover:underline">Photo Gallery</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Video Highlights</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Press Releases</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Live Streaming</a></li>
                        <li><a href="#" className="hover:underline">Social Media</a></li>
                    </ul>
                </div>

                {/* Fan Zone Column */}
                <div>
                    <h4 className="font-semibold mb-4">Fan Zone</h4>
                    <ul className='text-sm'>
                        <li className="mb-2"><a href="#" className="hover:underline">Fan Clubs</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Contests</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Merchandise</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Fan Stories</a></li>
                        <li><a href="#" className="hover:underline">Events & Meetups</a></li>
                    </ul>
                </div>

                {/* Sponsors & Partners Column */}
                <div>
                    <h4 className="font-semibold mb-4">Sponsors & Partners</h4>
                    <ul className='text-sm'>
                        <li className="mb-2"><a href="#" className="hover:underline">Our Sponsors</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Partnership Opportunities</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Corporate Social Responsibility</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Media Partners</a></li>
                        <li><a href="#" className="hover:underline">Volunteer with Us</a></li>
                    </ul>
                </div>
            </div>

            {/* App Links and Social Media */}
            <div className="container mx-auto mt-8 px-4 flex flex-col md:flex-row justify-between items-center">
                {/* App Download Links */}
                <div className="flex space-x-4">
                    <a href="#" className="bg-black  rounded-full text-white">
                        <img src="/image/logo.png" alt="App Store" className="h-12 w-12 rounded-full" />
                    </a>
                    <a href="#" className="bg-black  rounded-full text-white">
                        <img src="/image/1.jpg" alt="Google Play Store" className="w-12 h-12 rounded-full" />
                    </a>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <FaFacebook />
                    <RiTwitterXFill />
                    <FaInstagram />
                </div>
            </div>
            <div className='container mx-4 border-t border-black mt-4'></div>
            {/* Footer Bottom */}
            <div className="container  mx-auto mt-8 px-4 text-center text-sm">
                <p>&copy; 2024 Kuza Talanta Mtaani Football Tournament. All Rights Reserved.</p>
                <h6>Designed by Richard Kyalo</h6>
                <p>+254 728 674 821 | richardkyalo57@gmail.com</p>
            </div>
        </footer>
    );
};

export default Footer;
