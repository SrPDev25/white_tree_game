import { AxiosResponse } from "axios";
import { api } from "../api";
import { IPostPlayStartProps } from "./play-type";
import { ApiError } from "../api.type";

/**
 * Start game
 * @post /play/start
 * @props {IPostPlayStartProps} props
 * @returns {Promise<void>} response
 */
export const postStartGame= async (props: IPostPlayStartProps): Promise<AxiosResponse<void, ApiError>> => {
	return await api().post<void>('/play/start', props);
}
