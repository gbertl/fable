import { useEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import SideCart from '../components/SideCart';
import { useAppSelector } from '../hooks';
import { selectIsSideCartActive } from '../store/slices/ui';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
  const isSideCartActive = useAppSelector(selectIsSideCartActive);

  useEffect(() => {
    if (isSideCartActive) {
      document.body.classList.add('hide-scrollbar');
    } else {
      document.body.classList.remove('hide-scrollbar');
    }
  }, [isSideCartActive]);

  return (
    <>
      <ScrollRestoration />

      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />

      {isSideCartActive && <SideCart />}
    </>
  );
};

export default Layout;
