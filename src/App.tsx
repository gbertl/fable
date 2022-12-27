import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './layouts/Layout';
import { Checkout, Home, Product, Products, Profile, SignIn } from './pages';
import { ProtectedRoute } from './auth';

const router = createBrowserRouter([
  {
    element: <Layout withoutFooter />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/products/:id',
        element: <Product />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/collections',
        element: <Products />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
