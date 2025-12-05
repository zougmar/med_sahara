import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listingsAPI } from '../services/api';
import BookingForm from '../components/BookingForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  MapPinIcon, 
  UserGroupIcon, 
  ClockIcon,
  StarIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const ExperienceDetailsPage = () => {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await listingsAPI.getById(id);
        setExperience(response.data);
      } catch (err) {
        setError('Failed to load experience details');
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  const handleNextImage = () => {
    if (experience && experience.images) {
      setCurrentImageIndex((prev) => (prev + 1) % experience.images.length);
    }
  };

  const handlePrevImage = () => {
    if (experience && experience.images) {
      setCurrentImageIndex((prev) => (prev - 1 + experience.images.length) % experience.images.length);
    }
  };

  const renderStars = () => {
    if (!experience) return null;

    const stars = [];
    const fullStars = Math.floor(experience.rating);
    const hasHalfStar = experience.rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIconSolid key={i} className="h-5 w-5 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarIconSolid key="half" className="h-5 w-5 text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(experience.rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarIcon key={`empty-${i}`} className="h-5 w-5 text-yellow-400" />);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded max-w-md">
          {error || 'Experience not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Image Gallery */}
      <div className="relative h-96 md:h-[500px]">
        {experience.images && experience.images.length > 0 ? (
          <>
            <img
              src={experience.images[currentImageIndex]}
              alt={experience.title}
              className="w-full h-full object-cover"
            />

            {/* Image Navigation */}
            {experience.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {experience.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-sand-200 flex items-center justify-center">
            <span className="text-sand-500">No images available</span>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Title and Rating */}
            <div className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-bold text-sand-900">{experience.title}</h1>
                <span className="bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
                  {experience.type}
                </span>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {renderStars()}
                </div>
                <span className="ml-2 text-sand-600">
                  {experience.rating} ({experience.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <MapPinIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm text-sand-600">Location</p>
                <p className="font-semibold text-sand-900">{experience.location}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <ClockIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm text-sand-600">Duration</p>
                <p className="font-semibold text-sand-900">{experience.duration}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <UserGroupIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm text-sand-600">Max Group Size</p>
                <p className="font-semibold text-sand-900">{experience.maxPeople} people</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-xl font-semibold text-sand-900 mb-4">About This Experience</h2>
              <p className="text-sand-700 whitespace-pre-line">{experience.fullDescription}</p>
            </div>

            {/* What's Included */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-xl font-semibold text-sand-900 mb-4">What's Included</h2>
              <ul className="space-y-2">
                {experience.included.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sand-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What to Bring */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-xl font-semibold text-sand-900 mb-4">What to Bring</h2>
              <ul className="space-y-2">
                {experience.whatToBring.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <XMarkIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sand-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Extra Options */}
            {experience.extras && experience.extras.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h2 className="text-xl font-semibold text-sand-900 mb-4">Extra Options</h2>
                <div className="space-y-3">
                  {experience.extras.map((extra) => (
                    <div key={extra.id} className="flex justify-between items-center p-3 border border-sand-200 rounded-md">
                      <div>
                        <h3 className="font-medium text-sand-900">{extra.name}</h3>
                        <p className="text-sm text-sand-600">
                          ${extra.price} {extra.perPerson ? 'per person' : 'total'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
              <div className="mb-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sand-600">Price per person</span>
                  <span className="text-2xl font-bold text-sand-900">${experience.price}</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-sand-600 mb-2">
                  Available from {new Date(experience.startDate).toLocaleDateString()} to {new Date(experience.endDate).toLocaleDateString()}
                </p>
              </div>

              <Link
                to={`/booking?experienceId=${experience.id}`}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-md transition-colors mb-4 text-center block"
              >
                Book Now
              </Link>

              <Link
                to="/contact"
                className="block w-full text-center bg-sand-100 hover:bg-sand-200 text-sand-700 font-medium py-3 px-4 rounded-md transition-colors"
              >
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-sand-200">
              <h2 className="text-xl font-semibold text-sand-900">Book Your Experience</h2>
              <button
                onClick={() => setShowBookingForm(false)}
                className="text-sand-400 hover:text-sand-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <BookingForm 
                experienceId={experience._id}
                experiencePrice={experience.pricePerPerson}
                onSuccess={() => setShowBookingForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceDetailsPage;
