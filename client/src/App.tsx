import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './layouts/Layout';

import { appRoutes } from './routes';

const Checkout = lazy(() => import('./pages/Checkout'));
const Home = lazy(() => import('./pages/Home'));
const Product = lazy(() => import('./pages/Product'));
const Products = lazy(() => import('./pages/Products'));
const Profile = lazy(() => import('./pages/Profile'));
const ProfileInformation = lazy(
  () => import('./pages/Profile/ProfileInformation')
);
const ProfileMain = lazy(() => import('./pages/Profile/ProfileMain'));
const ProfileOrderHistory = lazy(
  () => import('./pages/Profile/ProfileOrderHistory')
);
const SignIn = lazy(() => import('./pages/SignIn'));

const router = createBrowserRouter([
  {
    element: <Layout withoutFooter />,
    children: [
      {
        path: appRoutes.home,
        element: <Home />,
      },
      {
        path: appRoutes.login,
        element: <SignIn />,
      },
      {
        path: appRoutes.productDetail,
        element: <Product />,
      },
      {
        path: appRoutes.checkout,
        element: <Checkout />,
      },
      {
        path: appRoutes.profile,
        element: <Profile />,
        children: [
          {
            path: '',
            element: <ProfileMain />,
          },
          {
            path: appRoutes.profileInformation,
            element: <ProfileInformation />,
          },
          {
            path: appRoutes.profileOrderHistory,
            element: <ProfileOrderHistory />,
          },
        ],
      },
      {},
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: appRoutes.collections,
        element: <Products />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
