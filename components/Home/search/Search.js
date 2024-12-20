import Image from 'next/image';
import React from 'react';
import { IoMdFootball } from "react-icons/io";

const FootballTournamentSearch = () => {
  return (
    <section className="bg-gray-100 -mt-6 md:-mt-24 py-8">
      <div className="container mx-auto text-center">
        {/* Hero Section */}
        <div className="relative z-10 bg-cover bg-center h-48">
          <div className="absolute inset-0 rounded-t-2xl bg-white"></div>
          <div className="absolute inset-0 flex -mt-12 justify-center">
            <div className="rounded-full bg-white">
              <IoMdFootball className="text-6xl text-black animate-spin" />
            </div>
          </div>
          <div className="relative text-gray-800 flex justify-center h-full">
            <h1 className="text-3xl mt-24 font-bold">Come all and experience the excitement of Football Clashes</h1>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white shadow-lg border-b-4 border-blue-500 rounded-b-2xl px-8">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {/* Row 1: Image on the left, text on the right */}
            <div className="flex flex-col md:flex-row-reverse">
              <div className="p-4 w-full md:w-1/2">
                <Image src="/image/first.jpeg" alt="Group Stages" width={800} height={600} className="image-fluid rounded-tr-3xl rounded-bl-3xl" />
              </div>
              <div className="p-4 space-y-16 w-full md:w-1/2 flex flex-col items-start">
                <h4 className="text-xl font-semibold mb-4 text-red-500">The Group Stages</h4>
                <p className="text-gray-700 text-xs text-left">
                  The Group Stages kick off the tournament with excitement and anticipation. Teams are divided into groups, where they
                  battle against each other to secure a top spot and advance to the knockout rounds. This stage is full of energy, as each team brings their best
                  strategies to the field, showcasing skill and teamwork to survive the early rounds.
                </p>
                <a href="#" className="btn btn-lg text-sm border border-red-500 rounded-full px-4 text-red-500 hover:bg-red-500 hover:text-white">Learn More</a>
              </div>
            </div>

            {/* Row 2: Text on the left, image on the right */}
            <div className="flex flex-col md:flex-row">
              <div className="p-4 w-full md:w-1/2">
                <Image src="/image/second.jpeg" alt="Knockouts" width={800} height={600} className="image-fluid rounded-tl-3xl rounded-br-3xl" />
              </div>
              <div className="p-4  space-y-16 w-full md:w-1/2 flex flex-col items-end">
                <h4 className="text-xl font-semibold mb-4 text-red-500">Community Volunteers – The Heart of the Tournament
                </h4>
                <p className="text-gray-700 text-xs text-right">
                Behind the scenes, dozens of volunteers make this event possible. From setting up tents and managing concessions to organizing activities for children and ensuring safety, these volunteers work tirelessly to bring the tournament to life. This year, we celebrate their contributions and share stories from a few dedicated individuals who have become the backbone of the event.
                 </p>
                <a href="#" className="btn btn-lg text-sm border border-red-500 rounded-full px-4 text-red-500 hover:bg-red-500 hover:text-white">Learn More</a>
              </div>
            </div>

            {/* Row 3: Image on the left, text on the right */}
            <div className="flex flex-col md:flex-row-reverse">
              <div className="p-4 w-full md:w-1/2">
                <Image src="/image/third.jpeg" alt="Finals" width={800} height={600} className="image-fluid rounded-tr-3xl rounded-bl-3xl" />
              </div>
              <div className="p-4  space-y-16 w-full md:w-1/2 flex flex-col items-start">
                <h4 className="text-xl font-semibold mb-4 text-red-500">The Finals</h4>
                <p className="text-gray-700 text-xs text-left">
                  The Finals represent the pinnacle of the tournament, where the top teams compete
                  for the ultimate glory. This climactic stage is a showcase of exceptional talent,
                  determination, and sportsmanship. Fans gather with anticipation as
                  the two best teams face off, knowing that only one will emerge as the champion.
                  The Finals are filled with memorable moments that define legends and leave lasting legacies.
                </p>
                <a href="#" className="btn btn-lg text-sm border border-red-500 rounded-full px-4 text-red-500 hover:bg-red-500 hover:text-white">Learn More</a>

              </div>
            </div>

            {/* Row 4: Text on the left, image on the right */}
            <div className="flex flex-col md:flex-row">
              <div className="p-4 w-full md:w-1/2">
                <Image src="/image/fourth.jpeg" alt="Top Scorers" width={800} height={600} className="image-fluid rounded-tl-3xl rounded-br-3xl" />
              </div>
              <div className="p-4 space-y-16  w-full md:w-1/2 flex flex-col items-end">
                <h4 className="text-xl font-semibold mb-4 text-red-500">The Top Scorers</h4>
                <p className="text-gray-700 text-xs text-right">
                  Celebrating the Top Scorers, we recognize players whose skill and precision have
                  led to the highest goals scored throughout the tournament. These players have displayed
                  exceptional accuracy, agility, and an eye for opportunities that have placed them above
                  the rest. Their contribution not only energizes their teams but also thrills fans, making
                  them true icons of the tournament.
                </p>
                <a href="#" className="btn btn-lg text-sm border border-red-500 rounded-full px-4 text-red-500 hover:bg-red-500 hover:text-white">Learn More</a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FootballTournamentSearch;
