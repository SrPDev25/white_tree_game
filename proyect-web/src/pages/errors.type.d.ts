/**
 * useRouteError type options
 */
export type IRouterError = unknown & {
    /**HTTP error number */
    status?: number;
    /**HTTP error message */
    statusText?: string;
    /**HTTP error message */
    message?: string;
};