// components/TestimonialsSection.js

import React from 'react';

const testimonials = [
  {
    id: 1,
    videoUrl: '/image/video1.mp4', // Replace with actual video URLs
    name: 'John Doe',
    description: 'The football tournament was an unforgettable experience! The atmosphere was electric, and the entertainment was top-notch.',
  },
  {
    id: 2,
    videoUrl: '/image/video2.mp4', // Replace with actual video URLs
    name: 'Jane Smith',
    description: 'I loved every moment! The matches were thrilling, and the entertainment kept everyone engaged.',
  },
  {
    id: 3,
    videoUrl: '/image/video3.mp4', // Replace with actual video URLs
    name: 'Emily Johnson',
    description: 'A fantastic event for the whole family! We had a blast with the activities and the matches.',
  },
  {
    id: 4,
    videoUrl: '/image/video4.mp4', // Replace with actual video URLs
    name: 'Michael Brown',
    description: 'A fantastic event for the whole family! We had a blast with the activities and the matches.',
  },
];

const TestimonialsSection = () => {
  return (
    <div className="relative h-screen bg-cover bg-center py-10" style={{ backgroundImage: "url('/image/eighth.jpeg')" }}>
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative container text-center mx-auto z-10">
        <h2 className="text-xl text-blue-500 mb-6">
          What People Are Saying
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white border-b border-t border-blue-500 p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            >
              <iframe
                className="w-full h-56 rounded-lg"
                src={testimonial.videoUrl}
                title={`Testimonial from ${testimonial.name}`}
                controls 
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <h3 className="text-sm text-black mt-4">{testimonial.name}</h3>
              <p className="text-gray-600 text-xs">{testimonial.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
