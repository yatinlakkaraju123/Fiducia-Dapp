import React ,{useState,useEffect}from 'react'
import Papa from 'papaparse'
import axios from 'axios';
import moment from 'moment'
import UseBlockchain from '../../../UseBlockchain';
import Feedback from "../Feedback.json"
import { Form } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
export default function OtherInput(props) {
   
    const [ipfs,setIpfs] = useState("")
    const [web3, account, loadWeb3, contractAddress] = UseBlockchain();
    const [showModal, setShowModal] = useState(false);
    const [token, settoken] = useState('');
    const [tokenArray, setToken] = useState([])
    const No = props.data.no
    const EventName = props.data.eName
    const qArray = props.data.QuestionArray
    const typeArray = props.data.typeArray
    const opArray = props.data.optArray
    const [FormDetails, setFormDetails] = useState({
        
        startregisterTime: 0,
        stopregisterTime: 0,
        startvotingTime: 0,
        stopvotingTime: 0,
        startresultTime: 0,

    })
    const [columnDataArrays, setColumnDataArrays] = useState([]);
    const handleClose = () => {setShowModal(false)};
    const [data, setData] = useState();
    const [columnArray, setColumnArray] = useState([]);
    const [valueArray, setValueArray] = useState([]);
    useEffect(() => {
        console.log(ipfs);
        const deployContract = async () => {
            try
            {
                const registrationArray = columnDataArrays[columnArray[0]] || [];
                //console.log(registrationArray);
                const phoneArray = columnDataArrays[columnArray[1]] || [];
                //console.log(phoneArray);
                const emailArray = columnDataArrays[columnArray[2]] || [];
                //console.log(emailArray);
                const Times = [FormDetails.startregisterTime,FormDetails.stopregisterTime,FormDetails.startvotingTime,FormDetails.stopvotingTime
                ,FormDetails.startresultTime];
        const myContract = new web3.eth.Contract(Feedback.abi);
        
        // Get the user's accounts
        const accounts = await web3.eth.getAccounts();
        
        // Deploy the contract
        const deployedContract = await myContract.deploy({ data: Feedback.bytecode,
            arguments: [ipfs,registrationArray,phoneArray,emailArray,Times,No]  })
            .send({ from: accounts[0] });
        //console.log('Contract deployed at:', deployedContract.options.address);
        const i = await deployedContract.methods.Ipfs().call()
        console.log("from smart contract:"+i);
        const token = Math.floor(100000 + Math.random() * 900000);
while (tokenArray.indexOf(token) != -1) {
    token = Math.floor(100000 + Math.random() * 900000);
}
const addr = deployedContract.options.address;
settoken(token);
axios.post("http://localhost:3001/deploy", { smartcontractaddress: addr, token }).then(result => {
    //console.log(result)
}).catch(err => console.log(err))
setShowModal(true);
try {
    const response = await axios.post('http://localhost:3001/sendTokensFeedback', {
        emailArray,
        token,
        EventName: EventName
    });

    if (response.data.success) {
        console.log('Tokens sent successfully');
    } else {
        console.error('Failed to send tokens');
    }
} catch (error) {
    console.error('Error sending tokens:', error);
}

            }catch(error)
            {
                console.log(error);
            }
        }
        if (ipfs !== "") {
            deployContract()
        }
    
      }, [ipfs]);
    useEffect(
        () => {
            axios.get("http://localhost:3001").then(result => {
                const dta = result.data;
                const arr = dta.map((d) => {
                    return (d.token)
                })
                //console.log(arr);
                setToken(arr)
            }).catch(err => console.log(err));

        }, []
    )
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Update the state with the new form data
        if (name == 'startregisterTime' || name == 'stopregisterTime' || name == 'startvotingTime' || name == 'stopvotingTime' || name == 'startresultTime') {
            setFormDetails({
                ...FormDetails,
                [name]: moment(value).unix(),
            });
        }
        else {
            setFormDetails({
                ...FormDetails,
                [name]: value,
            });
        }
    }
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
    const submit = async (event) => {
        event.preventDefault();
       // console.log(columnDataArrays)
        //console.log(FormDetails)
        //console.log(No)
        //console.log(EventName)
        //console.log(qArray)
        //console.log(opArray)
       // console.log(typeArray)
       const jsonData = {
        eventName: EventName,
        FeedbackQuestions: qArray.map((question, index) => ({
          question,
          type: typeArray[index] === '1' ? 'text' : 'options',
          options: typeArray[index] === '1' ? null : opArray[index],
        })),
      };
        const jsonString = JSON.stringify(jsonData, null, 2);
await axios.post("http://localhost:3001/sendJSON",{_jsonString:jsonString,token:2}).then(result=>{
    console.log(result.data.IPFS);
    const updatedIpfs = String(result.data.IPFS);
    setIpfs(updatedIpfs);
    console.log(updatedIpfs);  
}).catch(error=>console.log(error.response.data))

/*try {
    const result = await axios.post('http://localhost:3001/sendIPFS');
    const updatedIpfs = String(result.data.IPFS);
    setIpfs(updatedIpfs);
    console.log(updatedIpfs);  // Log the updated IPFS hash
    // Perform any other actions that depend on the updated IPFS hash
} catch (error) {
    console.error('Error fetching IPFS:', error);
}
console.log(ipfs)*/



    }
    return (
        <div>
              <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Voting Event Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Congratulations you have created the feedback form with token no {token}</p>
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
            <form onSubmit={submit}>
                <p>Enter start time for registration process</p>
                <div class="input-group mb-3">
                    <input type="datetime-local" name="startregisterTime" onChange={handleInputChange} class="form-control" />
                </div>
                <p>Enter end time for registration process</p>
                <div class="input-group mb-3">
                    <input type="datetime-local" name="stopregisterTime" onChange={handleInputChange} class="form-control" />
                </div>
                <p>Enter start time for voting process</p>
                <div class="input-group mb-3">
                    <input type="datetime-local" name="startvotingTime" onChange={handleInputChange} class="form-control" />
                </div>
                <p>Enter end time for voting process</p>
                <div class="input-group mb-3">
                    <input type="datetime-local" name="stopvotingTime" onChange={handleInputChange} class="form-control" />
                </div>
                <p>Enter start time for results</p>
                <div class="input-group mb-3">
                    <input type="datetime-local" name="startresultTime" onChange={handleInputChange} class="form-control" />
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
    )
}
