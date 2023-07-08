const express = require("express");
const path = require("path");
const logger = require("morgan");
const createError = require("http-errors");
const indexRouter = require("./routes/index");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "assets")));

app.use("/", indexRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.status(err.status || 500);
  res.render("error");
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
