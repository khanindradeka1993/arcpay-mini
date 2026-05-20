const connectBtn =
document.getElementById("connectBtn");

const statusText =
document.getElementById("status");

connectBtn.onclick = async () => {

  try {

    if (!window.ethereum) {

      statusText.innerText =
      "MetaMask not found";

      return;
    }

    const accounts =
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    statusText.innerText =
    "Connected: " +
    accounts[0];

  } catch (err) {

    console.log(err);

    statusText.innerText =
    "Wallet connection failed";

  }
};
