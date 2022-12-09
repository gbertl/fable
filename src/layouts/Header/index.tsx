import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import logo from '../../assets/icons/logo.svg';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectItems } from '../../store/slices/cart';
import { showSideCart } from '../../store/slices/ui';
import './style.scss';

const Header = () => {
  const cartItems = useAppSelector(selectItems);
  const dispatch = useAppDispatch();

  return (
    <div className="header">
      <div className="container header__container">
        <Link to="/" className="header__logo hidden block-md">
          <img src={logo} alt="" />
        </Link>
        <ul className="header__nav">
          <li>
            <HashLink to="/#fable-of-colors-section">Collections</HashLink>
          </li>
          <li className="hidden block-md">
            <a href="#">Customizer</a>
          </li>
          <li className="hidden block-md">
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
      </div>
    </div>
  );
};

export default Header;
