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
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    const address = accounts[0];

    alert(
      "Your Wallet Address:\n\n" + address
    );

  } catch (err) {
    console.error(err);
    alert("Unable to fetch wallet address");
  }
});
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", () => {
  alert(
    "ArcPay Lite\n\n" +
    "Coming Soon:\n\n" +
    "• Username Payments\n" +
    "• USDC Transfers\n" +
    "• Arc Testnet Support"
  );
});
