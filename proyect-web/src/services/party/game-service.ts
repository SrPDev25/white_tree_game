import { AxiosResponse } from "axios";
import { api } from "../api";
import { ApiError } from "../api.type";
import { IGetPartyInfoProps } from "./game-type";


/**
 * Request game info
 * @get /party
 * @props {IGetPartyInfoProps} props
 * @returns {Promise<IGetPartyInfoProps | undefined>} response
 */
export const getGameInfo = async (): Promise<AxiosResponse<IGetPartyInfoProps, ApiError>> => {
	return await api().get<IGetPartyInfoProps>('/party');
}
