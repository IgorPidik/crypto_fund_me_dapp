import React from "react";


function ProjectView(props) {


    return (
        <div className={'col-3'}>
            <div className="card text-white bg-dark mb-3">
                <div className="card-body">
                    <h5 className="card-title text-center">Project #{props.project.id.toString()}: {props.project.name}</h5>
                    <div className="card-text">
                        <p>{props.project.description}</p>
                        <p>{props.project.owner}</p>
                        <p>{props.project.balance.toString()}</p>
                        <p>{props.project.totalDonations.toString()}</p>
                    </div>
                </div>
                <div className="card-footer">
                    2 days ago
                </div>
            </div>
        </div>
    );
}

export default ProjectView;
