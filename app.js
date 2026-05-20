async function connectWallet() {

  const status =
  document.getElementById("status");

  if (!window.ethereum) {

    status.innerText =
    "MetaMask not found";

    return;
  }

  try {

    const accounts =
    await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    const address =
    accounts[0];

    const balanceHex =
    await window.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"]
    });

    const balance =
    parseInt(balanceHex,16) / 1e18;

    status.innerText =
    "Connected:\n" +
    address +
    "\n\nBalance:\n" +
    balance.toFixed(4);

  } catch (error) {

    console.log(error);

    status.innerText =
    "Connection Failed";

  }

}

document
.getElementById("connectBtn")
.addEventListener(
  "click",
  connectWallet
);
