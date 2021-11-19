import React from "react";
import {Modal} from "react-bootstrap";
import {ethers} from "ethers";
import DonationForm from "./DonationForm";


function ProjectModal(props) {
    const project = props.project

    if (!project) {
        return null
    }

    const onHandleDonation = (wei) => {
        props.onDonate(project.id, wei)
    }

    // const isOwner = account === project.owner
    const isOwner = true
    return (
        <Modal show={true} onHide={props.onClose} centered contentClassName="bg-dark text-light">
            <Modal.Header>
                <Modal.Title className="flex-grow-1 text-center">{project.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {project.description}
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <DonationForm onDonate={onHandleDonation}/>
            </Modal.Footer>
            <Modal.Footer className="justify-content-start">
                {isOwner && <>
                    <div className="d-flex flex-row flex-grow-1 align-items-center justify-content-between">
                        <span>Current balance: {ethers.utils.formatEther(project.balance)} ETH</span>
                        <a className="btn btn-link text-decoration-none p-0"
                           onClick={() => props.onWithdraw(project.id)}>Withdraw</a>
                    </div>
                    <br/>
                </>}
                <span>Total funding: {ethers.utils.formatEther(project.totalDonations)} ETH</span>
                <br/>
                <span>Created by {project.owner}</span>
            </Modal.Footer>
        </Modal>
    );
}

export default ProjectModal;
