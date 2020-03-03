const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const config = require('./config.json');
const products = require('./products.json');

const port = 3000;

const mongodbURI = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}-hlrm7.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('DB connected!'))
.catch(err =>{
  console.log(`DBConnectionError: ${err.message}`);
});

//test the connectivity
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('once', function() {
  console.log('We are connected to Mongo DB');
});

app.get('/', (req, res) => res.send('Hello world'));

app.use((req,res, next)=>{
  console.log(`${req.method} request for ${req.url}`);
  next();//include this to go to the next middleware
});

app.get('/allProducts', (req,res)=>{
  res.json(products);
});

app.get('/product/:id', (req,res)=>{
  const idParam = req.params.id;
  for(let i = 0; i< products.length; i++){
    if(idParam.toString() === products[i].id) {
      res.json(products[i].id);
    } else {
      res.send('product not found');
    }
  }
})

//keep this always at the bottom so that you can see the errors reported
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
