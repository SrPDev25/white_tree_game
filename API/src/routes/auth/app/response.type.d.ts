import { IUserInfo } from "../core/type";

/**
 * Response of authorization
 */
export type IUserAuthorization = IUserInfo & {
    playerInfo: IParty
};