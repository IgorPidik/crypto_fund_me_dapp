import React from "react";
import {ethers} from "ethers";


function ProjectView(props) {
    return (
        <div className={'col-3'}>
            <div className="card text-white bg-dark mb-3">
                <div className="card-body">
                    <h5 className="card-title text-center">Project #{props.project.id.toString()}: {props.project.name}</h5>
                    <div className="card-text">
                        <p>{props.project.description}</p>
                    </div>
                </div>
                <div className="card-footer">
                    <span>Total funding: {ethers.utils.formatEther(props.project.totalDonations)} ETH</span>
                </div>
            </div>
        </div>
    );
}

export default ProjectView;
