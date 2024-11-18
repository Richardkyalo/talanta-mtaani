'use client';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CiEdit, CiSearch } from 'react-icons/ci';
import { MdDeleteForever } from 'react-icons/md';
import { FaDownload } from 'react-icons/fa';
import { userService } from '@/app/api/userService/userService';

const fetchUsers = async (page, limit) => {
  try {
    const response = await userService.getAllUsers(page, limit);
    console.log(response);
    return response?.data?.users ?? []; // Ensure correct nesting
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export default function UsersTable() {
  const [users, setUsers] = useState([]);

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(1, 10),
    onSuccess: (fetchedUsers) => {
      setUsers(fetchedUsers); // Set users array directly
    },
    onError: (error) => {
      console.error('Error fetching users:', error);
    },
  });


  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  })
  console.log(users); // Confirm data in the console
  return (
    <div className="p-4">
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
                <td className="border border-gray-200 text-black px-4 py-2">User</td>
                <td className="border border-gray-200 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <button className="hover:bg-blue-500 border border-blue-500 text-blue-500 hover:text-white px-2 py-1 rounded">
                      <div className="flex items-center gap-2">
                        <CiEdit />
                        <p>Edit Role</p>
                      </div>
                    </button>
                    <button className="hover:bg-red-500 text-red-500 border border-red-500 hover:text-white px-2 py-1 rounded">
                      <div className="flex items-center gap-2">
                        <MdDeleteForever />
                        <p>Delete</p>
                      </div>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
