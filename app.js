const express = require("express")
const app = express();
const cartRoutes = require("./routes/cart")
const ExpressError = require("./expressError.js")

app.use(express.json());
app.use("/cart", cartRoutes);
app.use(express.static('static'));

/** 404 handler */

app.use(function (req, res, next) {
  return new ExpressError("Not Found", 404);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

module.exports = app;