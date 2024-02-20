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
    const Indx = props.data.regIndx;
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
          console.log(Indx);
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
          
          <div className="flex flex-col py-3 bg-white">
          <div className="flex gap-5 justify-between items-start px-px mt-2 w-full text-sm text-zinc-400 max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1 self-end px-5 pb-2.5 mt-12 max-md:mt-10 max-md:max-w-full">
            <div className="self-start mt-3">Enter OTP</div>
            <input type="number" name="otp" className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full" onChange={handleChange}required></input>
            <button type='submit' onClick={OnSubmitOTP} className="justify-center self-center px-14 py-6 mt-8 text-2xl text-black capitalize whitespace-nowrap shadow-sm bg-zinc-300 rounded-[40px] max-md:px-5">Submit</button>
            </div>
            </div>
            </div>
        </>}
        {inp===1 &&<InputReg data={
          {
            scaddr:addr,
            regIndx :Indx,}
          }
        /> }

        

    </div>
  )
}
