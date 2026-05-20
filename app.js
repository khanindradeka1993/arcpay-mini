document
.getElementById("connectBtn")
.onclick = async () => {

  const status =
  document.getElementById("status");

  try {

    if (!window.ethereum) {

      status.innerText =
      "MetaMask not detected";

      return;
    }

    const accounts =
    await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    const address =
    accounts[0];

    const chainId =
    await window.ethereum.request({
      method: "eth_chainId"
    });

    const balanceHex =
    await window.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"]
    });

    const balance =
    parseInt(balanceHex,16) / 1e18;

    status.innerText =
    "Connected: " +
    address.slice(0,6) +
    "..." +
    address.slice(-4) +
    "\nChain ID: " +
    chainId +
    "\nBalance: " +
    balance;

  } catch(err){

    console.log(err);

    status.innerText =
    "Wallet connection failed";

  }

};
