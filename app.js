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
const copyBtn = document.getElementById("copyBtn");

copyBtn.addEventListener("click", async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts"
  });

  navigator.clipboard.writeText(accounts[0]);

  alert("Wallet address copied!");
});
const faucetBtn = document.getElementById("faucetBtn");

if (faucetBtn) {
  faucetBtn.addEventListener("click", () => {
    window.location.href = "https://faucet.circle.com";
  });
}
const refreshBtn = document.getElementById("refreshBtn");
const balanceEl = document.getElementById("balance");

refreshBtn.addEventListener("click", async () => {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    const address = accounts[0];

  const provider = new ethers.providers.Web3Provider(window.ethereum);

    const usdcContract = new ethers.Contract(
      "0x3600000000000000000000000000000000000000",
      [
        "function balanceOf(address owner) view returns (uint256)"
      ],
      provider
    );

    const balance = await usdcContract.balanceOf(address);

    balanceEl.innerText =
      (Number(balance) / 1000000).toFixed(2) + " USDC";

  catch (err) {
  console.error(err);
  alert(JSON.stringify(err));
