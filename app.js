let currentAccount = "";

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

    currentAccount =
    accounts[0];

    const balanceHex =
    await window.ethereum.request({
      method: "eth_getBalance",
      params: [currentAccount, "latest"]
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
    currentAccount;

  } catch(err){

    console.log(err);

    alert("Connection Failed");

  }

}

async function sendTransaction() {

  const receiver =
  document.getElementById("receiver").value;

  const amount =
  document.getElementById("amount").value;

  if (!receiver || !amount) {

    alert("Enter receiver and amount");

    return;
  }

  try {

    const tx =
    await window.ethereum.request({

      method: "eth_sendTransaction",

      params: [{

        from: currentAccount,

        to: receiver,

        value:
        (
          Number(amount) *
          1e18
        ).toString(16)

      }]

    });

    alert("Transaction Sent 🚀");

    console.log(tx);

  } catch(err){

    console.log(err);

    alert("Transaction Failed");

  }

}

document
.getElementById("connectBtn")
.addEventListener(
  "click",
  connectWallet
);

document
.getElementById("sendBtn")
.addEventListener(
  "click",
  sendTransaction
);
