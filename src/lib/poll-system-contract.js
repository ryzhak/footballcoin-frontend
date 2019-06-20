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
 * Creates a new poll
 * @param {number} consensusRate consensus rate, 10000 = 100%
 * @param {number} quorumRate quorum rate, 10000 = 100% 
 * @param {number} availableUntil unix timestamp when poll is finished 
 * @param {string} question proposal text 
 * @param {Array<string>} choices array of choices 
 */
export async function createPoll(consensusRate, quorumRate, availableUntil, question, choices) {
	const accounts = await web3Service.getAccounts();
	await contract.methods.createPoll(consensusRate, quorumRate, availableUntil, question, choices).send({from: accounts[0]});
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
 * Returns array of choices from voting
 * @param {number} index voting index
 * @returns {Promise} promise with array of choices 
 */
export async function getChoicesFromVoting(index) {
	return await contract.methods.getChoicesFromVoting(index).call();
}

/**
 * Returns array of votes count per choice
 * @param {number} index voting index
 * @returns {Promise} promise with array of votes count per choice 
 */
export async function getVotesCount(index) {
	return await contract.methods.getVotesCount(index).call();
}

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

/**
 * Returns voting data by index
 * @param {number} index voting index
 * @returns {Promise} promise with voting data 
 */
export async function votings(index) {
	return await contract.methods.votings(index).call();
}

/**
 * Returns number of votings
 * @returns {Promise} promise with number of votings
 */
export async function votingsCount() {
	return (await contract.methods.votingsCount().call()).toNumber();
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
 * Returns all votings
 * @returns {Promise} promise with all votings
 */
export async function getVotings() {
	let votingsArray = [];
	const count = await votingsCount();
	// for all votings
	for(let i = 0; i < count; i++) {
		const votingInfo = await votings(i);
		// get choices
		let choices = [];
		const texts = await getChoicesFromVoting(i);
		const votesCount = await getVotesCount(i);
		for(let j = 0; j < votingInfo.choicesCount.toNumber(); j++) {
			choices.push({
				text: texts[j],
				votesCount: votesCount[j] ? votesCount[j].toNumber() : 0
			});
		}
		// set voting params and choices
		votingsArray.push({
			availableUntil: votingInfo.availableUntil.toNumber(),
			choicesCount: votingInfo.choicesCount.toNumber(),
			consensusRate: votingInfo.consensusRate.toNumber(),
			createdAt: votingInfo.createdAt.toNumber(),
			question: votingInfo.question,
			quorumRate: votingInfo.quorumRate.toNumber(),
			choices: choices
		});
	}
	return votingsArray;
}

/**
 * Default object to export
 */
export default {
	addUser,
	createPoll,
	getChoicesFromVoting,
	getUsers,
	getVotesCount,
	getVotings,
	init,
	removeUser,
	users,
	usersCount,
	votings,
	votingsCount
};
