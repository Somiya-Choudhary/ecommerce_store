import { store } from "../store/store.js";

/**
 * Returns the list of available products.
 */
export const getProducts = (req, res, next) => {
  try {
    return res.status(200).json(store.products);
  } catch (err) {
    next(err);
  }
};
