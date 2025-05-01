import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IParty, IPartySlice } from "./party.type"

/**
 * Party slice
 * @provisional
 */
export const partySlice = createSlice({
    name: 'party',
    initialState: {
        party: null,
        partyToJoin: null
    } as IPartySlice,
    reducers: {
        updatePartyData(state, action: PayloadAction<IParty>) {
            state.party = action.payload;
        },
        deletePartyData(state) {
            state.party = null;
        },
        updatePartyToJoinData(state, action: PayloadAction<IParty['_id']>) {
            state.partyToJoin = action.payload;
        },
    }
})

export const { updatePartyData, deletePartyData, updatePartyToJoinData } = partySlice.actions;