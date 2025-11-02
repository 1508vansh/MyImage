import express from 'express';
import axios from 'axios';
import SearchHistory from '../models/SearchHistory.js';

const router = express.Router();

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Authentication required' });
};

// Search images
router.post('/search', requireAuth, async (req, res) => {
  try {
    const { term } = req.body;
    
    if (!term) {
      return res.status(400).json({ error: 'Search term is required' });
    }

    // Save search history
    await SearchHistory.create({
      userId: req.user._id,
      term: term.toLowerCase()
    });

    // Call Unsplash API
    const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: term,
        per_page: 30,
        client_id: UNSPLASH_ACCESS_KEY
      }
    });

    const images = response.data.results.map(img => ({
      id: img.id,
      url: img.urls.regular,
      thumb: img.urls.thumb,
      alt: img.alt_description || 'Unsplash Image',
      photographer: img.user.name,
      photographerUrl: img.user.links.html
    }));

    res.json({
      term,
      total: response.data.total,
      images
    });

  } catch (error) {
    console.error('Search error:', error);
    
    if (error.response?.status === 401) {
      return res.status(500).json({ error: 'Unsplash API configuration error' });
    }
    
    res.status(500).json({ error: 'Search failed. Please try again.' });
  }
});

// Get top searches across all users
router.get('/top-searches', async (req, res) => {
  try {
    const topSearches = await SearchHistory.aggregate([
      {
        $group: {
          _id: '$term',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $project: {
          term: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    res.json(topSearches);
  } catch (error) {
    console.error('Top searches error:', error);
    res.status(500).json({ error: 'Failed to fetch top searches' });
  }
});

export default router;