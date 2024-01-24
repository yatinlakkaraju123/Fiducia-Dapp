
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import UseBlockchain from '../../../UseBlockchain.js';
import voting from '../../chair/voting.json';
import Button from 'react-bootstrap/Button';
export default function InputReg(props) {
  const [web3, account, loadWeb3, contractAddress] = UseBlockchain();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {setShowModal(false);
    window.location.reload();
  }
  const submit = async(event)=>{
    event.preventDefault();
    const addr = props.scaddr;
    const newContract = new web3.eth.Contract(voting.abi, addr);
    await newContract.methods.register().send({from:account});
    setShowModal(true);
    
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
