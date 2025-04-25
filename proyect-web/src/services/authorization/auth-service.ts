import { AxiosResponse } from "axios";
import { api } from "../api";
import { ApiError } from "../api.type";
import { IPlayerAuth } from "./auth-type";


/**
 * Check user authorizations
 * @get /auth
 * @returns {Promise<IPlayerAuth | undefined>} response
 */
export const getAuth = async (): Promise<AxiosResponse<IPlayerAuth, ApiError>> => {
	return await api().get<IPlayerAuth>('auth');
}
