import { IGameConfig, IParty } from "../../redux/api/party/party.type"
import { IUserAuthorization } from "../authorization/auth-type"

export type ICreatePartyProps = {
    gameConfig: IGameConfig,
    name: string
}

export type ICreatePartyResponse = {
    user: IUserAuthorization,
    party: IParty['_id']
}