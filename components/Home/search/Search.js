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
            <h1 className="text-3xl font-bold">Come all and experience the excitement of the Kuza Talanta Mtaani</h1>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white shadow-lg  border-b-4 border-blue-500 rounded-b-2xl px-8">
          {/* <div className="relative">
            <input
              type="text"
              className="w-full p-4 rounded-full border border-gray-300 focus:outline-none"
              placeholder="Search for a team, match, or service..."
            />
          </div> */}


          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Row 1: Image on the left, text on the right */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="p-4 w-full md:w-1/2">
                <img src="/image/first.jpeg" alt="Group Stages" className="image-fluid rounded-tl-3xl rounded-br-3xl" />
              </div>
              <div className="p-4 w-full md:w-1/2 flex items-center">
                <p className="text-gray-700">
                  The Group Stages feature exciting matches where teams compete to advance to the next round.
                </p>
              </div>
            </div>

            {/* Row 2: Text on the left, image on the right */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="p-4 w-full md:w-1/2">
                <img src="/image/second.jpeg" alt="Knockouts" className="image-fluid rounded-tl-3xl rounded-br-3xl" />
              </div>
              <div className="p-4 w-full md:w-1/2 flex items-center">
                <p className="text-gray-700">
                  The Knockout rounds are intense, with each team vying for a spot in the finals.
                </p>
              </div>
            </div>

            {/* Row 3: Image on the left, text on the right */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="p-4 w-full md:w-1/2">
                <img src="/image/third.jpeg" alt="Finals" className="image-fluid rounded-tl-3xl rounded-br-3xl" />
              </div>
              <div className="p-4 w-full md:w-1/2 flex items-center">
                <p className="text-gray-700">
                  The Finals are the culmination of the tournament, where the best teams face off for the championship.
                </p>
              </div>
            </div>

            {/* Row 4: Text on the left, image on the right */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="p-4 w-full md:w-1/2">
                <img src="/image/fourth.jpeg" alt="Top Scorers" className="image-fluid rounded-tl-3xl rounded-br-3xl" />
              </div>
              <div className="p-4 w-full md:w-1/2 flex items-center">
                <p className="text-gray-700">
                  Recognizing the Top Scorers who made outstanding contributions throughout the tournament.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FootballTournamentSearch;
