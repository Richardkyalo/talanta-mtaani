// components/HeroSection.js
const HeroSection = () => {
    return (
        <section className="relative z-10 h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('/image/tourn4.jpg')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="container flex flex-col justify-center h-full relative  text-center text-white">
                <div className="flex flex-col mt-48 md:mt-12 md:flex-row justify-center items-center gap-12 h-full">
                    <div className="sm:w-1/2 md:w-1/2 md:ml-4 md:h-1/2 items-center justify-center border-t-4 border-red-600 bg-black opacity-80 p-4 rounded-2xl">
                        <h1 className="text-xl">Kuza Talanta Mtaani</h1>
                        <p className="text-sm max-w-32 text-center mt-4">Join the excitement of the Kuza Talanta Tournament and witness the greatest teams battle it out for the championship title</p>
                        <button className="bg-red-600 hover:bg-red-700 text-white text-xs py-2 px-6 rounded-full mt-6">
                            Get Started
                        </button>
                    </div>
                    <div className="w-1/2 md:w-1/2 md:h-3/4 items-center justify-center border-b-4 border-blue-600 bg-black opacity-80 pt-24 rounded-2xl md:animate-bounce">
                        <h1 className="text-xl">Coming Soon</h1>
                        <p className="text-sm mt-4">Kuza Talanta Mtaani <span className="text-red-600">2024 Edition</span></p>
                        <button className="bg-blue-600 mb-4 hover:bg-red-700 text-white animate-pulse text-xs py-2 px-6 rounded-full mt-6">
                            Welcome All
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
