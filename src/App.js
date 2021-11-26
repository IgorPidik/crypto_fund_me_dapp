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
    const [modalProjectIndex, setModalProjectIndex] = useState(null)
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
            setContract(null)
            setProjects([])
        } catch (ex) {
            console.log(ex)
        }
    }

    // load and instantiate contract from local json file
    const loadContract = () => {
        axios.get('compiled_contracts/CryptoFundMe.json').then(response => {
            const abi = response.data['abi']
            setContract(new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, abi, library.getSigner(account)))
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
        setModalProjectIndex(projectIndex)
    }

    const handleWithdraw = (projectId) => {
        console.log('withdraw', projectId)
        const project = projects.find(project => project.id === projectId)
        console.log(project)
        contract?.withdrawProjectDonations(projectId).then(tx => {
            tx.wait().then(_ => {
                // TODO: refresh this specific project rather than refreshing all of them
                fetchProjects()
            })
        })
    }

    const handleDonation = (projectId, wei) => {
        const overrides = {
            value: wei
        }
        contract?.fundProject(projectId, overrides).then(tx => {
            tx.wait().then(_ => {
                // TODO: refresh this specific project rather than refreshing all of them
                fetchProjects()
            })
        })
    }

    const handleCreateProject = (title, description) => {
        setShowCreateProjectModal(false)
        contract?.createProject(title, description).then(tx => {
            tx.wait().then(_ => {
                // TODO: create event in contract and then read the newest project id instead of re-fetching all of them
                fetchProjects()
            })
        })
    }

    const projectViews = projects.map((project, index) => {
        return (<div className="col-3" key={project.id}>
            <ProjectCardView project={project} onClick={() => projectClicked(index)}/>
        </div>)
    })

    const modalProject = modalProjectIndex !== null ? projects[modalProjectIndex] : null
    return (
        <div className="App">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid={true}>
                    <Navbar.Brand href="#home">CryptoFundMe</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        {active &&
                        <Nav>
                            <Nav.Link onClick={() => setShowCreateProjectModal(true)}>Create project</Nav.Link>
                        </Nav>
                        }
                        <Nav className="ms-auto">
                            {active ?
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
                          onClose={() => setModalProjectIndex(null)}/>
            <CreateProjectModal show={showCreateProjectModal} onClose={() => setShowCreateProjectModal(false)}
                                onCreateProject={handleCreateProject}/>
        </div>
    );
}

export default App;
