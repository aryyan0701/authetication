import mongoose, { Schema, Document, Model  } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is Required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please add valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel: Model<User> =
mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default UserModel;
