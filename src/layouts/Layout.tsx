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
