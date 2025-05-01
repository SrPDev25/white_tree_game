import { configureStore } from "@reduxjs/toolkit"
import { partySlice } from "./api/party/partySlice"
import { IAppStore } from "./store.type"
import { authSlice } from "./api/auth/authSlice"


/**
 * Redux store.
 * At store, is stored usefull api info and pages store
 */
export const store = configureStore<IAppStore>({
  reducer: {
    //API
    party: partySlice.reducer,
    auth: authSlice.reducer,
  },
})