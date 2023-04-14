import request from "supertest";
import { app } from "../server";
import { clearDB, closeDB, connectDB } from "../config/test/dbTest";

const agent = request.agent(app);

beforeAll(async () => await connectDB());

afterEach(async () => {
  await closeDB();
});

afterAll(async () => await clearDB());
describe("tags", () => {
  describe("POST /tags", () => {
    test("successful", async () => {
      const res = await agent.get("/api/test/get-projects");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeTruthy();
    });
  });
});
// describe("Test API routes", () => {
//   it("should return 404 for invalid routes", async () => {
//     const res = await request(agent).get("/invalid-route");
//     expect(res.statusCode).toEqual(404);
//   });

// it("should return 200 for the auth route", async () => {
//   const res = await request(app).get("/api/user");
//   expect(res.statusCode).toEqual(200);
// });

// it("should return 200 for the dashboard route", async () => {
//   const res = await request(app).get("/api/dashboard");
//   expect(res.statusCode).toEqual(200);
// });

// it("should return 200 for the projects route", async () => {
//   const res = await request(app).get("/api/projects/get-projects");
//   expect(res.statusCode).toEqual(200);
// });

//   it("should return 200 for the test route", async () => {
//     const res = await request(agent).get("/api/test/get-projects");
//     expect(res.statusCode).toEqual(200);
//   });
// });
