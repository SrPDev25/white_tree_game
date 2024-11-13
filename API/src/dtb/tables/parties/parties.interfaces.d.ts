import { IParty, IPlayer } from './types';

export interface ICreateParty {
    gameConfig: IParty['gameConfig']
}

export interface ICreatePlayer {
    _id: IPlayer['_id'],
    name: IPlayer['name'],
    state?: IPlayer['state'],
    rol?: IPlayer['rol']
}