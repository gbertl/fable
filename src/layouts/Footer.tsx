import { Container } from '../components';

const linkGroup1 = ['Brand', 'Campaign', 'Clothing Care'];
const linkGroup2 = ['Guarantee', 'Store', 'Delivery & Returns'];
const linkGroup3 = ['Telegram', 'Instagram'];

const FooterLinks = ({ links }: { links: string[] }) => (
  <ul className="flex gap-3 flex-col leading-none">
    {links.map((link) => (
      <li key={link}>
        <a href="#" className="font-medium text-xs">
          {link}
        </a>
      </li>
    ))}
  </ul>
);

const Footer = () => {
  return (
    <footer className="mt-28 bg-dark text-white pt-9 pb-12">
      <Container className="grid md:grid-cols-[1fr_2fr]">
        <div className="order-2 md:order-1 flex justify-between mt-9 md:mt-0 ">
          <FooterLinks links={linkGroup1} />
          <FooterLinks links={linkGroup2} />
          <FooterLinks links={linkGroup3} />
        </div>

        <div className="order-1 md:order-2 md:justify-self-end md:ml-9">
          <p className="text-xs font-medium mb-4">
            We give you a 10% discount for subscription
          </p>
          <input
            type="text"
            placeholder="Enter your email"
            className="form__input border-white mb-4 md:mb-0 md:mr-4 w-full md:w-auto text-white"
          />
          <button className="btn btn-light w-full md:w-auto">Subscribe</button>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
