import request from "supertest";
import app from "../../utils/app";
import User from "../../models/User";
import { hashPassword } from "../../utils/hash";

beforeAll(async () => {
    await User.sync({ force: true }); // reset tabel
    await User.create({
      username: "admin",
      email: "admin@mail.com",
      password: await hashPassword("123456"),
    });
  });

describe("Auth API", () => {
  it("should return 400 if login with invalid data", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .set("Content-Type", "application/json") // tambahin ini
      .send({
        email: "",
        password: "",
      });

    expect(res.status).toBe(400);
  });

  it("should return token if login success", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .set("Content-Type", "application/json") // tambahin ini
      .send({
        email: "admin@mail.com",
        password: "123456",
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
