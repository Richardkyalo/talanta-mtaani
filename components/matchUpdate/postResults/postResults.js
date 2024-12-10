'use client';

import { useState } from "react";

export default function PostMatchResult({ isOpen, onClose, match }) {
    if (!isOpen) return null;
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

    const [team1Players] = useState([
        "Player 1", "Player 2", "Player 3", "Player 4", "Player 5"
    ]);
    const [team2Players] = useState([
        "Player 6", "Player 7", "Player 8", "Player 9", "Player 10"
    ]);

    const [team1RedCardPlayers, setTeam1RedCardPlayers] = useState([]);
    const [team2RedCardPlayers, setTeam2RedCardPlayers] = useState([]);
    const [team1YellowCardPlayers, setTeam1YellowCardPlayers] = useState([]);
    const [team2YellowCardPlayers, setTeam2YellowCardPlayers] = useState([]);

    const handleCardSelection = (team, type, player) => {
        const setPlayers = team === "team1"
            ? type === "red"
                ? setTeam1RedCardPlayers
                : setTeam1YellowCardPlayers
            : type === "red"
                ? setTeam2RedCardPlayers
                : setTeam2YellowCardPlayers;

        const players = team === "team1"
            ? type === "red"
                ? team1RedCardPlayers
                : team1YellowCardPlayers
            : type === "red"
                ? team2RedCardPlayers
                : team2YellowCardPlayers;

        if (players.includes(player)) {
            setPlayers(players.filter((p) => p !== player));
        } else {
            setPlayers([...players, player]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            team1, team2,
            team1RedCards, team2RedCards,
            team1YellowCards, team2YellowCards,
            team1Goals, team2Goals,
            team1Penalties, team2Penalties,
            team1RedCardPlayers, team2RedCardPlayers,
            team1YellowCardPlayers, team2YellowCardPlayers,
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Post Match Result</h1>
            <p className="text-gray-600 mb-4">
                Updating results for: <strong>{match?.team1_name} vs {match?.team2_name}</strong>
            </p>
            <form onSubmit={handleSubmit} className="space-y-8 text-gray-600">
                {/* Team Names */}
                <div className="flex justify-between space-x-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Team 1</label>
                        <input
                            type="text"
                            value={team1}
                            onChange={(e) => setTeam1(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Team 2</label>
                        <input
                            type="text"
                            value={team2}
                            onChange={(e) => setTeam2(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
                        />
                    </div>
                </div>

                {/* Red Cards */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-600 mb-2">Red Cards</h2>
                    <div className="grid grid-cols-2 gap-6">
                        {[team1Players, team2Players].map((players, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700">
                                    Team {index + 1} Red Cards
                                </label>
                                <input
                                    type="number"

                                    value={index === 0 ? team1RedCards : team2RedCards}
                                    onChange={(e) =>
                                        index === 0
                                            ? setTeam1RedCards(Number(e.target.value))
                                            : setTeam2RedCards(Number(e.target.value))
                                    }
                                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
                                />
                                <div className="mt-4">
                                    <h3 className="font-medium text-lg">Select Players</h3>
                                    {players.map((player) => (
                                        <div key={player} className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    (index === 0 ? team1RedCardPlayers : team2RedCardPlayers).includes(
                                                        player
                                                    )
                                                }
                                                onChange={() =>
                                                    handleCardSelection(
                                                        index === 0 ? "team1" : "team2",
                                                        "red",
                                                        player
                                                    )
                                                }
                                            />
                                            <label>{player}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Yellow Cards */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-600 mb-2">Yellow Cards</h2>
                    <div className="grid grid-cols-2 gap-6">
                        {[team1Players, team2Players].map((players, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700">
                                    Team {index + 1} Yellow Cards
                                </label>
                                <input
                                    type="number"

                                    value={index === 0 ? team1YellowCards : team2YellowCards}
                                    onChange={(e) =>
                                        index === 0
                                            ? setTeam1YellowCards(Number(e.target.value))
                                            : setTeam2YellowCards(Number(e.target.value))
                                    }
                                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
                                />
                                <div className="mt-4">
                                    <h3 className="font-medium text-lg">Select Players</h3>
                                    {players.map((player) => (
                                        <div key={player} className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    (index === 0 ? team1YellowCardPlayers : team2YellowCardPlayers).includes(
                                                        player
                                                    )
                                                }
                                                onChange={() =>
                                                    handleCardSelection(
                                                        index === 0 ? "team1" : "team2",
                                                        "yellow",
                                                        player
                                                    )
                                                }
                                            />
                                            <label>{player}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Goals */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-600 mb-2">Goals</h2>
                    <div className="grid grid-cols-2 gap-6">
                        {[team1, team2].map((team, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700">
                                    {team || `Team ${index + 1}`} Goals
                                </label>
                                <input
                                    type="number"
                                    value={index === 0 ? team1Goals : team2Goals}
                                    onChange={(e) =>
                                        index === 0
                                            ? setTeam1Goals(Number(e.target.value))
                                            : setTeam2Goals(Number(e.target.value))
                                    }
                                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Penalties */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-600 mb-2">Penalties</h2>
                    <div className="grid grid-cols-2 gap-6">
                        {[team1, team2].map((team, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700">
                                    {team || `Team ${index + 1}`} Penalties
                                </label>
                                <input
                                    type="number"
                                    value={index === 0 ? team1Penalties : team2Penalties}
                                    onChange={(e) =>
                                        index === 0
                                            ? setTeam1Penalties(Number(e.target.value))
                                            : setTeam2Penalties(Number(e.target.value))
                                    }
                                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
                                />
                            </div>
                        ))}
                    </div>
                </div>


                {/* Submit */}
                <div className="text-center mt-8">
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
