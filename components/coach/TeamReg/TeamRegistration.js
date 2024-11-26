'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import withCoachAccess from "../HOC/coach";
import { userService } from '@/app/api/userService/userService';
import { CoachService } from '@/app/api/coach/coach'
import { useQuery } from '@tanstack/react-query';
import { pointofContact } from '../../../app/api/pointOfContact/pointOfContactService'
import { teamService } from '../../../app/api/teamservice/teamService'
import { playerService } from '../../../app/api/playerservice/playerService'
// import { error } from 'console';
// import { userService } from '@/app/api/userService/userService';

const getTeamByCoachId = async (id) => {
    const response = await teamService.getTeamByCoachId(id);
    console.log(response)
    return response || [];
}

const getUserByUserName = async (username) => {
    const response = await userService.getUserByUserName(username);
    return response.data || {};
}
const getPointOfContactById = async (id) => {
    try {
        const response = await pointofContact.getPointOfContactById(id)
        if (response?.data !== 'Failed to get team point of contact by id') {
            return true
        }
        return false;
    }
    catch (error) {
        console.error("Error in get point of contact by id:", error);
        return false;
    }

}

const getCoachByID = async (id) => {
    try {
        const response = await CoachService.getCoachById(id);
        console.log(id);
        if (response?.data !== 'Couch not found') {
            // Successfully found a coach
            return true;
        }
        // No response or response is null/undefined
        return false;
    } catch (error) {
        console.error("Error in getCoachByID:", error);
        return false; // Return false if an error occurs
    }
};


const TeamRegistrationForm = () => {
    const { data: session } = useSession();
    const [teamName, setTeamName] = useState('');
    const [coachName, setCoachName] = useState('');
    const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
    const [coachPhone, setCoachPhone] = useState('');
    const [coachExists, setCoachExists] = useState(false);
    const [coachEmail, setCoachEmail] = useState('');
    const [teamPointOfContact, setTeamPointOfContact] = useState('');
    const [teamPointOfContactName, setTeamPointOfContactName] = useState('');
    const [teamPointOfContactPhone, setTeamPointOfContactPhone] = useState('');
    const [teamPointOfContactId, setTeamPointOfContactId] = useState('');
    const [pointOfContactUserExist, setPointOfContactUserExist] = useState(false);
    const [pointofCexist, setPointofCexist] = useState(false);
    const [playerUsername, setPlayerUsername] = useState('');
    const [playerId, setPlayerId] = useState('');
    const [playerExist, setPlayerExist] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [playerPosition, setPlayerPosition] = useState('');
    const [playerDateOfBirth, setPlayerDateOfBirth] = useState('');
    const [teamWard, setTeamWard] = useState('');
    const [teamCategory, setTeamCategory] = useState('');
    const [teamLogo, setTeamLogo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [team, setTeam] = useState();

    const handleFileUpload = (event) => {
        setTeamLogo(event.target.files[0]);
    };
    const handleUsernameSearch = async (event) => {
        event.preventDefault();
        const usernameToSearch = teamPointOfContact;
        const user = await getUserByUserName(usernameToSearch);
        if (user.id) {
            // console.log("User found:", user); // Debugging
            setTeamPointOfContactId(user?.id);
            setPointOfContactUserExist(true);
        } else {
            // console.log("User not found");
            setPointOfContactUserExist(false);
        }
    };
    const handlePlayerUsernameSearch = async (event) => {
        event.preventDefault();
        const usernameToSearch = playerUsername;
        const user = await getUserByUserName(usernameToSearch);
        if (user.id) {
            // console.log("User found:", user); // Debugging
            setPlayerId(user?.id);
            setPlayerExist(true);
        } else {
            // console.log("User not found");
            setPlayerExist(false);
        }
    };



    const { data } = useQuery({
        queryKey: ['coaches'],
        queryFn: () => getCoachByID(session.id),
        onSuccess: (checkcoach) => {
            setCoachExists(checkcoach);
        },
        onError: (error) => {
            console.error('Error fetching coach:', error);
        },
    });
    const { data: pointofC, isLoading: isPointofCLoading } = useQuery({
        queryKey: ['pointofC', teamPointOfContactId],
        queryFn: () => getPointOfContactById(teamPointOfContactId),
        enabled: !!teamPointOfContactId, // Run query only if ID exists
        onSuccess: (exists) => {
            setPointofCexist(exists); // exists is already a boolean
        },
        onError: (error) => {
            console.error("Error fetching team point of contact:", error);
            setPointofCexist(false); // Ensure fallback on error
        },
    });

    const { data: myTeam, refetch: myTeamRefetch } = useQuery({
        queryKey: ['teams', session?.id],
        queryFn: () => getTeamByCoachId(session.id),
        enabled: !!session?.id,
        onSuccess: (data) => {
            setTeam(data)
        },
        onError: (error) => {
            console.error("Error fetching your team", error)
        }
    })

    useEffect(() => {
        if (data) {
            setCoachExists(data);
        }
    }, [data]);

    useEffect(() => {
        pointofC;
    })
    useEffect(() => {
        if (myTeam) {
            setTeam(myTeam);
        }
    }, [myTeam]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(session);
        const dataToUpdatePointOfContactUsersTable = {
            phone: teamPointOfContactPhone
        }
        const dataToCreatePointOfContact = {
            id: teamPointOfContactId,
            user_id: teamPointOfContactId,
            name: teamPointOfContactName,
        }
        const dataToUpdateUserCoach = {
            phone: coachPhone,
            email: coachEmail,
        };
        const dataToCreateCoach = {
            id: session.id,
            user_id: session.id,
            name: coachName,
        };
        const dataToCreateTeam = {
            name: teamName,
            gender: teamCategory,
            ward: teamWard,
            coach_id: session.id,
            team_point_of_contact_id: teamPointOfContactId,
            team_logo: teamLogo,
        };
        try {
            if (!coachExists) {
                // Create coach if not exists
                const coachResponse = await CoachService.createCoach(dataToCreateCoach);
                if (coachResponse?.data === "Failed to create coach") {
                    throw new Error("Failed to create coach");
                }
                // Update user data
                const userResponse = await userService.updateUser(session.id, dataToUpdateUserCoach);
                if (userResponse?.data === "Error updating User") {
                    throw new Error("Error updating user");
                }
            }
            if (!pointofCexist) {
                // Create point of contact user if not exists
                const response1 = await pointofContact.createPointOfC(dataToCreatePointOfContact);
                if (response1?.data === "Failed to create team point of contact") {
                    throw new Error("Failed to create point of contact user");
                }
                // Update point of contact user data
                const response2 = await userService.updateUser(teamPointOfContactId, dataToUpdatePointOfContactUsersTable);
                if (response2?.data === "Error updating User") {
                    throw new Error("Error updating point of contact user");
                }
            }
            // Create team (whether coach exists or not)
            const teamResponse = await teamService.createTeam(dataToCreateTeam);
            if (teamResponse?.data === "Failed to create team") {
                throw new Error("Failed to create team");
            }
            console.log("Team created successfully");
            myTeamRefetch();
            setIsModalOpen(false); // Close modal on success
        } catch (error) {
            console.error("Error in handleSubmit:", error.message);
        }
    };

    const handlePlayerCreation = async (event) => {
        event.preventDefault();
        try {
            const dataToCreatePlayer = {
                id: playerId,
                user_id: playerId,
                name: playerName,
                position: playerPosition,
                date_of_birth: playerDateOfBirth,
                team_id: team?.[0]?.id,
            };
            const response = await playerService.createPlayer(dataToCreatePlayer);
            if (!response?.data?.id) {
                throw new Error("Failed to create player");
            }
            console.log("Player created successfully");
            setIsPlayerModalOpen(false); // Close modal on success
        } catch (error) {
            console.error("Error in handlePlayerCreation:", error.message);
        }
    }

    // console.log(coachExists)
    return (
        <section className="bg-gray-100 mx-auto max-w-screen-lg px-6 py-12">
            <div className="text-center mb-8">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Add Team
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {/* Team Card */}
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <img src="/path-to-team-logo.jpg" alt="Team Logo" className="w-24 h-24 mx-auto mb-4 rounded-full" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{team?.[0]?.name}</h2>
                    <p className="text-sm text-gray-600">Category: {team?.[0]?.gender}</p>
                    <button
                        onClick={() => setIsPlayerModalOpen(true)}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition duration-300">
                        Add Player
                    </button>
                </div>

                {/* Players Table */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Players</h3>
                    <table className="w-full text-sm text-black text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Player Name</th>
                                <th className="px-4 py-2">Position</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2">1</td>
                                <td className="px-4 py-2">John Doe</td>
                                <td className="px-4 py-2">Forward</td>
                                <td className="px-4 py-2">
                                    <button className="text-blue-600 hover:underline">Edit</button> |
                                    <button className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">2</td>
                                <td className="px-4 py-2">Jane Smith</td>
                                <td className="px-4 py-2">Midfielder</td>
                                <td className="px-4 py-2">
                                    <button className="text-blue-600 hover:underline">Edit</button> |
                                    <button className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                            {/* More players can be added here */}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for player registration */}
            {isPlayerModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-300 scale-100 opacity-100 max-h-[calc(100vh-2rem)] overflow-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Register Player</h2>
                            <button
                                onClick={() => setIsPlayerModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 text-xl font-bold focus:outline-none"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handlePlayerCreation} className="space-y-6">
                            {/*player username */}
                            <div>
                                <label
                                    htmlFor="playerUsername"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Search Player by Username
                                </label>
                                <input
                                    id="playerUsername"
                                    type="text"
                                    value={playerUsername}
                                    onChange={(e) => setPlayerUsername(e.target.value)}
                                    placeholder="Enter player username"
                                    onBlur={handlePlayerUsernameSearch}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 text-black"
                                />
                            </div>
                            {playerExist && (
                                <>
                                <div>
                                <label
                                    htmlFor="playerName"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Player Name
                                </label>
                                <input
                                    id="playerName"
                                    type="text"
                                    value={playerName}
                                    onChange={(e) => setPlayerName(e.target.value)}
                                    placeholder="Enter player name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 text-black"
                                    required
                                />
                            </div>

                            {/* Player Position */}
                            <div>
                                <label
                                    htmlFor="playerPosition"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Player Position
                                </label>
                                <select
                                    id="playerPosition"
                                    value={playerPosition}
                                    onChange={(e) => setPlayerPosition(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 text-black"
                                    required
                                >
                                    <option value="">Select position</option>
                                    <option value="forward">Forward</option>
                                    <option value="midfielder">Midfielder</option>
                                    <option value="defender">Defender</option>
                                    <option value="goalkeeper">Goalkeeper</option>
                                </select>
                            </div>

                            {/* player date of birth */}
                            <div>
                                <label
                                    htmlFor="playerDateOfBirth"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Player Date of Birth
                                </label>
                                <input
                                    id="playerDateOfBirth"
                                    type="date"
                                    value={playerDateOfBirth}
                                    onChange={(e) => setPlayerDateOfBirth(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 text-black"
                                    required
                                />
                            </div>
                            

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    Register Player
                                </button>
                            </div>
                                </>
                            )}
                            {/* Player Name */}
                            
                        </form>
                    </div>
                </div>
            )}


            {/* Modal for team registration */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-300 scale-100 opacity-100 max-h-[calc(100vh-2rem)] overflow-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-semibold text-gray-800">Register Team</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto">
                            {/* Team Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="teamName">
                                    Team Name
                                </label>
                                <input
                                    id="teamName"
                                    type="text"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    placeholder="Enter team name"
                                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"

                                />
                            </div>
                            {/* Team Ward */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="teamWard">
                                    Team Ward
                                </label>
                                <input
                                    id="teamWard"
                                    type="text"
                                    value={teamWard}
                                    onChange={(e) => setTeamWard(e.target.value)}
                                    placeholder="Enter team ward"
                                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"

                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="coachName">
                                    Team point of contact(Please search The username of the teams point of contact)
                                </label>
                                <input
                                    id="teamPointOfContact"
                                    type="text"
                                    value={teamPointOfContact}
                                    onChange={(e) => setTeamPointOfContact(e.target.value)}
                                    onBlur={handleUsernameSearch}
                                    placeholder="Search here"
                                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"

                                />
                            </div>
                            {pointOfContactUserExist && (

                                <>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="teamPointOfContact">
                                            Name of point of contact
                                        </label>
                                        <input
                                            id="nameOfteamPointOfContact"
                                            type="text"
                                            value={teamPointOfContactName}
                                            onChange={(e) => setTeamPointOfContactName(e.target.value)}
                                            placeholder="Enter team point of contact"
                                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="teamPointOfContact">
                                            Phone number of point of contact
                                        </label>
                                        <input
                                            id="phoneOfteamPointOfContact"
                                            type="text"
                                            value={teamPointOfContactPhone}
                                            onChange={(e) => setTeamPointOfContactPhone(e.target.value)}
                                            placeholder="Enter team point of contact phone number"
                                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </>
                            )}

                            {!coachExists && (
                                <>
                                    {/* Coach Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="coachName">
                                            Coach Name
                                        </label>
                                        <input
                                            id="coachName"
                                            type="text"
                                            value={coachName}
                                            onChange={(e) => setCoachName(e.target.value)}
                                            placeholder="Enter coach's name"
                                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"

                                        />
                                    </div>
                                    {/* Coach Phone number */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="coachPhone">
                                            Coach Phone
                                        </label>
                                        <input
                                            id="coachPhone"
                                            type="tel"
                                            value={coachPhone}
                                            onChange={(e) => setCoachPhone(e.target.value)}
                                            placeholder="Enter coach's phone number"
                                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"

                                        />
                                    </div>

                                    {/* Coach Email */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="coachEmail">
                                            Coach Email
                                        </label>
                                        <input
                                            id="coachEmail"
                                            type="email"
                                            value={coachEmail}
                                            onChange={(e) => setCoachEmail(e.target.value)}
                                            placeholder="Enter coach's email"
                                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"

                                        />
                                    </div>
                                </>
                            )}


                            {/* Team Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="teamCategory">
                                    Team Category
                                </label>
                                <select
                                    id="teamCategory"
                                    value={teamCategory}
                                    onChange={(e) => setTeamCategory(e.target.value)}
                                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"

                                >
                                    <option value="">Select a category</option>
                                    <option value="men">Men&apos;s Team</option>
                                    <option value="women">Women&apos;s Team</option>
                                </select>
                            </div>

                            {/* Team Logo */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="teamLogo">
                                    Team Logo
                                </label>
                                <input
                                    id="teamLogo"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"

                                />
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    Register Team
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default withCoachAccess(TeamRegistrationForm);