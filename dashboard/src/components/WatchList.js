import React from "react";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Grow from "@mui/material/Grow";
import { watchlist } from "../data/data"; 
import {BarChartOutlined, KeyboardArrowDown,KeyboardArrowUp, MoreHoriz} from '@mui/icons-material';

const WatchList = () => {
  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts">{watchlist.length}/ 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock,index)=>{
          return (
          <WatchListItem stock={stock} key={index}/>

          );
        })}
      </ul>    </div>
  );
};

export default WatchList;

function WatchListItem({stock}){

  const [showWatchListItems,setShowWatchListItems] = useState(false);

  const handleMouseEnter=(e)=>{
setShowWatchListItems(true);
  }

  const handleMouseLeave=(e)=>{
    setShowWatchListItems(false);
  }

return (
  <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> 
  <div className="item">
  <p className={stock.isDown ? "down" : "up" }>{stock.name}</p>
  <div className="itemInfo">
    <span className="percent">{stock.percent}</span>
   {stock.isDown ?
   (
<KeyboardArrowDown className="down"/>
   ) :
   (
<KeyboardArrowUp className="up"/>
   )}
   <span className="price">{stock.price}</span>
  </div>
  </div>
  {showWatchListItems && <WatchListActions uid={stock.name}/>}

  </li>
);
} 

const WatchListActions=({uid})=>{
return (
<span className="actions">
  <span>
    <Tooltip
    title="Buy(B)"
    placement="top"
    arrow
    TransitionComponent={Grow}
    >
      <button className="buy">Buy</button>
    </Tooltip>

    <Tooltip
    title="Sell"
    placement="top"
    arrow
    TransitionComponent={Grow}>
      <button className="sell">Sell</button>
    </Tooltip>

    <Tooltip 
    title="Analytics"
    placement="top"
    TransitionComponent={Grow}>
      <button className="action">
      <BarChartOutlined className="icon"/>
      </button>
    </Tooltip>


  <Tooltip
    title="More"
    placement="top"
    arrow
    TransitionComponent={Grow}>
      <button className="action">
        <MoreHoriz className="icon"/>
      </button>
    </Tooltip>
  </span>
</span>
);
}