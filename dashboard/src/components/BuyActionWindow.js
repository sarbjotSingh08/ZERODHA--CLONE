import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const [productType, setProductType] = useState("CNC");
  const [loading, setLoading] = useState(false);

  const { closeTradeWindow } = useContext(GeneralContext);

  const totalAmount = qty * price;

  const handleTrade = async () => {
    if (!qty || !price) {
      alert("Please enter valid quantity and price");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:3001/neworder", {
        name: uid,
        qty,
        price,
        mode: productType, // CNC or MIS
      });

      alert(
        `✅ Order Successful!\nNew Wallet Balance: ₹${res.data.balance.toFixed(
          2
        )}`
      );

      closeTradeWindow();
    } catch (err) {
      alert(err.response?.data?.error || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" id="trade-window">
      <div className="regular-order">
        <h3 style={{ color: "black" }}>
          Trade {uid}
        </h3>

        <div className="inputs">

          {/* PRODUCT TYPE SELECTOR */}
          <fieldset>
            <legend>Product</legend>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value="CNC">CNC (Delivery)</option>
              <option value="MIS">MIS (Intraday)</option>
            </select>
          </fieldset>

          <fieldset>
            <legend>Quantity</legend>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              min="0"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>
          {productType === "CNC"
            ? `Total Cost: ₹${totalAmount.toFixed(2)}`
            : `Margin Required (20%): ₹${(totalAmount * 0.2).toFixed(2)}`}
        </span>

        <div>
          <button
            className="btn btn-blue"
            onClick={handleTrade}
            disabled={loading}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>

          <button
            className="btn btn-grey"
            onClick={closeTradeWindow}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;