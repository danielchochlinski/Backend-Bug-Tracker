// // const request = require('supertest');
// // const app = require('./app');
// // const jwt = require('jsonwebtoken');
// import request from "supertest";
// import { app } from "../server";
// import jwt from "jsonwebtoken";
// import { clearDB, closeDB, connectDB } from "../config/test/dbTest";
// beforeAll(async () => await connectDB());

// afterEach(async () => await closeDB());

// afterAll(async () => await clearDB());
// describe("Test projects route with auth middleware", () => {
//   it("should return user profile", async () => {
//     const user = { id: 1, name: "Test User" };
//     const token = jwt.sign({ user }, "secret");
//     const authHeader = `Bearer ${token}`;

//     const response = await request(app)
//       .get("/api/projects/get-projects")
//       .set("Authorization", authHeader);

//     expect(response.status).toBe(200);
//     expect(response.body.user).toEqual(user);
//   });

//   it("should return authentication failed", async () => {
//     const response = await request(app).get("/api/projects/get-projects");
//     expect(response.status).toBe(401);
//     expect(response.body).toEqual({ message: "Authentication failed" });
//   });
// });
