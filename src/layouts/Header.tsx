import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { Container } from '../components';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectItems } from '../store/slices/cart';
import { showSideCart } from '../store/slices/ui';
import { logo } from '../assets';

const mainNavLinks = [
  {
    url: '/#fable-of-klassik-section',
    text: 'Collections',
  },
  {
    url: '#',
    text: 'Customizer',
  },
  {
    url: '#',
    text: 'Sale',
  },
];

const HeaderNav = ({ children }: { children: React.ReactNode }) => (
  <ul className="uppercase font-medium flex gap-9">{children}</ul>
);

const Header = () => {
  const cartItems = useAppSelector(selectItems);
  const dispatch = useAppDispatch();

  return (
    <header className="text-sm">
      <Container className="flex justify-between items-center h-[74px]">
        <Link to="/" className="hidden md:block">
          <img src={logo} alt="" />
        </Link>
        <HeaderNav>
          {mainNavLinks.map((link, idx) => (
            <li key={idx}>
              <HashLink to={link.url}>{link.text}</HashLink>
            </li>
          ))}
        </HeaderNav>

        <HeaderNav>
          <li>
            <button
              onClick={() => dispatch(showSideCart())}
              style={{ textTransform: 'inherit' }}
            >
              Items ({cartItems.length})
            </button>
          </li>
          <li>
            <Link to="/signin">Profile</Link>
          </li>
        </HeaderNav>
      </Container>
    </header>
  );
};

export default Header;
