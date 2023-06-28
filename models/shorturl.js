// Import the Mongoose library
const mongoose = require('mongoose')

// Import the ShortId library
const shortId = require('shortid')

// Define the schema for the ShortUrl model
const shortUrlSchema = new mongoose.Schema({
  // The full URL that the short URL will redirect to
  full: {
    type: String,
    required: true
  },
  // The short URL that will be generated
  short: {
    type: String,
    required: true,
    default: shortId.generate
  },
  // The number of times the short URL has been clicked
  clicks: {
    type: Number,
    required: true,
    default: 0
  },
  // A note associated with the short URL (optional)
  note: {
    type: String,
    unique: true,
    sparse: true
  }
})

// Export the ShortUrl model
module.exports = mongoose.model('ShortUrl', shortUrlSchema)