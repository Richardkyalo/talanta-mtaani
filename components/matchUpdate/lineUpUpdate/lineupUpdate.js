'use client';
import { useEffect, useState } from "react";
import withMatchUpdaterAccess from "../HOC/matchUpdaterCheck";
import { matchService } from "@/app/api/matches/matches";
import { useQuery } from "@tanstack/react-query";
import { teamService } from "@/app/api/teamservice/teamService";
import { playerService } from "@/app/api/playerservice/playerService";
import { userService } from "../../../app/api/userService/userService";

const getTodaysMatches = async () => {
  const response = await matchService.getTodayMatches();
  return response || [];
};

const getTeamById = async (id) => {
  const response = await teamService.getTeamById(id);
  return response || {};
};

const getTeamPlayers = async (teamId) => {
  const response = await playerService.getPlayerByTeamId(teamId);
  return response?.data || [];
};

const getReferees = async () => {
  const response = await userService.getReferees();
  return response?.rows || [];
};

const LineupUpdatePage = () => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [referees, setReferees] = useState([]);
  const [team1First11, setTeam1First11] = useState([]);
  const [team2First11, setTeam2First11] = useState([]);
  const [team1Substitutes, setTeam1Substitutes] = useState([]);
  const [team2Substitutes, setTeam2Substitutes] = useState([]);
  const [selectedReferee, setSelectedReferee] = useState(null);
  const [showTeam1Players, setShowTeam1Players] = useState(false);
  const [showTeam2Players, setShowTeam2Players] = useState(false);
  const [showTeam1Substitutes, setShowTeam1Substitutes] = useState(false);
  const [showTeam2Substitutes, setShowTeam2Substitutes] = useState(false);

  const { data: todaysMatches } = useQuery({
    queryKey: ["todaysMatches"],
    queryFn: getTodaysMatches,
    onError: (error) => {
      console.error("Error fetching matches:", error);
    },
  });

  useEffect(() => {
    if (todaysMatches) {
      // Filter out past matches and updated matches
      const filteredMatches = todaysMatches.filter((match) => {
        const matchTime = new Date(match.date);
        return (
          matchTime > new Date() && // Ensure the match is in the future
          match.team1_first_11_ids.length === 0 && // No first 11 for team 1
          match.team2_first_11_ids.length === 0 && // No first 11 for team 2
          match.team1_sub_ids.length === 0 && // No subs for team 1
          match.team2_sub_ids.length === 0 && // No subs for team 2
          match.referee_ids.length === 0 // No referees assigned
        );
      });
  
      // Sort by the earliest match date
      const imminentMatch = filteredMatches.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      )[0]; // Pick the first (earliest) match from the filtered list
  
      setSelectedMatch(imminentMatch || null);
    }
  }, [todaysMatches]);
  

  useEffect(() => {
    if (selectedMatch) {
      // Fetch team names
      getTeamById(selectedMatch.team1_id).then((team) =>
        setTeam1Name(team.name || "Unknown Team")
      );
      getTeamById(selectedMatch.team2_id).then((team) =>
        setTeam2Name(team.name || "Unknown Team")
      );

      // Fetch players for both teams
      getTeamPlayers(selectedMatch.team1_id).then(setTeam1Players);
      getTeamPlayers(selectedMatch.team2_id).then(setTeam2Players);

      // Fetch referees
      getReferees().then(setReferees);
    }
  }, [selectedMatch]);

  const handleAddToFirst11 = (team, playerId) => {
    if (team === "team1") {
      setTeam1First11((prev) => [...prev, playerId]);
    } else {
      setTeam2First11((prev) => [...prev, playerId]);
    }
  };

  const handleAddSubstitute = (team, playerId) => {
    if (team === "team1") {
      setTeam1Substitutes((prev) => [...prev, playerId]);
    } else {
      setTeam2Substitutes((prev) => [...prev, playerId]);
    }
  };

  const handleRemoveSubstitute = (team, playerId) => {
    if (team === "team1") {
      setTeam1Substitutes((prev) => prev.filter((id) => id !== playerId));
    } else {
      setTeam2Substitutes((prev) => prev.filter((id) => id !== playerId));
    }
  };

  const handleSelectReferee = (referee) => {
    setSelectedReferee(referee);
  };

  const handleSubmit = () => {
    // Send team lineups and substitutes to the backend
    console.log({
      team1First11,
      team2First11,
      team1Substitutes,
      team2Substitutes,
      selectedReferee,
    });
    // Here you would send the data to your backend
  };

  if (!selectedMatch) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          No Match Available for Update
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Lineup for Match</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Match Pool: {selectedMatch.match_pool}</h2>
      <h3 className="text-lg font-medium text-gray-600 mb-4">
        Match Time: {new Date(selectedMatch.date).toLocaleString('en-US', { timeZone: 'UTC' })}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Team 1 Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Team 1: {team1Name}</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
            onClick={() => setShowTeam1Players(!showTeam1Players)}
          >
            {showTeam1Players ? "Hide Players" : "Add First 11"}
          </button>
          {showTeam1Players && (
            <div>
              <h3 className="text-md text-gray-600 font-medium mb-2">Select First 11:</h3>
              {team1Players.map((player) => (
                <div key={player.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`team1-first11-${player.id}`}
                    value={player.id}
                    onChange={(e) => handleAddToFirst11("team1", player.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`team1-first11-${player.id}`} className="text-gray-600">{player.name}</label>
                </div>
              ))}
            </div>
          )}
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-4"
            onClick={() => setShowTeam1Substitutes(!showTeam1Substitutes)}
          >
            {showTeam1Substitutes ? "Hide Substitutes" : "Add Substitutes"}
          </button>
          {showTeam1Substitutes && (
            <div>
              <h3 className="text-md text-gray-600 font-medium mb-2">Select Substitutes:</h3>
              {team1Players.map((player) => (
                <div key={player.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`team1-substitute-${player.id}`}
                    value={player.id}
                    onChange={(e) => handleAddSubstitute("team1", player.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`team1-substitute-${player.id}`} className="text-gray-600">{player.name}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Team 2 Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Team 2: {team2Name}</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
            onClick={() => setShowTeam2Players(!showTeam2Players)}
          >
            {showTeam2Players ? "Hide Players" : "Add First 11"}
          </button>
          {showTeam2Players && (
            <div>
              <h3 className="text-md text-gray-600 font-medium mb-2">Select First 11:</h3>
              {team2Players.map((player) => (
                <div key={player.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`team2-first11-${player.id}`}
                    value={player.id}
                    onChange={(e) => handleAddToFirst11("team2", player.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`team2-first11-${player.id}`} className="text-gray-600">{player.name}</label>
                </div>
              ))}
            </div>
          )}
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-4"
            onClick={() => setShowTeam2Substitutes(!showTeam2Substitutes)}
          >
            {showTeam2Substitutes ? "Hide Substitutes" : "Add Substitutes"}
          </button>
          {showTeam2Substitutes && (
            <div>
              <h3 className="text-md text-gray-600 font-medium mb-2">Select Substitutes:</h3>
              {team2Players.map((player) => (
                <div key={player.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`team2-substitute-${player.id}`}
                    value={player.id}
                    onChange={(e) => handleAddSubstitute("team2", player.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`team2-substitute-${player.id}`} className="text-gray-600">{player.name}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Referee Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Referee</h2>
          <div>
            {referees.map((referee) => (
              <button
                key={referee.id}
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 mb-2"
                onClick={() => handleSelectReferee(referee)}
              >
                {referee.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        className="bg-indigo-500 text-white px-6 py-3 rounded-md mt-6"
        onClick={handleSubmit}
      >
        Submit Lineup
      </button>
    </div>
  );
};

export default withMatchUpdaterAccess(LineupUpdatePage);
