import React from "react";
import { useState,useEffect } from "react";
// import {holdings} from '../data/data.js'
import axios from 'axios';
const Holdings = () => {
  const [data,setData]=useState([]);
  useEffect(()=>{
    axios.get("http://localhost:3001/allholdings").
    then((res)=>{
    setData(res.data);
  }).
  catch((error)=>{
    console.log(error.message)
  })},[]);
  return (
    <>
      <h3 className="title">Holdings {data.length}</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>
          
          {data.map((stock)=>{
           const currValue= stock.price*stock.qty;
           const isProfit=currValue-stock.avg*stock.qty>=0.0;
           const profClass = isProfit ? "profit":"loss";
           const dayClass = stock.isLoss?"loss":"profit";
return (
  <tr key={stock._id}>
<td>{stock.name}</td>
<td>{stock.qty}</td>
<td>{Number(stock.avg).toFixed(2)}</td>
<td>{Number(stock.price).toFixed(2)}</td>
<td>{currValue.toFixed(2)}</td>
<td className={profClass}>
  {(currValue-stock.avg*stock.qty).toFixed(2)}
  </td>
<td className={profClass}>{stock.net}</td>
<td className={dayClass}>{stock.day}</td>

  </tr>
);
          })}

        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
