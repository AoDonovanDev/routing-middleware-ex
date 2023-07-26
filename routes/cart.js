const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError.js")
const cart = require("../fakeDb")

router.get("/", function (req, res) {
  res.json({ cart })
})

router.post("/", function (req, res, next) {
    try {
      if (!req.body.name || !req.body.price) throw new ExpressError("Name and price is required", 400);
      const newItem = { name: req.body.name, price: req.body.price }
      cart.push(newItem)
      return res.status(201).json({ item: newItem, })
    } catch (e) {
      return next(e)
    }
})

router.get("/:name", function (req, res) {
  const foundItem = cart.find(item => item.name === req.params.name)
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404)
  }
  res.json({ item: foundItem })
})

router.patch("/:name", function (req, res) {
  const foundItem = cart.find(item => item.name === req.params.name)
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404)
  }
  foundItem.name = req.body.name
  foundItem.price = req.body.price
  res.json({ item: foundItem })
})

router.delete("/:name", function (req, res) {
  const foundItem = cart.find(item => item.name === req.params.name)
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404)
  }
  cart.splice(foundItem, 1)
  res.json({ message: "Deleted" })
})

module.exports = router;