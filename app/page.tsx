'use client'
import HeroSection from '../components/Home/hero/HeroSection.js';
import FootballTournamentSearch from '../components/Home/search/Search.js'
import '../styles/globals.css';
import EntertainmentSection from '../components/Home/entertaining/entertaining.js'
import TestimonialsSection from '../components/Home/testimonials/testimonials.js'
import NewsSection from '../components/Home/news/newssection.js'
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  console.log(session, status);
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
