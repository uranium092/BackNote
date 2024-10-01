const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({ name: String, age: Number });

module.exports = WorkerSchema;
