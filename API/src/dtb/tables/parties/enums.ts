/**
 * Enum for the different game phases
 */
export enum GamePhaseEnum {
    RECRUITMENT = 'recruitment',
	STARTING = 'starting',
	WORDS = 'words',
	FINISHED = 'finished',
	VOTING = 'voting',
	VOTING_RESULTS = 'votingResults'
}

/**
 * State of the player at the game
 */
export enum PlayerStateEnum {
	ALIVE = 'alive',
	DEAD = 'dead',
	SPECTATOR = 'spectator',
	MASTER = 'master'
}

/**
 * Rol of the player at the party
 */
export enum PlayerRolEnum {
	MASTER = 'master',
    PLAYER = 'player'
}
//Min players at default party, master included
export const MIN_PLAYERS = 5;
//Max players at default party
export const MAX_PLAYERS = 10;