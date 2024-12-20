import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-10 px-5">
      {/* Slider Section */}
      <div className="relative overflow-hidden w-full h-64 mb-8">
        <div className="flex animate-slide w-full h-full">
          <div className="w-full flex-shrink-0">
            <img
              className="w-full h-full rounded-lg object-cover"
              src="/kuza memories/2022/IMG-20241104-WA0128.jpg"
              alt="Tournament Highlight 1"
            />
          </div>
          <div className="w-full flex-shrink-0">
            <img
              className="w-full h-full object-cover"
              src="/kuza memories/2023/IMG-20241104-WA0188.jpg"
              alt="Tournament Highlight 2"
            />
          </div>
          <div className="w-full flex-shrink-0">
            <img
              className="w-full h-full object-cover"
              src="/kuza memories/2021/IMG-20241104-WA0007.jpg"
              alt="Tournament Highlight 3"
            />
          </div>
        </div>
      </div>


      {/* About Us Section */}
      <div className="max-w-4xl mx-auto text-center bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 mb-4">
          <strong>Kuza Talanta Tournament (KTT)</strong> is an annual event organized by the local
          community members of Kiteng’ei sub-location, Masongaleni sub-location, and Kathekani Sub-location in Kibwezi East Constituency, Makueni County. Its main objective is to nurture sport talents of the young people and help build their career.
        </p>
        <p className="text-gray-600 mb-4">
          The tournament provides a platform to reach and engage the youth in disseminating important
          messages aimed at building their career paths and future lives. This is achieved through career
          and motivation talks. The tournament is also aimed at empowering the community through bringing
          the members together to discuss and find solutions to issues affecting the area and its
          population in terms of development and social life, as well as taking care of the environment.
        </p>
        <p className="text-gray-600 mb-4">
          The tournament also works towards protecting the young people in the areas against harmful
          behaviors such as Sexually Transmitted Diseases, Alcohol and Drug Abuse, Teen pregnancies, and
          sexual violence.
        </p>
        <p className="text-gray-600">
          KTT has, by the year 2023, hosted five tournament events which have shown positive impact and
          growth in influencing community life and the youth. More than nineteen (20) football clubs, both
          male and female, have participated in the tournament. There has also been a request from community
          members within Mtito Andei Ward who have expressed interest in participating in the tournament,
          necessitating an increase in the coverage area. The tournament organizers aim to go beyond Kibwezi
          East sub-county to larger Makueni County and beyond, impacting and empowering the youth and
          communities at large.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
