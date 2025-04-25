import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IParty, IPartySlice } from "./party.type"

/**
 * Party slice
 * @provisional
 */
export const partySlice = createSlice({
    name: 'party',
    initialState: {
        party: null
    } as IPartySlice,
    reducers: {
        updatePartyData(state, action: PayloadAction<IParty>) {
            state.party = action.payload;
        },
        deletePartyData(state) {
            state.party = null;
        }
    }
})

export const { updatePartyData: changeProductImg, deletePartyData } = partySlice.actions;