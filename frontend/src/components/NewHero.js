import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PlayIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const NewHero = () => {
  const [videoModal, setVideoModal] = useState(false);

  const openVideoModal = () => {
    setVideoModal(true);
  };

  return (
    <>
      <section className="relative h-screen min-h-[600px] bg-cover bg-center flex items-center justify-center overflow-hidden" style={{backgroundImage: `url('https://www.story-rabat.com/wp-content/uploads/2024/02/1_1_11zon-1170x550.webp')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-gradient-to-r from-sand-900/85 to-primary-900/75 z-10"></div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-20 h-20 border-4 border-secondary-400 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 border-4 border-accent-400 rounded-full animate-pulse opacity-70"></div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
              <StarIconSolid className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-sm font-medium">Rated 4.9/5 by over 2,000 travelers</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-serif animate-slide-in-top drop-shadow-lg">
              Discover the <span className="text-gradient">Magic</span> of Sahara Desert
            </h1>

            <p className="text-xl md:text-2xl hero-text mb-8 max-w-3xl mx-auto animate-slide-in-bottom drop-shadow-md">
              Experience authentic desert adventures with expert local guides. From camel treks to luxury desert camps,
              create memories that will last a lifetime.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-bottom">
              <Link
                to="/experiences"
                className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-4 px-8 rounded-lg text-center transition-all duration-300 shadow-xl transform hover:scale-105 hover:shadow-2xl flex items-center justify-center"
              >
                Explore Experiences
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Link>
              <button 
                onClick={openVideoModal}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center transition-all duration-300 shadow-xl transform hover:scale-105 hover:shadow-2xl border border-white/30"
              >
                <PlayIcon className="h-5 w-5 mr-2" />
                Watch Video
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <svg className="w-6 h-10 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 44" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1l11 11 11-11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* Video Modal */}
      {videoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setVideoModal(false)}>
          <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/hVvEISFw9w0"
                title="Sahara Desert Adventure"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onError={() => console.error("Error loading video")}
                onLoad={() => console.log("Video loaded successfully")}
              ></iframe>
            </div>
            <button 
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
              onClick={() => setVideoModal(false)}
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NewHero;
