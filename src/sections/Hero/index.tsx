import logo from '../../assets/icons/logo.svg';
import './style.scss';
import HeroSlider from './HeroSlider';
import { Container } from '../../components';

const Hero = () => {
  return (
    <section className="hero">
      <Container className="hero__container">
        <img src={logo} alt="" className="hero__logo" />
        <p>
          A clothing brand that doesn't limit itself to the framework of any
          concepts
        </p>
      </Container>
      <HeroSlider />
    </section>
  );
};

export default Hero;
