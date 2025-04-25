import { AxiosResponse } from "axios";
import { api } from "../api";
import { ApiError } from "../api.type";
import { IUserAuthorization } from "./auth-type";


/**
 * Check user authorizations
 * @get /auth
 * @returns {Promise<IUserAuthorization | undefined>} response
 */
export const getAuth = async (): Promise<AxiosResponse<IUserAuthorization, ApiError>> => {
	return await api().get<IUserAuthorization>('auth');
}
