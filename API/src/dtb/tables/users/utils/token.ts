import { isNotEmpty } from "../../../../utils/common";
import { isString } from "../../../../utils/primitive/string";
import { ValidationType } from "../../../../utils/validation.type";


/**
 * Check if the token is valid value
 * @param {unknown} token 
 * @returns 
 */
export const isTokenValid = (token: unknown): string | undefined => {
	let error = undefined;
	//ValidationsOrder
	const checks: ValidationType[] = [	
		isNotEmpty,
		isString,
		isToken
	];
	//Check validations until one fail
	checks.every((check: ValidationType) => {
		const result = check(token);
		if(result){
			error = 'token ' + result;
			return false;
		}
		return true;
	});

	return error;
};

/**
 * Check if has 18 characters
 * @param {string} token token to check
 * @returns {boolean}
 */
export const isToken = (token: string): string | undefined => {
	if(token.length !== 18){
		return 'is not a valid token';
	} else
		return undefined;
};