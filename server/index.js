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
require('dotenv').config();

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MongoURL)

app.get('/',(req,res)=>{
    SCmodel.find({}).then(scinfo=>res.json(scinfo)).catch(err=>res.json(err))
})
app.post("/deploy",(req,res)=>{
    SCmodel.create(req.body).then(scinfo=>{
        res.json(scinfo)
        //console.log(scinfo)
        
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
  const r =  await pinata.pinJSONToIPFS(jsonString)
   const ipfs = r.IpfsHash
   res.json({IPFS:r.IpfsHash})
  //console.log(jsonString)
  /*try {
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
  }*/
  //pinFileToIPFS()
})
const JWT = mypasswords.JWT
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