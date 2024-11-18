'use client';
import { useState } from 'react';
import { MdAdd } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";



export default function ManageRoles() {
    const [roles, setRoles] = useState([
        { id: 1, name: 'Admin', description: 'Full access to the system' },
        { id: 2, name: 'User', description: 'Limited access to resources' },
        { id: 3, name: 'Moderator', description: 'Can manage user content' },
    ]);

    const [newRole, setNewRole] = useState({ name: '', description: '' });

    const handleAddRole = () => {
        if (!newRole.name || !newRole.description) {
            alert('Please fill out all fields');
            return;
        }
        const newRoleData = {
            id: roles.length + 1,
            ...newRole,
        };
        setRoles([...roles, newRoleData]);
        setNewRole({ name: '', description: '' });
    };

    const handleDeleteRole = (id) => {
        setRoles(roles.filter((role) => role.id !== id));
    };

    return (
        <div className="p-6">
            {/* Add Role Section */}
            <div className="mb-6">
                <h2 className="text-xl text-black font-bold mb-4">Add New Role</h2>
                <div className="bg-white shadow rounded p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Role Name</label>
                            <input
                                type="text"
                                className="mt-1 text-black px-2 py-2 block w-full rounded border-gray-300 outline-blue-500 shadow-sm"
                                placeholder="Enter role name"
                                value={newRole.name}
                                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <input
                                type="text"
                                className="mt-1 px-2 text-black py-2 block w-full rounded border-gray-300 outline-blue-500 shadow-sm"
                                placeholder="Enter description"
                                value={newRole.description}
                                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                            />
                        </div>
                    </div>
                    <button
                        className="mt-4 text-sm hover:bg-green-500 flex flex-row items-center text-green-500 px-4 py-2 rounded hover:text-white border border-green-500"
                        onClick={handleAddRole}
                    >
                        <MdAdd className="mr-2" />
                        <p>
                            Add Role
                        </p>
                    </button>
                </div>
            </div>

            {/* Manage Roles Table */}
            <div>
                <h2 className="text-xl font-bold mb-4">Manage Roles</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 bg-white text-sm">
                        <thead>
                            <tr className="bg-gray-100 text-left text-gray-600">
                                <th className="border border-gray-200 px-4 py-2">#</th>
                                <th className="border border-gray-200 px-4 py-2">Role Name</th>
                                <th className="border border-gray-200 px-4 py-2">Description</th>
                                <th className="border border-gray-200 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role, index) => (
                                <tr
                                    key={role.id}
                                    className={`${index % 2 === 0 ? 'bg-gray-50' : ''
                                        } hover:bg-gray-100 transition-all`}
                                >
                                    <td className="border text-black border-gray-200 px-4 py-2">{index + 1}</td>
                                    <td className="border text-black border-gray-200 px-4 py-2">{role.name}</td>
                                    <td className="border text-black border-gray-200 px-4 py-2">{role.description}</td>
                                    <td className="border text-black border-gray-200 px-4 py-2">
                                        <button
                                            className="flex flex-row items-center hover:bg-red-500 text-red-500 px-2 py-1 rounded hover:text-white border border-red-500"
                                            onClick={() => handleDeleteRole(role.id)}
                                        >
                                            <FaRegTrashCan  className="mr-2" />
                                            <p>
                                                Delete
                                            </p>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {roles.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="border border-gray-200 px-4 py-2 text-center text-gray-500"
                                    >
                                        No roles found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
