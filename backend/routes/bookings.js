const express = require('express');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all bookings (protected route)
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, startDate, endDate } = req.query;

    // Build filter object
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    // Execute query with pagination
    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get total count for pagination
    const count = await Booking.countDocuments(filter);

    // Calculate statistics
    const stats = await Booking.aggregate([
      { $group: {
        _id: null,
        totalRevenue: { $sum: "$totalAmount" },
        totalBookings: { $sum: 1 },
        pendingBookings: {
          $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] }
        },
        confirmedBookings: {
          $sum: { $cond: [{ $eq: ["$status", "Confirmed"] }, 1, 0] }
        },
        completedBookings: {
          $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] }
        },
        cancelledBookings: {
          $sum: { $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0] }
        }
      }}
    ]);

    // Get package popularity
    const packageStats = await Booking.aggregate([
      { $group: {
        _id: "$tourPackage",
        count: { $sum: 1 }
      }},
      { $sort: { count: -1 } }
    ]);

    res.json({
      bookings,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalItems: count,
      stats: stats[0] || {},
      packageStats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single booking by ID (protected route)
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      tourPackage,
      date,
      numberOfPeople,
      specialRequests,
      totalAmount
    } = req.body;

    // Simple validation
    if (!name || !email || !phone || !tourPackage || !date || !numberOfPeople || !totalAmount) {
      return res.status(400).json({ message: 'Please include all required fields' });
    }

    // Create new booking
    const newBooking = new Booking({
      name,
      email,
      phone,
      tourPackage,
      date,
      numberOfPeople,
      specialRequests,
      totalAmount
    });

    // Save booking
    const booking = await newBooking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update booking status (protected route)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['Pending', 'Confirmed', 'Cancelled', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a booking (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.remove();
    res.json({ message: 'Booking removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;