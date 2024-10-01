const mongoose = require('mongoose');

const Reports = new mongoose.Schema({ name: String, data: Array });

module.exports = Reports;
