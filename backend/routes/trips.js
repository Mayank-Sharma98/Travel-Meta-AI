import express from 'express';
import { query } from '../config/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All trip routes require authentication
router.use(authMiddleware);

// GET /api/trips
router.get('/', async (req, res) => {
  try {
    const trips = await query.all(
      'SELECT * FROM trips WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json({ trips });
  } catch (err) {
    console.error('Fetch trips error:', err);
    res.status(500).json({ error: 'Failed to fetch your planned trips' });
  }
});

// POST /api/trips
router.post('/', async (req, res) => {
  try {
    const { destination, days = 2, travelers = 1, budget = 5000, itinerary = '' } = req.body;

    if (!destination) {
      return res.status(400).json({ error: 'Destination is required' });
    }

    const result = await query.run(
      `INSERT INTO trips (user_id, destination, days, travelers, budget, itinerary)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [req.user.id, destination, parseInt(days), parseInt(travelers), parseInt(budget), itinerary]
    );

    const newTrip = await query.get('SELECT * FROM trips WHERE id = ?', [result.lastID]);
    res.status(201).json({ message: 'Trip saved successfully!', trip: newTrip });
  } catch (err) {
    console.error('Save trip error:', err);
    res.status(500).json({ error: 'Failed to save trip' });
  }
});

// DELETE /api/trips/:id
router.delete('/:id', async (req, res) => {
  try {
    const trip = await query.get('SELECT id FROM trips WHERE id = ? AND user_id = ?', [
      req.params.id,
      req.user.id
    ]);

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found or unauthorized' });
    }

    await query.run('DELETE FROM trips WHERE id = ?', [trip.id]);
    res.json({ message: 'Trip removed successfully' });
  } catch (err) {
    console.error('Delete trip error:', err);
    res.status(500).json({ error: 'Failed to delete trip' });
  }
});

export default router;
