import logo from '../../assets/icons/logo.svg';
import './style.css';
import HeroSlider from './HeroSlider';
import { Container } from '../../components';

const Hero = () => {
  return (
    <section className="relative mt-28 md:mt-24">
      <Container className="text-center mb-11 md:mb-16">
        <img
          src={logo}
          alt=""
          className="w-80 mb-7 md:mb-8 relative left-1/2 -translate-x-1/2"
        />
        <p className="text-gray md:text-2xl">
          A clothing brand that doesn't limit itself to the framework of any
          concepts
        </p>
      </Container>
      <HeroSlider />
    </section>
  );
};

export default Hero;
