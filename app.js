const statusText = document.getElementById("statusText");
const walletText = document.getElementById("walletText");
const connectBtn = document.getElementById("connectBtn");
const addressEl = document.getElementById("address");
const activityEl = document.getElementById("activity");
let scannedAddress = "";
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
statusText.innerText = "Connected";

walletText.innerText =
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


    const qrContainer = document.getElementById("qrContainer");

if (qrContainer.style.display === "block") {
    qrContainer.style.display = "none";
    return;
}

qrContainer.style.display = "block";

document.getElementById("qrcode").innerHTML = "";

new QRCode(document.getElementById("qrcode"), {
  text: address,
  width: 180,
  height: 180
});

document.getElementById("qrAddress").innerText = address;
} catch (err) {
  console.error(err);
  alert("Unable to fetch wallet address");
}
});
    const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", async () => {
  try {
    let recipient = scannedAddress;

if (!recipient) {
  recipient = prompt("Enter recipient wallet address:");
}

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
activityEl.innerHTML =
  "Sent " + amount + " USDC<br>" +
  "To: " + recipient.substring(0, 6) + "..." +
  recipient.substring(recipient.length - 4) +
  "<br>Time: " + new Date().toLocaleString();
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
const scanBtn = document.getElementById("scanBtn");

if (scanBtn) {
  scanBtn.addEventListener("click", () => {
    const scannerContainer = document.getElementById("scannerContainer");

    if (scannerContainer.style.display === "block") {
      scannerContainer.style.display = "none";
      return;
    }

    scannerContainer.style.display = "block";

    const html5QrCode = new Html5Qrcode("reader");

    html5QrCode.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: 250
      },
      (decodedText) => {
        html5QrCode.stop();
        scannerContainer.style.display = "none";

        scannedAddress = decodedText;

alert(
  "✅ Recipient address scanned successfully!\n\n" +
  scannedAddress.substring(0, 6) +
  "..." +
  scannedAddress.substring(scannedAddress.length - 4) +
  "\n\nNow tap the Send button to continue."
);
      },
      (errorMessage) => {
        // Ignore scan errors
      }
    ).catch((err) => {
      alert("Camera access failed.");
      console.error(err);
    });
  });
}
