import { IParty } from "../../redux/api/party/party.type"

export type IGetPartyInfoResponse = IParty

export type IGetFindPartyBySimpleIdResponse = {
    partyId: IParty['_id'];
}

export type IPostGoingPlayerToPartyProps = {
    partyId: string;
    name: string;
}