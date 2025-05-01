import { IAuthSlice } from "./api/auth/auth.type";
import { IPartySlice } from "./api/party/party.type";

/**
 * Store interface
 */
export type IAppStore = {
    // API
    party: IPartySlice;
    auth: IAuthSlice;
}