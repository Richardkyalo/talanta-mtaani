'use client';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CiEdit, CiSearch } from 'react-icons/ci';
import { FaDownload } from 'react-icons/fa';
import { teamService } from '../../app/api/teamservice/teamService'
import withAdminAccess from "../admin/HOC/adminCheck";
// import { MdDeleteForever } from "react-icons/md";

// Fetch all teams
const fetchTeams = async () => {
    try {
        const response = await teamService.getAllTeams();
        // console.log(response);
        return response ?? [];
    } catch (error) {
        console.error('Error fetching teams:', error);
        return [];
    }
};

// Modal for editing team details
const EditTeamModal = ({ isOpen, onClose, team, onSubmit }) => {
    const [name, setName] = useState(team?.name || '');
    const [ward, setWard] = useState(team?.ward || '');
    const [gender, setGender] = useState(team?.gender || '');

    useEffect(() => {
        if (team) {
            setName(team.name || '');
            setWard(team.ward || '');
            setGender(team.gender || '');
        }
    }, [team]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
                <h2 className="text-lg text-black font-bold mb-4">Edit Team</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit({ ...team, name, ward, gender });
                    }}
                >
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Team Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full text-black border border-gray-300 rounded-md px-4 py-2 mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Ward</label>
                        <input
                            type="text"
                            value={ward}
                            onChange={(e) => setWard(e.target.value)}
                            className="w-full text-black border border-gray-300 rounded-md px-4 py-2 mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full text-black border border-gray-300 rounded-md px-4 py-2 mt-1"
                        >
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm hover:bg-red-500 hover:text-white text-red-500 border border-red-500 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm hover:bg-blue-500 hover:text-white text-blue-500 border border-blue-500 rounded-md"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const TeamsTable = () => {
    const [teams, setTeams] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);

    const { data, refetch } = useQuery({
        queryKey: ['teams'],
        queryFn: fetchTeams,
        onSuccess: (fetchedTeams) => {
            setTeams(fetchedTeams);
        },
        onError: (error) => {
            console.error('Error fetching teams:', error);
        },
    });

    useEffect(() => {
        if (data) {
            setTeams(data);
        }
    }, [data]);

    console.log(teams);

    const handleEditTeam = (team) => {
        setSelectedTeam(team);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTeam(null);
    };

    const handleSaveTeam = async (updatedTeam) => {
        try {
            const response = await teamService.updateTeam(updatedTeam.id, updatedTeam);
            if (response) {
                refetch();
                setTeams((prevTeams) =>
                    prevTeams.map((team) =>
                        team.id === updatedTeam.id ? updatedTeam : team
                    )
                );
            }
        } catch (error) {
            console.error('Error updating team:', error);
        } finally {
            handleCloseModal();
        }
    };

    // const handleDeleteTeam = async (teamId) => {
    //     try {
    //         const response = await teamService.deleteTeam(teamId);
    //         if (response) {
    //             refetch();
    //             setTeams((prevTeams) => prevTeams.filter((team) => team.id !== teamId));
    //         }
    //     } catch (error) {
    //         console.error('Error deleting team:', error);
    //     }
    // };

    return (
        <div className="p-4">
            <EditTeamModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                team={selectedTeam}
                onSubmit={handleSaveTeam}
            />
            <div className="mb-4 text-center md:text-right flex flex-row justify-between gap-4 items-center">
                <h1 className="text-xl text-gray-600 font-bold">Teams</h1>
                <div className="flex flex-row gap-4 items-center">
                    <button className="hover:bg-red-500 flex flex-row text-red-500 hover:text-white text-xs py-2 px-4 border border-red-500 rounded-md">
                        <FaDownload className="mr-2" />
                        Export
                    </button>
                    <div className="relative w-full max-w-md">
                        <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search teams"
                            className="w-full border border-gray-300 text-black rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 outline-none"
                        />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-lg shadow-md">
                <table className="min-w-full border-collapse border border-gray-200 bg-white text-sm">
                    <thead>
                        <tr className="bg-gray-100 text-left text-gray-600">
                            <th className="border border-gray-200 px-4 py-2">#</th>
                            <th className="border border-gray-200 px-4 py-2">Team Name</th>
                            <th className="border border-gray-200 px-4 py-2">Ward</th>
                            <th className="border border-gray-200 px-4 py-2">Gender</th>
                            <th className="border border-gray-200 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team, index) => (
                            <tr
                                key={team.id}
                                className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-gray-100 transition-all`}
                            >
                                <td className="border border-gray-200 text-black px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-200 text-black px-4 py-2">{team.name}</td>
                                <td className="border border-gray-200 text-black px-4 py-2">{team.ward}</td>
                                <td className="border border-gray-200 text-black px-4 py-2 capitalize">{team.gender}</td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <div className='flex flex-row gap-2'>
                                        <button
                                            onClick={() => handleEditTeam(team)}
                                            className="hover:bg-blue-500 flex flex-row text-blue-500 hover:text-white text-xs py-2 px-4 border border-blue-500 rounded-md"
                                        >
                                            <CiEdit className="mr-2" />
                                            Edit
                                        </button>
                                        {/* <button
                                        onClick={() => handleDeleteTeam(team.id)}
                                         className="hover:bg-red-500 flex flex-row text-red-500 hover:text-white text-xs py-2 px-4 border border-red-500 rounded-md">
                                            <MdDeleteForever className="mr-2" />
                                            Delete
                                        </button> */}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default withAdminAccess(TeamsTable);
