import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3001/allorders");
      setOrders(res.data);
    } catch (err) {
      console.log("Error fetching orders:", err.message);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <h3>No orders placed yet</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <h2>Order History ({orders.length})</h2>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Stock</th>
              <th>Mode</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const total = order.qty * order.price;
              const isBuy = order.mode === "CNC" || order.mode === "MIS";

              return (
                <tr key={order._id}>
                  <td>
                    {new Date(order.createdAt).toLocaleString()}
                  </td>

                  <td>{order.name}</td>

                  <td
                    style={{
                      color:
                        order.mode === "CNC" || order.mode === "MIS"
                          ? "green"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {order.mode}
                  </td>

                  <td>{order.qty}</td>

                  <td>₹{Number(order.price).toFixed(2)}</td>

                  <td
                    style={{
                      color: total >= 0 ? "green" : "red",
                    }}
                  >
                    ₹{total.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;