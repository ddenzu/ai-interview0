const express = require('express');
const app = express()
var cors = require('cors')
require('dotenv').config();
const path = require('path')
  
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'build')));

// routes
app.use('/login', require('./routes/login'));
app.use('/answer', require('./routes/answer'));
app.use('/interview', require('./routes/interview'));

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`)
})

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
})


app.get("*", function(req, res){
  res.sendFile(path.join(__dirname, '/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});