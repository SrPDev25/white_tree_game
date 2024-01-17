/**
 * Check if is a primitive string
 * @param {unknown} value 
 * @returns {boolean}
 */
export const isString = (value: unknown): string | undefined => {
	if(typeof value === 'string' || value instanceof String) 
		return undefined;
	else
		return 'is not string';
	
}

/**
 * Generate a random string line
 * @param {number} length length of string
 * @returns {string}
 */
export const generateRandomString = (length: number): string => {
	//Possible characters
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	let result = '';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}