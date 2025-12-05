import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, MapPinIcon, UserGroupIcon, ClockIcon, HeartIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';

const NewExperienceCard = ({ experience }) => {
  const [isLiked, setIsLiked] = useState(false);
  
  // Return early if experience is not valid
  if (!experience || typeof experience !== 'object') {
    return <div className="card">Invalid experience data</div>;
  }

  const {
    _id = '',
    title = 'Experience',
    shortDescription = '',
    pricePerPerson = 0,
    maxPeople = 1,
    location = 'Unknown',
    duration = '1 day',
    type = 'Adventure',
    rating = 0,
    reviews = 0,
    images = [],
    isPopular = false,
    ...rest
  } = experience || {};

  // Generate star rating
  const renderStars = () => {
    const stars = [];
    // Return empty array if rating is not a valid number
    if (typeof rating !== 'number' || isNaN(rating) || rating <= 0) {
      return stars;
    }
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

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="card card-hover group">
      <div className="relative overflow-hidden">
        <img
          src={images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/experience/400/300.jpg'}
          alt={title || 'Experience Image'}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isPopular && (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              Popular
            </div>
          )}
          <div className="bg-white/90 backdrop-blur-sm text-sand-900 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {type}
          </div>
        </div>

        {/* Like button */}
        <button 
          onClick={toggleLike}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          {isLiked ? (
            <HeartIconSolid className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>

        {/* Price badge */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-sand-900 px-3 py-1 rounded-md text-sm font-semibold shadow-lg">
          ${pricePerPerson} <span className="text-xs">/ person</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold card-title font-serif">{title}</h3>
        </div>

        <p className="card-text text-sm mb-4 line-clamp-2">{shortDescription}</p>

        <div className="flex items-center mb-4 card-meta">
          <MapPinIcon className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center card-meta">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span className="text-sm">{duration}</span>
          </div>
          <div className="flex items-center card-meta">
            <UserGroupIcon className="h-4 w-4 mr-1" />
            <span className="text-sm">Max {maxPeople} people</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center">
            <div className="flex items-center">
              {renderStars()}
            </div>
            <span className="ml-2 text-sm card-meta">
              {rating} ({reviews} reviews)
            </span>
          </div>

          <div className="flex gap-2">
            <Link
              to={`/experience/${_id || '1'}`}
              className="bg-sand-100 hover:bg-sand-200 text-sand-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-lg"
            >
              View Details
            </Link>
            <Link
              to={`/booking?experienceId=${_id || '1'}`}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-lg"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewExperienceCard;
