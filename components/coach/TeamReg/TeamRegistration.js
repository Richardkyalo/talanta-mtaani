'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import withCoachAccess from "../HOC/coach";

const TeamRegistrationForm = () => {
    const { data: session } = useSession();
    const [teamName, setTeamName] = useState('');
    const [coachName, setCoachName] = useState('');
    const [coachPhone, setCoachPhone] = useState('');
    const [coachEmail, setCoachEmail] = useState('');
    const [teamWard, setTeamWard] = useState('');
    const [teamCategory, setTeamCategory] = useState('');
    const [teamLogo, setTeamLogo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFileUpload = (event) => {
        setTeamLogo(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(session);
        console.log({
            teamName,
            teamWard,
            coachName,
            coachPhone,
            coachEmail,
            teamCategory,
            teamLogo,
        });
        setIsModalOpen(false); // Close modal on submit
    };

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
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Team Name</h2>
                    <p className="text-sm text-gray-600 mb-2">Coach: Coach Name</p>
                    <p className="text-sm text-gray-600">Category: Men</p>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition duration-300">
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
                                    <option value="men">Men's Team</option>
                                    <option value="women">Women's Team</option>
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