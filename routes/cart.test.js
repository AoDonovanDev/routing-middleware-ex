process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let cart = require("../fakeDb");


let pickles = { 
    name: "Pickles",
    price: 3
    };

beforeEach(function () {
  cart.push(pickles);
});

afterEach(function () {
  // make sure this *mutates*, not redefines, `cart`
  cart.length = 0;
});

describe("GET /cart", () => {
  test("Get all cart", async () => {
    const res = await request(app).get("/cart");
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ cart: [pickles] })
  })
})

describe("GET /cart/:name", () => {
  test("Get item by name", async () => {
    const res = await request(app).get(`/cart/${pickles.name}`);
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ item: pickles })
  })
  test("Responds with 404 for invalid item", async () => {
    const res = await request(app).get(`/cart/icecube`);
    expect(res.statusCode).toBe(404)
  })
})

describe("POST /cart", () => {
  test("Creating an item", async () => {
    const res = await request(app).post("/cart").send({ name: "Blue", price: 2 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ item: { name: "Blue", price: 2 } });
  })
  test("Responds with 400 if name is missing", async () => {
    const res = await request(app).post("/cart").send({});
    expect(res.statusCode).toBe(400);
  })
})

describe("/PATCH /cart/:name", () => {
  test("Updating a item's name", async () => {
    const res = await request(app).patch(`/cart/${pickles.name}`).send({ name: "Monster", price: 3.5 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: { name: "Monster", price: 3.5 } });
  })
  test("Responds with 404 for invalid name", async () => {
    const res = await request(app).patch(`/cart/Piggles`).send({ name: "Monster", price: 3.5 });
    expect(res.statusCode).toBe(404);
  })
})

describe("/DELETE /cart/:name", () => {
  test("Deleting a item", async () => {
    const res = await request(app).delete(`/cart/${pickles.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Deleted' })
  })
  test("Responds with 404 for deleting invalid item", async () => {
    const res = await request(app).delete(`/cart/hamface`);
    expect(res.statusCode).toBe(404);
  })
})
