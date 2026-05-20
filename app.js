const connectBtn = document.getElementById("connectBtn");
const sendBtn = document.getElementById("sendBtn");
const statusText = document.getElementById("status");

let signer;

const USDC_ADDRESS =
"0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

const ABI = [
  "function transfer(address to, uint amount) returns (bool)"
];

connectBtn.onclick = async () => {

  try {

    if (typeof window.ethereum !== "undefined") {

      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider =
        new ethers.providers.Web3Provider(window.ethereum);

      signer = provider.getSigner();

      const address =
        await signer.getAddress();

      statusText.innerText =
        "Connected: " +
        address.slice(0,6) +
        "..." +
        address.slice(-4);

    } else {

      alert("MetaMask not detected");

    }

  } catch (err) {

    console.log(err);

    statusText.innerText =
      "Wallet connection failed";

  }
};

sendBtn.onclick = async () => {

  try {

    const receiver =
      document.getElementById("receiver").value;

    const amount =
      document.getElementById("amount").value;

    const contract =
      new ethers.Contract(
        USDC_ADDRESS,
        ABI,
        signer
      );

    const tx =
      await contract.transfer(
        receiver,
        ethers.utils.parseUnits(amount,6)
      );

    statusText.innerText =
      "Transaction Sent 🚀";

    await tx.wait();

    statusText.innerText =
      "Payment Successful ✅";

  } catch(err){

    console.log(err);

    statusText.innerText =
      "Transaction Failed ❌";
  }
};
