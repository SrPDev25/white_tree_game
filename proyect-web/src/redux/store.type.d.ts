import { IPartySlice } from "./api/party/party.type";

/**
 * Store interface
 */
export type IAppStore = {
    // API
    party: IPartySlice;
}