import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { appRoutes } from '../routes';
import { Loading } from '../components';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isLoading, isAuthenticated } = useAuth0();

  return (
    <>
      <Loading isLoading={isLoading} />

      {!isLoading && (
        <>
          {!isAuthenticated ? (
            <Navigate to={appRoutes.login} replace />
          ) : (
            <>{children}</>
          )}
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
