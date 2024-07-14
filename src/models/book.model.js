import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Book = mongoose.model('Book', BookSchema);
export default Book;
