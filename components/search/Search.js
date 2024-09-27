import React from 'react';
import { IoMdFootball } from "react-icons/io";

const FootballTournamentSearch = () => {
  return (
    <section className="bg-gray-100 -mt-6 md:-mt-24 py-8">
      <div className="container mx-auto px-4 text-center">
        {/* Hero Section */}
        <div className="relative z-10 bg-cover bg-center h-48" >
          <div className="absolute inset-0 rounded-t-2xl bg-white"></div>
          <div className="absolute inset-0 flex -mt-12 justify-center">
            <div className="rounded-full bg-white">
              <IoMdFootball className="text-6xl text-black animate-spin" />
            </div>
          </div>
          <div className="relative text-gray-800 flex items-center justify-center h-full">
            <h1 className="text-3xl font-bold">Search for Matches, Teams, or Services</h1>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white shadow-lg border-b borde-4 border-blue-500 rounded-b-2xl px-8">
          <div className="relative">
            <input
              type="text"
              className="w-full p-4 rounded-full border border-gray-300 focus:outline-none"
              placeholder="Search for a team, match, or service..."
            />
          </div>

          {/* Categories */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-red-100 rounded-full">
                {/* Replace icon with a football-related one */}
                <img src="/image/tourn2.jpg" alt="Group Stages" className="w-8 h-8 rounded full" />
              </div>
              <p className="mt-2 text-gray-700 mb-8 ">Group Stages</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="p-4 bg-red-100 rounded-full">
                <img src="/image/tourn3.jpg" alt="Knockouts" className="w-8 h-8 rounded full" />
              </div>
              <p className="mt-2 text-gray-700 mb-8 ">Knockouts</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="p-4 bg-red-100 rounded-full">
                <img src="/image/2.jpg" alt="Finals" className="w-8 h-8 rounded full" />
              </div>
              <p className="mt-2 text-gray-700 mb-8 ">Finals</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="p-4 bg-red-100 rounded-full">
                <img src="/image/1.jpg" alt="Top Scorers" className="w-8 h-8 rounded full" />
              </div>
              <p className="mt-2 text-gray-700 mb-8 ">Top Scorers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FootballTournamentSearch;
