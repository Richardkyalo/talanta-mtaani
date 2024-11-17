'use client'
import HeroSection from '../components/Home/hero/HeroSection.js';
import FootballTournamentSearch from '../components/Home/search/Search.js'
import '../styles/globals.css';
import EntertainmentSection from '../components/Home/entertaining/entertaining.js'
import TestimonialsSection from '../components/Home/testimonials/testimonials.js'
import NewsSection from '../components/Home/news/newssection.js'

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
