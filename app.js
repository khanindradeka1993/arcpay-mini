const USDC =
"0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

const ABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "type": "function"
  }
];

document
.getElementById("connectBtn")
.onclick = async () => {

  const status =
  document.getElementById("status");

  try {

    if (!window.ethereum) {

      status.innerText =
      "MetaMask not detected";

      return;
    }

    const accounts =
    await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    const address =
    accounts[0];

    const provider =
    new ethers.providers.Web3Provider(
      window.ethereum
    );

    const contract =
    new ethers.Contract(
      USDC,
      ABI,
      provider
    );

    const balance =
    await contract.balanceOf(address);

    const formatted =
    Number(balance) / 1000000;

    status.innerText =
    "Connected: " +
    address.slice(0,6) +
    "..." +
    address.slice(-4) +
    "\nUSDC Balance: " +
    formatted;

  } catch(err) {

    console.log(err);

    status.innerText =
    "Connection Failed";

  }

};
