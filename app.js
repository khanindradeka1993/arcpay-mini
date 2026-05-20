document
.getElementById("connectBtn")
.onclick = async () => {

  const status =
  document.getElementById("status");

  try {

    if (window.ethereum) {

      const accounts =
      await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      const address = accounts[0];

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
      "\nBalance: " +
      balance.toFixed(4) +
      " ETH";

    } else {

      status.innerText =
      "MetaMask not detected";

    }

  } catch (e) {

    console.log(e);

    status.innerText =
    "Connection failed";

  }

};
