const mongoose = require('mongoose');

const CompaniesSchema = new mongoose.Schema({ name: String, password: String });

module.exports = CompaniesSchema;

/**
 * 
 * 
 * 



companies{
_id:"IBM",
password:"hola321",
name:"IBM"
}



 */
