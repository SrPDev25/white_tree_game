import users = require("./usuarios.json")
import parties = require("./parties.json")
import { IUser } from "./tables/users/user.type";
import { IParty } from "./tables/parties/types";

/**
 * Fake database to make the MVP project
 */

export const fakeUserDataBase = users as IUser[];
export const fakePartyDataBase = parties as IParty[];