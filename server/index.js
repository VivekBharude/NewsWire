const express = require('express'),
	mongoose = require('mongoose');
const app = express();
const cors = require('cors');
 
require('dotenv').config();


let databaseUsername = process.env.DB_USERNAME;
let databasePassword = process.env.DB_PASS;

mongoose
	.connect(`mongodb+srv://${databaseUsername}:${databasePassword}@cluster0.l5u8cqp.mongodb.net/?retryWrites=true&w=majority`)
	.then(() => console.log('DB Connected!'))
	.catch((error) => console.log(error));

app.use(express.json());
app.use(cors());
const newsRoutes = require('./routes/news');
app.use(newsRoutes);

let port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server started on port ${port}`);
}); 
