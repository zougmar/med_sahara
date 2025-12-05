import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PlayIcon, 
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

const Hero = () => {
  return (
    <section className="relative bg-hero-pattern bg-sand-900 text-white">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Discover the Magic of the Sahara Desert
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-sand-100 max-w-3xl">
            Experience authentic desert adventures with expert local guides. From camel treks to luxury desert camps, 
            create memories that will last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/experiences" 
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-lg text-center transition-colors shadow-lg transform hover:scale-105 duration-300"
            >
              Explore Experiences
            </Link>
            <button className="bg-sand-800 hover:bg-sand-700 text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center transition-colors shadow-lg transform hover:scale-105 duration-300">
              <PlayIcon className="h-5 w-5 mr-2" />
              Watch Video
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
