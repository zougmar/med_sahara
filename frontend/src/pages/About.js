import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserGroupIcon, 
  MapPinIcon, 
  StarIcon,
  ShieldCheckIcon,
  HeartIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const teamMembers = [
    {
      name: 'Mohammed Amzil',
      position: 'Founder & Lead Guide',
      bio: 'Born and raised in the Sahara, Mohammed has over 15 years of experience leading desert tours. His deep knowledge of the desert and Berber culture ensures an authentic experience for all travelers.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Fatima Zahra',
      position: 'Operations Manager',
      bio: 'Fatima manages all tour operations with precision and care. She ensures every detail of your adventure is perfectly planned, from accommodations to meals.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Youssef Alami',
      position: 'Senior Desert Guide',
      bio: 'Youssef is an expert navigator and storyteller, sharing fascinating tales of the desert and its history. His passion for the Sahara is contagious.',
      image: 'https://randomuser.me/api/portraits/men/65.jpg'
    },
    {
      name: 'Aisha Bennani',
      position: 'Customer Experience',
      bio: 'Aisha ensures every traveler feels welcome and well-cared for from booking to departure. Her attention to detail makes every trip special.',
      image: 'https://randomuser.me/api/portraits/women/28.jpg'
    }
  ];

  const values = [
    {
      icon: <ShieldCheckIcon className="h-8 w-8 text-primary-600" />,
      title: 'Safety First',
      description: 'Your safety is our top priority. All our guides are trained in first aid and emergency protocols.'
    },
    {
      icon: <HeartIcon className="h-8 w-8 text-primary-600" />,
      title: 'Authentic Experiences',
      description: 'We offer genuine cultural experiences that connect you with the real Sahara and its people.'
    },
    {
      icon: <GlobeAltIcon className="h-8 w-8 text-primary-600" />,
      title: 'Sustainable Tourism',
      description: 'We are committed to preserving the fragile desert ecosystem and supporting local communities.'
    }
  ];

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero Section */}
      <div className="bg-hero-pattern bg-sand-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About Sahara Adventures</h1>
          <p className="text-xl max-w-3xl">
            We are a team of passionate desert enthusiasts dedicated to sharing the magic and beauty 
            of the Sahara with travelers from around the world.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-sand-900 mb-8 text-center">Our Story</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Sahara Desert" 
                  className="rounded-lg shadow-lg"
                />
              </div>

              <div>
                <p className="text-sand-700 mb-4">
                  Sahara Adventures was founded in 2010 by Mohammed Amzil, a native of the Merzouga region 
                  who grew up exploring the dunes and learning the ancient ways of the desert.
                </p>

                <p className="text-sand-700 mb-4">
                  What started as a small operation with just a few camels has grown into a respected 
                  tour company that welcomes hundreds of travelers each year. Despite our growth, we've 
                  maintained our commitment to authentic, personal experiences.
                </p>

                <p className="text-sand-700">
                  We believe the Sahara is more than just a destination—it's a transformative experience 
                  that connects people with nature, culture, and themselves. Our mission is to facilitate 
                  this connection while preserving the desert ecosystem and supporting local communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-sand-900 mb-12 text-center">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-sand-900 mb-2">{value.title}</h3>
                <p className="text-sand-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-sand-900 mb-12 text-center">Meet Our Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-sand-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 mb-4">{member.position}</p>
                <p className="text-sand-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Achievements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-sand-900 mb-12 text-center">Our Achievements</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">5000+</div>
              <p className="text-sand-700">Happy Travelers</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">15+</div>
              <p className="text-sand-700">Years of Experience</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
              <p className="text-sand-700">Unique Experiences</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">4.9/5</div>
              <p className="text-sand-700">Average Rating</p>
            </div>
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
            Explore Our Experiences
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
