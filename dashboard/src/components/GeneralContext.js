import React, { useState } from "react";
import TradeWindow from "./BuyActionWindow";

const GeneralContext = React.createContext();

export const GeneralContextProvider = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState("");
  const [mode, setMode] = useState("Buy");

  const openTradeWindow = (uid, type) => {
    setSelectedStock(uid);
    setMode(type);
    setIsOpen(true);
  };

  const closeTradeWindow = () => {
    setIsOpen(false);
  };

  return (
    <GeneralContext.Provider value={{ openTradeWindow, closeTradeWindow }}>
      {props.children}
      {isOpen && <TradeWindow uid={selectedStock} mode={mode} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;