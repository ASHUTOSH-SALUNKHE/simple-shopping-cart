import request from "supertest";
import app from "./index.js";

describe("POST /api/checkProducts", () => {
  it("should check out successfully with valid data", async () => {
    const res = await request(app)
      .post("/api/checkProducts")
      .send({ id: 101, quantity: 3 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "Checked Out successfully");
    expect(res.body).toHaveProperty("id", 101);
    expect(res.body).toHaveProperty("quantity", 3);
  });

  it("should return error for invalid data", async () => {
    const res = await request(app)
      .post("/api/checkProducts")
      .send({ id: null });

    
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message");
  });
});

describe("GET /api/getProducts", () => {
  it("should return a list of products", async () => {
    const res = await request(app).get("/api/getProducts");

   
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
