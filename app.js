import React, { useState } from "react";

export default function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("0.00");
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");

  const connectWallet = async () => {
    try {
      // Check wallet provider
      if (!window.ethereum) {
        alert("Open this app inside MetaMask or Rabby browser");
        return;
      }

      // Request account
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const account = accounts[0];

      setWalletAddress(account);

      // Get balance
      const balanceWei = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });

      const balanceEth =
        parseInt(balanceWei, 16) / Math.pow(10, 18);

      setBalance(balanceEth.toFixed(4));

      alert("Wallet Connected Successfully");
    } catch (error) {
      console.error(error);
      alert(error.message || "Connection Failed");
    }
  };

  const sendUSDC = async () => {
    if (!walletAddress) {
      alert("Connect wallet first");
      return;
    }

    if (!username || !amount) {
      alert("Enter username and amount");
      return;
    }

    alert(
      `Demo Payment Sent\nTo: ${username}\nAmount: ${amount} USDC`
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020817",
        color: "white",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        ArcPay Mini
      </h1>

      {/* Wallet Card */}
      <div
        style={{
          background: "#0f172a",
          padding: "20px",
          borderRadius: "16px",
          marginBottom: "20px",
        }}
      >
        <p style={{ color: "#94a3b8" }}>Wallet Balance</p>

        <h2 style={{ fontSize: "36px", margin: "10px 0" }}>
          {balance}
        </h2>

        <p style={{ fontSize: "12px", color: "#64748b" }}>
          {walletAddress
            ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
            : "Wallet not connected"}
        </p>
      </div>

      {/* Connect Button */}
      <button
        onClick={connectWallet}
        style={{
          width: "100%",
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "14px",
          borderRadius: "12px",
          fontSize: "16px",
          marginBottom: "16px",
          cursor: "pointer",
        }}
      >
        Connect Wallet
      </button>

      {/* Username Input */}
      <input
        type="text"
        placeholder="@username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          marginBottom: "16px",
          background: "#e5e7eb",
        }}
      />

      {/* Amount Input */}
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          marginBottom: "16px",
          background: "#e5e7eb",
        }}
      />

      {/* Send Button */}
      <button
        onClick={sendUSDC}
        style={{
          width: "100%",
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "14px",
          borderRadius: "12px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Send USDC
      </button>
    </div>
  );
}
