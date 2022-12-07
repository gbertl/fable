import { Link } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg';
import { useAppSelector } from '../../hooks';
import { selectItems } from '../../store/slices/cart';
import './style.scss';

const Header = () => {
  const cartItems = useAppSelector(selectItems);

  return (
    <div className="header">
      <div className="container header__container">
        <Link to="/" className="header__logo hidden block-md">
          <img src={logo} alt="" />
        </Link>
        <ul className="header__nav">
          <li>
            <a href="#">Collections</a>
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
            <Link to="/checkout">Items ({cartItems.length})</Link>
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
