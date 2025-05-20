import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  group: {
    type: String,
    enum: ["CSE", "MECH", "CIVIL"],
    required: true,
  },
});

export default mongoose.model("User", userSchema);
