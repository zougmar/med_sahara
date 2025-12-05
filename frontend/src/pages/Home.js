import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listingsAPI } from '../services/api';
import NewExperienceCard from '../components/NewExperienceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import NewHero from '../components/NewHero';
import { 
  StarIcon, 
  MapPinIcon, 
  UserGroupIcon, 
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const Home = () => {
  const [featuredExperiences, setFeaturedExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeaturedExperiences = async () => {
      try {
        const response = await listingsAPI.getAll({ isPopular: true, limit: 3 });
        setFeaturedExperiences(response.data.experiences || response.data);
      } catch (err) {
        setError('Failed to load featured experiences');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedExperiences();
  }, []);

  const features = [
    {
      title: 'Expert Local Guides',
      description: 'Our experienced guides are native to the Sahara and will share their deep knowledge of the desert.',
      icon: <UserGroupIcon className="h-8 w-8 text-primary-600" />
    },
    {
      title: 'Authentic Experiences',
      description: 'Immerse yourself in Berber culture with authentic desert camps, traditional meals, and music.',
      icon: <MapPinIcon className="h-8 w-8 text-primary-600" />
    },
    {
      title: 'Guaranteed Satisfaction',
      description: 'With over 10 years of experience and thousands of happy customers, your satisfaction is our priority.',
      icon: <CheckCircleIcon className="h-8 w-8 text-primary-600" />
    }
  ];

  const testimonials = [
    {
      name: 'Emily Johnson',
      location: 'New York, USA',
      rating: 5,
      text: 'The camel trek through the Sahara was absolutely magical. Our guide was knowledgeable and the sunset over the dunes was breathtaking. A once-in-a-lifetime experience!',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      name: 'Michael Chen',
      location: 'Toronto, Canada',
      rating: 5,
      text: 'The luxury desert camp exceeded all our expectations. Comfortable tents, amazing food under the stars, and the stargazing experience was unforgettable. Highly recommend!',
      avatar: 'https://randomuser.me/api/portraits/men/65.jpg'
    },
    {
      name: 'Sophie Dubois',
      location: 'Paris, France',
      rating: 5,
      text: 'Our family trip to the Sahara was perfectly organized. The kids loved the camel ride and my husband and I enjoyed the peaceful moments in the dunes. Thank you for the memories!',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <NewHero />

      {/* Featured Experiences */}
      <section className="py-16 bg-sand-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold section-title mb-4">Featured Desert Adventures</h2>
            <p className="text-lg section-subtitle max-w-2xl mx-auto">
              Handpicked experiences that showcase the best of the Sahara Desert
            </p>
          </div>

          {loading ? (
            <LoadingSpinner size="lg" />
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredExperiences.map(experience => (
                <NewExperienceCard key={experience._id} experience={experience} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              to="/experiences" 
              className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              View All Experiences
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sand-900 mb-4">Why Choose Sahara Adventures</h2>
            <p className="text-lg text-sand-600 max-w-2xl mx-auto">
              We're committed to providing authentic, safe, and unforgettable desert experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-sand-900 mb-2">{feature.title}</h3>
                <p className="text-sand-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-sand-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sand-900 mb-4">What Our Travelers Say</h2>
            <p className="text-lg text-sand-600 max-w-2xl mx-auto">
              Real experiences from real adventurers who explored the Sahara with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-sand-900">{testimonial.name}</h4>
                    <p className="text-sm text-sand-600">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sand-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Sahara Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who have experienced the magic of the desert with us
          </p>
          <Link 
            to="/experiences" 
            className="bg-white text-primary-600 hover:bg-sand-100 font-bold py-3 px-6 rounded-lg inline-block transition-colors"
          >
            Book Your Adventure Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
