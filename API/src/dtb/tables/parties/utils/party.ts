import { isNotEmpty } from "../../../../utils/common";
import { isGraterThan, isPositiveNumber, isSmallerThan } from "../../../../utils/primitive/numbers";
import { isString } from "../../../../utils/primitive/string";
import { Validation } from "../../../../utils/validation";
import { ValidationType } from "../../../../utils/validation.type";
import { MAX_PLAYERS, MIN_PLAYERS } from "../enums";
import { IGameConfig } from "../types";

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

/**
 * Check if the gameConfig is valid
 * @param {IGameConfig | undefined} gameConfig value to check
 * @returns {string | undefined} Return the error as string or undefined if is valid
 */
export const isGameConfig = (gameConfig: IGameConfig | undefined): string | undefined => {
	console.log(gameConfig)
	let error = undefined;
	//Exist
	if(!gameConfig) return 'gameConfig is undefined';

	//minPlayers
	const checksMinPlayers: ValidationType[] = [
		isNotEmpty,
		isPositiveNumber,
		isGraterThan(MIN_PLAYERS - 1)
	];
	const validationMinPlayers = new Validation(checksMinPlayers);
	error = validationMinPlayers.validateEvery(gameConfig.minPlayers);

	if(error) return 'gameConfig.minPlayers ' + error;

	//maxPlayers
	const checksMaxPlayers: ValidationType[] = [
		isNotEmpty,
		isPositiveNumber,
		isSmallerThan(MAX_PLAYERS+1),
		isGraterThan(gameConfig.minPlayers as number)
	];
	const validationMaxPlayers = new Validation(checksMaxPlayers);
	error = validationMaxPlayers.validateEvery(gameConfig.maxPlayers);

	if(error) return 'gameConfig.maxPlayers ' + error;

	return undefined;
};