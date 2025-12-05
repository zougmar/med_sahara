import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, MapPinIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const ExperienceCard = ({ experience }) => {
  const {
    _id,
    title,
    shortDescription,
    pricePerPerson,
    maxPeople,
    location,
    duration,
    type,
    rating,
    reviews,
    images,
    isPopular
  } = experience;

  // Generate star rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIconSolid key={i} className="h-4 w-4 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarIconSolid key="half" className="h-4 w-4 text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarIcon key={`empty-${i}`} className="h-4 w-4 text-yellow-400" />);
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={images && images.length > 0 ? images[0] : 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={title}
          className="w-full h-56 object-cover"
        />
        {isPopular && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            Popular
          </div>
        )}
        <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 text-sand-900 px-2 py-1 rounded-md text-sm font-semibold">
          ${pricePerPerson} / person
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-sand-900">{title}</h3>
          <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
            {type}
          </span>
        </div>

        <p className="text-sand-600 text-sm mb-3 line-clamp-2">{shortDescription}</p>

        <div className="flex items-center mb-3">
          <MapPinIcon className="h-4 w-4 text-sand-500 mr-1" />
          <span className="text-sand-600 text-sm">{location}</span>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 text-sand-500 mr-1" />
            <span className="text-sand-600 text-sm">{duration}</span>
          </div>
          <div className="flex items-center">
            <UserGroupIcon className="h-4 w-4 text-sand-500 mr-1" />
            <span className="text-sand-600 text-sm">Max {maxPeople} people</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              {renderStars()}
            </div>
            <span className="ml-1 text-sm text-sand-600">
              {rating} ({reviews} reviews)
            </span>
          </div>

          <div className="flex gap-2">
            <Link
              to={`/experience/${_id}`}
              className="bg-sand-100 hover:bg-sand-200 text-sand-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              View Details
            </Link>
            <Link
              to={`/booking?experienceId=${_id}`}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
