import { AnimatePresence } from 'framer-motion';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Auth0ProviderWithHistory } from '../auth';
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
    <Auth0ProviderWithHistory>
      <ScrollRestoration />

      <Header />
      <main>
        <Outlet />
      </main>
      {!withoutFooter && <Footer />}

      <AnimatePresence>{isSideCartOpen && <SideCart />}</AnimatePresence>
    </Auth0ProviderWithHistory>
  );
};

export default Layout;
