import logo from '../../assets/icons/logo.svg';
import './style.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="container header__container">
        <a href="#" className="header__logo hidden block-md">
          <img src={logo} alt="" />
        </a>
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
            <a href="#">Items</a>
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
