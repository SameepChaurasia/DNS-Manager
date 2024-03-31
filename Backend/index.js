const express=require('express')
const bodyparser=require('body-parser')
// connection with database
const connectDB=require('./DB/connectDB')
// Routes
const userRoutes=require('./Routes/User')
const recordRoutes=require('./Routes/DnsRecord')
// dotenv import
require('dotenv').config();
const cors=require('cors');

const app=express();
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());

// .env contain
// MONGO_URL=
// YOUR_ACCESS_KEY=
// YOUR_SECRET_ACCESS_KEY=
// YOUR_REGION=
// SECRET_KEY=
// HOSTED_ZONE_ID=


connectDB();
app.get('/api',(req,res)=>{
    res.send("Hello world");
})
app.use('/api/users', userRoutes);
app.use('/api/record', recordRoutes)

app.listen(4000,()=>{
    console.log("connected to port");
})