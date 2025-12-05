import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import LoadingSpinner from '../components/LoadingSpinner';
import { listingsAPI } from '../services/api';

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const experienceId = new URLSearchParams(location.search).get('experienceId');
  console.log('BookingPage - location:', location);
  console.log('BookingPage - experienceId:', experienceId);

  const [bookingStep, setBookingStep] = useState(1);
  const [formData, setFormData] = useState({
    experience: experienceId || '',
    date: '',
    time: '',
    participants: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    paymentMethod: 'creditCard',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('BookingPage useEffect called with experienceId:', experienceId);
    if (experienceId) {
      setLoading(true);
      console.log('Fetching experience data...');
      listingsAPI.getById(experienceId)
        .then(response => {
          console.log('Experience data received:', response.data);
          // Set the experience as the only option
          setExperiences([response.data]);
          // Pre-select this experience in the form
          setFormData(prev => ({ ...prev, experience: experienceId }));
        })
        .catch(err => {
          console.error('Error fetching experience:', err);
          // Create a mock experience as fallback
          const mockExperience = {
            _id: experienceId,
            title: 'Sahara Adventure',
            name: 'Sahara Adventure',
            price: 100,
            pricePerPerson: 100,
            duration: 'Full day'
          };
          setExperiences([mockExperience]);
          setFormData(prev => ({ ...prev, experience: experienceId }));
          setLoading(false);
        })
        .finally(() => setLoading(false));
    } else {
      console.log('No experienceId provided');
      setLoading(false);
    }
  }, [experienceId]);

  const timeSlots = [
    '09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [errors, setErrors] = useState({});

  const validateStep = () => {
    const newErrors = {};

    if (bookingStep === 1) {
      if (!formData.experience) newErrors.experience = "Please select an experience";
      if (!formData.date) newErrors.date = "Please select a date";
      if (!formData.time) newErrors.time = "Please select a time";
    } else if (bookingStep === 2) {
      if (!formData.firstName) newErrors.firstName = "Please enter your first name";
      if (!formData.lastName) newErrors.lastName = "Please enter your last name";
      if (!formData.email) newErrors.email = "Please enter your email";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";
      if (!formData.phone) newErrors.phone = "Please enter your phone number";
    } else if (bookingStep === 3) {
      if (formData.paymentMethod === "creditCard") {
        if (!formData.cardName) newErrors.cardName = "Please enter name on card";
        if (!formData.cardNumber) newErrors.cardNumber = "Please enter your card number";
        else if (!/^[0-9\s]{13,19}$/.test(formData.cardNumber)) newErrors.cardNumber = "Please enter a valid card number";
        if (!formData.expiryDate) newErrors.expiryDate = "Please enter expiry date";
        else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = "Please enter a valid expiry date (MM/YY)";
        if (!formData.cvv) newErrors.cvv = "Please enter CVV";
        else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = "Please enter a valid CVV";
      }
      if (!termsAccepted) newErrors.terms = "Please accept terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep() && bookingStep < 3) setBookingStep(bookingStep + 1);
  };

  const handlePrevStep = () => {
    if (bookingStep > 1) setBookingStep(bookingStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log('BookingPage - formData being sent:', formData);
      // Navigate to payment page with booking data
      navigate('/payment', { state: { bookingData: formData } });
    }
  };

  const selectedExperience = experiences.length > 0 ? experiences[0] : null;
  const experiencePrice = selectedExperience ? (selectedExperience.price || selectedExperience.pricePerPerson) : 0;
  const totalPrice = experiencePrice * formData.participants;

  console.log('Loading state:', loading);
  console.log('Selected experience:', selectedExperience);
  console.log('Booking step:', bookingStep);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white overflow-hidden shadow-xl rounded-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-sand-700 to-primary-700 px-6 py-8 sm:px-8">
            <h1 className="text-3xl font-bold text-white">Book Your Sahara Adventure</h1>
            <p className="mt-2 text-sand-100">Complete form below to reserve your experience</p>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className={`flex items-center ${bookingStep >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                <span className={`flex items-center justify-center w-10 h-10 rounded-full ${bookingStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200'} mr-3`}>
                  {bookingStep > 1 ? <CheckIcon className="w-6 h-6" /> : '1'}
                </span>
                <span className="font-medium">Select Experience</span>
              </div>
              <div className={`flex items-center ${bookingStep >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                <span className={`flex items-center justify-center w-10 h-10 rounded-full ${bookingStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200'} mr-3`}>
                  {bookingStep > 2 ? <CheckIcon className="w-6 h-6" /> : '2'}
                </span>
                <span className="font-medium">Your Details</span>
              </div>
              <div className={`flex items-center ${bookingStep >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
                <span className={`flex items-center justify-center w-10 h-10 rounded-full ${bookingStep >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200'} mr-3`}>
                  {bookingStep > 3 ? <CheckIcon className="w-6 h-6" /> : '3'}
                </span>
                <span className="font-medium">Payment</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit}>
            {/* Step 1: Select Experience */}
            {bookingStep === 1 && (
              <div className="px-6 py-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Experience</h2>

                {selectedExperience && (
                  <div className="border rounded-lg p-4 border-primary-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <h3 className="font-medium text-gray-900">{selectedExperience.title || selectedExperience.name}</h3>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {selectedExperience.duration}
                          </p>
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-primary-600">${selectedExperience.price || selectedExperience.pricePerPerson}</div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-primary-500 focus:border-primary-500`}
                      required
                    />
                    {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.time ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-primary-500 focus:border-primary-500`}
                      required
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                    {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Participants
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, participants: Math.max(1, prev.participants - 1) }))}
                      className="bg-gray-200 text-gray-700 rounded-l-lg px-4 py-2 focus:outline-none"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="participants"
                      name="participants"
                      value={formData.participants}
                      onChange={handleInputChange}
                      min="1"
                      className="w-16 text-center border-t border-b border-gray-300 py-2 focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, participants: prev.participants + 1 }))}
                      className="bg-gray-200 text-gray-700 rounded-r-lg px-4 py-2 focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    disabled={bookingStep === 1}
                    onClick={handlePrevStep}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Personal Details */}
            {bookingStep === 2 && (
              <div className="px-6 py-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-primary-500 focus:border-primary-500`}
                      required
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-primary-500 focus:border-primary-500`}
                      required
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-primary-500 focus:border-primary-500`}
                      required
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-primary-500 focus:border-primary-500`}
                      required
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    rows="4"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  ></textarea>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {bookingStep === 3 && (
              <div className="px-6 py-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>

                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      id="creditCard"
                      name="paymentMethod"
                      value="creditCard"
                      checked={formData.paymentMethod === 'creditCard'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <label htmlFor="creditCard" className="ml-2 block text-sm font-medium text-gray-700">
                      Credit Card
                    </label>
                  </div>

                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <label htmlFor="paypal" className="ml-2 block text-sm font-medium text-gray-700">
                      PayPal
                    </label>
                  </div>

                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      id="bankTransfer"
                      name="paymentMethod"
                      value="bankTransfer"
                      checked={formData.paymentMethod === 'bankTransfer'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <label htmlFor="bankTransfer" className="ml-2 block text-sm font-medium text-gray-700">
                      Bank Transfer
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === 'creditCard' && (
                  <div className="mb-6">
                    <div className="mb-4">
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-primary-500 focus:border-primary-500`}
                        required
                      />
                      {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-4 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-primary-500 focus:border-primary-500`}
                        required
                      />
                      {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className={`w-full px-4 py-2 border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-primary-500 focus:border-primary-500`}
                          required
                        />
                        {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
                      </div>

                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className={`w-full px-4 py-2 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-primary-500 focus:border-primary-500`}
                          required
                        />
                        {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'paypal' && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      You will be redirected to PayPal to complete your payment after confirming your booking.
                    </p>
                  </div>
                )}

                {formData.paymentMethod === 'bankTransfer' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      You will receive bank transfer instructions after confirming your booking.
                    </p>
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      checked={termsAccepted}
                      onChange={() => setTermsAccepted(!termsAccepted)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                      I agree to the <a href="#terms" className="text-primary-600 hover:text-primary-800">Terms and Conditions</a> and <a href="#privacy" className="text-primary-600 hover:text-primary-800">Privacy Policy</a>
                    </label>
                  </div>
                  {errors.terms && <p className="mt-1 text-sm text-red-600">{errors.terms}</p>}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Experience Price ({formData.participants} × ${experiencePrice})</span>
                    <span className="font-medium">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-medium">$10</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-bold text-lg text-primary-600">${totalPrice + 10}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
