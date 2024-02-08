import { ObjectId } from "mongodb";

/**
 * User at user database
 */
export type IUser = {
    /**_id at user database */
    _id: ObjectId;
    /**Authorization token */
    token: string;
    /**Party _id */
    party: ObjectId;
}