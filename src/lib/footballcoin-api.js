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
 * Creates a new player
 * @param {string} accessToken User access token 
 * @param {string} name Player name 
 * @param {string} surname Player surname 
 * @param {string} position Player position 
 * @param {File} photoFile File with player photo
 * @returns {Promise} Promise with player data  
 */
export async function createPlayer(accessToken, name, surname, position, photoFile) {
	const url = `${process.env.REACT_APP_API_URL}/players`;
	const formData = new FormData();
	formData.append('name', name);
	formData.append('surname', surname);
	formData.append('position', position.toUpperCase());
	formData.append('photo', photoFile);
	const config = {
		headers: {
			'Authorization': `Bearer ${accessToken}`,
			'Content_Type': 'multipart/form-data'
		},
	};
	return await axios.post(url, formData, config);
}

/**
 * Deletes player
 * @param {string} accessToken User access token 
 * @param {string} id Player id 
 */
export async function deletePlayer(accessToken, id) {
	return await axios.delete(`${process.env.REACT_APP_API_URL}/players/${id}`, {headers: {'Authorization': `Bearer ${accessToken}`}});
}

/**
 * Returns all players
 * @returns {Promise} Promise with players objects
 */
export async function getPlayers() {
	return await axios.get(`${process.env.REACT_APP_API_URL}/players`);
}

/**
 * Updates player
 * @param {string} accessToken User access token
 * @param {string} id Player id 
 * @param {string} name Player name 
 * @param {string} surname Player surname 
 * @param {string} position Player position 
 * @param {File} photoFile File with player photo
 * @returns {Promise} Promise with player data  
 */
export async function updatePlayer(accessToken, id, name, surname, position, photoFile) {
	const url = `${process.env.REACT_APP_API_URL}/players/${id}`;
	const formData = new FormData();
	formData.append('name', name);
	formData.append('surname', surname);
	formData.append('position', position.toUpperCase());
	if(photoFile) formData.append('photo', photoFile);
	const config = {
		headers: {
			'Authorization': `Bearer ${accessToken}`,
			'Content_Type': 'multipart/form-data'
		},
	};
	return await axios.patch(url, formData, config);
}

/**
 * Default object to export
 */
export default {
	createNews,
	createPlayer,
	deleteNews,
	deletePlayer,
	getNews,
	getPlayers,
	login,
	register,
	updateNews,
	updatePlayer
};

