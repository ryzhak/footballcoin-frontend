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
 * Registers user and returns user auth details
 * @param {string} username User login
 * @param {string} password User password
 * @returns {Promise} Promise with user credentials 
 */
export async function register(username, password) {
	return await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, {username, password});
}

/**
 * News methods
 */

/**
 * Creates a new news item
 * @param {string} accessToken User access token 
 * @param {string} caption News caption 
 * @param {string} content News content
 * @returns {Promise} Promise with news item data 
 */
export async function createNews(accessToken, caption, content) {
	return await axios.post(`${process.env.REACT_APP_API_URL}/news`, {caption, content}, {headers: {'Authorization': `Bearer ${accessToken}`}});
}

/**
 * Deletes news item by id
 * @param {string} accessToken User access token 
 * @param {string} id News id
 */
export async function deleteNews(accessToken, id) {
	return await axios.delete(`${process.env.REACT_APP_API_URL}/news/${id}`, {headers: {'Authorization': `Bearer ${accessToken}`}});
}

/**
 * Returns all available news
 * @returns {Promise} Promise with news objects
 */
export async function getNews() {
	return await axios.get(`${process.env.REACT_APP_API_URL}/news`);
}

/**
 * Updates news by id
 * @param {string} accessToken User access token 
 * @param {string} id News id
 * @param {string} caption News caption 
 * @param {string} content News content
 * @returns {Promise} Promise with news item data 
 */
export async function updateNews(accessToken, id, caption, content) {
	return await axios.patch(`${process.env.REACT_APP_API_URL}/news/${id}`, {caption, content}, {headers: {'Authorization': `Bearer ${accessToken}`}});
}

/**
 * Player methods
 */

/**
 * Returns all players
 * @returns {Promise} Promise with players objects
 */
export async function getPlayers() {
	return await axios.get(`${process.env.REACT_APP_API_URL}/players`);
}

/**
 * Default object to export
 */
export default {
	createNews,
	deleteNews,
	getNews,
	getPlayers,
	login,
	register,
	updateNews
};

