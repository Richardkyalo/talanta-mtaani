import Image from 'next/image';
import React from 'react';
import { FaCalendarAlt, FaTags } from 'react-icons/fa';

const BlogPage = () => {
  return (
    <section className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center mb-10" style={{ backgroundImage: "url('/image/blogCover.jpeg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl text-white font-bold">Welcome to Our Blog</h1>
        </div>
      </div>

      {/* Featured Post */}
      <div className="container mx-auto px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <Image src="/image/blog1.jpeg" alt="Featured Post" width={800} height={400} className="object-cover" />
            </div>
            <div className="p-8 md:w-1/2 flex flex-col justify-between">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Featured Post: The Rise of Sustainable Fashion</h2>
              <p className="text-gray-600 mb-4">
              This recent gathering brought together members of the local community to share in conversation, celebrate, and connect. Under the colorful tent, families, friends, and neighbors came together to enjoy a sense of unity and shared purpose, demonstrating the strength of community bonds.
              </p>
              <div className="flex items-center text-gray-500 text-sm">
                <FaCalendarAlt className="mr-2" />
                <span>December 27, 2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Post 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image src="/image/blog2.jpeg" alt="Post 1" width={800} height={400} className="object-cover" />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Blog Post Title 1</h3>
              <p className="text-gray-600 mb-4">
              The knockout rounds were filled with intense emotions, as teams faced elimination with every match. Each game was a display of endurance and skill, leaving fans on the edge of their seats. The stakes were high, and the players rose to the occasion, delivering thrilling performances that kept the audience captivated.    </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  <span>October 15, 2023</span>
                </div>
                <div className="flex items-center">
                  <FaTags className="mr-2" />
                  <span>Knockouts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Post 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image src="/image/blog3.jpeg" alt="Post 2" width={800} height={400} className="object-cover" />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Blog Post Title 2</h3>
              <p className="text-gray-600 mb-4">
              The group stages set the tone for the tournament, with teams showcasing their skills and strategies. It was a time of fierce competition, as each team aimed to secure their spot in the knockout rounds. The crowd was engaged from the start, rooting for their local heroes and experiencing unforgettable moments on the field</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  <span>December 27, 2023</span>
                </div>
                <div className="flex items-center">
                  <FaTags className="mr-2" />
                  <span>Group Stages</span>
                </div>
              </div>
            </div>
          </div>

          {/* Post 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image src="/image/blog4.jpeg" alt="Post 3" width={800} height={400} className="object-cover" />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Blog Post Title 3</h3>
              <p className="text-gray-600 mb-4">
              We also celebrated the top scorers of the tournament, whose exceptional talent and precision left a lasting impression on the fans. These players not only boosted their teams’ spirits but also became icons for their skill and sportsmanship, inspiring young players in the community.
               </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  <span>December 27, 2023</span>
                </div>
                <div className="flex items-center">
                  <FaTags className="mr-2" />
                  <span>Celebrations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional posts can be added in a similar format here */}

        </div>
      </div>
    </section>
  );
};

export default BlogPage;
