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
alert(err.message);
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
width: 300,
height: 300
});

document.getElementById("qrAddress").innerText = address;
} catch (err) {
console.error(err);
alert("Unable to fetch wallet address");
}
});
const requestBtn = document.getElementById("requestBtn");

requestBtn.addEventListener("click", async () => {
const amount = prompt("Enter amount to request (USDC):");

if (!amount) return;

const accounts = await window.ethereum.request({
method: "eth_requestAccounts"
});

const address = accounts[0];

const requestData = JSON.stringify({
recipient: address,
amount: amount
});

const requestContainer =
document.getElementById("requestContainer");

requestContainer.style.display = "block";

document.getElementById("requestText").innerText =
"Requesting " + amount + " USDC";

document.getElementById("requestQr").innerHTML = "";

new QRCode(
document.getElementById("requestQr"),
{
text: requestData,
width: 300,
height: 300
}
);
});
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", async () => {
try {
let recipient = scannedAddress;

if (!recipient) {
recipient = prompt("Enter recipient wallet address:");
}

if (!recipient) return;

const amount = prompt(

"Send USDC\n\nRecipient: " +
recipient.substring(0,6) +
"..." +
recipient.substring(recipient.length-4) +
"\n\nEnter amount:"
);

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

scannedAddress = "";
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

try {

const request = JSON.parse(decodedText);

if (request.recipient && request.amount) {

scannedAddress = request.recipient;

document.getElementById("recipientText").innerText =
"Payment Request: " +
request.amount +
" USDC";

alert(
"Payment Request Found!\n\n" +
"Amount: " + request.amount + " USDC\n\n" +
"Tap Send and enter:\n" +
request.amount
);

return;

}
} catch (e) {}

scannedAddress = decodedText;

document.getElementById("recipientText").innerText =
"Recipient: " +
decodedText.substring(0,6) +
"..." +
decodedText.substring(decodedText.length - 4);
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

const SPLIT_BILL_ADDRESS =
"0xdDB09a072fFC24D749b8E4f3e3E77e866c4a09F9";

const SPLIT_BILL_ABI = [
"function createBill(string _name,uint256 _totalAmount)",
"function billCount() view returns(uint256)",
"function markPaid(uint256 _billId)",
"function hasPaid(uint256,address) view returns(bool)"
];

const splitBillBtn = document.getElementById("splitBillBtn");

if (splitBillBtn) {
splitBillBtn.addEventListener("click", async () => {

try {

const billName = prompt("Bill name:");

if (!billName) return;

const amount = prompt("Amount (USDC):");

if (!amount) return;

const provider =
new ethers.providers.Web3Provider(window.ethereum);

await provider.send("eth_requestAccounts", []);

const signer = provider.getSigner();

const splitBillContract =
new ethers.Contract(
SPLIT_BILL_ADDRESS,
SPLIT_BILL_ABI,
signer
);

const tx = await splitBillContract.createBill(
billName,
amount
);

alert("Creating bill on Arc...\n\nTx submitted");

await tx.wait();

const billId =
await splitBillContract.billCount();

activityEl.innerHTML =
"📋 Split Bill #" +
billId.toString() +
"<br>Name: " +
billName +
"<br>Amount: " +
amount +
" USDC";

const billHistory =
JSON.parse(localStorage.getItem("billHistory") || "[]");

billHistory.unshift({
    id: billId.toString(),
    name: billName,
    amount: amount,
    creator: await signer.getAddress(),
    paid: false
});

localStorage.setItem(
  "billHistory",
  JSON.stringify(billHistory)
);

renderBills();

alert(
"✅ Bill saved on-chain!\n\nBill ID: " +
billId.toString()
);

} catch (err) {
console.error(err);
alert("Failed: " + err.message);
}

});
}
const payBillBtn =
document.getElementById("payBillBtn");

if (payBillBtn) {

payBillBtn.addEventListener("click", async () => {

try {

const billId =
prompt("Enter Bill ID:");

if (!billId) return;

const provider =
new ethers.providers.Web3Provider(window.ethereum);

await provider.send(
"eth_requestAccounts",
[]
);

const signer =
provider.getSigner();

const bills =
JSON.parse(localStorage.getItem("billHistory")) || [];

const bill =
bills.find(
b => b.id === billId.toString()
);

if (!bill) {
    alert("Bill not found");
    return;
}

const usdc =
new ethers.Contract(
    USDC_ADDRESS,
    USDC_ABI,
    signer
);
const splitBillContract =
new ethers.Contract(
    SPLIT_BILL_ADDRESS,
    SPLIT_BILL_ABI,
    signer
);
const payTx =
await usdc.transfer(
    bill.creator,
    ethers.utils.parseUnits(
        bill.amount.toString(),
        6
    )
);

alert("Sending USDC...");

await payTx.wait();

const tx =
await splitBillContract.markPaid(
    billId
);


alert(
"Submitting payment proof..."
);

await tx.wait();

alert(
"✅ Bill #" +
billId +
" marked as paid"
);

if (bill) {
    bill.paid = true;

    localStorage.setItem(
        "billHistory",
        JSON.stringify(bills)
    );

    renderBills();
}
activityEl.innerHTML =
"💸 Paid Bill #" +
billId +
"<br>Time: " +
new Date().toLocaleString();

} catch (err) {

console.error(err);

alert(
"Failed: " +
err.message
);

}

});

}
function renderBills() {

const billContainer =
document.getElementById("billHistory");

if (!billContainer) return;

const bills =
JSON.parse(localStorage.getItem("billHistory") || "[]");

if (bills.length === 0) {
  billContainer.innerHTML =
  "No bills created yet";
  return;
}

billContainer.innerHTML =
bills.map(bill =>
`<div style="margin-bottom:12px;">
<b>Bill #${bill.id}</b><br>
${bill.name}<br>
${bill.amount} USDC<br>
Creator: ${bill.creator}<br>
Status: ${bill.paid ? "✅ Paid" : "⏳ Unpaid"}
</div>
`).join("");

}

renderBills();
