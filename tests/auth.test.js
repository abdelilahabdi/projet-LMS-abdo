// ============================================================
// TESTS — AUTHENTIFICATION
// ============================================================

import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";

// --- Variables de test ---
let userId = "";
let token = "";
const testEmail = `auth_${Date.now()}@test.com`;

// --- Connexion à MongoDB ---
beforeAll(async () => {
  await mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/lms",
  );
});

describe("Authentification", () => {
  test("Inscription réussie", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Testeur Auth",
      email: testEmail,
      password: "MotDePasse123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe(testEmail);

    userId = res.body.user.id;
  });

  test("Connexion réussie", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testEmail,
      password: "MotDePasse123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");

    token = res.body.token;
  });

  test("GET /me returns the logged-in user's profile without a password", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toEqual({
      id: userId,
      name: "Testeur Auth",
      email: testEmail,
      role: "learner",
    });
    expect(res.body.user).not.toHaveProperty("password");
  });

  test("GET /me rejects a request without a token", async () => {
    const res = await request(app).get("/api/auth/me");

    expect(res.statusCode).toBe(401);
    expect(res.body).not.toHaveProperty("user");
  });

  test("GET /me rejects an invalid token", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", "Bearer invalid-token");

    expect(res.statusCode).toBe(401);
    expect(res.body).not.toHaveProperty("user");
  });

  test("Connexion refusée avec mauvais mot de passe", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testEmail,
      password: "Mauvais",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid credentials.");
  });
});

// --- Nettoyage ---
afterAll(async () => {
  if (userId) {
    await mongoose.model("User").findByIdAndDelete(userId);
  }
  await mongoose.connection.close();
});
