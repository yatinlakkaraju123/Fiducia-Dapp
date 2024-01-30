
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import UseBlockchain from '../../../../UseBlockchain.js';
import feedback from '../../../chair/Feedback.json';
import Button from 'react-bootstrap/Button';
export default function Reg(props) {
  const [web3, account, loadWeb3, contractAddress] = UseBlockchain();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {setShowModal(false);
    window.location.reload();
  }
  const submit = async(event)=>{
    event.preventDefault();
    const addr = props.data.scaddr;
    const regIndx1 = props.data.regIndx;
    const newContract = new web3.eth.Contract(feedback.abi, addr);
    
    try
    { console.log(regIndx1);
      await newContract.methods.register(regIndx1).send({from:account});
      setShowModal(true);
    }catch(error)
    {
      console.log(error); 
    }
    
    
  }
  return (
    <div>
        <form onSubmit={submit}>
        <button type="submit" className="btn btn-primary">Register</button>
        </form>
        <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Done</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Congratulations you have registered for voting</p>
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
