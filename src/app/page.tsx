// src/app/page.tsx
import Hero from './components/Hero';
import Cards from './components/Cards'
import Projects from './components/Project'
import AboutUs from './components/About'
import Review from './components/Review';
import FAQ from './components/FAQ'
export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* Other content */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Cards />
    </div>
    <Projects/>
    <AboutUs/> 
    <Review/>
    <FAQ/>
        </main>
  );
}
