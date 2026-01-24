import React, { useState, useContext } from "react";
import Tooltip from "@mui/material/Tooltip";
import Grow from "@mui/material/Grow";
import { watchlist } from "../data/data";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import GeneralContext from "./GeneralContext";   // CHECK PATH

const WatchList = () => {
  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search eg: infy, bse, nifty"
          className="search"
        />
        <span className="counts">{watchlist.length}/50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => (
          <WatchListItem stock={stock} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default WatchList;


// ================= ITEM ==================

function WatchListItem({ stock }) {
  const [showActions, setShowActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>

        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>

          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}

          <span className="price">{stock.price}</span>
        </div>
      </div>

      {showActions && <WatchListActions uid={stock.name} />}
    </li>
  );
}


// ================= ACTION BUTTONS ==================

const WatchListActions = ({ uid }) => {

  const { openBuyWindow } = useContext(GeneralContext);

  const handleBuyClick = () => {
    console.log("BUY CLICKED:", uid);
    openBuyWindow(uid);   // OPEN POPUP
  };

  return (
    <span className="actions">
      <span>

        <Tooltip title="Buy (B)" arrow TransitionComponent={Grow}>
          <button className="buy" onClick={handleBuyClick}>
            Buy
          </button>
        </Tooltip>

        <Tooltip title="Sell" arrow TransitionComponent={Grow}>
          <button className="sell">Sell</button>
        </Tooltip>

        <Tooltip title="Analytics" TransitionComponent={Grow}>
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>

        <Tooltip title="More" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>

      </span>
    </span>
  );
};
