import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Anúncio não encontrado!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(
      errorHandler(401, 'Você só pode deletar seus próprios anúncios!'),
    );
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('O anúncio foi deletado!');
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Anúncio não encontrado!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const searchTermIsNumber =
      !isNaN(parseFloat(searchTerm)) && isFinite(searchTerm);

    let query = {};

    if (searchTermIsNumber) {
      query = {
        $or: [
          { carModelYear: parseInt(searchTerm) },
          { carProductionYear: parseInt(searchTerm) },
          { price: parseInt(searchTerm) },
        ],
      };
    } else {
      const searchTermRegex = new RegExp(searchTerm, 'i');
      query = {
        $or: [
          { carBrand: { $regex: searchTermRegex } },
          { carModel: { $regex: searchTermRegex } },
          { carColor: { $regex: searchTermRegex } },
          { location: { $regex: searchTermRegex } },
        ],
      };
    }

    const listings = await Listing.find(query)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
