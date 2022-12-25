import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

const useCheckAdminRole = (): boolean => {
  const { user } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAdmin(user['https://fable-gbertl.web.app/roles'].includes('Admin'));
    }
  }, [user]);

  return isAdmin;
};

export default useCheckAdminRole;
