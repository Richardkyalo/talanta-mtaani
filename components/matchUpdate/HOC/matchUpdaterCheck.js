import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Adjust this for Next.js 13 or 14
import { userRoleService } from '../../../app/api/rbac/userRoleCreate';

// Function to check if the user has the 'matchUpdater' role
const getParticularRole = async (roleIds) => {
  if (!Array.isArray(roleIds)) {
    console.error('Expected roleIds to be an array, but got:', roleIds);
    return false;
  }

  const roles = await Promise.all(
    roleIds.map(async (roleId) => {
      try {
        const role = await userRoleService.getRoleById(roleId);
        return role?.data?.data?.data?.name || ''; // Extract role name, fallback to empty string if undefined
      } catch (error) {
        console.error('Error fetching role by ID:', roleId, error);
        return ''; // Return empty if error occurs
      }
    })
  );

  return roles.includes('matchUpdater');
};

// HOC to restrict access based on the user's role
const withMatchUpdaterAccess = (WrappedComponent) => {
  const WithMatchUpdaterComponent = (props) => {
    const { data: session, status } = useSession();
    const [hasAccess, setHasAccess] = useState(false);
    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') return; // Wait for session to load

      if (session) {
        const roleIds = session?.role_ids || []; // Extract roleIds from session

        const checkRole = async () => {
          const hasMatchUpdaterRole = await getParticularRole(roleIds);
          if (hasMatchUpdaterRole) {
            setHasAccess(true);
          } else {
            router.push('/'); // Redirect if not authorized
          }
        };

        checkRole();
      } else {
        router.push('/'); // Redirect to login if session is not available
      }
    }, [session, status, router]);

    if (status === 'loading' || !hasAccess) {
      return null; // Optionally render a loading spinner or placeholder
    }

    return <WrappedComponent {...props} />;
  };

  // Set the display name for debugging
  WithMatchUpdaterComponent.displayName = `withMatchUpdaterAccess(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithMatchUpdaterComponent;
};

export default withMatchUpdaterAccess;
