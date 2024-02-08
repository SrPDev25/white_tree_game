import { isNotEmpty } from "../../common";
import { isString } from "../../primitive/string";
import { ValidationType } from "../../validation.type";
import { v4 as uuidv4, validate as validateToken } from 'uuid';

/**
 * Generate a token using uuidv4
 * @returns {string} token (65807d36-4fc2-4207-8515-8cc496351f08)
 */
export const generateToken = (): string => uuidv4();

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
 * @returns {string | undefined} error message or undefined
 */
export const isToken = (token: string): string | undefined => {
	if(validateToken(token)){
		return 'is not a valid token';
	} else
		return undefined;
};