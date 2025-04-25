import { IParty, IPlayer } from "../../redux/api/party/party.type"

/**
 * Authorization response
 */
export type IPlayerAuth = {
    _id: string,
    party: IParty['_id'],
    playerInfo: IPlayer
}