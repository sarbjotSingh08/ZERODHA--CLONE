import React, { useEffect, useState } from "react";
import axios from "axios";

const Funds = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = () => {
    axios
      .get("http://localhost:3001/balance")
      .then((res) => setBalance(res.data.balance));
  };

  const handleAddFunds = async () => {
    const amount = Number(prompt("Enter amount to add:"));

    if (!amount) return;

    try {
      const res = await axios.post(
        "http://localhost:3001/addfunds",
        { amount }
      );
      setBalance(res.data.balance);
    } catch (err) {
      alert(err.response?.data?.error);
    }
  };

  const handleWithdraw = async () => {
    const amount = Number(prompt("Enter amount to withdraw:"));

    if (!amount) return;

    try {
      const res = await axios.post(
        "http://localhost:3001/withdraw",
        { amount }
      );
      setBalance(res.data.balance);
    } catch (err) {
      alert(err.response?.data?.error);
    }
  };

  const handleOpenAccount = () => {
    alert("Commodity account feature coming soon 🚀");
  };

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <button className="btn btn-green" onClick={handleAddFunds}>
          Add funds
        </button>
        <button className="btn btn-blue" onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>

      <div className="row">
        <div className="col">
          <h2>Wallet Balance</h2>
          <h1 style={{ color: "green" }}>
            ₹{balance.toFixed(2)}
          </h1>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <button
              className="btn btn-blue"
              onClick={handleOpenAccount}
            >
              Open Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;