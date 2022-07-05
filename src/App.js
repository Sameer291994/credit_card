import "./App.css";
import React, {useEffect, useState} from "react";
import AddCreditCard from "./components/creditCard/addCreditCard";
import ListCreditCard from "./components/creditCard/listCreditCard";
import { getRequest } from "./utils/request";

function App() {
  const [cardList, setCardList] = useState([]);

  const getCreditCardList = async () => {
    try {
      const data = await getRequest("/credit_cards")
      setCardList(data)
    } catch (e) {

    }
  };

  useEffect(() => {
    getCreditCardList();
  }, []);

  return (
    <div className="App">
      <AddCreditCard refreshCreditCardList={getCreditCardList} />
      <ListCreditCard cardList={cardList} />
    </div>
  );
}

export default App;
