import { configureStore } from "@reduxjs/toolkit"
import { partySlice } from "./api/party/partySlice"
import { IAppStore } from "./store.type"


/**
 * Redux store.
 * At store, is stored usefull api info and pages store
 */
export const store = configureStore<IAppStore>({
  reducer: {
    //API
    party: partySlice.reducer,
  },
})