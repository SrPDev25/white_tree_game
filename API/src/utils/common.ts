/**
 * Check if the value is empty
 * @param {unknown} value value to check
 * @check {isEmpty}
 * @returns {boolean} if is empty
 */
export const isNotEmpty = (value: unknown): string | undefined => {
	if (value !== undefined && value !== null)
		return undefined;
	else 
		return 'is empty'
};