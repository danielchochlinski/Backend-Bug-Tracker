import mongoose from "mongoose";
import { User } from "../../models/userModel";

const mockUserData = {
  name: "Daniel",
  surname: "Chochlinski",
  email: "daniel@gmail.com",
  password: "password",
};

describe("User Model Test", () => {
  beforeAll(async () => {
    await mongoose.connect(
      process.env.MONGO_DB_URL_TEST || "mongodb://localhost:27017/"
    );
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("create & save user successfully", async () => {
    const validUser = new User(mockUserData);
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(mockUserData.name);
    expect(savedUser.surname).toBe(mockUserData.surname);
    expect(savedUser.email).toBe(mockUserData.email);
    expect(savedUser.password).toBe(mockUserData.password);
  });

  // it("should find an existing user by email", async () => {
  //   const savedUser = new User(mockUserData);
  //   const exisitngUser = await savedUser.save();
  //   const foundUser = await User.findOne({
  //     email: exisitngUser.email,
  //   });

  //   expect(foundUser).toBeDefined();
  //   if (foundUser) {
  //     expect(foundUser._id).toEqual(savedUser._id);
  //     expect(foundUser.name).toEqual(savedUser.name);
  //     expect(foundUser.surname).toEqual(savedUser.surname);
  //     expect(foundUser.email).toEqual(savedUser.email);
  //     expect(foundUser.password).toEqual(savedUser.password);
  //   }
  // });
});
