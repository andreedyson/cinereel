import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: false,
    },
    image: String,
    favoritedMovies: Array, //TODO: Define the field re: Add Favorite Movie Route
    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);
// TODO: Add Array of Liked Movies
// TODO: Ref user to Movie ID

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
