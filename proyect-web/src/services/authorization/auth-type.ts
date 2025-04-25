import { IPlayer } from "../../redux/api/party/party.type"
import { IUser } from "../api/api.type";

/**
 * Authorization response
 */
export type IUserAuthorization = IUser & {
    playerInfo: IPlayer
};