const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const SCmodel = require('./models/smartcontractinfo')
const GmailPassword  = require('./.passwords.js')
const app = express()
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
      pass: 'atzn wwwu ypqz eamv',
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
app.listen(3001,()=>{
    console.log("Server is running");
})