const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const SCmodel = require('./models/smartcontractinfo')
const mypasswords  = require('./.passwords.js')
const app = express()
const axios = require('axios')
const FormData = require('form-data')
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
/*app.post('/sendJSON',async(req,res)=>{
  const {_jsonString} = req.body;
  jsonString = _jsonString;
})
const JWT = mypasswords.JWT

const pinFileToIPFS = async () => {
    const formData = new FormData();
    //const src = "abc.txt";
    
    //const file = fs.createReadStream(src)
    formData.append('file', new Blob([jsonString], { type: 'application/json' }), 'jsonData.json');
    
    /*const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);*/

  /*  try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
      // res.data.IpfsHash
    } catch (error) {
      console.log(error);
    }*/
//}
//pinFileToIPFS()
app.listen(3001,()=>{
    console.log("Server is running");
})