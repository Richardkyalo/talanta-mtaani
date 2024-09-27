// components/EntertainmentSection.js

import React from 'react';
import { FaFutbol } from 'react-icons/fa'; // Importing a football icon

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  ">
          <div className="bg-white border-b border-t border-red-500 flex flex-col justify-center items-center p-4 rounded-lg shadow-md">
            <FaFutbol className="text-4xl text-black mb-2 animate-spin" />
            <h3 className="text-xl font-semibold">Celebrity Matches</h3>
            <p className="text-xs text-gray-600">
              Watch your favorite celebrities compete in friendly matches during the tournament.
            </p>
          </div>
          <div className="bg-white border-b border-t border-red-500 p-4 flex flex-col justify-center items-center rounded-lg shadow-md">
            <FaFutbol className="text-4xl text-black mb-2 animate-spin" />
            <h3 className="text-xl text-black font-semibold">Live Commentary</h3>
            <p className="text-xs text-gray-600">
              Enjoy live commentary and analysis from top sports analysts throughout the matches.
            </p>
          </div>
          <div className="bg-white border-b border-t border-red-500 p-4 flex flex-col justify-center items-center rounded-lg shadow-md">
            <FaFutbol className="text-4xl text-black  mb-2 animate-spin" />
            <h3 className="text-xl text-black font-semibold">Football Challenges</h3>
            <p className="text-xs text-gray-600">
              Participate in fun football challenges and win exciting prizes!
            </p>
          </div>
          <div className="bg-white border-b border-t border-red-500 p-4 flex flex-col justify-center items-center rounded-lg shadow-md">
            <FaFutbol className="text-4xl text-black mb-2 animate-spin" />
            <h3 className="text-xl text-black font-semibold">Football Challenges</h3>
            <p className="text-xs text-gray-600">
              Participate in fun football challenges and win exciting prizes!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntertainmentSection;
