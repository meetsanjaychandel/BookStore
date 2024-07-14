import { asynchandler } from "../utils/Asynchandler.js";
import Book from "../models/book.model.js"

export const addBook = async (req, res) => {
    const { title, author, publicationDate } = req.body;
  
    const book = new Book({
      title,
      author,
      publicationDate,
    });
  
    const createdBook = await book.save();
    res.status(201).json(createdBook);
  };

export const getBooks = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

const count= await Book.countDocuments();
const books = await Book.find()
.limit(pageSize)
.skip(pageSize*(page-1));

  res.json({ books, page, totalPages: Math.ceil(count / pageSize) });
};

export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

export const likeBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  console.log(book);
  if (book) {
    book.likes += 1;
    await book.save();
    res.json({ likes: book.likes });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

export const unlikeBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book && book.likes > 0) {
    book.likes -= 1;
    await book.save();
    res.json({ likes: book.likes });
  } else {
    res.status(404).json({ message: 'Book not found or no likes to remove' });
  }
};

