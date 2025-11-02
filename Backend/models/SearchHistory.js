import mongoose from 'mongoose';

const searchHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  term: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries on user search history
searchHistorySchema.index({ userId: 1, timestamp: -1 });

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

export default SearchHistory;