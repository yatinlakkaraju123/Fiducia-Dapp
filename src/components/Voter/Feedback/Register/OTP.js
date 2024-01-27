import InputReg from "./Reg"
import React,{useEffect, useState} from 'react'
import feedback from '../../../chair/Feedback.json';
import { getAuth } from "firebase/auth";
import { RecaptchaVerifier,signInWithPhoneNumber } from 'firebase/auth';
import UseBlockchain from '../../../../UseBlockchain.js';
export default function OTP(props) {
    const [web3, account, loadWeb3, contractAddress] = UseBlockchain();
    const phone = props.data.Phone;
    const addr = props.data.scaddr;
    const Indx = props.data.indx;
    const auth = getAuth();
auth.languageCode = 'it';
    const [FormDetails,setFormDetails] = useState({
        mobile:0,
        otp:0
    })
    const [inp,setInp] = useState(-1)
    const handleChange = (event)=>{
        const {name,value} = event.target;
        setFormDetails({
            ...FormDetails,
            [name]:value
        }
            
        )

    }
    useEffect(()=>{
        onSignInSubmit();
    },[])
    const configureCaptcha = ()=>{
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              onSignInSubmit();
            },
            defaultCountry:"IN"
          });

    }
    const onSignInSubmit = ()=>{
        //e.preventDefault();
        configureCaptcha();
        const phoneNumber = phone;
        console.log(phoneNumber);
const appVerifier = window.recaptchaVerifier;

const auth = getAuth();
signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
      console.log("successfully sent");
      setInp(0)
    }).catch((error) => {
      // Error; SMS not sent
      console.log(error);
      // ...
    });
    }
    const OnSubmitOTP = (e)=>{
        e.preventDefault();
        const code = FormDetails.otp;
        const confirmationResult = window.confirmationResult;
confirmationResult.confirm(code).then(async(result) => {
  // User signed in successfully.
  const user = result.user;
  console.log(user);
  console.log("done");
  //const newContract = new web3.eth.Contract(feedback.abi, addr);
 // await newContract.methods.RegisterRegNo(Indx).send({from:account});
  setInp(1)
  // ...
}).catch((error) => {
  // User couldn't sign in (bad verification code?)
  // ...
});
    }
  return (
    <div>
      <div id="sign-in-button"></div>
        {inp===0 && <>
            <h2>Enter OTP</h2>
        <form onSubmit={OnSubmitOTP}>
        
            <input type="number" name="otp" placeholder='otp' onChange={handleChange}required></input>
            <button type='submit'>Submit</button>
        </form></>}
        {inp===1 &&<InputReg data={
          {
            scaddr:addr,
            regIndx :Indx,}
          }
        /> }

        

    </div>
  )
}
