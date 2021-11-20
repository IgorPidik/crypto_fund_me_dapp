import React from "react";
import {Col, Container, Modal, Row} from "react-bootstrap";
import {ethers} from "ethers";
import DonationForm from "./DonationForm";
import {useWeb3React} from "@web3-react/core";


function ProjectModal(props) {
    const {account} = useWeb3React()
    const project = props.project

    if (!project) {
        return null
    }

    const onHandleDonation = (wei) => {
        props.onDonate(project.id, wei)
    }

    const isOwner = account === project.owner

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
                <Container fluid={true} className="p-0">
                    {isOwner && <Row>
                        <Col><span>Current balance: {ethers.utils.formatEther(project.balance)} ETH</span></Col>
                        <Col className="col-auto">
                            <a className="btn btn-link text-decoration-none p-0"
                               onClick={() => props.onWithdraw(project.id)}>Withdraw</a>
                        </Col>
                    </Row>}
                    <Row><span>Total funding: {ethers.utils.formatEther(project.totalDonations)} ETH</span></Row>
                    <Row><span>Created by {project.owner}</span></Row>
                </Container>
            </Modal.Footer>
        </Modal>
    );
}

export default ProjectModal;
