import { IParty, IPlayer } from "../types";

export interface IFindOnePlayer {
    partyId: IParty['_id'];
    playerId: IPlayer['_id'];
}