const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    collection: String,
    operationType: String,
    documentId: mongoose.Schema.Types.ObjectId,
    userId:mongoose.Schema.Types.ObjectId,
    details: mongoose.Schema.Types.Mixed
} ,{ timestamps: true });

module.exports = mongoose.model('Log', LogSchema, 'Log');

