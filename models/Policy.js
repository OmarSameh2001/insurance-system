const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function generatePolicyNumber() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const policySchema = new Schema({
  policyNumber: { type: String, default: generatePolicyNumber, unique: true },
  details: String,
  broker: { type: Schema.Types.ObjectId, ref: 'Broker' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createAt: { type: Date, default: Date.now },
  createEnd : Date,
  editAt: Date,
  editEnd: Date,
  isInspected: { type: Boolean, default: false }
});

policySchema.pre('save', function(next) {
  // Set editEnd to one year after editAt if not already set
  
  if (!this.createEnd) {
    this.createEnd = new Date(this.createAt);
    this.createEnd.setFullYear(this.createEnd.getFullYear() + 1);
  }
  next();
});

policySchema.pre('findOneAndUpdate', function(next) {
  // Get the update object
  const update = this._update;
  update.editAt = Date.now(); // Set editAt to current time
  
  // Calculate editEnd one year later
  update.editEnd = new Date(update.editAt);
  update.editEnd.setFullYear(update.editEnd.getFullYear() + 1);
  
  next();
});


module.exports = mongoose.model('Policy', policySchema);
