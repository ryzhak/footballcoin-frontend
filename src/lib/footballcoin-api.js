const axios = require('axios');

/**
 * User methods
 */

/**
 * Returns user auth details
 * @param {string} login User login 
 * @param {string} password User password
 * @returns {Promise} Promise with user credentials 
 */
export async function login(login, password) {
	return await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {login, password});
}

/**
 * Default object to export
 */
export default {
	login
};

