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

    status.innerText =
    "Connected: " + accounts[0];

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
