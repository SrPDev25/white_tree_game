import { isNotEmpty } from "../../../../utils/common";
import { isString } from "../../../../utils/primitive/string";
import { ValidationType } from "../../../../utils/validation.type";

/**
 * Check partyId format
 * @param {unknown} partyId
 * @returns 
 */
export const isPartyId = (partyId: unknown): string | undefined => {
	let error = undefined;
	//ValidationsOrder
	const checks: ValidationType[] = [	
		isNotEmpty,
		isString
	];
	//Check validations until one fail
	checks.every((check: ValidationType) => {
		const result = check(partyId);
		if(result){
			error = 'partyId ' + result;
			return false;
		}
		return true;
	});

	return error;
};