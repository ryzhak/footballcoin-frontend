import pollSystemArtifact from '../contracts/PollSystem.json';
import web3Service from './web3-service';

let contract = null;

/**
 * Initializes poll system contract
 */
export async function init() {
	contract = web3Service.getContract(pollSystemArtifact.abi, process.env.REACT_APP_POLL_SYSTEM_CONTRACT_ADDRESS);
}

//**************
// Owner methods
//**************

/**
 * Adds user to voting group
 * @param {string} userAddress user ethereum address 
 */
export async function addUser(userAddress) {
	const accounts = await web3Service.getAccounts();
	await contract.methods.addUser(userAddress).send({from: accounts[0]});
}

/**
 * Removes user from voting group
 * @param {string} userAddress user ethereum address
 */
export async function removeUser(userAddress) {
	const accounts = await web3Service.getAccounts();
	await contract.methods.removeUser(userAddress).send({from: accounts[0]});
}

//***************
// Public methods
//***************

/**
 * Returns user address by index
 * @param {number} index user index
 * @returns {Promise} promise with user address 
 */
export async function users(index) {
	return await contract.methods.users(index).call();
}

/**
 * Returns number of users that can vote
 * @returns {Promise} promise with number of users that can vote
 */
export async function usersCount() {
	return (await contract.methods.usersCount().call()).toNumber();
}

//***************
// Helper methods
//***************

/**
 * Returns all users that can vote
 * @returns {Promise} promise with array of users that can vote
 */
export async function getUsers() {
	let usersArray = [];
	const count = await usersCount();
	for(let i = 0; i < count; i++) {
		const userAddress = await users(i);
		usersArray.push(userAddress);
	}
	return usersArray;
}

/**
 * Default object to export
 */
export default {
	addUser,
	getUsers,
	init,
	removeUser,
	users,
	usersCount
};
