import { IPlayer } from "../../../dtb/tables/parties/types";
import { IUser } from "../../../dtb/tables/users/user.type";


/** User public info */
export type IUserInfo = Pick<IUser, "_id" | "party">;

export type IAuthorizationShopPlayer = Pick<IPlayer, 'name' | 'state' | 'rol'>;