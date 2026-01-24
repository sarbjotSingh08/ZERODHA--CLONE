import React from "react";
// import {positions} from '../data/data'
import axios from 'axios';
import { useState,useEffect} from "react";
const Positions = () => {
  const [data,setData]=useState([]);
  useEffect(()=>{
    axios.get("http://localhost:3001/allpositions").then((res)=>{
      setData(res.data);
    }).catch((error)=>{
      console.log(error.message)
    })
  },[])
  return (
    <>
      <h3 className="title">Positions ({data.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>
          {data.map((stock,index)=>{
                     const currValue= stock.price*stock.qty;
                     const isProfit=currValue-stock.avg*stock.qty>=0.0;
                     const profClass = isProfit ? "profit":"loss";
                     const dayClass = stock.isLoss?"loss":"profit";
          return (
            <tr key={stock._id}>
          <td>{stock.product}</td>
          <td>{stock.name}</td>
          <td>{stock.qty}</td>
          <td>{stock.avg.toFixed(2)}</td>
          <td>{stock.price.toFixed(2)}</td>
          <td className={profClass}>
            {(currValue-stock.avg*stock.qty).toFixed(2)}
            </td>
          <td className={dayClass}>{stock.day}</td> 
          
            </tr>
          );
                    })}
          
            
    {/* product: "CNC",
    name: "EVEREADY",
    qty: 2,
    avg: 316.27,
    price: 312.35,
    net: "+0.58%",
    day: "-1.24%",
    isLoss: true, */}
  
        </table>
      </div>
    </>
  );
};

export default Positions;
