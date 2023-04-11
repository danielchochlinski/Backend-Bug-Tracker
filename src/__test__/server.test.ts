import request from "supertest";
import { app } from "../server";

describe("Test API routes", () => {
  it("should return 404 for invalid routes", async () => {
    const res = await request(app).get("/invalid-route");
    expect(res.statusCode).toEqual(404);
  });

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

  it("should return 200 for the test route", async () => {
    const res = await request(app).get("/api/test/get-projects");
    expect(res.statusCode).toEqual(200);
  });
});
