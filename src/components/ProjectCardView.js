import React from "react";
import {ethers} from "ethers";
import {Card} from "react-bootstrap";


function ProjectCardView(props) {
    return (
        <Card bg={'dark'} text={'white'} className="mb-3">
            <Card.Body>
                <Card.Title className="text-center"><a onClick={props.onClick}>Project
                    #{props.project.id.toString()}: {props.project.name}</a></Card.Title>
                <Card.Text className="project-description-line-clamp">
                    {props.project.description}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <span>Total funding: {ethers.utils.formatEther(props.project.totalDonations)} ETH</span>
            </Card.Footer>
        </Card>
    );
}

export default ProjectCardView;
