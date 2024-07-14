import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import {
  addBook,
  getBooks,
  getBookById,
  likeBook,
  unlikeBook,
} from '../controllers/bookController.js';

const router = express.Router();

router.route('/').post(protect, addBook).get(getBooks);
router.route('/:id').get(getBookById);
router.route('/:id/like').post(protect, likeBook);
router.route('/:id/unlike').post(protect, unlikeBook);

// module.exports = router;

export default router;