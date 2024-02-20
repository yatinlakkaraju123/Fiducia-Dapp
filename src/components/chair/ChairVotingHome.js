import ChairHomeNavbar from "../navbars/ChairHomeNavbar";
import { useState, useEffect } from "react";

import Web3 from "web3";
import Papa from "papaparse";
import axios from "axios";
import { storage } from "../../firebase.js";
import { ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import moment from "moment";
import voting from "./voting.json";
import UseBlockchain from "../../UseBlockchain.js";
import { Form } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ChairVotingHome() {
  const [tokenArray, setToken] = useState([]);
  const [web3, account, loadWeb3, contractAddress] = UseBlockchain();
  const [FormDetails, setFormDetails] = useState({
    eventName: "",
    NoOfCandidates: 0,
    startregisterTime: 0,
    stopregisterTime: 0,
    startvotingTime: 0,
    stopvotingTime: 0,
    startresultTime: 0,
  });

  const [NoOfCandidates, setNoOfCandidates] = useState(0);
  const [columnDataArrays, setColumnDataArrays] = useState([]);

  const [data, setData] = useState();
  const [columnArray, setColumnArray] = useState([]);
  const [valueArray, setValueArray] = useState([]);
  const [candidatesNames, setCandidatesNames] = useState([]);
  const [candidatesImages, setCandidatesImages] = useState([]);
  const [candidatesdesc, setCandidatesdesc] = useState([]);
  const [token, settoken] = useState("");
  // alerts
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001")
      .then((result) => {
        const dta = result.data;
        const arr = dta.map((d) => {
          return d.token;
        });
        //console.log(arr);
        setToken(arr);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the state with the new form data
    if (
      name == "startregisterTime" ||
      name == "stopregisterTime" ||
      name == "startvotingTime" ||
      name == "stopvotingTime" ||
      name == "startresultTime"
    ) {
      setFormDetails({
        ...FormDetails,
        [name]: moment(value).unix(),
      });
    } else {
      setFormDetails({
        ...FormDetails,
        [name]: value,
      });
    }
  };

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
        setData(result.data);
        setColumnArray(columnArray[0]);
        setValueArray(valueArray);
        setColumnDataArrays(columnDataArrays);
      },
    });
  };
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

    //console.log(FormDetails.startregisterTime);
    // Set up Truffle contract
    const myContract = new web3.eth.Contract(voting.abi);

    // Get the user's accounts
    const accounts = await web3.eth.getAccounts();

    // Deploy the contract
    const deployedContract = await myContract
      .deploy({ data: voting.bytecode })
      .send({ from: accounts[0] });
    //console.log(columnDataArrays[0]);
    //console.log('Contract deployed at:', deployedContract.options.address);
    const addr = String(deployedContract.options.address);
    const token = Math.floor(100000 + Math.random() * 900000);
    while (tokenArray.indexOf(token) != -1) {
      token = Math.floor(100000 + Math.random() * 900000);
    }
    settoken(token);
    //setShowModal(true);
    alert(` Congratulations you have created the voting event with token no
    ${token}`)
    const ImageFileNames = [];
    for (let i = 0; i < FormDetails.NoOfCandidates; i++) {
      if (candidatesImages[i] === undefined || candidatesImages[i] === null) {
        //console.log("it is undefined");
        return;
      } else {
        //onsole.log("Image data:", candidatesImages[i]);
        const name = `images/${token}/${i}`;
        const imageRef = ref(storage, name);
        ImageFileNames.push(name);
        // console.log("Before uploading image:", i);
        uploadBytesResumable(imageRef, candidatesImages[i], {
          contentType: candidatesImages[i].type,
        })
          .then(() => {
            console.log("Image uploaded successfully:", i);
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
          });
        //  console.log("After uploading image:", i);
      }
    }
    //console.log(addr);
    axios
      .post("http://localhost:3001/deploy", {
        smartcontractaddress: addr,
        token,
      })
      .then((result) => {
        //console.log(result)
      })
      .catch((err) => console.log(err));
    const registrationArray = columnDataArrays[columnArray[0]] || [];
    console.log(registrationArray);
    const phoneArray = columnDataArrays[columnArray[1]] || [];
    console.log(phoneArray);
    const emailArray = columnDataArrays[columnArray[2]] || [];
    console.log(emailArray);
    try {
      const response = await axios.post("http://localhost:3001/sendTokens", {
        emailArray,
        token,
        EventName: FormDetails.eventName,
      });

      if (response.data.success) {
        console.log("Tokens sent successfully");
      } else {
        console.error("Failed to send tokens");
      }
    } catch (error) {
      console.error("Error sending tokens:", error);
    }
    try {
      // Assuming you have the deployed contract instance stored in 'deployedContract'

      // Assuming you have the correct data in candidatesdesc and FormDetails

      await deployedContract.methods
        .set(
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
        )
        .send({ from: accounts[0] });
    } catch (error) {
      console.log(error);
    }

    //window.location.reload();
  };

  return (
    <>
      <ChairHomeNavbar />

      <div className="">
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Voting Event Created</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Congratulations you have created the voting event with token no{" "}
              {token}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="flex flex-col py-3 bg-white">
          <div className="flex gap-5 justify-between items-start px-px mt-2 w-full text-sm text-zinc-400 max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1 self-end px-5 pb-2.5 mt-12 max-md:mt-10 max-md:max-w-full">
              <div className="self-center text-4xl font-normal text-black underline">
                Enter Form to start Voting Event
              </div>
              <div className="self-start mt-3">Enter Event Name</div>
              <input
                type="text"
                name="eventName"
                onChange={handleInputChange}
                className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full"
              />
              <div className="self-start mt-3">Enter Number of Candidates</div>
              <input
                type="number"
                name="NoOfCandidates"
                onChange={handleInputChange}
                className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full"
              />
              
              {Array.from(
                { length: FormDetails.NoOfCandidates },
                (_, index) => (
                  <>
                    <h6 className="self-start mt-3">Enter each candidate {index + 1} details</h6>

                    <input
                      type="text"
                      onChange={(e) => handleTextInputChange(e, index)}
                      className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full"
                    />

                    <p className="self-start mt-3">Upload logo of the candidate</p>

                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e, index)}
                      accept="image/*"
                      c
                      id="myFile"
                      name="filename"
                    />
                    <div className="self-start mt-3"> Enter Candidate description</div>
                    <input
                      type="textarea"
                      onChange={(e) => handledescInputChange(e, index)}
                      className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full"
                    />
                  </>
                )
              )}
              <p className="self-start mt-3">Enter start time for registration process</p>

              <input
                type="datetime-local"
                name="startregisterTime"
                onChange={handleInputChange}
                className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full"
              />

              <p className="self-start mt-3">
                Enter end time for registration process
              </p>

              <input
                type="datetime-local"
                name="stopregisterTime"
                onChange={handleInputChange}
                className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full"
              />

              <p className="self-start mt-3">Enter start time for voting process</p>

              <input
                type="datetime-local"
                name="startvotingTime"
                onChange={handleInputChange}
                className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full"
              />

              <p className="self-start mt-3">Enter end time for voting process</p>

              <input
                type="datetime-local"
                name="stopvotingTime"
                onChange={handleInputChange}
                className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full"
              />

              <p className="self-start mt-3">Enter start time for results</p>

              <input
                type="datetime-local"
                name="startresultTime"
                onChange={handleInputChange}
                className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full"
              />
              <p className="self-start mt-3">
                Upload a csv file for to allow only certain organization members
                to participate voting.(Note ensure that the file has three
                columns with registration no,phone and email in the correct
                order)
              </p>

              <input
                type="file"
                accept=".csv"
                onChange={handlefile}
                class="form-control"
                id="myFile"
                name="filename"
              />

              <button
                type="submit"
                className="justify-center self-center px-14 py-6 mt-8 text-2xl text-black capitalize whitespace-nowrap shadow-sm bg-zinc-300 rounded-[40px] max-md:px-5"
                onClick={submitForm}
              >
                Submit
              </button>
            
        
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChairVotingHome;
/*
  <form onSubmit={submitForm} className="max-md:max-w-full" >

                    <input type="text" name="eventName" onChange={handleInputChange} className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full"/><br></br>





                    <input type="number"  name="NoOfCandidates" onChange={handleInputChange}  />


                    {Array.from({ length: FormDetails.NoOfCandidates }, (_, index) => (
                        <div key={index}>
                            <h6>Enter each candidate  {index + 1} details</h6>


                            <input type="text" class="form-control" onChange={(e) => handleTextInputChange(e, index)} placeholder="Candidate Name" aria-label="Candidate Name" aria-describedby="basic-addon2" />




                            <p>Upload logo of the candidate</p>


                            <input type="file" onChange={(e) => handleImageChange(e, index)} accept="image/*" class="form-control" id="myFile" name="filename" />





                            <input type="text" class="form-control" onChange={(e) => handledescInputChange(e, index)} placeholder="Candidate description" aria-label="Candidate description" aria-describedby="basic-addon2" />

                        </div>
                    ))}


                    <p>Enter start time for registration process</p>

                    <input type="datetime-local" name="startregisterTime" onChange={handleInputChange} class="form-control" />

                    <p>Enter end time for registration process</p>

                    <input type="datetime-local" name="stopregisterTime" onChange={handleInputChange} class="form-control" />

                    <p>Enter start time for voting process</p>

                    <input type="datetime-local" name="startvotingTime" onChange={handleInputChange} class="form-control" />

                    <p>Enter end time for voting process</p>

                    <input type="datetime-local" name="stopvotingTime" onChange={handleInputChange} class="form-control" />

                    <p>Enter start time for results</p>

                    <input type="datetime-local" name="startresultTime" onChange={handleInputChange} class="form-control" />
                    <p>Upload a csv file for to allow only certain organization members to participate voting.(Note ensure that the file has three columns with
                        registration no,phone and email in the correct order)</p>


                    <input type="file" accept=".csv" onChange={handlefile} class="form-control" id="myFile" name="filename" />




                    <button type="submit" class="btn btn-primary" onClick={submitForm}>Submit</button>

                </form>

*/
