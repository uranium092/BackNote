const express = require('express');
const mongoose = require('mongoose');

const Model = require('./mongo/Model');
const CompanyModel = require('./mongo/models/static/companies');

async function main() {
  await mongoose.connect(
    'mongodb+srv://apolo:admin@stradivarius.zg6bf.mongodb.net/Java?retryWrites=true&w=majority&appName=Stradivarius'
    //mongodb://192.168.10.131:27017/?retryWrites=true&loadBalanced=false&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000
  );
  console.log('Connection MongoDB OK------');
}

main().catch((err) => console.log(err));

const app = express();
app.use(require('cors')());
app.use(express.json());

app.post('/newNotePad', async (req, res) => {
  await new Model(req.body).save();
  res.status(200).end();
});

app.get('/allNotes', async (req, res) => {
  const all = await Model.find({});
  res.json(all);
});

app.delete('/deleteNote', async (req, res) => {
  await Model.findByIdAndDelete(req.body._id);
  res.status(200).end();
});

app.get('/findById/:id', async (req, res) => {
  const note = await Model.findById(req.params.id);
  res.json(note);
});

app.put('/updateNote/:id', async (req, res) => {
  await Model.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).end();
});

app.post('/newCompany', async (req, res) => {
  const data = req.body;
  const company = await new CompanyModel(data).save();
  const _id = company._id.toString();

  mongoose.model(
    _id + '_workers',
    require('./mongo/schemas/dynamic/workers'),
    _id + '_workers'
  );

  res.status(200).end();
});

app.post('/newWorker', async (req, res) => {
  await new mongoose.models[req.body._id+"_workers"](req.body.data).save();
  res.status(200).end();
});

app.get("/getWorkers/:_id", async(req,res)=>{
  const all=await mongoose.models[req.params._id+"_workers"].find({});
  res.json(all);
});

app.post('/authCompany', async (req, res) => {
  const match = await CompanyModel.find(req.body);
  res.status(match.length > 0 ? 200 : 404).json(match.length > 0 ? match : null);
});

app.get('/mongo', async (req, res) => {
  require('mongoose').model('edd', new mongoose.Schema({ name: String }, { strict: false }), 'x');
  // require('mongoose').model(
  //   'sweet',
  //   new mongoose.Schema({ name: String }, { strict: false }),
  //   'xx'
  // );
  //await new m({ edad: 44, teams: [2, 3, 4], name: 'hola' }).save();
  //console.log(mongoose.models);
  res.end('revisar mongo');
});

app.get('/m', async (req, res) => {
  //require('mongoose').model('ed', new mongoose.Schema({ name: String }, { strict: false }), 'x');
  const m = require('mongoose').model(
    'sweet',
    new mongoose.Schema({ name: String }, { strict: false }),
    'x'
  );
  const ins = await new m({ edad: 44, teams: [2, 3, 4], name: 'hola' }).save();
  res.end('revisar mongo');
});

app.listen(8888, () => {
  console.log('Running on 8888 ...');
});
