import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
	// We are in the browser and metamask is running
	web3 = new Web3(window.web3.currentProvider, null, {transactionConfirmationBlocks: 1});
} else {
  // We are on the server or the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
  	'https://rinkeby.infura.io/v3/c46d445e4e1b4f398737bcc8922167f8'
  );
  web3 = new Web3(provider, null, {transactionConfirmationBlocks: 1});
}

export default web3;