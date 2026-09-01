import express from 'express';
import { query } from '../config/db.js';

const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields (name, email, subject, message) are required.' });
    }

    await query.run(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name.trim(), email.trim().toLowerCase(), subject.trim(), message.trim()]
    );

    res.status(201).json({ message: 'Thank you! We will get back to you soon.' });
  } catch (err) {
    console.error('Contact submission error:', err);
    res.status(500).json({ error: 'Failed to submit message' });
  }
});

export default router;
