import React from "react";


function ProjectView(props) {


    return (
        <div className={'col-3'}>
            <div className="card text-white bg-dark mb-3">
                <div className="card-body">
                    <h5 className="card-title">Dark card title</h5>
                    <div className="card-text">
                        <p>{props.project.id.toString()}</p>
                        <p>{props.project.name}</p>
                        <p>{props.project.description}</p>
                        <p>{props.project.owner}</p>
                        <p>{props.project.balance.toString()}</p>
                        <p>{props.project.totalDonations.toString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectView;
