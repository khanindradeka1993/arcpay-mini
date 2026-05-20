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

      status.innerText =
      "Connected: " + accounts[0];

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
