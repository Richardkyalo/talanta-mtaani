'use client';

import React, { useEffect, useState } from 'react';
import { Table, Loader, Group, ActionIcon, Box, Text, Badge } from '@mantine/core';
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Replace with your API endpoint
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit user with ID: ${id}`);
    // Add navigation or modal logic here
  };

  const handleDelete = (id) => {
    console.log(`Delete user with ID: ${id}`);
    // Add delete logic here
  };

  const rows = users.length
    ? users.map((user) => (
        <tr key={user.id} style={{ backgroundColor: '#f9f9f9', borderBottom: '1px solid #eaeaea' }}>
          <td>
            <Badge size="lg" color="gray">
              {user.id}
            </Badge>
          </td>
          <td>
            <Text weight={500}>{user.name}</Text>
          </td>
          <td>
            <Text color="dimmed" size="sm">{user.email}</Text>
          </td>
          <td>
            <Badge color={user.role === 'Admin' ? 'blue' : 'green'}>{user.role}</Badge>
          </td>
          <td>
            <Group spacing="sm">
              <ActionIcon
                color="blue"
                size="lg"
                variant="light"
                onClick={() => handleEdit(user.id)}
              >
                <CiEdit size={20} />
              </ActionIcon>
              <ActionIcon
                color="red"
                size="lg"
                variant="light"
                onClick={() => handleDelete(user.id)}
              >
                <MdDeleteForever size={20} />
              </ActionIcon>
            </Group>
          </td>
        </tr>
      ))
    : (
      <tr>
        <td colSpan="5" style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f9f9f9' }}>
          <Text color="dimmed">No users found</Text>
        </td>
      </tr>
    );

  return (
    <Box
      sx={{
        maxWidth: '900px',
        margin: '20px auto',
        border: '1px solid #eaeaea',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={{ backgroundColor: '#1971c2', padding: '12px 20px', color: 'white' }}>
        <Text size="lg" weight={600}>
          Users Management
        </Text>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <Loader size="lg" />
        </Box>
      ) : (
        <Table highlightOnHover verticalSpacing="sm" horizontalSpacing="lg">
          <thead style={{ backgroundColor: '#f1f3f5' }}>
            <tr>
              <th style={{ textAlign: 'center' }}>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      )}
    </Box>
  );
};

export default UsersTable;
