'use client';
import { useEffect, useState } from "react";
import withMatchUpdaterAccess from "../HOC/matchUpdaterCheck";
import { matchService } from "@/app/api/matches/matches";
import { useQuery } from "@tanstack/react-query";
import { teamService } from "@/app/api/teamservice/teamService";
import { playerService } from "@/app/api/playerservice/playerService";
import { userService } from "../../../app/api/userService/userService";
import { type } from "os";

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
  // console.log(response)
  return response?.data?.rows || [];
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
  const [selectedReferee, setSelectedReferee] = useState([]);
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
  const { data: refereesData } = useQuery({
    queryKey: ["referees"],
    queryFn: getReferees,
    onError: (error) => {
      console.error("Error fetching referees:", error);
    }
  })
  useEffect(() => {
    if (refereesData) {
      setReferees(refereesData);
    }
  }, [refereesData]);

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

    // Convert match times to Nairobi time (EAT) and sort in ascending order
    const imminentMatch = filteredMatches
      .sort((a, b) => {
        const matchTimeA = new Date(a.date).toLocaleString('en-US', { timeZone: 'Africa/Nairobi' });
        const matchTimeB = new Date(b.date).toLocaleString('en-US', { timeZone: 'Africa/Nairobi' });
        return new Date(matchTimeA) - new Date(matchTimeB); // Sort in ascending order (earliest match first)
      })[0]; // Pick the first match (most recent approaching one)

    setSelectedMatch(imminentMatch || null);
  }
}, [todaysMatches]);


  // console.log(getTodaysMatches())
  // console.log("selectedMatch",selectedMatch,"selectedMatch");
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
    }
  }, [selectedMatch]);

  const handleAddToFirst11 = (team, playerId) => {
    if (team === "team1") {
      if (team1First11.includes(playerId)) {
        alert("Player is already in First 11.");
        return;
      }
  
      if (team1First11.length >= 11) {
        alert("You can only select 11 players for the First 11.");
        return;
      }
  
      setTeam1First11((prev) => [...prev, playerId]);
      setTeam1Substitutes((prev) => prev.filter((id) => id !== playerId)); // Remove from substitutes
    } else {
      if (team2First11.includes(playerId)) {
        alert("Player is already in First 11.");
        return;
      }
  
      if (team2First11.length >= 11) {
        alert("You can only select 11 players for the First 11.");
        return;
      }
  
      setTeam2First11((prev) => [...prev, playerId]);
      setTeam2Substitutes((prev) => prev.filter((id) => id !== playerId)); // Remove from substitutes
    }
  };
  

  const handleAddSubstitute = (team, playerId) => {
    if (team === "team1") {
      if (team1Substitutes.includes(playerId)) {
        alert("Player is already a substitute.");
        return;
      }
  
      if (team1Substitutes.length >= 6) {
        alert("You can only select up to 6 substitutes.");
        return;
      }
  
      setTeam1Substitutes((prev) => [...prev, playerId]);
      setTeam1First11((prev) => prev.filter((id) => id !== playerId)); // Remove from First 11
    } else {
      if (team2Substitutes.includes(playerId)) {
        alert("Player is already a substitute.");
        return;
      }
  
      if (team2Substitutes.length >= 6) {
        alert("You can only select up to 6 substitutes.");
        return;
      }
  
      setTeam2Substitutes((prev) => [...prev, playerId]);
      setTeam2First11((prev) => prev.filter((id) => id !== playerId)); // Remove from First 11
    }
  };
  

  // const handleRemoveSubstitute = (team, playerId) => {
  //   if (team === "team1") {
  //     setTeam1Substitutes((prev) => prev.filter((id) => id !== playerId));
  //   } else {
  //     setTeam2Substitutes((prev) => prev.filter((id) => id !== playerId));
  //   }
  // };

  const handleSelectReferee = (refereeId) => {
    setSelectedReferee((prev) => {
      console.log("Previous selection:", prev); // Debug
      const alreadySelected = prev.includes(refereeId);
      const newSelection = alreadySelected
        ? prev.filter((id) => id !== refereeId)
        : [...prev, refereeId];
      // console.log("New selection:", newSelection); // Debug
      return newSelection;
    });
  };


  const handleSubmit = async () => {
    const matchId = selectedMatch.id;
    console.log("Refs:", selectedReferee);
  
    const updates = [
      {
        type: "referee_ids",
        flag: false,
        data: [selectedReferee],
        match_id: matchId
      },
      {
        type: "team1_first_11_ids",
        flag: false,
        data: team1First11,
        match_id: matchId
      },
      {
        type: "team2_first_11_ids",
        flag: false,
        data: team2First11,
        match_id: matchId
      },
      {
        type: "team1_sub_ids",
        flag: false,
        data: team1Substitutes,
        match_id: matchId
      },
      {
        type: "team2_sub_ids",
        flag: false,
        data: team2Substitutes,
        match_id: matchId
      }
    ];
  
    try {
      const results = await Promise.allSettled(
        updates.map((update) => matchService.updateMatch(update))
      );
  
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          console.log(`Update ${updates[index].type} succeeded.`);
        } else {
          console.error(`Update ${updates[index].type} failed:`, result.reason);
        }
      });
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };
  
  console.log(selectedReferee);
  // console.log();

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
        Match Time: {new Date(selectedMatch.date).toLocaleString('en-US', { timeZone: 'africa/nairobi' })}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Team 1 Section */}
        <div className="bg-purple-50 shadow-lg rounded-2xl p-6 border border-purple-200">
          <h2 className="text-2xl font-extrabold text-purple-600 mb-4 flex items-center gap-2">
            <span className="bg-purple-100 p-2 rounded-full">
              🏅
            </span>
            Team 1: {team1Name}
          </h2>
          <div className="flex justify-between items-start gap-6">
            <div className="flex flex-col">
              <button
                className="bg-gradient-to-r btn-sm from-pink-400 to-purple-400 text-white px-5 py-2 rounded-lg shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 mb-4 flex items-center gap-2"
                onClick={() => setShowTeam1Players(!showTeam1Players)}
              >
                {showTeam1Players ? "🎭 Hide Players" : "🎉 Add First 11"}
              </button>
              {showTeam1Players && (
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 max-h-96 overflow-y-auto">
                  <h3 className="text-lg text-purple-600 font-medium mb-3">Select First 11:</h3>
                  {team1Players.map((player) => (
                    <div key={player.id} className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        id={`team1-first11-${player.id}`}
                        value={player.id}
                        disabled={team1First11.length >= 11} 
                        onChange={() => handleAddToFirst11("team1", player.id)}
                        className="mr-3 accent-purple-500 scale-125"
                      />
                      <label
                        htmlFor={`team1-first11-${player.id}`}
                        className="text-gray-700 hover:text-purple-600 transition-colors duration-200"
                      >
                        {player.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <button
                className="btn-sm bg-gradient-to-r from-yellow-300 to-orange-400 text-white px-5 py-2 rounded-lg shadow-lg hover:from-yellow-400 hover:to-orange-500 transition-all duration-300 flex items-center gap-2"
                onClick={() => setShowTeam1Substitutes(!showTeam1Substitutes)}
              >
                {showTeam1Substitutes ? "⚽ Hide Substitutes" : "🚀 Add Substitutes"}
              </button>
              {showTeam1Substitutes && (
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 mt-4 max-h-96 overflow-y-auto">
                  <h3 className="text-lg text-yellow-600 font-medium mb-3">Select Substitutes:</h3>
                  {team1Players.map((player) => (
                    <div key={player.id} className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        id={`team1-substitute-${player.id}`}
                        value={player.id}
                        onChange={() => handleAddSubstitute("team1", player.id)}
                        disabled={team1Substitutes.length >= 6}
                        className="mr-3 accent-yellow-500 scale-125"
                      />
                      <label
                        htmlFor={`team1-substitute-${player.id}`}
                        className="text-gray-700 hover:text-yellow-600 transition-colors duration-200"
                      >
                        {player.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>



        {/* Team 2 Section */}
        <div className="bg-pink-50 shadow-lg rounded-xl p-6 border border-pink-200">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">
            <span className="bg-purple-100 p-2 rounded-full">
              🏅
            </span>
            Team 2: {team2Name}</h2>
          <div className="flex justify-between items-start gap-6">
            <div className="flex flex-col">
              <button
                className="btn-sm bg-gradient-to-r from-blue-400 to-pink-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-500 hover:to-pink-600 transition-all duration-200 mt-4"
                onClick={() => setShowTeam2Players(!showTeam2Players)}
              >
                {showTeam2Players ? "🎭 Hide Players" : "🎉 Add First 11"}
              </button>
              {showTeam2Players && (
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 max-h-96 overflow-y-auto mt-4">
                  <h3 className="text-lg text-pink-600 font-medium mb-3">Select First 11:</h3>
                  {team2Players.map((player) => (
                    <div key={player.id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`team2-first11-${player.id}`}
                        value={player.id}
                        onChange={() => handleAddToFirst11("team2", player.id)}
                        disabled={team2First11.length >= 11}
                        className="mr-3 accent-pink-500"
                      />
                      <label
                        htmlFor={`team2-first11-${player.id}`}
                        className="text-gray-700 hover:text-pink-600 transition-colors duration-200"
                      >
                        {player.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <button
                className="btn-sm bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 mt-4"
                onClick={() => setShowTeam2Substitutes(!showTeam2Substitutes)}
              >
                {showTeam2Substitutes ? "⚽ Hide Substitutes" : "🚀 Add Substitutes"}
              </button>
              {showTeam2Substitutes && (
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 mt-4 max-h-96 overflow-y-auto mt-4">
                  <h3 className="text-lg text-yellow-600 font-medium mb-3">Select Substitutes:</h3>
                  {team2Players.map((player) => (
                    <div key={player.id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`team2-substitute-${player.id}`}
                        value={player.id}
                        onChange={() => handleAddSubstitute("team2", player.id)}
                        disabled={team2Substitutes.length >= 6}
                        className="mr-3 accent-yellow-500"
                      />
                      <label
                        htmlFor={`team2-substitute-${player.id}`}
                        className="text-gray-700 hover:text-yellow-600 transition-colors duration-200"
                      >
                        {player.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>


        {/* Referee Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Referee</h2>
          <div>
            {referees.map((referee) => (
              <div key={referee.id} className="flex items-center mb-3">
                <input
                  type="checkbox"
                  id={`referee-${referee.id}`}
                  value={referee.id}
                  checked={selectedReferee.includes(referee.id)} // Bind state
                  onChange={() => handleSelectReferee(referee.id)}
                  className="mr-3 accent-green-500 scale-125"
                />

                <label
                  htmlFor={`referee-${referee.id}`}
                  className="text-gray-700 hover:text-green-600 transition-colors duration-200"
                >
                  {referee.name}
                </label>
              </div>
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
