const express =require('express');
const app = express();
require('./db');

const done = require('./route');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use("/api",done);

app.listen(4400,()=>{
    console.log("App is listening on port 4400");
})