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
        console.log("answers list:"+answersList);
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
      <form onSubmit={submit}>
        <div className="input-group mb-3">
          <button type="submit" className="btn btn-primary">Load Results</button>
        </div>
      </form>
      {inp === 1 && (
        <>
          {feedback.map((value, index) => (
            <div key={index}>
              <h6>{value.question}</h6>
              {value.type === 'options' && (
                <>
                  {value.options.map((innervalue, innerindex) => (
                    <p key={innerindex}>{innervalue}: {answers[index][innerindex]}</p>
                  ))}
                </>
              )}
              {value.type === 'text' && (
                <>
                  {answers[index].map((answer, innerindex) => (
                    <p key={innerindex}>{answer}</p>
                  ))}
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

