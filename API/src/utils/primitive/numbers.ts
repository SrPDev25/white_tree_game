import { ValidationType } from "../validation.type";

export const isNumber = (value: unknown): string | undefined => {
	if (typeof value === 'number' || value instanceof Number)
		return undefined;
	else
		return 'is not number';
}

export const isPositiveNumber = (value: unknown): string | undefined => {
	if (typeof value === 'number' || value instanceof Number) {
		if (value as number > 0)
			return undefined;
		else
			return 'is not positive';
	} else
		return 'is not number';
};

export const isGraterThan = (min: number): ValidationType =>
	(value): string | undefined => {
		if (typeof value === 'number' || value instanceof Number) {
			if (value as number > min)
				return undefined;
			else
				return 'should be grater than ' + min;
		} else
			return 'is not number';
	}

export const isSmallerThan = (max: number): ValidationType =>
	(value): string | undefined => {
		if (typeof value === 'number' || value instanceof Number) {
			if (value as number < max)
				return undefined;
			else
				return 'should be smaller than ' + max;
		} else
			return 'is not number';
	}