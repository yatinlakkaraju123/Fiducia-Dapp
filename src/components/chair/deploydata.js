
import React,{useState} from 'react'
import { getAuth } from "firebase/auth";
import { RecaptchaVerifier,signInWithPhoneNumber } from 'firebase/auth';
export default function Deploydata() {
    const auth = getAuth();
auth.languageCode = 'it';
    const [FormDetails,setFormDetails] = useState({
        mobile:0,
        otp:0
    })
    const handleChange = (event)=>{
        const {name,value} = event.target;
        setFormDetails({
            ...FormDetails,
            [name]:value
        }
            
        )

    }
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
    const onSignInSubmit = (e)=>{
        e.preventDefault();
        configureCaptcha();
        const phoneNumber = "+91"+FormDetails.mobile;
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
confirmationResult.confirm(code).then((result) => {
  // User signed in successfully.
  const user = result.user;
  console.log(user);
  console.log("done");
  // ...
}).catch((error) => {
  // User couldn't sign in (bad verification code?)
  // ...
});
    }
  return (
    <div>
        <h2>Login form</h2>
        <form onSubmit={onSignInSubmit}>
            <div id="sign-in-button"></div>
            <input type="number" name="mobile" placeholder='mobile number' onChange={handleChange}required></input>
            <button type='submit'>Submit</button>
        </form>

        <h2>Enter OTP</h2>
        <form onSubmit={OnSubmitOTP}>
            <input type="number" name="otp" placeholder='otp' onChange={handleChange}required></input>
            <button type='submit'>Submit</button>
        </form>

    </div>
  )
}








