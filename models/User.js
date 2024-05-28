const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const Counter = require("./counter");

const userSchema = new Schema({
  id: { type: String},
  name: { type: String, required: true },
  policies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Policy" }],
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: String,
  isAdmin: { type: Boolean, default: false }
});

userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre("save", async function(next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: "user" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this._id = counter.seq;
    this.id = counter.seq;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
