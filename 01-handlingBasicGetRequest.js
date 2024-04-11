// Import required modules
//--handling api request

const uuid=require("uuid4")
const items= require('./data1.json')
const express = require('express');
const fs= require('fs');

// Create an Express application
const app = express();
// const bodyParser = require('body-parser')
app.use(express.json())
// const items = [ { id: 1, name: 'Item 1' }, 
// { id: 2, name: 'Item 2' }, 
// { id: 3, name: 'Item 3' } ];  



// Define a route for the API endpoint
app.get('/', (req, res) => {
  res.status(200).send(items);
});

app.post('/', (req, res) => {
  const item = req.body;
  item["id"] = uuid();
  item["time"] = new Date();
  items.push(item);

  // Convert items array to JSON string
  const itemsJSON = JSON.stringify(items);

  fs.writeFile('./data1.json', itemsJSON, (err) => {
      if (err) {
          console.error('Error writing to file:', err);
          res.status(500).send('Error writing to file');
          return;
      }
      console.log('Data written to file successfully');
      res.status(201).send({
          items: items
      });
  });
});

app.get("/hello",(req,res)=>res.send("Hi Sai!!"))
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
