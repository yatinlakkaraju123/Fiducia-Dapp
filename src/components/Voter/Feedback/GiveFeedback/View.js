import React, { useEffect } from 'react'
import UseBlockchain from '../../../../UseBlockchain.js';
import feedback1 from '../../../chair/Feedback.json';
import { pinatatoken } from '../../../../.firebaseConfig.js';
import axios from 'axios';
import { useState } from 'react';
export default function View(props) {

    const [web3, account, loadWeb3, contractAddress] = UseBlockchain();
    const [ans,setAns] = useState([])
    const [form, setForm] = useState(null)
    const [feedback, setFeedback] = useState([])
    const [no, setNo] = useState(0)
    const [inp, setInp] = useState(0)
    useEffect(() => {
        if (form != null) {
            const Name = form.eventName;
            //console.log(Name);

            const Form = form.FeedbackQuestions
            //console.log(Form)
            const FormArr = []
            for (let i = 0; i < no; i++) {
                const arr = {}
                arr.question = Form[i].question;
                arr.type = Form[i].type
                arr.options = Form[i].options
                FormArr.push(arr)

            }
            setFeedback(FormArr)

        }
    }, [form])
    const addr = props.scaddr;
    const view = async (event) => {
        event.preventDefault();
        console.log(ans);
        const newContract = new web3.eth.Contract(feedback1.abi, addr);
            try{
              await  newContract.methods.giveFeedback(ans).send({from:account});
            }catch(err)
            {
                console.log(err);
            }
            for(let i=0;i<no;i++)
            {
                console.log(await newContract.methods.getAnswersForQid(i).call());
            }
           
        
    }
    const submit = async (event) => {
        event.preventDefault();
        const newContract = new web3.eth.Contract(feedback1.abi, addr);
        const ipfs = await newContract.methods.Ipfs().call();
        const No = await newContract.methods.questionsCount().call();
        setNo(No)
        setAns(Array.from({ length: Number(No) }))
        console.log(Array.from({ length: Number(No) }))
        const token = {pinatatoken}

        await axios.get(`https://gateway.pinata.cloud/ipfs/${ipfs}?pinataGatewayToken=${token}`).then(result => setForm(result.data)).catch(err => console.log(err));
        setInp(1)


    }
    const handleInput = (e,index)=>{
        const arr = ans
        console.log("Arr:"+arr)
        arr[index] = e.target.value
        console.log("arr:"+arr)
        setAns(arr)
    }

    return (
        <div>
            <>  <form onSubmit={submit}>
                <div class="input-group mb-3">
                    <button type="submit" class="btn btn-primary">Load Feedback Form</button>
                </div>
            </form></>
            {inp === 1 && <>
                <form onSubmit={view}>
                    {feedback.map((value, index) => (
                        <div>
                            <h3>{feedback[index].question}</h3>
                            {value.type === "text" && <>
                                <input class="form-control form-control-sm" onChange={(e)=>{
                                    const arr = ans
                                    arr[index] = e.target.value
                                    setAns(arr)

                                }} type="text" aria-label=".form-control" />
                            </>}
                            {value.type === "options" && <>
                                {value.options.map((innervalue, innerindex) => (
                                    <>
                                        <div class="form-check">
                                            <input class="form-check-input" value={innerindex} type="radio" onChange={(e)=>{
                                    const arr = ans
                                    arr[index] = e.target.value
                                    setAns(arr)

                                }} name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                {innervalue}
                                            </label>
                                        </div>
                                    </>
                                ))}
                            </>}
                        </div>

                    ))}
                      <div class="input-group mb-3">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
                </form>
            </>}

        </div>
    )
}
