"use client";

import { useState, useEffect } from "react";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { teamService } from "@/app/api/teamservice/teamService";
import { useRouter } from "next/navigation";
// import { encode } from "punycode";

const ClubList = () => {
    const [clubs, setClubs] = useState([]);
    const [isMenSelected, setIsMenSelected] = useState(true); // Toggle between Men and Women clubs
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter();

    // Fetch clubs data from backend
    const fetchClubs = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await teamService.getAllTeams(); // Call your backend API
            setClubs(response || []);
        } catch (err) {
            console.error("Error fetching clubs:", err);
            setError("Failed to load clubs.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClubs();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter clubs based on search term and gender
    const filteredClubs = clubs.filter(
        (club) =>
            club.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            ((isMenSelected && club.gender === "men") ||
                (!isMenSelected && club.gender === "women"))
    );

    const handleTeamViewer = (club) => {
        const query=encodeURIComponent(JSON.stringify(club));
        router.push(`../TeamViewer/${club.id}?data=${query}`);
    };

    return (
        <section className="container bg-gray-100 mx-auto px-4 py-8">
            {/* Header */}
            <div className="py-8 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-lg mb-6">
                <h1 className="text-5xl mx-4 font-bold mb-4">Clubs</h1>
                <div className="relative max-w-lg mx-4">
                    <input
                        type="text"
                        className="w-full p-4 rounded-lg md:rounded-full text-black"
                        placeholder="Search Clubs"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <FaSearch className="absolute top-4 right-4 text-gray-500" />
                </div>
            </div>

            {/* Filter Section */}
            <div className="flex justify-between items-center mb-8">
                <button
                    onClick={() => setIsMenSelected(true)}
                    className={`${isMenSelected ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-700"
                        } py-2 px-6 rounded-md shadow-md`}
                >
                    Men
                </button>
                <button
                    onClick={() => setIsMenSelected(false)}
                    className={`${!isMenSelected ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-700"
                        } py-2 px-6 rounded-md shadow-md`}
                >
                    Women
                </button>
            </div>

            {/* Loading or Error */}
            {loading && <p className="text-center text-gray-500">Loading clubs...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Club Cards */}
            {!loading && !error && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredClubs.length > 0 ? (
                        filteredClubs.map((club, index) => (
                            <div onClick={()=>handleTeamViewer(club)}
                                key={index}
                                className="bg-white border-b border-red-500 shadow-lg rounded-lg p-6 flex flex-col items-center"
                            >
                                <img
                                    src={club.logo || "/image/1.jpg"} // Fallback for missing logos
                                    alt={club.name}
                                    className="w-32 h-32 object-cover mb-4 rounded rounded-t-lg"
                                />

                                <div className="flex flex-row items-center justify-between gap-8">
                                    <h2 className="text-xl font-bold text-gray-800">{club.name}</h2>
                                    <span className="text-red-600 text-sm">
                                        <FaArrowRight />
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-4 text-gray-500">No clubs found.</p>
                    )}
                </div>
            )}
        </section>
    );
};

export default ClubList;
