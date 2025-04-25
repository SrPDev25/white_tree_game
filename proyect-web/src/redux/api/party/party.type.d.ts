

export type IPartySlice = {
    party: IParty | null,
}

/**
 * Party info structure
 */
export type IParty = {
    /**Database id of the party */
    _id: ObjectId,
    /**Simple unique id with 6 characters to easily find the party */
    simpleId: string | null,
    /** Set party config */
    gameConfig: IGameConfig,
    /** Phase of the game
     * @default 'recruitment'
     */
    gamePhase: GamePhaseEnum,
    /** Players info */
    players: IPlayer[],
    /** Current game word */
    wordInGame?: string,

}

/**
 * Configuration of the game
 */
export type IGameConfig = {
    /** Min players at the game
     * @enum min 5
     */
    minPlayers: number,
    /** Max players at the game
     * @enum min 5
     */
    maxPlayers: number
}

/** Player object type at the party */
export type IPlayer = {
    /**
     * User's data base id
     */
    _id: IUser['_id'],
    /** Player name */
    name: string,
    /**
     * State of the player at the game
     * @default {PlayerStateEnum.ALIVE}
     */
    state: PlayerStateEnum,
    /**
     * If the player is the traitor at the game
     */
    infiltrator?: boolean,
    /**
     * Rol of the player at the party
     */
    rol?: PlayerRolEnum
}