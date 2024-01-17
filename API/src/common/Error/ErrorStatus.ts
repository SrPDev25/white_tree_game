
/**
 * ErrorStatus class to handle api status errors
 */
export default class ErrorStatus {
	/** http error number */
	public status: number;
	/** http error message */
	public message: string;

	constructor(status: number, message: string) {
		this.status = status;
		this.message = message;
	}
}