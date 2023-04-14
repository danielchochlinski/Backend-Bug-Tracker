import { Request, Response } from "express";
import { User } from "../../models/userModel";
import { registerUser } from "../../controllers/authController";
import { generateToken } from "../../controllers/authController";
import bcrypt from "bcryptjs";

import supertest from "supertest";
import { app } from "../../server";
// import request from "supertest";
jest.useRealTimers();

describe("registerUser", () => {
  it("returns a success response when registering a new user", async () => {
    const user = {
      name: "John",
      surname: "Doe",
      email: "johndoe@example.com",
      password: "password123",
    };
    const emailToken = crypto.randomUUID();

    const response = await supertest(app).post("/api/user/register").send(user);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("Success");
    expect(response.body.data.user.name).toBe(user.name);
    expect(response.body.data.user.surname).toBe(user.surname);
    expect(response.body.data.user.email).toBe(user.email);
    expect(response.body.data.token).toBeDefined();
  });

  it("returns an error response when trying to register an existing user", async () => {
    const existingUser = {
      name: "Jane",
      surname: "Doe",
      email: "janedoe@example.com",
      password: "password123",
    };
    await supertest(app).post("user/register").send(existingUser);

    const response = await supertest(app)
      .post("/api/user/register")
      .send(existingUser);
    expect(response.status).toBe(400);
    expect(response.body.status).toBe("Failed");
    expect(response.body.message).toBe("User already exists");
  });

  it("returns an error response when missing required fields", async () => {
    const incompleteUser = {
      name: "John",
      surname: "Doe",
      password: "password123",
    };
    const response = await supertest(app)
      .post("/api/user/register")
      .send(incompleteUser);
    expect(response.status).toBe(400);
    expect(response.body.status).toBe("fail");
  });
});
