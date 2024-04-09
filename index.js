// Import required modules
const uuid=require("uuid4")

const express = require('express');
const fs= require('fs');

// Create an Express application
const app = express();
// const bodyParser = require('body-parser')
app.use(express.json())
const items = [ { id: 1, name: 'Item 1' }, 
{ id: 2, name: 'Item 2' }, 
{ id: 3, name: 'Item 3' } ];  



// Define a route for the API endpoint
app.get('/', (req, res) => {
  res.status(200).send(items);
});

app.post('/',(req,res)=>{
    // console.log(req.body)
    const item=req.body;
    item["id"]=uuid();
    item["time"]=Date();
    items.push(item)
  res.status(201).send({
    items:items
  })
})

app.get("/hello",(req,res)=>res.send("Hi Sai!!"))
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
