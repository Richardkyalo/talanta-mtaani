// pages/index.js
// import Layout from '../components/Layout';
// import Header from '../components/header/Header';
import HeroSection from '../components/hero/HeroSection.js';
import FootballTournamentSearch from '../components/search/Search.js'
import '../styles/globals.css';
import EntertainmentSection from '../components/entertaining/entertaining.js'
import TestimonialsSection from '../components/testimonials/testimonials.js'
import NewsSection from '../components/news/newssection.js'

export default function Home() {
  return (
    <>
      <HeroSection />
      <FootballTournamentSearch />
      <EntertainmentSection />
      <TestimonialsSection />
      <NewsSection />
    </>
  );
}
