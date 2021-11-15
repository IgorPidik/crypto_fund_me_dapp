import React from "react";
import {Modal} from "react-bootstrap";
import {ethers} from "ethers";
import {useWeb3React} from "@web3-react/core";


function ProjectModal(props) {
    const {account} = useWeb3React()
    const project = props.project

    if (!project) {
        return null
    }

    const isOwner = account === project.owner
    return (
        <Modal show={true} onHide={props.onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title className="flex-grow-1 text-center">{project.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {project.description}
            </Modal.Body>
            <Modal.Footer className="justify-content-start">
                {isOwner && <>
                    <span>Current balance: {ethers.utils.formatEther(project.balance)} ETH</span>
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
