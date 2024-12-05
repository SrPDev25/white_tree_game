/**
 * Check if is a primitive string
 * @nota es anti intuitivo que ante un isAlgo el si sea el no
 * @param {unknown} value 
 * @returns {boolean}
 */
export const isString = (value: unknown): string | undefined => {
	if(typeof value === 'string' || value instanceof String) 
		return undefined;
	else
		return 'is not string';	
}
