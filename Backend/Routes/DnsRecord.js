const mongoose=require('mongoose')
const express = require('express');
const dnsrouter = express.Router();
const record=require('./../Model/Record')
// dotenv import
require('dotenv').config();
const AWS = require('aws-sdk');
console.log(process.env.YOUR_ACCESS_KEY, process.env.YOUR_SECRET_ACCESS_KEY, process.env.YOUR_REGION);

// Update AWS configuration with environment variables
AWS.config.update({
  accessKeyId: process.env.YOUR_ACCESS_KEY,
  secretAccessKey: process.env.YOUR_SECRET_ACCESS_KEY,
  region: process.env.YOUR_REGION // Change to your desired AWS region
});

// Create a Route53 object
const route53 = new AWS.Route53();

  
dnsrouter.get('/hello',async(req,res)=>{
    return "Hello World";
})

dnsrouter.get('/',async(req,res)=>{
    try {
        const data=await record.find();
        return res.status(200).send({"data":data})
    } catch (error) {
        return res.status(500).json({"message":error})
    }
})

dnsrouter.get('/:id',async(req,res)=>{
    try {
      const objectId =new mongoose.Types.ObjectId(req.params.id);
      const data=await record.find({'_id': objectId});
      return res.status(200).json({"detail":data})
    } catch (error) {
        return res.status(500).json({"message":error})
    }
})

// Define a route for creating a DNS record
dnsrouter.post('/aws', async (req, res) => {
    const { domain, type, value } = req.body;
    console.log(domain,type,value,'data');
    // Construct params object for creating the DNS record
    const params = {
      HostedZoneId: process.env.HOSTED_ZONE_ID, // Replace with your hosted zone ID
      ChangeBatch: {
        Changes: [
          {
            Action: 'UPSERT',
            ResourceRecordSet: {
              Name: domain,
              Type: type,
              TTL: 300,
              ResourceRecords: [
                { Value: value }
              ]
            }
          }
        ]
      }
    };
  
    try {
      // Call the changeResourceRecordSets method to create the DNS record
      await route53.changeResourceRecordSets(params).promise();
      res.status(201).json({ message: 'DNS record created successfully' });
    } catch (error) {
      console.error('Error creating DNS record:', error);
      res.status(500).json({ error: 'Failed to create DNS record' });
    }
  });

// Route to handle CSV data upload
dnsrouter.post('/upload', async (req, res) => {
  try {
      const csvData = req.body; // Assuming CSV data is sent in the request body
      
      // Iterate through the CSV data and store each record in MongoDB
      for (const recordData of csvData) {
          const record = new Record(recordData);
          await record.save();
      }

      res.status(200).json({ message: 'CSV data uploaded successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

dnsrouter.post('/add',async(req,res) =>{
    try {
        console.log(req.body);
        const data=req.body;
        const new_record=new record(data);
        const result=await new_record.save();
        return res.status(200).send({"data":result});
    } catch (error) {
        return res.status(500).json({"message":error})
    }
    
})

dnsrouter.patch('/update/:id', async(req,res)=>{
    try {
        console.log('jhuk hjhkjhkjhksdfjhlksf')
        const objectId =new mongoose.Types.ObjectId(req.params.id);
        const data=await record.findOne({_id:objectId});
        if(data){
          console.log('data get',req.body)
          const response=await record.updateOne({ _id: objectId },{$set: req.body });
          const result=await record.find();
          return res.status(200).json({"data":result});
        }
        console.log('jkhdfjhksjhkfjhuk')
        const result=await record.find();
        return res.status(200).json({"data":result});
    } catch (error) {
         console.log(error,'error')
        return res.status(500).json({"message":error})
    }
})

dnsrouter.delete('/delete/:id',async(req,res)=>{
    try {
      console.log('hekkjkhsfgjuks',req.params.id)
        const objectId =new mongoose.Types.ObjectId(req.params.id);
        console.log(objectId)
        const data=await record.deleteOne({ _id: objectId });
        if(data.deletedCount>0){
          const result=await record.find();
          return res.status(200).json({"data":result})
        }
        const result=await record.find();
        return res.status(200).json({"data":result})
    } catch (error) {
      console.log(error,'error')
        return res.status(500).json({"message":error})
    }
})

module.exports=dnsrouter

