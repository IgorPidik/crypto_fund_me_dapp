import './App.css';
import {useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import axios from "axios";
import {ethers} from "ethers";
import {injected} from "./connectors";

function App() {
    const {active, account, library, activate, deactivate} = useWeb3React()
    const [contract, setContract] = useState(null)

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
            setContract(new ethers.Contract('0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab', abi, library))
        });
    }

    // automatically load contract when library (w3 provider) is loaded
    useEffect(() => {
        if (library) {
            console.log('loading contract')
            loadContract()
        }
    }, [library])

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">CryptoFundMe</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav ms-auto">
                            {account ?
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">{account}</a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item">My Projects</a></li>
                                        <li className="dropdown-divider"/>
                                        <li><a className="dropdown-item" onClick={disconnect}>Disconnect</a></li>
                                    </ul>
                                </li> :
                                <a className="nav-link" onClick={connect}>Connect</a>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default App;