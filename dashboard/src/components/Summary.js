import React, { useEffect, useState } from "react";
import axios from "axios";

const Summary = () => {
  const [summary, setSummary] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAll();

    const interval = setInterval(() => {
      fetchAll();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchAll = async () => {
    try {
      const [summaryRes, analyticsRes] = await Promise.all([
        axios.get("http://localhost:3001/portfoliosummary"),
        axios.get("http://localhost:3001/tradeanalytics"),
      ]);

      setSummary(summaryRes.data);
      setAnalytics(analyticsRes.data);
    } catch (err) {
      console.log("Error loading data:", err.message);
    }
  };

  if (!summary || !analytics) {
    return <div>Loading portfolio...</div>;
  }

  const isProfit = summary.totalPnL >= 0;

  return (
    <div className="summary-container">
      <h2>Portfolio Summary</h2>

      <div className="summary-grid">

        <div className="card">
          <h4>Total Invested</h4>
          <h2>₹{summary.totalInvested.toFixed(2)}</h2>
        </div>

        <div className="card">
          <h4>Current Value</h4>
          <h2>₹{summary.currentValue.toFixed(2)}</h2>
        </div>

        <div className="card">
          <h4>Total P&L</h4>
          <h2 style={{ color: isProfit ? "green" : "red" }}>
            ₹{summary.totalPnL.toFixed(2)}
          </h2>
          <p>{summary.pnlPercent}%</p>
        </div>

        <div className="card">
          <h4>Wallet Balance</h4>
          <h2>₹{summary.walletBalance.toFixed(2)}</h2>
        </div>

        <div className="card">
          <h4>Total Holdings</h4>
          <h2>{summary.holdingsCount}</h2>
        </div>

      </div>

      <h2 style={{ marginTop: "40px" }}>Trade Analytics</h2>

      <div className="summary-grid">

        <div className="card">
          <h4>Total Trades</h4>
          <h2>{analytics.totalTrades}</h2>
        </div>

        <div className="card">
          <h4>Total Buy Value</h4>
          <h2>₹{analytics.totalBuyValue.toFixed(2)}</h2>
        </div>

        <div className="card">
          <h4>Total Sell Value</h4>
          <h2>₹{analytics.totalSellValue.toFixed(2)}</h2>
        </div>

        <div className="card">
          <h4>Realized P&L</h4>
          <h2 style={{ color: analytics.realizedPnL >= 0 ? "green" : "red" }}>
            ₹{analytics.realizedPnL.toFixed(2)}
          </h2>
        </div>

        <div className="card">
          <h4>Best Stock</h4>
          <h2>{analytics.bestStock || "-"}</h2>
        </div>

        <div className="card">
          <h4>Worst Stock</h4>
          <h2>{analytics.worstStock || "-"}</h2>
        </div>

      </div>
    </div>
  );
};

export default Summary;