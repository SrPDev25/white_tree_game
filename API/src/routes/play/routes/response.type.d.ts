import { Request } from "express";
import { IPlayer } from "../../../dtb/tables/parties/types";



export type IPlayStartRequest = Request & {
    body: {
        /**Key word of the game */
        word: string,
        /**Infiltrator player, master no avalible */
        infiltrator: IPlayer['_id']
    }
};