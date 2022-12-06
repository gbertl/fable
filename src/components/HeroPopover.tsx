import shorts from '../assets/images/shorts.png';

const HeroPopover = () => {
  return (
    <div className="hero__popover">
      <div className="hero__popover-img">
        <img src={shorts} alt="" />
      </div>

      <div className="hero__popover-body">
        <h1 className="hero__popover-title">Shorts CLR</h1>
        <ul className="hero__popover-desc">
          <li>
            Collection: <span className="font-bold">KLASSIK OF COLORS</span>
          </li>
          <li>
            Article: <span className="font-bold">H0146027</span>
          </li>
        </ul>
        <ul className="hero__popover-subdesc">
          <li>
            Size: <span className="font-bold">S</span>
          </li>
          <li>
            Color: <span className="font-bold">Black</span>
          </li>
        </ul>
        <div className="hero__popover-footer">
          <span>
            Price: <span className="font-bold">$9</span>
          </span>
          <a href="#" className="font-bold">
            Show more
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroPopover;
