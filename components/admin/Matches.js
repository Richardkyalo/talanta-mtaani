'use client'
import { CiSearch } from "react-icons/ci";
import { FaDownload } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
export default function Matches() {
  const matches = [
    {
      id: 1213,
      team1: "Team A",
      team2: "Team B",
      date: "2023-08-15",
      time: "12:00 PM",
      venue: "Stadium A",
      score: "2-1",
      status: "Scheduled",
    },
    {
      id: 22343,
      team1: "Team C",
      team2: "Team D",
      date: "2023-08-16",
      time: "2:00 PM",
      venue: "Stadium B",
      score: "1-0",
      status: "In Progress",
    },
    // Add more matches
  ]
  return (
    <div className="p-4">
      <div className="mb-4 text-center md:text-right flex flex-row justify-between gap-4 items-center">
        <div className="flex flex-row gap-4 items-center">
        <h1 className="text-xl text-gray-600 font-bold">Matches</h1>
        <button className="hover:bg-green-500 flex flex-row text-green-500 hover:text-white text-xs py-2 px-4 border border-green-500 items-center gap-2 rounded-md">
        <MdPostAdd size={20} />
        Add Match
        </button>
          </div>
        <div className="flex flex-row gap-4 items-center">
          <button className="hover:bg-red-500 flex flex-row text-red-500 hover:text-white text-xs py-2 px-4 border border-red-500 rounded-md">
            <FaDownload className="mr-2" />
            Export
          </button>
          <div className="relative w-full max-w-md">
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search matches"
              className="w-full border border-gray-300 text-black rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 bg-white text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="border border-gray-200 px-4 py-2">#</th>
              {/* <th className="border border-gray-200 px-4 py-2">Match ID</th> */}
              <th className="border border-gray-200 px-4 py-2">Teams</th>
              <th className="border border-gray-200 px-4 py-2">Date & Time</th>
              <th className="border border-gray-200 px-4 py-2">Venue</th>
              <th className="border border-gray-200 px-4 py-2">Status</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr
                key={match.id}
                className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-gray-100 transition-all`}
              >
                <td className="border border-gray-200 text-black px-4 py-2">{index + 1}</td>
                {/* <td className="border border-gray-200 text-black px-4 py-2">{match.id}</td> */}
                <td className="border border-gray-200 text-black px-4 py-2">
                  {match.team1} vs {match.team2}
                </td>
                <td className="border border-gray-200 text-black px-4 py-2">{match.date}</td>
                <td className="border border-gray-200 text-black px-4 py-2">{match.venue}</td>
                <td className="border border-gray-200 text-black px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${match.status === 'Scheduled'
                        ? 'bg-green-100 text-green-700'
                        : match.status === 'Ongoing'
                          ? 'bg-orange-100 text-orange-700'
                          : match.status === 'Completed'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                  >
                    {match.status}
                  </span>
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <div className="flex items-center gap-4">
                    <button
                      className="hover:bg-blue-500 border border-blue-500 text-blue-500 hover:text-white px-2 py-1 rounded"
                      onClick={() => handleEditMatch(match)}
                    >
                      <div className="flex items-center md:gap-2">
                        <CiEdit />
                        <p className="text-sm">Edit</p>
                      </div>
                    </button>
                    <button
                      className="hover:bg-green-500 text-green-500 border border-green-500 hover:text-white px-2 py-1 rounded"
                      onClick={() => handleCompleteMatch(match)}
                    >
                      <div className="flex items-center md:gap-2">
                        <MdPostAdd />
                        Postpone
                      </div>
                    </button>
                    <button
                      className="hover:bg-red-500 text-red-500 border border-red-500 hover:text-white px-2 py-1 rounded"
                      onClick={() => handleCancelMatch(match)}
                    >
                      <div className="flex items-center md:gap-2">
                        <MdCancel />
                        Cancel
                      </div>
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}