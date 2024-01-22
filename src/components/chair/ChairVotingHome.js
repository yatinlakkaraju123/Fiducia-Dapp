import ChairHomeNavbar from "../navbars/ChairHomeNavbar";
import { useState,useEffect} from 'react';
import Web3 from 'web3';
import Papa from 'papaparse'
import axios from 'axios';
import {storage} from "../../firebase.js";
import {ref, uploadBytesResumable} from "firebase/storage";
import {v4} from "uuid";
import moment from 'moment'
import voting from './voting.json';
import UseBlockchain  from '../../UseBlockchain.js';
import { Form } from "react-router-dom";


function ChairVotingHome() {
    const [tokenArray,setToken] = useState([])
    const [web3,account,loadWeb3,contractAddress] = UseBlockchain();
    const [FormDetails,setFormDetails] = useState({
        eventName:'',
        NoOfCandidates:0,
        startregisterTime:0,
        stopregisterTime:0,
        startvotingTime:0,
        stopvotingTime:0,
        startresultTime:0,
        
    })
   
    const [NoOfCandidates, setNoOfCandidates] = useState(0);
    const [columnDataArrays,setColumnDataArrays] = useState([]);
    
    const [data, setData] = useState();
    const [columnArray, setColumnArray] = useState([]);
    const [valueArray, setValueArray] = useState([]);
    const [candidatesNames, setCandidatesNames] = useState([]);
    const [candidatesImages, setCandidatesImages] = useState([]);
    const [candidatesdesc, setCandidatesdesc] = useState([]);
    const [token,settoken] = useState('');
    // alerts
    const [eventCreationAlert,setEventCreationAlert] = useState(0);
    
    useEffect(
        ()=>{
            axios.get("http://localhost:3001").then(result=>{
                const dta = result.data;
                const arr = dta.map((d)=>{
                    return (d.token)
                })
                //console.log(arr);
                setToken(arr)
            }).catch(err=>console.log(err));
            
        },[]
      )
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Update the state with the new form data
        if(name=='startregisterTime' ||name=='stopregisterTime'||name=='startvotingTime'||name=='stopvotingTime'||name=='startresultTime' )
        {setFormDetails({
            ...FormDetails,
            [name]: moment(value).unix(),
          });}
        else
        {
            setFormDetails({
                ...FormDetails,
                [name]: value,
              });
        }}
      
    const handlefile = (event) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (result) {
                const columnArray = [];
                const valueArray = [];
                const columnDataArrays = {};
                result.data.forEach((d) => {
                    // Extract column names and values
                    const columns = Object.keys(d);
                    const values = Object.values(d);
    
                    // Push column names and values to the arrays
                    columnArray.push(columns);
                    valueArray.push(values);
    
                    // Store column data in separate arrays
                    columns.forEach((column, index) => {
                        if (!columnDataArrays[column]) {
                            columnDataArrays[column] = [];
                        }
                        columnDataArrays[column].push(values[index]);
                    });
                });
                setData(result.data)
                setColumnArray(columnArray[0])
                setValueArray(valueArray)
                setColumnDataArrays(columnDataArrays); 

            }
        })

    }
    const handleTextInputChange = (event, index) => {
        const updatedCandidates = [...candidatesNames];
        updatedCandidates[index] = event.target.value; // Access the field name and value
        setCandidatesNames(updatedCandidates);
      };
     const handledescInputChange = (event, index) => {
        const updatedCandidates = [...candidatesdesc];
        updatedCandidates[index] = event.target.value; // Access the field name and value
        setCandidatesdesc(updatedCandidates);
      };
      const handleImageChange = (event, index) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (event) => {
            const imageUrl = event.target.result;
            setCandidatesImages((prevImages) => {
                const updatedCandidates = [...prevImages];
                updatedCandidates[index] = file; // store the file itself
                return updatedCandidates;
            });
        };
    
        reader.readAsDataURL(file);
    };
    
    const submitForm = async (event) => {
        event.preventDefault();
    
        for (let i = 0; i < NoOfCandidates; i++) {
            if (candidatesImages[i] === undefined || candidatesImages[i] === null) {
                return;
            } else {
                const imageRef = ref(storage, `images/${v4()}`);
                
                uploadBytesResumable(imageRef, candidatesImages[i], { contentType: candidatesImages[i].type })
                    .then(() => {
                       
                    })
                    .catch((error) => {
                        console.error("Error uploading image:", error);
                    });
            }
        }
        //console.log(FormDetails.startregisterTime);
        // Set up Truffle contract
    const myContract = new web3.eth.Contract(voting.abi);

    // Get the user's accounts
    const accounts = await web3.eth.getAccounts();

    // Deploy the contract
    const deployedContract = await myContract.deploy({ data: voting.bytecode })
      .send({ from: accounts[0] });
        //console.log(columnDataArrays[0]);
    //console.log('Contract deployed at:', deployedContract.options.address);
    const addr = String(deployedContract.options.address);
	const token = Math.floor(100000 + Math.random() * 900000);
	while(tokenArray.indexOf(token)!=-1)
	{
		token = Math.floor(100000 + Math.random() * 900000);
	}
    settoken(token);
    setEventCreationAlert(1);
	//console.log(addr);
	axios.post("http://localhost:3001/deploy",{smartcontractaddress: addr,token}).then(result=>{
        //console.log(result)
    }).catch(err=>console.log(err))
    const registrationArray = columnDataArrays[columnArray[0]] || [];
console.log(registrationArray);
const phoneArray = columnDataArrays[columnArray[1]]  || [];
console.log(phoneArray);
const emailArray = columnDataArrays[columnArray[2]]  || [];
console.log(emailArray);
    try {
        const response = await axios.post('http://localhost:3001/sendTokens', {
            emailArray,
          token,
          EventName:FormDetails.eventName
        });
  
        if (response.data.success) {
          console.log('Tokens sent successfully');
        } else {
          console.error('Failed to send tokens');
        }
      } catch (error) {
        console.error('Error sending tokens:', error);
      }
    try{
       // Assuming you have the deployed contract instance stored in 'deployedContract'


// Assuming you have the correct data in candidatesdesc and FormDetails

await deployedContract.methods.set(
  registrationArray.length > 0 ? registrationArray : [], // Check if the array has elements
  phoneArray.length > 0 ? phoneArray : [],
  emailArray.length > 0 ? emailArray : [],
  candidatesNames,
  candidatesdesc,
  FormDetails.NoOfCandidates,
  FormDetails.startregisterTime,
  FormDetails.stopregisterTime,
  FormDetails.startvotingTime,
  FormDetails.stopvotingTime,
  FormDetails.startresultTime
).send({ from: accounts[0] });
     
    
    }catch(error)
    {
        console.log(error);
    }
   

        
        
    window.location.reload();  



    };
    
    return (
        
        <>
            <ChairHomeNavbar />
           
            <div className="container">
                {eventCreationAlert===1 && <>
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
 Congratulations the voting event has been created. the token is {token}.. Now please accept the next transaction to set the voting event which the input details
</div>
                </>}

                <h2 style={{ textAlign: "center" }}>Enter the form for the voting event</h2>
                <form onSubmit={submitForm} > 
                    <div class="input-group mb-3">
                        <input type="text" name="eventName"class="form-control"  onChange={handleInputChange}
                        
                        placeholder="Event Name" aria-label="Event Name" aria-describedby="basic-addon2" /><br></br>



                    </div>
                    <div class="input-group mb-3">
                        <input type="number" class="form-control"name="NoOfCandidates"  onChange={handleInputChange} placeholder="Number of Candidates" aria-label="Number of Candidates" aria-describedby="basic-addon2" />
                    </div>

                    {Array.from({ length: FormDetails.NoOfCandidates }, (_, index) => (
                        <div key={index}>
                            <h6>Enter each candidate  {index + 1} details</h6>
                            <div class="input-group mb-3">

                                <input type="text" class="form-control" onChange={(e) => handleTextInputChange(e, index)} placeholder="Candidate Name" aria-label="Candidate Name" aria-describedby="basic-addon2" />



                            </div>
                            <p>Upload logo of the candidate</p>
                            <div class="input-group mb-3">

                                <input type="file"  onChange={(e) =>handleImageChange(e, index)}  accept="image/*" class="form-control" id="myFile" name="filename" />

                            </div>


                            <div class="input-group mb-3">
                                <input type="text" class="form-control" onChange={(e) => handledescInputChange(e, index)} placeholder="Candidate description" aria-label="Candidate description" aria-describedby="basic-addon2" />
                            </div>
                        </div>
                    ))}


                    <p>Enter start time for registration process</p>
                    <div class="input-group mb-3">
                        <input type="datetime-local"name="startregisterTime"  onChange={handleInputChange} class="form-control" />
                    </div>
                    <p>Enter end time for registration process</p>
                    <div class="input-group mb-3">
                        <input type="datetime-local"name="stopregisterTime"  onChange={handleInputChange} class="form-control" />
                    </div>
                    <p>Enter start time for voting process</p>
                    <div class="input-group mb-3">
                        <input type="datetime-local"name="startvotingTime"  onChange={handleInputChange} class="form-control" />
                    </div>
                    <p>Enter end time for voting process</p>
                    <div class="input-group mb-3">
                        <input type="datetime-local"name="stopvotingTime"   onChange={handleInputChange} class="form-control" />
                    </div>
                    <p>Enter start time for results</p>
                    <div class="input-group mb-3">
                        <input type="datetime-local" name="startresultTime"  onChange={handleInputChange} class="form-control" />
                    </div><p>Upload a csv file for to allow only certain organization members to participate voting.(Note ensure that the file has three columns with
                        registration no,phone and email in the correct order)</p>
                    <div class="input-group mb-3">

                        <input type="file" accept=".csv" onChange={handlefile} class="form-control" id="myFile" name="filename" />

                    </div>

                    <div class="input-group mb-3">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </form>

            </div>
        </>
    );
}

export default ChairVotingHome;