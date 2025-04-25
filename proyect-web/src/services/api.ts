import axios from 'axios';


/**
 * Create a new axios instance
 */
export const apiBase = axios.create({
	baseURL: import.meta.env.API_URL,
	validateStatus: (status) => {
		if ((status === 401 && localStorage.getItem('token')) || status === 403) {
			localStorage.removeItem('token');
		}
		return status >= 200 && status < 300;
	},
	headers: {
		'Content-Type': 'application/json'
	}
});

export const setTokensHeader = (newToken?: string) => {
	let token = localStorage.getItem('token');

	if (newToken){
		token = newToken;
		localStorage.setItem('token', newToken);
	}

	if (token) {
		apiBase.defaults.headers.common.token = token;
	}
};

/**
 * Axios instate to use in the app to call api
 */
export const api = () => {
	setTokensHeader();
	return apiBase;
};
