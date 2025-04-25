import { IGameConfig, IParty, IPlayer } from "../../redux/api/party/party.type"

export type ICreatePartyProps = {
    gameConfig: IGameConfig,
    name: string
}

export type ICreatePartyResponse = {
    user: IPlayer,
    party: IParty['_id']
}