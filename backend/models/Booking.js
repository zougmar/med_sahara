const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  // Keep tourPackage for backward compatibility
  tourPackage: {
    type: String,
    enum: ['Desert Safari', 'Camel Trekking', 'Luxury Camp', 'Berber Experience', 'Custom Package', 
            'Sunset Camel Trek', 'Luxury Desert Camp', 'Stargazing Night Tour', 'Nomadic Lifestyle Experience']
  },
  // New fields for experience details
  experienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience'
  },
  experienceTitle: {
    type: String,
    trim: true
  },
  experienceImage: {
    type: String,
    trim: true
  },
  // Date fields
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  // Keep date for backward compatibility
  date: {
    type: Date,
    required: true
  },
  numberOfPeople: {
    type: Number,
    required: true,
    min: 1
  },
  specialRequests: {
    type: String,
    trim: true
  },
  // Price fields
  totalPrice: {
    type: Number
  },
  // Keep totalAmount for backward compatibility
  totalAmount: {
    type: Number,
    required: true
  },
  // Extra options
  extraOptions: [{
    id: String,
    name: String,
    price: Number
  }],
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to update the updatedAt field
BookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('booking', BookingSchema);