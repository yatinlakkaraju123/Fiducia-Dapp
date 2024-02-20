import React, { useState, useEffect } from 'react';
import UseBlockchain from '../../../UseBlockchain';
import axios from 'axios';
import feedback1 from '../Feedback.json';
import { pinatatoken } from '../../../.firebaseConfig';

export default function ResultsView(props) {
  const [web3, account, loadWeb3, contractAddress] = UseBlockchain();
  const [form, setForm] = useState(null);
  const [no, setNo] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [inp, setInp] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [web3Initialized, setWeb3Initialized] = useState(false);

  const addr = props.scaddr;

  useEffect(() => {
    const fetchData = async () => {
      if (!web3Initialized && web3) {
        const newContract = new web3.eth.Contract(feedback1.abi, addr);
        const ipfs = await newContract.methods.Ipfs().call();
        const No = await newContract.methods.questionsCount().call();
        setNo(No);
        const token = { pinatatoken };

        try {
          const result = await axios.get(`https://gateway.pinata.cloud/ipfs/${ipfs}?pinataGatewayToken=${token}`);
          setForm(result.data);
        } catch (error) {
          console.error('Error fetching feedback form:', error);
        }
        setWeb3Initialized(true);
      }
    };

    fetchData();
  }, [addr, web3, web3Initialized]);

  useEffect(() => {
    if (form !== null) {
      const Form = form.FeedbackQuestions;
      const FormArr = [];

      for (let i = 0; i < no; i++) {
        const arr = {
          question: Form[i].question,
          type: Form[i].type,
          options: Form[i].options
        };
        FormArr.push(arr);
      }

      setFeedback(FormArr);
    }
  }, [form, no]);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  const submit = async (event) => {
    event.preventDefault();

    if (web3Initialized) {
      const newContract = new web3.eth.Contract(feedback1.abi, addr);
      const promises = [];

      for (let i = 0; i < no; i++) {
        const promise = newContract.methods.getAnswersForQid(i).call();
        promises.push(promise);
      }

      try {
        const answersList = await Promise.all(promises);
        console.log("answers list:" + answersList);
        const updatedAnswers = answersList.map((answers1, i) => {
          if (feedback[i].type === 'options') {
            const optionCount = {
              0: 0,
              1: 0,
              2: 0,
              3: 0
            };

            answers1.forEach(answer => {
              if (answer >= 0 && answer <= 3) {
                optionCount[answer]++;
              }
            });

            return optionCount;
          } else {
            return answers1;
          }
        });

        setAnswers(prevAnswers => [...prevAnswers, ...updatedAnswers]);
        setInp(1);
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    }
  };


  return (
    <div>
      <div className="flex flex-col py-3 bg-white">
        <div className="flex gap-5 justify-between items-start px-px mt-2 w-full text-sm text-zinc-400 max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col flex-1 self-end px-5 pb-2.5 mt-12 max-md:mt-10 max-md:max-w-full">
            <button type="submit" onClick={submit} className="justify-center self-center px-14 py-6 mt-8 text-2xl text-black capitalize whitespace-nowrap shadow-sm bg-zinc-300 rounded-[40px] max-md:px-5">Load Results</button>
          </div>
        </div>
      </div>

      {inp === 1 && (
        <>
          <div className="flex flex-col py-3 bg-white">
            <div className="flex gap-5 justify-between items-start px-px mt-2 w-full text-xl text-black max-md:flex-wrap max-md:max-w-full">
              <div className="flex flex-col flex-1 self-end px-5 pb-2.5 mt-12 max-md:mt-10 max-md:max-w-full">
                {feedback.map((value, index) => (
                  

                        <div key={index}>
                          <h6 className="self-start mt-3">{value.question}</h6>
                          {value.type === 'options' && (
                            <>
                              {value.options.map((innervalue, innerindex) => (
                                <p key={innerindex} className="self-start mt-3">{innervalue}: {answers[index][innerindex]}</p>
                              ))}
                            </>
                          )}
                          {value.type === 'text' && (
                            <>
                              {answers[index].map((answer, innerindex) => (
                                <p key={innerindex} className="self-start mt-3">{answer}</p>
                              ))}
                            </>
                          )}
                        </div>
                        )
         )}</div></div></div>
        </>
      )}
            </div>
            );
}

