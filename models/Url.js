const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortCode: { type: String, unique: true, required: true },
  longUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastAccessed: { type: Date },
  visitCount: { type: Number, default: 0 },
  customAlias: { type: String, unique: true, sparse: true },
  expireAt: { type: Date, default: () => new Date(+new Date() + 30*24*60*60*1000) } // 30 days
});

urlSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Url', urlSchema);


