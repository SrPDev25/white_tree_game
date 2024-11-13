import { ValidationType } from "./validation.type";

export class Validation {
	checks: ValidationType[]

	constructor(validations: ValidationType[]) {
		this.checks = validations;
	}

	/**
	 * Execute all validations and return the first error
	 * @param {unknown} value 
	 * @returns string | undefined
	 */
	validateEvery(value: unknown): string | undefined {
		let error = undefined;
		this.checks.every((check: ValidationType) => {
			const result = check(value);
			if(result){
				error = result;
				return false;
			}
			return true;
		});
		return error;
	}
}