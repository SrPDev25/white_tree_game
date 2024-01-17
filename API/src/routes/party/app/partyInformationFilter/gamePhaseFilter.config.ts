import { GamePhaseEnum } from "../../../../dtb/tables/parties/enums";
import { IParty } from "../../../../dtb/tables/parties/types";
import { IUserAuthorization } from "../../../auth/app/response.type";
import { defaultPhaseFilter, votingPhaseFilter, votingResultsPhaseFilter, wordsPhaseFilter } from "./gamePhaseFilter";


/**
 * Game phase's filter functions configuration
 */
export const filterInfoConfig: Record<GamePhaseEnum, (player: IUserAuthorization, party: IParty) => unknown> = {
	[GamePhaseEnum.RECRUITMENT]: defaultPhaseFilter,
	[GamePhaseEnum.STARTING]: defaultPhaseFilter,
	[GamePhaseEnum.WORDS]: wordsPhaseFilter,
	[GamePhaseEnum.VOTING]: votingPhaseFilter,
	[GamePhaseEnum.VOTING_RESULTS]: votingResultsPhaseFilter,
	[GamePhaseEnum.FINISHED]: defaultPhaseFilter
}