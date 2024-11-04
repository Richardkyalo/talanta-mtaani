// components/TestimonialsSection.js
'use client';
import React, { useRef } from 'react';
const testimonials = [
  {
    id: 1,
    videoUrl: '/image/video1.mp4', // Replace with actual video URLs
    description: 'An intense showdown with a last-minute goal that left the crowd roaring! Watch the action-packed moments that defined this match.',
  },
  {
    id: 2,
    videoUrl: '/image/video2.mp4', // Replace with actual video URLs
    description: 'A thrilling penalty shootout that had everyone on the edge of their seats! Relive the nail-biting moments and epic saves.',
  },
  {
    id: 3,
    videoUrl: '/image/video3.mp4', // Replace with actual video URLs
    description: 'Incredible teamwork and a stunning goal from midfield! This highlight captures the essence of skill and strategy on the field.',
  },
  {
    id: 4,
    videoUrl: '/image/video4.mp4', // Replace with actual video URLs
    description: 'A defensive masterclass with unforgettable tackles and strategic plays. Watch how the defense held strong in a tough match!',
  },
];

const TestimonialsSection = () => {
  return (
    <div className="relative h-screen bg-cover bg-center py-10" style={{ backgroundImage: "url('/image/eighth.jpeg')" }}>
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative container text-center mx-auto z-10">
        <h2 className="text-xl text-white mb-6">
          Some of Last Year's Highlights
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
      <div className='relative mt-10 flex justify-center'>
        <button className="bg-red-500 hover:bg-blue-500 btn-sm text-white py-2 px-4 rounded-lg">View More</button>
      </div>
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => {
  const videoRef = useRef(null);
  const [videoPlay, setVideoPlay] = React.useState(false);

  const handlePlayPauseVideo = () => {
    if (videoRef.current) {
      if (videoPlay) {
        videoRef.current.pause();
        setVideoPlay(false);
      } else {
        videoRef.current.play();
        setVideoPlay(true);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative cursor-pointer">
      {/* Video with play button overlay */}
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full h-56 object-cover"
          src={testimonial.videoUrl}
          // title={`Testimonial from ${testimonial.name}`}
          onEnded={() => setVideoPlay(false)} // Reset state when video ends
          onClick={handlePlayPauseVideo} // Allow clicking on video to toggle play/pause
        >
          Your browser does not support the video tag.
        </video>

        {/* Play Button Overlay - shown only when video is not playing */}
        {!videoPlay && (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={handlePlayPauseVideo}
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-80">
              <svg className="w-6 h-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-6.586-3.752A1 1 0 007 8.01v7.98a1 1 0 001.166.987l6.586-3.752a1 1 0 000-1.748z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Name and Description below video */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800">{testimonial.name}</h3>
        <p className="text-gray-600 text-xs mt-2">{testimonial.description}</p>
      </div>
    </div>
  );
};

export default TestimonialsSection;
