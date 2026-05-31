import Hero from '../components/Hero';
import About from '../components/About';
import WhyUs from '../components/WhyUs';
import Menu from '../components/Menu';
import Specials from '../components/Specials';
import BookingCTA from '../components/BookingCTA';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhyUs />
      <Menu />
      <Specials />
      <BookingCTA />
      <Reviews />
      <Contact />
    </>
  );
}
