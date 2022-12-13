import { useEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { SideCart } from '../components';
import { useAppSelector } from '../hooks';
import { selectIsSideCartOpen } from '../store/slices/ui';
import Footer from './Footer';
import Header from './Header';

interface Props {
  withoutFooter?: boolean;
}

const Layout = ({ withoutFooter }: Props) => {
  const isSideCartOpen = useAppSelector(selectIsSideCartOpen);

  useEffect(() => {
    if (isSideCartOpen) {
      document.body.classList.add('hide-scrollbar');
    } else {
      document.body.classList.remove('hide-scrollbar');
    }
  }, [isSideCartOpen]);

  return (
    <>
      <ScrollRestoration />

      <Header />
      <main>
        <Outlet />
      </main>
      {!withoutFooter && <Footer />}

      {isSideCartOpen && <SideCart />}
    </>
  );
};

export default Layout;
