const express = require("express");
const mongoose = require("mongoose");
const { PORT, MONGO_URI } = require("./config.js");
const bookRoute = require("./routes/bookModel.js");
const userRoute = require("./routes/authRoutes.js");
const authenticationMiddleware = require("./middleware/authMiddelware.js");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin:'http://localhost:3000',
//     methodsL:['GET','POST','PATCH','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }))

app.use("/books", authenticationMiddleware, bookRoute);
app.use("/", userRoute);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Successfully connected");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
