import { AxiosResponse } from "axios";
import { api } from "../api";
import { ApiError } from "../api.type";
import { IGetFindPartyBySimpleIdResponse, IGetPartyInfoResponse, IPostGoingPlayerToPartyProps } from "./party-type";
import { IUserAuthorization } from "../authorization/auth-type";


/**
 * Request game info
 * @get /party
 * @props {IGetPartyInfoProps} props
 * @returns {Promise<IGetPartyInfoResponse | undefined>} response
 */
export const getGameInfo = async (): Promise<AxiosResponse<IGetPartyInfoResponse, ApiError>> => {
	return await api().get<IGetPartyInfoResponse>('/party');
}

/**
 * Find a party by simpleId
 * @get /game/find/:simpleId
 * @param simpleId 
 * @returns 
 */
export const getFindPartyBySimpleId = async (simpleId: string): Promise<AxiosResponse<IGetFindPartyBySimpleIdResponse, ApiError>> => {
	return await api().get<IGetFindPartyBySimpleIdResponse>(`/game/find/${simpleId}`);
}

/**
 * Going player to party
 * @post /game/going/:partyId
 * @param {string} partyId party _id to join
 * @param {string} name player name
 * @returns {IUserAuthorization} user's general and player information
 */
export const postGoingPlayerToParty = async ({partyId, ...rest}: IPostGoingPlayerToPartyProps): Promise<AxiosResponse<IUserAuthorization, ApiError>> => {
	return await api().post<IUserAuthorization>(`/game/going/${partyId}`, rest);
}