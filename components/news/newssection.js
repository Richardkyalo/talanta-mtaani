import React from 'react';

const newsArticles = [
    {
        id: 1,
        imageUrl: '/image/tourn3.jpg', // Replace with actual image URLs
        title: 'Exciting Football Tournament Kicks Off',
        description: 'The football tournament was an unforgettable experience! The atmosphere was electric, and the entertainment was top-notch.',
        date: 'September 1, 2024',
    },
    {
        id: 2,
        imageUrl: '/image/tourn4.jpg', // Replace with actual image URLs
        title: 'A Family-Friendly Event Full of Fun',
        description: 'I loved every moment! The matches were thrilling, and the entertainment kept everyone engaged.',
        date: 'September 5, 2024',
    },
    {
        id: 3,
        imageUrl: '/image/tourn2.jpg', // Replace with actual image URLs
        title: 'Highlights from Last Weekend\'s Matches',
        description: 'A fantastic event for the whole family! We had a blast with the activities and the matches.',
        date: 'September 10, 2024',
    },
    {
        id: 4,
        imageUrl: '/image/tourn3.jpg', // Replace with actual image URLs
        title: 'Highlights from Last Weekend\'s Matches',
        description: 'A fantastic event for the whole family! We had a blast with the activities and the matches.',
        date: 'September 10, 2024',
    },
];

const NewsSection = () => {
    return (
        <div className="bg-gray-50 py-10">
            <div className="container mx-auto">
                <h2 className="text-xl text-blue-500 mb-6">Latest News</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {newsArticles.map((article) => (
                        <div
                            key={article.id}
                            className="bg-white border-t border-b border-red-500  p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                        >
                            <img
                                className="w-full h-56 rounded-lg object-cover"
                                src={article.imageUrl}
                                alt={article.title}
                            />
                            <div className="flex flex-row mt-4 justify-between items-center">
                                <p className="text-gray-400 text-sm mt-2">{article.date}</p>
                                <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-blue-600 transition duration-300">
                                    More
                                </button>
                            </div>
                            <h3 className="text-xs text-black font-bold mt-4">{article.title}</h3>
                            <p className="text-gray-600 max-w-48 truncate text-ellipsis text-xs">{article.description}</p>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsSection;
