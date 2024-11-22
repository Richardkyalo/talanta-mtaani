'use client';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CiEdit, CiSearch } from 'react-icons/ci';
import { FaDownload } from 'react-icons/fa';
import { userService } from '@/app/api/userService/userService';
import { userRoleService } from "../../app/api/rbac/userRoleCreate";

// Fetch all users
const fetchUsers = async (page, limit) => {
  try {
    const response = await userService.getAllUsers(page, limit);
    console.log(response);
    return response?.data ?? [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Fetch all roles
const getAllRoles = async () => {
  try {
    const response = await userRoleService.getAllRoles();
    console.log(response);
    return response?.data?.data ?? []; // Extract nested data array
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
};

// Modal component for editing roles
const EditRoleModal = ({ isOpen, onClose, user, onSubmit }) => {
  const [role, setRole] = useState(user?.role || '');
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const rolesData = await getAllRoles();
      setRoles(rolesData);
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    if (user) setRole(user.role || '');
  }, [user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-lg text-black font-bold mb-4">Edit Role</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ ...user, role });
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              value={user.email || ''}
              readOnly
              className="w-full text-black border border-gray-300 rounded-md px-4 py-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={user.username || ''}
              readOnly
              className="w-full text-black border border-gray-300 rounded-md px-4 py-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full text-black border border-gray-300 rounded-md px-4 py-2 mt-1"
            >
              <option value="" disabled>
                Select a role
              </option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.department})
                </option>
              ))}
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

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(1, 100000),
    onSuccess: (fetchedUsers) => {
      setUsers(fetchedUsers);
    },
    onError: (error) => {
      console.error('Error fetching users:', error);
    },
  });

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  });

  const handleEditRole = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveRole = async (updatedUser) => {
    // console.log("catch here", updatedUser);
    const data = {
      roleId: updatedUser.role,
      userId: updatedUser.id
    };
    const response = await userRoleService.asignRole(data);
    console.log("this is data",data);
    if (response) {
      refetch();
      const updatedUsers = users.map((user) => {
        if (user.id === updatedUser.id) {
          return updatedUser;
        }
        return user;
      });
      setUsers(updatedUsers);
    }
    handleCloseModal();
  };

  return (
    <div className="p-4">
      <EditRoleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
        onSubmit={handleSaveRole}
      />
      <div className="mb-4 text-center md:text-right flex flex-row justify-between gap-4 items-center">
        <h1 className="text-xl text-gray-600 font-bold">Users</h1>
        <div className="flex flex-row gap-4 items-center">
          <button className="hover:bg-red-500 flex flex-row text-red-500 hover:text-white text-xs py-2 px-4 border border-red-500 rounded-md">
            <FaDownload className="mr-2" />
            Export
          </button>
          <div className="relative w-full max-w-md">
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users"
              className="w-full border border-gray-300 text-black rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 outline-none"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 bg-white text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="border border-gray-200 px-4 py-2">#</th>
              <th className="border border-gray-200 px-4 py-2">Username</th>
              <th className="border border-gray-200 px-4 py-2">Email</th>
              <th className="border border-gray-200 px-4 py-2">Role</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-gray-100 transition-all`}
              >
                <td className="border border-gray-200 text-black px-4 py-2">{index + 1}</td>
                <td className="border border-gray-200 text-black px-4 py-2">{user.username}</td>
                <td className="border border-gray-200 text-black px-4 py-2">{user.email}</td>
                <td className="border border-gray-200 text-black px-4 py-2">
                  {Array.isArray(user.roles) && user.roles.length > 0
                    ? user.roles.map((role, i) => (
                      <span key={role.id}>
                        {role.name}
                        {i < user.roles.length - 1 && ', '}
                      </span>
                    ))
                    : 'Fan'}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <button
                    onClick={() => handleEditRole(user)}
                    className="hover:bg-blue-500 flex flex-row text-blue-500 hover:text-white text-xs py-2 px-4 border border-blue-500 rounded-md"
                  >
                    <CiEdit className="mr-2" />
                    Edit Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
