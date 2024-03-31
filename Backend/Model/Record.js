const { express } = require('express');
const mongoose=require('mongoose');

const record=mongoose.Schema(
    {
        domain:{
            type:String,
        },
        type:{
            type:String
        },
        value:{
            type:String
        }
    }
);

module.exports=new mongoose.model('record',record);