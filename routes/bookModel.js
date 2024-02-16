const express = require("express");
const {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const route = express.Router();

route.get("/", getAllBooks);
route.get("/:id", getSingleBook);
route.post("/", createBook);
route.patch("/:id", updateBook);
route.delete("/:id", deleteBook);

module.exports = route;
