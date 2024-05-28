const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./counter');
const bcrypt = require('bcryptjs');

const brokerSchema = new Schema({
  
  id: { type: String},  
  name: {
    type: String,
    required: true
  },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  policies: [{ type: Schema.Types.ObjectId, ref: 'Policy' }],
  hiredAt: { type: Date, default: Date.now },
  email: String,
  phone: {type: String, required: true},
  password: {type: String, required: true}
});

brokerSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: 'broker' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
  }
  next();
});

module.exports = mongoose.model('Broker', brokerSchema);

