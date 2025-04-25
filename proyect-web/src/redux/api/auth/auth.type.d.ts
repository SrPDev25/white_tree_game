import { IUserAuthorization } from "../../../services/authorization/auth-type"


export type IAuthSlice = {
    auth: IUserAuthorization| null
}
