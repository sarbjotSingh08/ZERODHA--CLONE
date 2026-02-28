import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const Positions = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = () => {
    axios
      .get("http://localhost:3001/allpositions")
      .then((res) => setPositions(res.data))
      .catch((err) => console.log(err.message));
  };

  /* 🔹 Real-time price updates */
  useEffect(() => {
    socket.on("priceUpdate", (data) => {
      setPositions((prev) =>
        prev.map((pos) =>
          pos.name === data.symbol
            ? { ...pos, price: data.price }
            : pos
        )
      );
    });

    return () => {
      socket.off("priceUpdate");
    };
  }, []);

  /* 🔹 Close position */
  const handleClose = async (id) => {
    if (!window.confirm("Close this position?")) return;

    try {
      const res = await axios.post("http://localhost:3001/closeposition", {
        id,
      });

      alert(
        `Position Closed\nP&L: ₹${res.data.pnl.toFixed(2)}\nNew Balance: ₹${res.data.balance.toFixed(2)}`
      );

      fetchPositions();
    } catch (err) {
      alert(err.response?.data?.error || "Error closing position");
    }
  };

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {positions.map((stock) => {
              const invested = stock.qty * stock.avg;
              const currentValue = stock.qty * stock.price;
              const pnl = currentValue - invested;

              const profClass = pnl >= 0 ? "profit" : "loss";

              return (
                <tr key={stock._id}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>

                  <td className={profClass}>
                    ₹{pnl.toFixed(2)}
                  </td>

                  <td>
                    <button
                      className="btn btn-red"
                      onClick={() => handleClose(stock._id)}
                    >
                      Close
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;