import supertest from "supertest";
import { app } from "../server";
import http from "http";

describe("Test Express app", () => {
  let server = http.createServer(app);

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return 200 and message "success" on GET /api', async () => {
    const res = await supertest(app).get("/api/test");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Server is running");
  });
});
