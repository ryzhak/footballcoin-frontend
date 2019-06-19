import Web3 from 'web3';

// web3 object
let web3 = null;

/**
 * Returns available accounts
 * @returns {Promise} promise with array of available accounts
 */
export async function getAccounts() {
	return await web3.eth.getAccounts();
}

/**
 * Returns new contract
 * @param {Object} abi JSON interface of the contract 
 * @param {string} address contract address
 * @returns {Object} contract instance 
 */
export function getContract(abi, address) {
	const contract = new web3.eth.Contract(abi, address);
	return contract;
}

/**
 * Initializes web3 connection
 * @returns {boolean} whether connection has been initialized
 */
export function init() {
	if(!Web3.givenProvider) return false;
	web3 = new Web3(Web3.givenProvider);
	return true;
}

/**
 * Default object to export
 */
export default {
	getAccounts,
	getContract,
	init
};
