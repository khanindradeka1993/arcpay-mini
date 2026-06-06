import React from "react";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020817",
        color: "white",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <h1
        style={{
          fontSize: "32px",
          marginBottom: "20px",
        }}
      >
        ArcPay Lite
      </h1>

      {/* Balance Card */}
      <div
        style={{
          background: "#0f172a",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <p
          style={{
            color: "#94a3b8",
            margin: 0,
          }}
        >
          Wallet Balance
        </p>

        <h2
          style={{
            fontSize: "36px",
            margin: "10px 0",
          }}
        >
          0.00 USDC
        </h2>

        <p
          style={{
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Wallet not connected
        </p>
      </div>

      {/* Connect Wallet */}
      <button
        style={{
          width: "100%",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "12px",
          padding: "14px",
          fontSize: "16px",
          marginBottom: "15px",
        }}
      >
        Connect Wallet
      </button>

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          style={{
            flex: 1,
            background: "#0f172a",
            color: "white",
            border: "1px solid #1e293b",
            borderRadius: "12px",
            padding: "14px",
          }}
        >
          Send
        </button>

        <button
          style={{
            flex: 1,
            background: "#0f172a",
            color: "white",
            border: "1px solid #1e293b",
            borderRadius: "12px",
            padding: "14px",
          }}
        >
          Receive
        </button>
      </div>

      {/* Recent Activity */}
      <div
        style={{
          background: "#0f172a",
          borderRadius: "16px",
          padding: "20px",
        }}
      >
        <h3>Recent Activity</h3>

        <p style={{ color: "#94a3b8" }}>
          No transactions yet
        </p>
      </div>
    </div>
  );
}

export default App;
