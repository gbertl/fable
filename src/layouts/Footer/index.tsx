import './style.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        {/* Categories */}
        <div className="footer__categories">
          <ul>
            <li>
              <a href="#">Brand</a>
            </li>
            <li>
              <a href="#">Campaign</a>
            </li>
            <li>
              <a href="#">Clothing care</a>
            </li>
          </ul>

          <ul>
            <li>
              <a href="#">Guarantee</a>
            </li>
            <li>
              <a href="#">Store</a>
            </li>
            <li>
              <a href="#">Delivery & Returns</a>
            </li>
          </ul>

          <ul>
            <li>
              <a href="#">Telegram</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
          </ul>
        </div>

        {/* Subscribe */}
        <div className="footer__subscribe">
          <p>We give you a 10% discount for subscription</p>
          <input
            type="text"
            placeholder="Enter your email"
            className="form__input footer__input"
          />
          <button className="btn btn-light">Subscribe</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
