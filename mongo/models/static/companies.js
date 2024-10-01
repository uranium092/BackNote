const schema = require('../../schemas/static/companies');

const mongoose = require('mongoose');

const CompaniesModel = mongoose.model('company', schema);

module.exports = CompaniesModel;
