import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CreditCardIcon, LockClosedIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

const PaymentPage = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData || {};
  console.log('PaymentPage - bookingData:', bookingData);

  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const experiencePrice = bookingData.experience?.price || bookingData.experience?.pricePerPerson || 0;
  const participants = bookingData.participants || 1;
  const subtotal = experiencePrice * participants;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const value = formatCardNumber(e.target.value);
    setCardDetails(prev => ({
      ...prev,
      cardNumber: value
    }));
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setCardDetails(prev => ({
      ...prev,
      expiryDate: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
    }, 3000);
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckIcon className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your booking has been confirmed. We've sent a confirmation email with all the details.</p>
          <Link 
            to="/" 
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white overflow-hidden shadow-xl rounded-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-sand-700 to-primary-700 px-6 py-8 sm:px-8">
            <h1 className="text-3xl font-bold text-white">Complete Your Payment</h1>
            <p className="mt-2 text-sand-100">Secure payment processing</p>
          </div>

          <div className="px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Booking Summary */}
              <div className="md:col-span-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900">{bookingData.experience?.name || 'Sahara Experience'}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {bookingData.date ? new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Date not selected'}
                    </p>
                    <p className="text-sm text-gray-500">{bookingData.time || 'Time not selected'}</p>
                    <p className="text-sm text-gray-500 mt-2">{participants} {participants === 1 ? 'Participant' : 'Participants'}</p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Tax (10%)</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-bold text-primary-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center text-sm text-gray-600">
                  <ShieldCheckIcon className="w-5 h-5 mr-2 text-green-500" />
                  <span>Your payment is secure and encrypted</span>
                </div>
              </div>

              {/* Payment Form */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('creditCard')}
                      className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                        paymentMethod === 'creditCard' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <CreditCardIcon className="w-8 h-8 mb-2 text-gray-700" />
                      <span className="text-sm font-medium">Credit Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                        paymentMethod === 'paypal' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="w-8 h-8 mb-2 flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-xl">P</span>
                      </div>
                      <span className="text-sm font-medium">PayPal</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bankTransfer')}
                      className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                        paymentMethod === 'bankTransfer' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="w-8 h-8 mb-2 flex items-center justify-center">
                        <span className="text-green-600 font-bold text-xl">B</span>
                      </div>
                      <span className="text-sm font-medium">Bank Transfer</span>
                    </button>
                  </div>
                </div>

                {/* Credit Card Form */}
                {paymentMethod === 'creditCard' && (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={cardDetails.cardName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={cardDetails.expiryDate}
                          onChange={handleExpiryDateChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength="4"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="saveCard"
                          checked={cardDetails.saveCard}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Save this card for future bookings</span>
                      </label>
                    </div>

                    <div className="flex justify-between items-center">
                      <Link to="/booking" className="text-primary-600 hover:text-primary-700 font-medium">
                        Return to Booking
                      </Link>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
                      >
                        {isProcessing ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <LockClosedIcon className="w-5 h-5 mr-2" />
                            Pay ${total.toFixed(2)}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* PayPal Form */}
                {paymentMethod === 'paypal' && (
                  <div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-center">
                      <p className="text-gray-700 mb-4">You will be redirected to PayPal to complete your payment.</p>
                      <p className="text-sm text-gray-600">Total amount: <span className="font-bold text-lg">${total.toFixed(2)}</span></p>
                    </div>
                    <div className="flex justify-between items-center">
                      <Link to="/booking" className="text-primary-600 hover:text-primary-700 font-medium">
                        Return to Booking
                      </Link>
                      <button
                        onClick={() => alert('Redirect to PayPal')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                      >
                        Continue to PayPal
                      </button>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Form */}
                {paymentMethod === 'bankTransfer' && (
                  <div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">Bank Transfer Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bank Name:</span>
                          <span className="font-medium">Sahara Adventures Bank</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Account Name:</span>
                          <span className="font-medium">Sahara Adventures Ltd</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Account Number:</span>
                          <span className="font-medium">1234567890</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Routing Number:</span>
                          <span className="font-medium">987654321</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reference:</span>
                          <span className="font-medium">SAHARA-{Date.now().toString().slice(-6)}</span>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-gray-600">Please include the reference number in your transfer. Your booking will be confirmed once the payment is received.</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <Link to="/booking" className="text-primary-600 hover:text-primary-700 font-medium">
                        Return to Booking
                      </Link>
                      <button
                        onClick={() => alert('Bank transfer instructions sent to your email')}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                      >
                        Confirm Bank Transfer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
