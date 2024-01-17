import { IParty } from "../../../../dtb/tables/parties/types";
import { IUserAuthorization } from "../../../auth/app/response.type";
import { IDefaultPhaseFilter, IVotingPhaseFilter, IWordsPhaseFilter } from "./gamePhaseFilter.type";
import { filterOtherPlayersInfo } from "./partyInformationFilters";

//TODO: Refeactor this file and upgrade filters

/**
 * Party filter information for general gamePhase
 * @param {IUserAuthorization} player user authorization
 * @param {IParty} party this party
 * @returns {IDefaultPhaseFilter}
 */
export const defaultPhaseFilter = (player: IUserAuthorization, party: IParty): IDefaultPhaseFilter => {
	const clonedParty = { ...party };
	
	//Filter players info
	filterOtherPlayersInfo(clonedParty, player._id);

	//Filter basic info
	const { _id, simpleId, gameConfig, gamePhase, players } = clonedParty;

	return { _id, simpleId, gameConfig, gamePhase, players };
}

/**
 * Party filter information for general gamePhase
 * @param {IUserAuthorization} player user authorization
 * @param {IParty} party this party
 * @returns {IWordsPhaseFilter}
 */
export const wordsPhaseFilter = (player: IUserAuthorization, party: IParty): IWordsPhaseFilter => {
	const clonedParty = { ...party };
	//Filter players info
	filterOtherPlayersInfo(clonedParty, player._id);
	//Infiltrator can't see the word in game
	if (clonedParty.wordInGame && player.playerInfo.infiltrator)
		delete clonedParty.wordInGame;

	//Filter basic info
	const { _id, simpleId, gameConfig, gamePhase, players, wordInGame } = clonedParty;

	return { _id, simpleId, gameConfig, gamePhase, players, wordInGame };
}

/**
 * Party filter information for general gamePhase
 * @param {IUserAuthorization} player user authorization
 * @param {IParty} party this party
 * @returns {IVotingPhaseFilter}
 */
export const votingPhaseFilter = (player: IUserAuthorization, party: IParty): IVotingPhaseFilter => {
	const clonedParty = { ...party };
	//Filter players info
	filterOtherPlayersInfo(clonedParty, player._id);
	//Infiltrator can't see the word in game
	if (clonedParty.wordInGame && player.playerInfo.infiltrator)
		delete clonedParty.wordInGame;

	//Filter basic info
	const { _id, simpleId, gameConfig, gamePhase, players, wordInGame, votePhaseData } = clonedParty;

	//Player vote info
	let playerVotePhaseData: IVotingPhaseFilter['votePhase'] = {
		playerOptions: []
	}
	
	if (votePhaseData && votePhaseData.votes) {
		//Player vote info
		const playerVote = votePhaseData?.votes.find(votePhaseData => votePhaseData.player === player._id)?.vote;
		//Player options info
		const playerOptions: IVotingPhaseFilter['votePhase']['playerOptions'] =
			votePhaseData?.votes?.map(({ player }) => ({ player })) ?? [];
		playerVotePhaseData = {
			playerVote,
			playerOptions
		}
	}


	return { 
		_id,
		simpleId,
		gameConfig,
		gamePhase,
		players,
		wordInGame,
		votePhase: playerVotePhaseData };
}


/**
 * Party filter information for general gamePhase
 * @param {IUserAuthorization} player user authorization
 * @param {IParty} party this party
 * @returns {IVotingPhaseFilter}
 */
export const votingResultsPhaseFilter = (player: IUserAuthorization, party: IParty): IVotingPhaseFilter => {
	const clonedParty = { ...party };
	
	//Filter players info
	filterOtherPlayersInfo(clonedParty, player._id);
	//Infiltrator can't see the word in game
	if (clonedParty.wordInGame && player.playerInfo.infiltrator)
		delete clonedParty.wordInGame;

	//Filter basic info
	const { _id, simpleId, gameConfig, gamePhase, players, wordInGame, votePhaseData } = clonedParty;	

	//Player vote info
	let playerVotePhaseData: IVotingPhaseFilter['votePhase'] = {
		playerOptions: []
	}
	if (votePhaseData && votePhaseData.votes) {
		//Player vote info
		const playerVote = votePhaseData?.votes.find(votePhaseData => votePhaseData.player === player._id)?.vote;
		//Player options info
		const playerOptions: IVotingPhaseFilter['votePhase']['playerOptions'] =
			votePhaseData?.votes?.map(({ player }) => ({
				player,
				votes: votePhaseData?.votes?.filter(({ vote }) => vote === player).length
			})) ?? [];
		playerVotePhaseData = {
			playerVote,
			playerOptions,
			abstentions: votePhaseData?.votes?.filter(({ vote }) => vote === null).length
		}
	}


	return { 
		_id,
		simpleId,
		gameConfig,
		gamePhase,
		players,
		wordInGame,
		votePhase: playerVotePhaseData };
}

