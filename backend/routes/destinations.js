import express from 'express';
import { query } from '../config/db.js';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Mock weather helper
const getMockWeather = (destinationName) => {
  const weatherMap = {
    Netarhat: { temperature: '22°C', condition: 'Pleasant & Breezy', humidity: '55%', wind: '10 km/h' },
    'Bodh Gaya': { temperature: '28°C', condition: 'Sunny & Clear', humidity: '48%', wind: '8 km/h' },
    Darjeeling: { temperature: '16°C', condition: 'Misty & Cool', humidity: '75%', wind: '14 km/h' },
    Puri: { temperature: '29°C', condition: 'Humid & Coastal Breeze', humidity: '80%', wind: '20 km/h' },
    Udaipur: { temperature: '31°C', condition: 'Warm & Sunny', humidity: '40%', wind: '11 km/h' },
    Munnar: { temperature: '18°C', condition: 'Foggy & Crisp', humidity: '82%', wind: '9 km/h' },
    Hampi: { temperature: '33°C', condition: 'Clear Sky', humidity: '35%', wind: '12 km/h' },
    'Tirthan Valley': { temperature: '14°C', condition: 'Chilly & Fresh', humidity: '60%', wind: '6 km/h' }
  };

  return (
    weatherMap[destinationName] || {
      temperature: '25°C',
      condition: 'Partly Cloudy',
      humidity: '60%',
      wind: '12 km/h'
    }
  );
};

// GET /api/destinations/meta
router.get('/meta', async (req, res) => {
  try {
    const categories = await query.all('SELECT DISTINCT category FROM destinations ORDER BY category ASC');
    const states = await query.all('SELECT DISTINCT state FROM destinations ORDER BY state ASC');
    res.json({
      categories: categories.map((c) => c.category),
      states: states.map((s) => s.state)
    });
  } catch (err) {
    console.error('Fetch meta error:', err);
    res.status(500).json({ error: 'Failed to fetch categories and states' });
  }
});

// GET /api/destinations/user/saved
router.get('/user/saved', authMiddleware, async (req, res) => {
  try {
    const saved = await query.all(
      `SELECT d.* FROM destinations d
       JOIN saved_destinations sd ON d.id = sd.destination_id
       WHERE sd.user_id = ?
       ORDER BY sd.created_at DESC`,
      [req.user.id]
    );
    res.json({ saved });
  } catch (err) {
    console.error('Fetch saved destinations error:', err);
    res.status(500).json({ error: 'Failed to fetch saved places' });
  }
});

// GET /api/destinations
router.get('/', optionalAuthMiddleware, async (req, res) => {
  try {
    const { q, category, state, limit } = req.query;
    let sql = 'SELECT * FROM destinations WHERE 1=1';
    const params = [];

    if (q && q.trim()) {
      sql += ' AND (name LIKE ? OR state LIKE ? OR description LIKE ? OR category LIKE ?)';
      const term = `%${q.trim()}%`;
      params.push(term, term, term, term);
    }

    if (category && category.trim()) {
      sql += ' AND category = ?';
      params.push(category.trim());
    }

    if (state && state.trim()) {
      sql += ' AND state = ?';
      params.push(state.trim());
    }

    sql += ' ORDER BY rating DESC';

    if (limit && !isNaN(parseInt(limit))) {
      sql += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const destinations = await query.all(sql, params);

    // If user is authenticated, also check which ones are saved
    let savedIds = [];
    if (req.user) {
      const userSaved = await query.all(
        'SELECT destination_id FROM saved_destinations WHERE user_id = ?',
        [req.user.id]
      );
      savedIds = userSaved.map((s) => s.destination_id);
    }

    const enriched = destinations.map((d) => ({
      ...d,
      is_saved: savedIds.includes(d.id)
    }));

    res.json({ destinations: enriched });
  } catch (err) {
    console.error('Fetch destinations error:', err);
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
});

// GET /api/destinations/:id
router.get('/:id', optionalAuthMiddleware, async (req, res) => {
  try {
    const destination = await query.get('SELECT * FROM destinations WHERE id = ?', [req.params.id]);
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    let is_saved = false;
    if (req.user) {
      const saved = await query.get(
        'SELECT id FROM saved_destinations WHERE user_id = ? AND destination_id = ?',
        [req.user.id, destination.id]
      );
      is_saved = !!saved;
    }

    const weather = getMockWeather(destination.name);

    res.json({ destination: { ...destination, is_saved }, weather });
  } catch (err) {
    console.error('Fetch single destination error:', err);
    res.status(500).json({ error: 'Failed to fetch destination details' });
  }
});

// POST /api/destinations/:id/save (Toggle save/unsave)
router.post('/:id/save', authMiddleware, async (req, res) => {
  try {
    const destId = parseInt(req.params.id);
    const destination = await query.get('SELECT id, name FROM destinations WHERE id = ?', [destId]);
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    const existing = await query.get(
      'SELECT id FROM saved_destinations WHERE user_id = ? AND destination_id = ?',
      [req.user.id, destId]
    );

    if (existing) {
      await query.run('DELETE FROM saved_destinations WHERE id = ?', [existing.id]);
      return res.json({ saved: false, message: `${destination.name} removed from your saved list.` });
    } else {
      await query.run(
        'INSERT INTO saved_destinations (user_id, destination_id) VALUES (?, ?)',
        [req.user.id, destId]
      );
      return res.json({ saved: true, message: `${destination.name} saved to your profile!` });
    }
  } catch (err) {
    console.error('Save destination error:', err);
    res.status(500).json({ error: 'Failed to update saved destination' });
  }
});

export default router;
