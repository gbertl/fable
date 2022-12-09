import logo from '../../assets/icons/logo.svg';
import './style.scss';
import HeroSlider from './HeroSlider';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero__container">
        <img src={logo} alt="" className="hero__logo" />
        <p>
          A clothing brand that doesn't limit itself to the framework of any
          concepts
        </p>
      </div>
      <HeroSlider />
    </section>
  );
};

export default Hero;
