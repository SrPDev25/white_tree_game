import { Request } from "express";
import { IUserAuthorization } from "../../auth/app/response.type";

/**
 * Database info is necessary in other controllers at this router
 */
export type IPartyRequestMetaData = {
    userAuthorization?: IUserAuthorization
};

/**Router type + PartyContext */
export type IPartyRouterRequest  = Request & IPartyRequestMetaData;