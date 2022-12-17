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
    url: '/collections',
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
              {link.url.includes('#') ? (
                <HashLink
                  to={link.url}
                  className={`hover:opacity-70 ${
                    link.text === 'Customizer' || link.text === 'Sale'
                      ? 'hidden md:inline'
                      : ''
                  }`}
                >
                  {link.text}
                </HashLink>
              ) : (
                <Link
                  to={link.url}
                  className={`hover:opacity-70 ${
                    link.text === 'Customizer' || link.text === 'Sale'
                      ? 'hidden md:inline'
                      : ''
                  }`}
                >
                  {link.text}
                </Link>
              )}
            </li>
          ))}
        </HeaderNav>

        <HeaderNav>
          <li>
            <button
              onClick={() => dispatch(showSideCart())}
              style={{ textTransform: 'inherit' }}
              className="hover:opacity-70"
            >
              Items ({cartItems.length})
            </button>
          </li>
          <li>
            <Link to="/signin" className="hover:opacity-70">
              Profile
            </Link>
          </li>
        </HeaderNav>
      </Container>
    </header>
  );
};

export default Header;
