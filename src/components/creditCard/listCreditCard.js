import React from "react";
import PropTypes from "prop-types";

const ListCreditCard = ({ cardList }) => {
  return (
    <>
      <h3>Existing Cards</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Card Number</th>
          <th>Balance</th>
          <th>Limit</th>
        </tr>
      </thead>
      <tbody>
        {cardList.map((card) => (
          <tr key={card.id}>
            <td>{card.name}</td>
            <td>{card.card_number}</td>
            <td>$0</td> 
            <td>${card.limit}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

ListCreditCard.prop_types = {
  cardList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    card_number: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired,
  })),
};

export default ListCreditCard;
