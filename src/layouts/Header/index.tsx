import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import logo from '../../assets/icons/logo.svg';
import { Container } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectItems } from '../../store/slices/cart';
import { showSideCart } from '../../store/slices/ui';
import './style.scss';

const Header = () => {
  const cartItems = useAppSelector(selectItems);
  const dispatch = useAppDispatch();

  return (
    <div className="header">
      <Container className="header__container">
        <Link to="/" className="header__logo hidden md:block">
          <img src={logo} alt="" />
        </Link>
        <ul className="header__nav">
          <li>
            <HashLink to="/#fable-of-colors-section">Collections</HashLink>
          </li>
          <li className="hidden md:block">
            <a href="#">Customizer</a>
          </li>
          <li className="hidden md:block">
            <a href="#">Sale</a>
          </li>
        </ul>
        <ul className="header__right">
          <li>
            <button onClick={() => dispatch(showSideCart())}>
              Items ({cartItems.length})
            </button>
          </li>
          <li>
            <a href="#">Profile</a>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default Header;
