import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  image: String,
  name: {
    type: String,
    required: [true, "name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim, "Email is invalid"],
  },
  password: {
    type: String,
    minlength: [6, "Password must be at least 6 characters"],
  },
});

// ✅ Important: this line registers the "User" model name
const User = mongoose.models.User || mongoose.model("User", formSchema);

export default User;
