import React, { useState, useEffect } from 'react';
import { bookingsAPI } from '../services/api';

const BookingForm = ({ experienceId, experiencePrice, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    numberOfPeople: 1,
    specialRequests: ''
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = "Please enter your full name";
    if (!formData.email) {
      newErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone) newErrors.phone = "Please enter your phone number";
    if (!formData.date) newErrors.date = "Please select a booking date";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    // Calculate total price when number of people changes
    setTotalPrice(experiencePrice * formData.numberOfPeople);
  }, [formData.numberOfPeople, experiencePrice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');

    try {
      const bookingData = {
        ...formData,
        listing: experienceId,
        totalAmount: Number(totalPrice),
        numberOfPeople: Number(formData.numberOfPeople),
        date: formData.date
      };

      console.log('Sending booking data:', bookingData);
      await bookingsAPI.create(bookingData);
      setSuccess(true);
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">Booking Successful!</h3>
        <p className="text-green-700 mb-4">
          Thank you for your booking. We will contact you shortly to confirm your adventure.
        </p>
        <button
          onClick={() => {
            setSuccess(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              date: '',
              numberOfPeople: 1,
              specialRequests: ''
            });
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Book Another Experience
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-sand-900 mb-4">Book This Experience</h3>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-sand-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-sand-300'} rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-sand-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-sand-300'} rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-sand-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-sand-300'} rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-sand-700 mb-1">
              Booking Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-3 py-2 border ${errors.date ? 'border-red-500' : 'border-sand-300'} rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
            />
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="numberOfPeople" className="block text-sm font-medium text-sand-700 mb-1">
            Number of People *
          </label>
          <select
            id="numberOfPeople"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-sand-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="specialRequests" className="block text-sm font-medium text-sand-700 mb-1">
            Special Requests (Optional)
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-sand-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="bg-sand-50 rounded-lg p-4 mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sand-700">Price per person:</span>
            <span className="font-medium">${experiencePrice}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sand-700">Number of people:</span>
            <span className="font-medium">{formData.numberOfPeople}</span>
          </div>
          <div className="border-t border-sand-200 pt-2 mt-2">
            <div className="flex justify-between">
              <span className="text-lg font-semibold text-sand-900">Total Price:</span>
              <span className="text-lg font-semibold text-sand-900">${totalPrice}</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md disabled:bg-primary-300 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Processing...' : 'Book Now'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
