import { useAuth0 } from '@auth0/auth0-react';
import { Suspense } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { Container, Loading } from '../../components';
import { appRoutes } from '../../routes';

const Profile = () => {
  const { isAuthenticated, logout, isLoading } = useAuth0();
  const location = useLocation();

  const setActiveLink = (path: string) => {
    return location.pathname ===
      `${path !== appRoutes.profile ? `${appRoutes.profile}/` : ''}${path}`
      ? 'text-dark'
      : 'text-gray';
  };

  return (
    <>
      <Loading isLoading={isLoading} />

      <Container className="flex flex-col lg:flex-row gap-14 mt-20 mb-10">
        <div className="min-w-[200px]">
          <ul className="flex lg:flex-col gap-6 flex-wrap">
            <li>
              <Link
                to={appRoutes.profile}
                className={`${setActiveLink(
                  appRoutes.profile
                )} hover:text-dark`}
              >
                Main
              </Link>
            </li>
            <li>
              <Link
                to={appRoutes.profileInformation}
                className={`${setActiveLink(
                  appRoutes.profileInformation
                )} hover:text-dark`}
              >
                Information
              </Link>
            </li>
            <li>
              <Link
                to={appRoutes.profileOrderHistory}
                className={`${setActiveLink(
                  appRoutes.profileOrderHistory
                )} hover:text-dark`}
              >
                Order history
              </Link>
            </li>
            <li>
              {isAuthenticated ? (
                <button
                  onClick={() => logout()}
                  className="text-gray hover:text-dark"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to={appRoutes.login}
                  className="text-gray hover:text-dark"
                >
                  Log In
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div className="w-full">
          <Suspense fallback={<Loading isLoading={true} />}>
            <Outlet />
          </Suspense>
        </div>
      </Container>
    </>
  );
};

export default Profile;
