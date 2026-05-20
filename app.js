let currentAccount = "";

const USDC_ADDRESS =
"0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

const ABI = [

  "function balanceOf(address owner) view returns (uint256)",

  "function transfer(address to, uint amount) returns (bool)"

];

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

    const provider =
    new ethers.providers.Web3Provider(
      window.ethereum
    );

    const contract =
    new ethers.Contract(
      USDC_ADDRESS,
      ABI,
      provider
    );

    const balance =
    await contract.balanceOf(
      currentAccount
    );

    const formatted =
    Number(balance) / 1000000;

    document
    .getElementById("balance")
    .innerText =
    formatted.toFixed(2);

    document
    .getElementById("address")
    .innerText =
    currentAccount;

  } catch(err){

    console.log(err);

    alert("Connection Failed");

  }

}

async function sendUSDC() {

  const receiver =
  document.getElementById("receiver").value;

  const amount =
  document.getElementById("amount").value;

  if (!receiver || !amount) {

    alert("Enter receiver and amount");

    return;
  }

  try {

    const provider =
    new ethers.providers.Web3Provider(
      window.ethereum
    );

    const signer =
    provider.getSigner();

    const contract =
    new ethers.Contract(
      USDC_ADDRESS,
      ABI,
      signer
    );

    const tx =
    await contract.transfer(

      receiver,

      ethers.utils.parseUnits(
        amount,
        6
      )

    );

    alert("Transaction Submitted 🚀");

    await tx.wait();

    alert("USDC Sent Successfully ✅");

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
  sendUSDC
);
