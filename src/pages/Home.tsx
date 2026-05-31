import Hero from '../components/Hero';
import About from '../components/About';
import WhyUs from '../components/WhyUs';
import Menu from '../components/Menu';
import Specials from '../components/Specials';
import BookingCTA from '../components/BookingCTA';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import FloatingEquipment from '../components/FloatingEquipment';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative overflow-visible">
        <FloatingEquipment />
        <About />
        <WhyUs />
        <Menu />
        <Specials />
        <BookingCTA />
        <Reviews />
        <Contact />
      </div>
    </>
  );
}
