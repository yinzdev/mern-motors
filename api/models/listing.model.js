import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    modelYear: {
      type: Number,
      required: true,
    },
    productionYear: {
      type: Number,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    miles: {
      type: Number,
      required: true,
    },
    imgUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
