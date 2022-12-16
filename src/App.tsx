import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './layouts/Layout';
import { Checkout, Home, Product, Products, SignIn } from './pages';

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
