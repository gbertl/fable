import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <ScrollRestoration />

      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
