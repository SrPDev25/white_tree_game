import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IAuthSlice } from "./auth.type";
import { IPlayerAuth } from "../../../services/authorization/auth-type";


/**
 * Auth slice
 * @provisional
 */
export const partySlice = createSlice({
    name: 'auth',
    initialState: {
        auth: null
    } as IAuthSlice,
    reducers: {
        updateAuthData(state, action: PayloadAction<IPlayerAuth>) {
            state.auth = action.payload;
        },
        deleteAuthData(state) {
            state.auth = null;
        }
    }
})

export const { updateAuthData, deleteAuthData } = partySlice.actions;