import React, {useState} from "react";
import {ethers} from "ethers";


function DonationForm(props) {
    const currencies = ['wei', 'eth']
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])
    const [donationAmount, setDonationAmount] = useState("")

    const options = currencies.map(currency => {
        return <option key={currency} value={currency}>{currency}</option>
    })

    const handleDonation = () => {
        let wei
        if (selectedCurrency === 'eth') {
            wei = ethers.utils.parseEther(donationAmount)
        } else {
            wei = ethers.BigNumber.from(donationAmount)
        }
        props.onDonate(wei)
    }

    const handleInputChanged = (event) => {
        let newValue = event.target.value
        if (selectedCurrency === 'wei') {
            newValue = newValue.replace(/\D/, '')
        }
       setDonationAmount(newValue)
    }

    return (
        <div className="input-group black-input">
            <input type="number" className="form-control black-input no-selection-effects" placeholder="0" value={donationAmount}
                   onChange={handleInputChanged}/>

            <select className="black-input no-selection-effects"
                    value={selectedCurrency} onChange={e => setSelectedCurrency(e.target.value)}>
                {options}
            </select>
            <div className="input-group-append ms-2">
                <button className="btn btn-success no-selection-effects" type="button"
                        disabled={!donationAmount}
                        onClick={handleDonation}>Donate
                </button>
            </div>
        </div>
    );
}

export default DonationForm;
