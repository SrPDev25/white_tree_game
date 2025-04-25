import { AxiosResponse } from "axios";
import { api } from "../api";
import { ApiError } from "../api.type";
import { ICreatePartyProps, ICreatePartyResponse } from "./game-type";


/**
 * Create a new game
 * @post /game/party
 * @props {ICreatePartyProps} props
 * @returns {Promise<IUserAuthorization | undefined>} response
 */
export const postCreateParty = async (props: ICreatePartyProps): Promise<AxiosResponse<ICreatePartyResponse, ApiError>> => {
	return await api().post<ICreatePartyResponse>('/game/party', props);
}
