import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    carBrand: {
      type: String,
      required: true,
    },
    carModel: {
      type: String,
      required: true,
    },
    carMiles: {
      type: Number,
      required: true,
    },
    carColor: {
      type: String,
      required: true,
    },
    carModelYear: {
      type: Number,
      required: true,
    },
    carProductionYear: {
      type: Number,
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
    description: {
      type: String,
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
