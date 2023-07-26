import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z-9._]+(?<![_.])$/, 'Username is invalid! 8-20 alphanumeric characters, no consecutive underscores or dots, no underscores or dots at the beginning or end.'],
  },
  image: {
    type: String,
  }
});

const User = models.User || model("User", userSchema);

export default User;
