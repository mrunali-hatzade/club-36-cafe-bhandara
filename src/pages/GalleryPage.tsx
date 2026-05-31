import Gallery from '../components/Gallery';
import Experience from '../components/Experience';
import Socials from '../components/Socials';

export default function GalleryPage() {
  return (
    <div className="pt-10 md:pt-12 min-h-screen bg-cream dark:bg-charcoal">
      <Gallery />
      <Experience />
      <Socials />
    </div>
  );
}
