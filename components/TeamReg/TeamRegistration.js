'use client';
import { useState } from 'react';

const TeamRegistrationForm = () => {
    // Form state for handling team details
    const [teamName, setTeamName] = useState('');
    const [coachName, setCoachName] = useState('');
    const [coachEmail, setCoachEmail] = useState('');
    const [teamCategory, setTeamCategory] = useState('');
    const [teamLogo, setTeamLogo] = useState(null);

    // Handling file upload
    const handleFileUpload = (event) => {
        setTeamLogo(event.target.files[0]);
    };

    // Form submission handler
    const handleSubmit = (event) => {
        event.preventDefault();
        // Add validation or form submission logic here
        console.log({
            teamName,
            coachName,
            coachEmail,
            teamCategory,
            teamLogo,
        });
    };

    return (
        <section className="bg-gray-100 mx-auto max-w-screen-md px-6 py-12">
            {/* Form Heading */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Team Registration</h1>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 space-y-6">
                
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
                        required
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
                        required
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
                        required
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="men">Men&apos;sTeam</option>
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
                        required
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
        </section>
    );
};

export default TeamRegistrationForm;
