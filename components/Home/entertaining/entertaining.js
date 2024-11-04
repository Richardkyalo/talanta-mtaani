// components/EntertainmentSection.js

import React from 'react';
import { FaFutbol } from 'react-icons/fa';

const EntertainmentSection = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container text-center mx-auto">
        <h2 className="text-xl text-blue-500 mb-4">
          Annual Football Tournament Entertainment
        </h2>
        <p className="text-sm text-gray-700 mb-6">
          Join us every December for an exciting lineup of football entertainment!
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card 1: Celebrity Matches */}
          <div className="bg-white border-b border-t border-red-500 flex flex-col justify-center items-center p-4 rounded-lg shadow-md relative">
            <img src="/image/celeb.jpeg" alt="Celebrity Match" className="w-full h-40 object-cover rounded-lg" />
            <FaFutbol className="absolute top-2 right-2 text-4xl text-black animate-spin" />
            <div className="text-center mt-4">
              <h3 className="text-xl text-black font-semibold">Celebrity Matches</h3>
              <p className="text-xs text-gray-600">
                Watch your favorite celebrities compete in friendly matches during the tournament.
              </p>
            </div>
          </div>

          {/* Card 2: Football Challenges */}
          <div className="bg-white border-b border-t border-red-500 p-4 flex flex-col justify-center items-center rounded-lg shadow-md relative">
            <img src="/image/fifth.jpeg" alt="Football Challenges" className="w-full h-40 object-cover rounded-lg" />
            <FaFutbol className="absolute top-2 right-2 text-4xl text-black animate-spin" />
            <div className="text-center mt-4">
              <h3 className="text-xl text-black font-semibold">Football Challenges</h3>
              <p className="text-xs text-gray-600">
                Participate in fun football challenges and win exciting prizes!
              </p>
            </div>
          </div>

          {/* Card 3: Football Activities */}
          <div className="bg-white border-b border-t border-red-500 p-4 flex flex-col justify-center items-center rounded-lg shadow-md relative">
            <img src="/image/nine.jpeg" alt="Football Activities" className="w-full h-40 object-cover rounded-lg" />
            <FaFutbol className="absolute top-2 right-2 text-4xl text-black animate-spin" />
            <div className="text-center mt-4">
              <h3 className="text-xl text-black font-semibold">Football Activities</h3>
              <p className="text-xs text-gray-600">
                Enjoy various football activities that everyone can participate in.
              </p>
            </div>
          </div>

          {/* Card 4: Fun Games */}
          <div className="bg-white border-b border-t border-red-500 p-4 flex flex-col justify-center items-center rounded-lg shadow-md relative">
            <img src="/image/seventh.jpeg" alt="Fun Games" className="w-full h-40 object-cover rounded-lg" />
            <FaFutbol className="absolute top-2 right-2 text-4xl text-black animate-spin" />
            <div className="text-center mt-4">
              <h3 className="text-xl text-black font-semibold">Fun Games</h3>
              <p className="text-xs text-gray-600">
                Join in on fun games and activities, perfect for the whole family!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntertainmentSection;
 