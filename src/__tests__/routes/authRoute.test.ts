import mongoose from "mongoose";
import { User } from "../../models/userModel";
import supertest from "supertest";
import { app } from "../../server";
import { connectDB } from "../../config/db";
const userData = {
  name: "Daniel",
  surname: "Chochlinski",
  email: "daniel@gmail.com",
  password: "password",
};

describe("Test auth route", () => {
  beforeAll(async () => {
    // await mongoose.connect(
    //   process.env.MONGO_DB_URL_TEST || "mongodb://localhost:27017/"
    // );
    await connectDB();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should create user and return 201 response", async () => {
    const response = await supertest(app)
      .post("/api/user/register")
      .send(userData)
      .expect(201);
    expect(response.body.status).toEqual("Success");
    expect(response.body.data.user.name).toEqual(userData.name);
    expect(response.body.data.user.surname).toEqual(userData.surname);
    expect(response.body.data.user.email).toEqual(userData.email);
    expect(response.body.data.token).toBeDefined();
  });

  
});
