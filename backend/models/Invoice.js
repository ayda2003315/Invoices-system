const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'en_attente' },
  dueDate: Date,
  total: Number,
  scannedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  extractedFields: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  fileUrl: String
});

module.exports = mongoose.model('Invoice', invoiceSchema);


