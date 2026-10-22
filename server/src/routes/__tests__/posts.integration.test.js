import { afterAll, beforeEach, expect, test } from "@jest/globals";
import request from "supertest";
import { app } from "../../app.js";
import { prisma } from "../../db/client.js";
import { resetDatabase } from "../../test-utils/fixtures.js";

beforeEach(async () => { await resetDatabase(); });
afterAll(async () => { await prisma.$disconnect(); });

test("full flow: register, publish, and browse a post", async () => {
  const registerRes = await request(app).post("/api/auth/register")
    .send({ email: "alice@example.com", displayName: "Alice", password: "correcthorse" });
  expect(registerRes.status).toBe(201);
  const { user, accessToken } = registerRes.body;

  const publishRes = await request(app).post("/api/posts").set("Authorization", `Bearer ${accessToken}`)
    .send({ authorId: user.id, title: "Hello, Inkwell", body: "My first real post." });
  expect(publishRes.status).toBe(201);

  const feedRes = await request(app).get("/api/posts?page=1");
  expect(feedRes.status).toBe(200);
  expect(feedRes.body.posts).toHaveLength(1);
  expect(feedRes.body.posts[0].title).toBe("Hello, Inkwell");
});

test("registering with a duplicate email fails end to end", async () => {
  await request(app).post("/api/auth/register")
    .send({ email: "alice@example.com", displayName: "Alice", password: "correcthorse" });
  const secondAttempt = await request(app).post("/api/auth/register")
    .send({ email: "alice@example.com", displayName: "Alice Two", password: "correcthorse" });
  expect(secondAttempt.status).toBe(400);
  expect(secondAttempt.body.error.code).toBe("EMAIL_ALREADY_REGISTERED");
});

test("a registered user can log in with the same credentials", async () => {
  const registration = await request(app).post("/api/auth/register")
    .send({ email: "login@example.com", displayName: "Login User", password: "correcthorse" });
  expect(registration.status).toBe(201);
  const login = await request(app).post("/api/auth/login")
    .send({ email: "login@example.com", password: "correcthorse" });
  expect(login.status).toBe(200);
  expect(login.body.user.email).toBe("login@example.com");
  expect(login.body.accessToken).toEqual(expect.any(String));
});
