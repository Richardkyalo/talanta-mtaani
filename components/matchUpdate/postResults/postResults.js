'use client';

import { useState } from "react";

export default function PostMatchResult() {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [team1RedCards, setTeam1RedCards] = useState(0);
  const [team2RedCards, setTeam2RedCards] = useState(0);
  const [team1YellowCards, setTeam1YellowCards] = useState(0);
  const [team2YellowCards, setTeam2YellowCards] = useState(0);
  const [team1Goals, setTeam1Goals] = useState(0);
  const [team2Goals, setTeam2Goals] = useState(0);
  const [team1Penalties, setTeam1Penalties] = useState(0);
  const [team2Penalties, setTeam2Penalties] = useState(0);

  const [team1Players, setTeam1Players] = useState([
    "Player 1", "Player 2", "Player 3", "Player 4", "Player 5"
  ]);
  const [team2Players, setTeam2Players] = useState([
    "Player 6", "Player 7", "Player 8", "Player 9", "Player 10"
  ]);
  
  const [team1RedCardPlayers, setTeam1RedCardPlayers] = useState([]);
  const [team2RedCardPlayers, setTeam2RedCardPlayers] = useState([]);
  const [team1YellowCardPlayers, setTeam1YellowCardPlayers] = useState([]);
  const [team2YellowCardPlayers, setTeam2YellowCardPlayers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here, e.g., saving the match data
    console.log({
      team1, team2,
      team1RedCards, team2RedCards,
      team1YellowCards, team2YellowCards,
      team1Goals, team2Goals,
      team1Penalties, team2Penalties,
      team1RedCardPlayers, team2RedCardPlayers,
      team1YellowCardPlayers, team2YellowCardPlayers
    });
  };

  const handleRedCardSelection = (team, player) => {
    if (team === "team1") {
      if (team1RedCardPlayers.includes(player)) {
        setTeam1RedCardPlayers(team1RedCardPlayers.filter(p => p !== player));
      } else {
        if (team1RedCardPlayers.length < team1RedCards) {
          setTeam1RedCardPlayers([...team1RedCardPlayers, player]);
        }
      }
    } else {
      if (team2RedCardPlayers.includes(player)) {
        setTeam2RedCardPlayers(team2RedCardPlayers.filter(p => p !== player));
      } else {
        if (team2RedCardPlayers.length < team2RedCards) {
          setTeam2RedCardPlayers([...team2RedCardPlayers, player]);
        }
      }
    }
  };

  const handleYellowCardSelection = (team, player) => {
    if (team === "team1") {
      if (team1YellowCardPlayers.includes(player)) {
        setTeam1YellowCardPlayers(team1YellowCardPlayers.filter(p => p !== player));
      } else {
        if (team1YellowCardPlayers.length < team1YellowCards) {
          setTeam1YellowCardPlayers([...team1YellowCardPlayers, player]);
        }
      }
    } else {
      if (team2YellowCardPlayers.includes(player)) {
        setTeam2YellowCardPlayers(team2YellowCardPlayers.filter(p => p !== player));
      } else {
        if (team2YellowCardPlayers.length < team2YellowCards) {
          setTeam2YellowCardPlayers([...team2YellowCardPlayers, player]);
        }
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Post Match Result</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Team Selection */}
        <div className="flex justify-between space-x-6">
          <div className="flex-1">
            <label htmlFor="team1" className="block text-sm font-medium text-gray-700">Team 1</label>
            <input
              type="text"
              id="team1"
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="team2" className="block text-sm font-medium text-gray-700">Team 2</label>
            <input
              type="text"
              id="team2"
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Red Cards */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Red Cards</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Team 1 Red Cards</label>
              <input
                type="number"
                min="0"
                value={team1RedCards}
                onChange={(e) => setTeam1RedCards(Number(e.target.value))}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
              />
              <div className="mt-4">
                <h3 className="font-medium text-lg">Select Players</h3>
                {team1Players.map((player) => (
                  <div key={player} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={`team1-${player}`}
                      checked={team1RedCardPlayers.includes(player)}
                      onChange={() => handleRedCardSelection("team1", player)}
                      disabled={team1RedCardPlayers.length >= team1RedCards && !team1RedCardPlayers.includes(player)}
                    />
                    <label htmlFor={`team1-${player}`}>{player}</label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Team 2 Red Cards</label>
              <input
                type="number"
                min="0"
                value={team2RedCards}
                onChange={(e) => setTeam2RedCards(Number(e.target.value))}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
              />
              <div className="mt-4">
                <h3 className="font-medium text-lg">Select Players</h3>
                {team2Players.map((player) => (
                  <div key={player} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={`team2-${player}`}
                      checked={team2RedCardPlayers.includes(player)}
                      onChange={() => handleRedCardSelection("team2", player)}
                      disabled={team2RedCardPlayers.length >= team2RedCards && !team2RedCardPlayers.includes(player)}
                    />
                    <label htmlFor={`team2-${player}`}>{player}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Yellow Cards */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Yellow Cards</h2>
          {/* Similar structure for yellow cards */}
        </div>

        {/* Goals and Penalties */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Goals and Penalties</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Team 1 Goals</label>
              <input
                type="number"
                min="0"
                value={team1Goals}
                onChange={(e) => setTeam1Goals(Number(e.target.value))}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Team 2 Goals</label>
              <input
                type="number"
                min="0"
                value={team2Goals}
                onChange={(e) => setTeam2Goals(Number(e.target.value))}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Team 1 Penalties</label>
              <input
                type="number"
                min="0"
                value={team1Penalties}
                onChange={(e) => setTeam1Penalties(Number(e.target.value))}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Team 2 Penalties</label>
              <input
                type="number"
                min="0"
                value={team2Penalties}
                onChange={(e) => setTeam2Penalties(Number(e.target.value))}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 text-center">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Submit Match Result
          </button>
        </div>
      </form>
    </div>
  );
}
