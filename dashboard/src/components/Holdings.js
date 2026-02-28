import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalBar } from "./VerticalBar";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  // 🔹 Fetch holdings initially
  useEffect(() => {
    axios
      .get("http://localhost:3001/allholdings")
      .then((res) => {
        setAllHoldings(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  // 🔹 Real-time price update listener
  useEffect(() => {
    socket.on("priceUpdate", (data) => {
      setAllHoldings((prev) =>
        prev.map((stock) =>
          stock.name === data.symbol
            ? { ...stock, price: data.price }
            : stock
        )
      );
    });

    return () => {
      socket.off("priceUpdate");
    };
  }, []);

  const labels = allHoldings.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings {allHoldings.length}</h3>

      <div className="order-table">
        <table>
          <thead>
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
          </thead>

          <tbody>
            {allHoldings.map((stock) => {
              const currValue = stock.price * stock.qty;
              const profit = currValue - stock.avg * stock.qty;
              const isProfit = profit >= 0;
              const profClass = isProfit ? "profit" : "loss";

              return (
                <tr key={stock._id}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{Number(stock.avg).toFixed(2)}</td>
                  <td>{Number(stock.price).toFixed(2)}</td>
                  <td>{currValue.toFixed(2)}</td>
                  <td className={profClass}>{profit.toFixed(2)}</td>
                  <td className={profClass}>{stock.net}</td>
                  <td>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <VerticalBar data={data} />
    </>
  );
};

export default Holdings;