import { GamePhaseEnum } from "../../../../dtb/tables/parties/enums";
import { IParty } from "../../../../dtb/tables/parties/types";
import { IUserAuthorization } from "../../../auth/app/response.type";
import { defaultPhaseFilter, wordsPhaseFilter } from "./gamePhaseFilter";


/**
 * Game phase's filter functions configuration
 * @TODO voting phase is a future implementation
 */
export const filterInfoConfig: Record<GamePhaseEnum, (player: IUserAuthorization, party: IParty) => IParty> = {
	[GamePhaseEnum.RECRUITMENT]: defaultPhaseFilter,
	[GamePhaseEnum.STARTING]: defaultPhaseFilter,
	[GamePhaseEnum.WORDS]: wordsPhaseFilter,
	[GamePhaseEnum.VOTING]: (_pl, party)=> party,
	[GamePhaseEnum.VOTING_RESULTS]: (_pl, party)=> party,
	[GamePhaseEnum.FINISHED]: defaultPhaseFilter
}