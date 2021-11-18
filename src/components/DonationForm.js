import React from "react";


function DonationForm(props) {
    return (
        <div className="input-group black-input">
            <input type="number" className="form-control black-input no-selection-effects" placeholder="0"/>

            <select className="custom-select black-input no-selection-effects" id="inputGroupSelect04">
                <option value="eth" selected>ETH</option>
                <option value="wei">Wei</option>
            </select>
            <div className="input-group-append ms-2">
                <button className="btn btn-success no-selection-effects" type="button">Donate</button>
            </div>
        </div>
    );
}

export default DonationForm;
