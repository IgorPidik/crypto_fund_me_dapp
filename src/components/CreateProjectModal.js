import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";


function CreateProjectModal(props) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const handleCreatePressed = () => {
        props.onCreateProject(title, description)
        // clear the fields for next project
        setTitle("")
        setDescription("")
    }

    return (
        <Modal show={props.show} onHide={props.onClose} centered contentClassName="bg-dark text-light">
            <Modal.Header>
                <Modal.Title className="flex-grow-1 text-center">Create a new project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" className="black-input" placeholder="Enter project title"
                                      value={title} onChange={e => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" className="black-input" placeholder="Enter project description"
                                      value={description} onChange={e => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <div className="d-grid">
                        <Button variant="success" size="lg" disabled={!title || !description}
                                onClick={handleCreatePressed}>Create</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default CreateProjectModal;
