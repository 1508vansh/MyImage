import express from 'express';
import SearchHistory from '../models/SearchHistory.js';

const router = express.Router();

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Authentication required' });
};

// Get user's search history
router.get('/history', requireAuth, async (req, res) => {
  try {
    const history = await SearchHistory.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(20)
      .select('term timestamp')
      .lean();

    res.json(history);
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch search history' });
  }
});

export default router;