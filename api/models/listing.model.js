import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    regularPrice: {
      type: Number,
      require: true,
    },
    discountedPrice: {
      type: Number,
      require: true,
    },
    bathrooms: {
      type: Number,
      require: true,
    },
    bedrooms: {
      type: Number,
      require: true,
    },
    furnished: {
      type: Boolean,
      require: true,
    },
    parking: {
      type: Boolean,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    offer: {
      type: String,
      require: true,
    },
    imageUrls: {
      type: [],
      require: true,
    },
    userRef: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
