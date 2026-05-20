async function connectWallet() {

  if (!window.ethereum) {

    alert("MetaMask not found");

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

    document
    .getElementById("balance")
    .innerText =
    balance.toFixed(4);

    document
    .getElementById("address")
    .innerText =
    address;

  } catch(err){

    console.log(err);

    alert("Connection Failed");

  }

}

document
.getElementById("connectBtn")
.addEventListener(
  "click",
  connectWallet
);
