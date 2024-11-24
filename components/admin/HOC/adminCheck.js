import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Adjust this for Next.js 13 or 14
import { userRoleService } from "../../../app/api/rbac/userRoleCreate";

// Function to check if the user has the 'admin' role
const getParticularRole = async (roleIds) => {
  // Check if roleIds is an array before proceeding
  if (!Array.isArray(roleIds)) {
    console.error('Expected roleIds to be an array, but got:', roleIds);
    return false;
  }

  // Loop through the array of roleIds and check for 'admin' role
  const roles = await Promise.all(roleIds.map(async (roleId) => {
    try {
      const role = await userRoleService.getRoleById(roleId);
      return role?.data?.data?.data?.name || ''; // Extract role name, fallback to empty string if undefined
    } catch (error) {
      console.error('Error fetching role by ID:', roleId, error);
      return ''; // Return empty if error occurs
    }
  }));

  // Check if any of the fetched roles is 'admin'
  return roles.includes('admin');
};

// HOC to restrict access based on the user's role
const withAdminAccess = (WrappedComponent) => {
  const WithAdminAccessComponent = (props) => {
    const { data: session, status } = useSession(); // Use session from next-auth
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') return; // Wait for the session data to load

      if (session) {
        const roleIds = session?.role_ids || []; // Extract roleIds from session

        const checkRole = async () => {
          const hasAdminRole = await getParticularRole(roleIds);
          if (hasAdminRole) {
            setIsAdmin(true);
          } else {
            router.push('/'); // Redirect if not an admin
          }
        };

        checkRole();
      } else {
        // Redirect to login page if session doesn't exist
        router.push('/');
      }
    }, [session, status, router]); // Depend on session and status

    if (status === 'loading' || !isAdmin) {
      return null; // Optionally, show a loading spinner or something while checking roles
    }

    return <WrappedComponent {...props} />;
  };

  // Set the display name for the HOC
  WithAdminAccessComponent.displayName = `withAdminAccess(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAdminAccessComponent;
};

export default withAdminAccess;
