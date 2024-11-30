'use client';
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaDownload } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdCancel, MdPostAdd } from "react-icons/md";
import withAdminAccess from "../admin/HOC/adminCheck";
import { teamService } from "@/app/api/teamservice/teamService";
import { useQuery } from "@tanstack/react-query";
import { matchService } from "@/app/api/matches/matches";

const getAllTeams = async () => {
  try {
    const response = await teamService.getAllTeams();
    return response;
  } catch (error) {
    console.error("Error in getAllTeams:", error);
    throw error;
  }
};
const getAllMatches = async () => {
  try {
    const response = await matchService.getAllMatches();
    return response;
  } catch (error) {
    console.error("Error in getAllMatches:", error);
    throw error;
  }
}
const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for individual form fields
  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");
  const [team1Id, setTeam1Id] = useState(null);
  const [team2Id, setTeam2Id] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  // const [status, setStatus] = useState("Scheduled");

  const { data: teamData } = useQuery({
    queryKey: ["teams"],
    queryFn: () => getAllTeams(),
    onSuccess: (data) => {
      setTeams(data);
     },
  });

  useEffect(() => {
    if (teamData) {
      setTeams(teamData);
    }
  }, [teamData]);

  const { data: matchData, refetch: matchRefetch } = useQuery({
    queryKey: ["matches"],
    queryFn: () => getAllMatches(),
    onSuccess: (data) => {
      setMatches(data);
     },
  });

  useEffect(() => {
    if (matchData) {
      setMatches(matchData);
    }
  }, [matchData]);

  // Handle team selection on blur for Team 1
  const handleTeam1Blur = () => {
    const matchedTeam = teams.find((team) => team.name.toLowerCase() === team1Name.toLowerCase());

    if (!matchedTeam) {
      setError(`Team "${team1Name}" not found.`);
      return;
    }

    // Ensure teams are not the same
    if (matchedTeam.id === team2Id) {
      setError("Team 1 and Team 2 cannot be the same.");
      return;
    }

    setTeam1Id(matchedTeam.id);
    setError(""); // Clear any previous errors
  };

  // Handle team selection on blur for Team 2
  const handleTeam2Blur = () => {
    const matchedTeam = teams.find((team) => team.name.toLowerCase() === team2Name.toLowerCase());

    if (!matchedTeam) {
      setError(`Team "${team2Name}" not found.`);
      return;
    }

    // Ensure teams are not the same
    if (matchedTeam.id === team1Id) {
      setError("Team 1 and Team 2 cannot be the same.");
      return;
    }

    setTeam2Id(matchedTeam.id);
    setError(""); // Clear any previous errors
  };

  // Convert team IDs to names for display
  const getTeamNameById = (id) => {
    const team = teams.find((team) => team.id === id);
    return team ? team.name : "";
  };

  const handleAddMatch = async (event) => {
    event.preventDefault();
    console.log("Form submitted");
    if (!team1Id || !team2Id || !date || !time || !venue) {
      setError("Please fill out all fields!");
      return;
    }

    // const updatedMatches = [
    //   ...matches,
    //   {
    //     team1_id: team1Id,
    //     team2_id: team2Id,
    //     date: new Date(`${date}T${time}Z`).toISOString(),
    //     match_pool: venue,
    //     team1_first_11_ids: [],
    //     team2_first_11_ids: [],
    //     team1_sub_ids: [],
    //     team2_sub_ids: [],
    //     result_id: "",
    //     referee_ids: [],
    //     id: Date.now()
    //   },
    // ];
    try {
      const response = await matchService.createMatch({
        team1_id: team1Id,
        team2_id: team2Id,
        date: new Date(`${date}T${time}Z`).toISOString(),
        match_pool: venue,
        team1_first_11_ids: [],
        team2_first_11_ids: [],
        team1_sub_ids: [],
        team2_sub_ids: [],
        result_id: null,
        referee_ids: [],
      });
      console.log(response);
      if (response?.id) {
        setIsModalOpen(false);
        // setMatches(response);
        alert("Match created successfully")
        matchRefetch()
        // Reset form
        setTeam1Name("");
        setTeam2Name("");
        setTeam1Id(null);
        setTeam2Id(null);
        setDate("");
        setTime("");
        setVenue("");
        // setStatus("Scheduled");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error creating match:", error);
    }
  };

  console.log(matches);
  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-4 text-center md:text-right flex flex-row justify-between gap-4 items-center">
        <div className="flex flex-row gap-4 items-center">
          <h1 className="text-xl text-gray-600 font-bold">Matches</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="hover:bg-green-500 flex flex-row text-green-500 hover:text-white text-xs py-2 px-4 border border-green-500 items-center gap-2 rounded-md"
          >
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

      {/* Table */}
      <div className="overflow-x-auto max-h-screen overflow-y-auto">
        <table className="min-w-full border-collapse border border-gray-200 bg-white text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="border border-gray-200 px-4 py-2">#</th>
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
                <td className="border border-gray-200 text-black px-4 py-2 min-w-[200px]">
                  {getTeamNameById(match.team1_id)} vs {getTeamNameById(match.team2_id)}
                </td>
                <td className="border border-gray-200 text-black px-4 py-2 min-w-[300px]">
                  {new Date(match.date).toLocaleDateString(undefined, {
                    weekday: "long", // e.g., Monday
                    year: "numeric", // e.g., 2024
                    month: "long", // e.g., December
                    day: "numeric", // e.g., 5
                  })} - {new Date(match.date).toLocaleTimeString(undefined, {
                    hour: "2-digit", // e.g., 09
                    minute: "2-digit", // e.g., 26
                    hour12: true, // e.g., AM/PM format
                  })}
                </td>

                <td className="border border-gray-200 text-black px-4 py-2">{match.match_pool}</td>
                <td className="border border-gray-200 text-black px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${new Date(match.date) > new Date() // Compare match date with current date
                      ? "bg-green-100 text-green-700" // Scheduled
                      : "bg-red-100 text-red-700" // Ended
                      }`}
                  >
                    {new Date(match.date) > new Date() ? "Scheduled" : "Ended"}
                  </span>
                </td>

                <td className="border border-gray-200 px-4 py-2">
                  <div className="flex items-center gap-4">
                    <button
                      className="hover:bg-blue-500 border border-blue-500 text-blue-500 hover:text-white px-2 py-1 rounded"
                    >
                      <div className="flex items-center md:gap-2">
                        <CiEdit />
                        Edit
                      </div>
                    </button>
                    <button
                      className="hover:bg-green-500 border border-green-500 text-green-500 hover:text-white px-2 py-1 rounded"
                    >
                      <div className="flex items-center md:gap-2">
                        <MdPostAdd />
                        Postpone
                      </div>
                    </button>
                    <button
                      className="hover:bg-red-500 border border-red-500 text-red-500 hover:text-white px-2 py-1 rounded"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <form onSubmit={handleAddMatch}>
              <h2 className="text-lg text-black font-bold mb-4">Add Match</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className="space-y-4">
                <input
                  type="text"
                  name="team1"
                  placeholder="Team 1"
                  value={team1Name}
                  onChange={(e) => setTeam1Name(e.target.value)}
                  onBlur={handleTeam1Blur}
                  required
                  className="w-full border border-gray-300 text-black rounded-md px-4 py-2"
                />

                <input
                  type="text"
                  name="team2"
                  placeholder="Team 2"
                  value={team2Name}
                  onChange={(e) => setTeam2Name(e.target.value)}
                  onBlur={handleTeam2Blur}
                  required
                  className="w-full border border-gray-300 text-black rounded-md px-4 py-2"
                />

                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full border border-gray-300 text-black rounded-md px-4 py-2"
                />
                <input
                  type="time"
                  name="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full border border-gray-300 text-black rounded-md px-4 py-2"
                />
                <input
                  type="text"
                  name="venue"
                  placeholder="Venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  required
                  className="w-full border border-gray-300 text-black rounded-md px-4 py-2"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-red-500 hover:text-white hover:bg-red-500 border border-red-500 rounded-md"
                >
                  Cancel
                </button>
                {!error && (
                  <button
                    // onClick={handleAddMatch}
                    type="submit"
                    className="px-4 py-2 text-green-500 hover:text-white border border-green-500 hover:bg-green-500 rounded-md"
                  >
                    Add Match
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAdminAccess(Matches);
