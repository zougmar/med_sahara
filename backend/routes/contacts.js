const express = require('express');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all contacts (protected route)
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Simple validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please include name, email, and message' });
    }

    // Create new contact
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
      date: new Date()
    });

    // Save contact
    const contact = await newContact.save();
    res.status(201).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a contact (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await contact.remove();
    res.json({ message: 'Contact removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;