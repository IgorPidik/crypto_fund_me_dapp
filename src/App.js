import './App.css';
import React, {useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import axios from "axios";
import {ethers} from "ethers";
import {injected} from "./connectors";
import {serializeProject} from "./helpers";
import ProjectCardView from "./components/ProjectCardView";
import ProjectModal from "./components/ProjectModal";
import CreateProjectModal from "./components/CreateProjectModal";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

function App() {
    const {active, account, library, activate, deactivate} = useWeb3React()
    const [contract, setContract] = useState(null)
    const [projects, setProjects] = useState([])
    const [modalProject, setModalProject] = useState(null)
    const [showCreateProjectModal, setShowCreateProjectModal] = useState(false)

    const connect = async () => {
        try {
            await activate(injected)
        } catch (ex) {
            console.log(ex)
        }
    }

    // disconnect from a wallet
    const disconnect = () => {
        try {
            deactivate()
        } catch (ex) {
            console.log(ex)
        }
    }

    // load and instantiate contract from local json file
    const loadContract = () => {
        axios.get('compiled_contracts/CryptoFundMe.json').then(response => {
            const abi = response.data['abi']
            setContract(new ethers.Contract('0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab', abi, library.getSigner(account)))
        });
    }

    const fetchProjects = async () => {
        console.log('Fetching projects')
        const projects = []
        const projectsCount = await contract.projectsCount()
        for (let projectIndex = 0; projectIndex < projectsCount; projectIndex++) {
            const projectData = await contract.projectByIndex(projectIndex)
            projects.push(serializeProject(projectData))
        }
        setProjects(projects)
    }

    // automatically load contract when library (w3 provider) is loaded
    useEffect(() => {
        if (library && account) {
            console.log('Loading contract')
            loadContract()
        }
    }, [library, account])

    useEffect(() => {
        if (contract) {
            console.log(contract)
            fetchProjects()
        }
    }, [contract])

    const projectClicked = (projectIndex) => {
        console.log('clicked', projectIndex)
        setModalProject(projects[projectIndex])
    }

    const handleProjectModalClosed = () => {
        setModalProject(null)
    }

    const handleWithdraw = (projectId) => {
        console.log('withdraw', projectId)
        const project = projects.find(project => project.id === projectId)
        console.log(project)
    }

    const handleDonation = (projectId, wei) => {
        console.log('donation', projectId, wei)
    }

    const handleCreateProject = (title, description) => {
        setShowCreateProjectModal(false)
    }

    const projectViews = projects.map((project, index) => {
        return (<div className="col-3" key={project.id}>
            <ProjectCardView project={project} onClick={() => projectClicked(index)}/>
        </div>)
    })

    return (
        <div className="App">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid={true}>
                    <Navbar.Brand href="#home">CryptoFundMe</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => setShowCreateProjectModal(true)}>Create project</Nav.Link>
                        </Nav>
                        <Nav>
                            {account ?
                                <NavDropdown title={account} align="end">
                                    <NavDropdown.Item>My Projects</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item onClick={disconnect}>Disconnect</NavDropdown.Item>
                                </NavDropdown> :
                                <Nav.Link onClick={connect}>Connect</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container fluid={true}>
                <div className="row pt-3">
                    {projectViews}
                </div>
            </Container>

            <ProjectModal project={modalProject} onWithdraw={handleWithdraw} onDonate={handleDonation}
                          onClose={handleProjectModalClosed}/>
            <CreateProjectModal show={showCreateProjectModal} onClose={() => setShowCreateProjectModal(false)}
                                onCreateProject={handleCreateProject}/>
        </div>
    );
}

export default App;
