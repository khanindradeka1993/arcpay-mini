const connectBtn = document.getElementById("connectBtn");
const addressEl = document.getElementById("address");

const USDC_ADDRESS =
  "0x3600000000000000000000000000000000000000";

const USDC_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)"
];
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
      "Receive ARC\n\n" +
      "Wallet Address:\n\n" +
      address
    );

  } catch (err) {
    console.error(err);
    alert("Unable to fetch wallet address");
  }
});

const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", async () => {
  try {
    const recipient = prompt("Enter recipient wallet address:");

    if (!recipient) return;

    const amount = prompt("Enter USDC amount:");

    if (!amount) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const usdc = new ethers.Contract(
      USDC_ADDRESS,
      USDC_ABI,
      signer
    );

    const tx = await usdc.transfer(
      recipient,
      ethers.utils.parseUnits(amount, 6)
    );

    alert("Transaction submitted!");

    await tx.wait();

    alert("USDC sent successfully!");
  } catch (err) {
    console.error(err);
    alert("Transfer failed");
  }
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
    if (!window.ethereum) {
      alert("Please connect wallet first");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const accounts = await provider.send(
      "eth_requestAccounts",
      []
    );

    const address = accounts[0];

    const usdc = new ethers.Contract(
  USDC_ADDRESS,
  USDC_ABI,
  provider
);

const balance =
  await usdc.balanceOf(address);

balanceEl.innerText =
  (Number(balance) / 1000000).toFixed(2) +
  " USDC";
  } catch (err) {
    console.error(err);
    alert("Unable to fetch balance");
  }
});
