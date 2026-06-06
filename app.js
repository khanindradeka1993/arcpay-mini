const connectBtn = document.getElementById("connectBtn");
const addressEl = document.getElementById("address");

connectBtn.addEventListener("click", async () => {
  try {
    if (!window.ethereum) {
      alert("Please install MetaMask or use a Web3 browser");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    const address = accounts[0];

    addressEl.innerText =
      address.substring(0, 6) +
      "..." +
      address.substring(address.length - 4);

    connectBtn.innerText = "Connected";
  } catch (err) {
    console.error(err);
    alert("Wallet connection failed");
  }
});
const receiveBtn = document.getElementById("receiveBtn");

receiveBtn.addEventListener("click", async () => {
  if (!window.ethereum) {
    alert("Connect wallet first");
    return;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts"
  });

  const address = accounts[0];

  navigator.clipboard.writeText(address);

  alert(
    "Wallet address copied:\n\n" + address
  );
});
