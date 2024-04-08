const express = require('express')
const app = express();
const PORT=3000


app.get('/',()=>console.log("request recieved"))

app.listen(PORT,()=>console.log("server is running",PORT))