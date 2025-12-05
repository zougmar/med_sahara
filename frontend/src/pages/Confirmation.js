import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const Confirmation = () => {
  return (
    <div className="min-h-screen bg-sand-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircleIcon className="h-16 w-16 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-sand-900 mb-2">Booking Confirmed!</h1>
        <p className="text-sand-600 mb-6">
          Thank you for booking with Sahara Adventures. We've received your reservation and will send 
          a confirmation email shortly.
        </p>

        <div className="bg-sand-50 rounded-lg p-4 mb-6 text-left">
          <h2 className="font-semibold text-sand-900 mb-2">What happens next?</h2>
          <ul className="space-y-2 text-sm text-sand-700">
            <li className="flex items-start">
              <span className="font-medium mr-2">1.</span>
              <span>You'll receive a confirmation email with your booking details</span>
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">2.</span>
              <span>Our team will contact you within 24 hours to confirm availability</span>
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">3.</span>
              <span>Payment details will be provided once availability is confirmed</span>
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">4.</span>
              <span>Final trip details and meeting point will be sent closer to your travel date</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link
            to="/experiences"
            className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Explore More Experiences
          </Link>

          <Link
            to="/contact"
            className="block w-full bg-sand-100 hover:bg-sand-200 text-sand-700 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
