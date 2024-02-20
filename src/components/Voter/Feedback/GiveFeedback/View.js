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
            <>  
            <div className="flex flex-col py-3 bg-white">
          <div className="flex gap-5 justify-between items-start px-px mt-2 w-full text-sm text-zinc-400 max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1 self-end px-5 pb-2.5 mt-12 max-md:mt-10 max-md:max-w-full">
            <button type="button" onClick={submit} className="justify-center self-center px-14 py-6 mt-8 text-2xl text-black capitalize whitespace-nowrap shadow-sm bg-zinc-300 rounded-[40px] max-md:px-5">Load Feedback form</button>
            </div>
            </div>
            </div></>
            {inp === 1 && <>
                <div className="flex flex-col py-3 bg-white">
          <div className="flex gap-5 justify-between items-start px-px mt-2 w-full text-sm text-zinc-400 max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1 self-end px-5 pb-2.5 mt-12 max-md:mt-10 max-md:max-w-full">
            {feedback.map((value, index) => (
                          <div className="flex flex-col py-3 bg-white">
                          <div className="flex gap-5 justify-between items-start px-px mt-2 w-full text-sm text-black max-md:flex-wrap max-md:max-w-full">
                            <div className="flex flex-col flex-1 self-end px-5 pb-2.5 mt-12 max-md:mt-10 max-md:max-w-full">
                            <h3 className="self-start mt-3">{feedback[index].question}</h3>
                            {value.type === "text" && <>
                                <input className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full" onChange={(e)=>{
                                    const arr = ans
                                    arr[index] = e.target.value
                                    setAns(arr)

                                }} type="text" aria-label=".form-control" />
                            </>}
                            {value.type === "options" && <>
                                {value.options.map((innervalue, innerindex) => (
                                    <>
                                        <div class="form-check">
                                            <input class="" value={innerindex} type="radio" onChange={(e)=>{
                                    const arr = ans
                                    arr[index] = e.target.value
                                    setAns(arr)

                                }} />
                                            <label className="self-start mt-3">
                                                {innervalue}
                                            </label>
                                        </div>
                                    </>
                                ))}
                            </>}
                        </div>
                        </div>
                        </div>

                    ))}
                      
                    <button type="submit" onClick={view} className="justify-center self-center px-14 py-6 mt-8 text-2xl text-black capitalize whitespace-nowrap shadow-sm bg-zinc-300 rounded-[40px] max-md:px-5">Submit</button>
                </div>
                </div>
                </div>
               
            </>}

        </div>
    )
}
