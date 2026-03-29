import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import Companies from '@/sections/Companies';
import Work from '@/sections/Work';
import About from '@/sections/About';
import AIToolkit from '@/sections/AIToolkit';
import Writing from '@/sections/Writing';
import Services from '@/sections/Services';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

function PortfolioApp() {
  return (
    <div className="min-h-screen bg-luxury-bg">
      <Navbar />
      <main>
        <Hero />
        <Companies />
        <Work />
        <About />
        <AIToolkit />
        <Writing />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default PortfolioApp;
