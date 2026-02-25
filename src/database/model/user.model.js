import mongoose from "mongoose";
import { genderEnums, providerEnums } from "../../common/enums/enum.service.js";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: String,
  DOB: Date,
  gender: {
    type: String,
    enum: Object.values(genderEnums),
    default: genderEnums.Male,
  },
  provider: {
    type: String,
    enum: Object.values(providerEnums),
    default: providerEnums.System,
  },
});
userSchema
  .virtual("userName")
  .set(function (value) {
    let [firstName, lastName] = value.split(" ");
    this.firstName = firstName;
    this.lastName = lastName;
  })
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  });
export const userModel = mongoose.model("User", userSchema);
