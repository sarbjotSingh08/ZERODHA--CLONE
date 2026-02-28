import React, { useState, useEffect, useContext } from "react";
import Tooltip from "@mui/material/Tooltip";
import Grow from "@mui/material/Grow";
import { io } from "socket.io-client";
import { Doughnut } from "./Doughnut";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import GeneralContext from "./GeneralContext";

const socket = io("http://localhost:3001");

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);

  /* ---------------- REAL TIME PRICE LISTENER ---------------- */

  useEffect(() => {
    socket.on("priceUpdate", (data) => {
      setWatchlist((prev) => {
        const exists = prev.find((s) => s.name === data.symbol);

        if (exists) {
          return prev.map((stock) =>
            stock.name === data.symbol
              ? {
                  ...stock,
                  price: data.price,
                  percent:
                    data.percent !== undefined
                      ? data.percent.toFixed(2) + "%"
                      : "0%",
                  isDown: data.percent < 0,
                }
              : stock
          );
        }

        return [
          ...prev,
          {
            name: data.symbol,
            price: data.price,
            percent:
              data.percent !== undefined
                ? data.percent.toFixed(2) + "%"
                : "0%",
            isDown: data.percent < 0,
          },
        ];
      });
    });

    return () => {
      socket.off("priceUpdate");
    };
  }, []);

  /* ---------------- DOUGHNUT DATA ---------------- */

  const labels = watchlist.map((w) => w.name);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Stock Prices",
        data: watchlist.map((w) => w.price),
        backgroundColor: watchlist.map(
          () => `hsl(${Math.random() * 360},70%,70%)`
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search eg: INFY, TCS..."
          className="search"
        />
        <span className="counts">{watchlist.length}/50</span>
      </div>

      {/* Watchlist Items */}
      <ul className="list">
        {watchlist.map((stock) => (
          <WatchListItem stock={stock} key={stock.name} />
        ))}
      </ul>

      {/* Doughnut Chart */}
      <Doughnut data={chartData} />
    </div>
  );
};

export default WatchList;

/* ================= ITEM ================= */

function WatchListItem({ stock }) {
  const [showActions, setShowActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>
          {stock.name}
        </p>

        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>

          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}

          <span className="price">
            ₹{stock.price?.toFixed(2)}
          </span>
        </div>
      </div>

      {showActions && <WatchListActions uid={stock.name} />}
    </li>
  );
}

/* ================= ACTION BUTTONS ================= */

const WatchListActions = ({ uid }) => {
  const { openTradeWindow } = useContext(GeneralContext);

  return (
    <span className="actions">
      <Tooltip title="Buy" arrow TransitionComponent={Grow}>
        <button
          className="buy"
          onClick={() => openTradeWindow(uid, "Buy")}
        >
          Buy
        </button>
      </Tooltip>

      <Tooltip title="Sell" arrow TransitionComponent={Grow}>
        <button
          className="sell"
          onClick={() => openTradeWindow(uid, "Sell")}
        >
          Sell
        </button>
      </Tooltip>

      <Tooltip title="Analytics" arrow TransitionComponent={Grow}>
        <button className="action">
          <BarChartOutlined />
        </button>
      </Tooltip>

      <Tooltip title="More" arrow TransitionComponent={Grow}>
        <button className="action">
          <MoreHoriz />
        </button>
      </Tooltip>
    </span>
  );
};