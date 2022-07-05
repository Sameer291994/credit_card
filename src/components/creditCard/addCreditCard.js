import "./style.css";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { postRequest } from "../../utils/request";

const AddCreditCard = ({ refreshCreditCardList }) => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [limit, setLimit] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState({});
  const arr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

  const validateCreditCard = () => {
    let nDigits = cardNumber.length;
 
        let nSum = 0;
        let isSecond = false;
        for (let i = nDigits - 1; i >= 0; i--)
        {
 
            let d = cardNumber[i].charCodeAt() - '0'.charCodeAt();
 
            if (isSecond === true)
                d = d * 2;
 
            // We add two digits to handle
            // cases that make two digits
            // after doubling
            nSum += parseInt(d / 10, 10);
            nSum += d % 10;
 
            isSecond = !isSecond;
        }
        return (nSum % 10 === 0);
  };

  useEffect(() => {
    let isValidAll = true
    if (!name) {
      isValidAll = false;
    } else if (!validateCreditCard()) {
      isValidAll = false;
    } else if (!limit) {
      isValidAll = false;
    }
    setIsValid(isValidAll)
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postRequest("/credit_cards", {
        name,
        card_number: cardNumber,
        limit,
      })
      refreshCreditCardList()
    } catch (e) {
      const err = e.response.data;
      setError(err);
    }
  };

  return (
    <>
      <h3>Add</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value?.trim())} />
          {error.name && <p className="error">Name {error.name[0]}</p>}
        </div>
        <div className="form-field">
          <label>Card Number</label>
          <input name={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
          {error.card_number && <p className="error">Card Number {error.card_number[0]}</p>}
        </div>
        <div className="form-field">
          <label>Limit</label>
          <input value={limit} onChange={(e) => setLimit(e.target.value)} />
          {error.limit && <p className="error">Limit {error.limit[0]}</p>}
        </div>
        <button className="add-card-button" disabled={!isValid} type="submit">Add</button>
      </form>
    </>
  )
}

AddCreditCard.prop_types = {
  refreshCreditCardList: PropTypes.func.isRequired,
};

export default AddCreditCard;
