const Book = require("../models/bookModels");
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ createdBy: req.user.userId }).sort(
      "createdAt"
    );
    if (!books) {
      return res.status(404).send({ msg: "No books have been found" });
    }
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
const getSingleBook = async (req, res) => {
  try {
    const books = await Book.findOne({
      _id: req.params.id,
      createdBy: req.user.userId,
    });
    if (!books) {
      return res.status(404).send({ msg: "No books have been found" });
    }
    return res.status(200).json({ books });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
const createBook = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields !",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
      createdBy: req.user.userId,
    };
    const book = await Book.create(newBook);
    return res.status(201).send({ book });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
const updateBook = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.userId,
      },
      req.body
    );
    if (!book) {
      return res.status(404).json({ message: "No books have been found" });
    }
    return res.status(201).json({ book });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId,
    });
    if (!book) {
      return res.status(404).send({ message: "No books have been found" });
    }
    return res.status(201).send({ message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getSingleBook,
};
