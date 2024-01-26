const express = require('express')
const { Readable } = require('stream');
const mongoose = require('mongoose')
const cors = require('cors')
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const SCmodel = require('./models/smartcontractinfo')
const mypasswords  = require('./.passwords.js')
const app = express()
const axios = require('axios')
const FormData = require('form-data')
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK({ pinataJWTKey: mypasswords.JWT})
const fs = require('fs')
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/fiducia")

app.get('/',(req,res)=>{
    SCmodel.find({}).then(scinfo=>res.json(scinfo)).catch(err=>res.json(err))
})
app.post("/deploy",(req,res)=>{
    SCmodel.create(req.body).then(scinfo=>{
        res.json(scinfo)
        console.log(scinfo)
        
    }
        ).catch(err=>res.json(err))


})
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yatinlakkaraju61@gmail.com',
      pass: mypasswords.gmailPassword,
    },
  });
  
  app.use(bodyParser.json());
  app.post('/sendTokens', async (req, res) => {
    const { emailArray, token ,EventName} = req.body;
  
    try {
      for (const email of emailArray) {
        const mailOptions = {
          from: 'yatinlakkaraju61@gmail.com',
          to: email,
          subject: 'Token Number of voting event',
          text: `Good Day Voter!Your token number for Voting event ${EventName} is: ${token}`,
        };
  
        await transporter.sendMail(mailOptions);
      }
  
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending emails:', error);
      res.status(500).json({ success: false, error: 'Error sending emails' });
    }
  });
  app.post('/sendTokensFeedback', async (req, res) => {
    const { emailArray, token ,EventName} = req.body;
  
    try {
      for (const email of emailArray) {
        const mailOptions = {
          from: 'yatinlakkaraju61@gmail.com',
          to: email,
          subject: 'Token Number of voting event',
          text: `Good Day !Your token number for the feedback form ${EventName} is: ${token}`,
        };
  
        await transporter.sendMail(mailOptions);
      }
  
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending emails:', error);
      res.status(500).json({ success: false, error: 'Error sending emails' });
    }
  });
  let jsonString;
app.post('/sendJSON',async(req,res)=>{
  const {_jsonString,token} = req.body;
  jsonString = JSON.parse(_jsonString);
  //console.log(jsonString)
  try {
   const r =  await pinata.pinJSONToIPFS(jsonString)
   const ipfs = r.IpfsHash
   app.post('/sendIPFS',(req,res)=>{
    res.json({IPFS:ipfs})
   })
   console.log(r.IpfsHash)
    //await pinFileToIPFS(token,jsonString); // Call the function within the handler
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error pinning to IPFS:', error);
    res.status(500).json({ success: false, error: 'Error pinning to IPFS' });
  }
  //pinFileToIPFS()
})
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhOTU4YmI3Yi05ZWFiLTQ0NDUtYWY1Yy1hNTk5MzQzOGM1MDEiLCJlbWFpbCI6Imxha2thcmFqdXlhdGluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4ZmFhNDUwNjUyNDkxOWY1Y2JiZiIsInNjb3BlZEtleVNlY3JldCI6IjJhZjY5ZjUzMjIwYjgwZDk4MmVkY2Y2OGQ4YjY0YWJiN2QwZjY4NzRjMmQ4Y2MxNTVjNjJhOTg4NGIzYTc5YTciLCJpYXQiOjE3MDYwOTM1Nzd9.ng9C8DhZ-7AlC_rKSyUlG_UCefKYGCpGAzqeEvd6ZTA"
const ipfsHash=""
const pinFileToIPFS = async (token,jsonString) => {
   
  try {
    const buffer = Buffer.from(jsonString, 'utf8');
    const stream = Readable.from(buffer);
    const data = new FormData();

    // Append the stream as a file with appropriate filename and MIME type:
    data.append('file', stream, {
      filepath: "data.json", // Use a suitable filename for JSON
      contentType: 'application/json', // Explicitly set MIME type
    });

    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
      headers: {
        Authorization: JWT
            },
    });

    console.log(res.data.IpfsHash);
  } catch (error) {
    console.log(error);
  }
}



app.listen(3001,()=>{
    console.log("Server is running");
})