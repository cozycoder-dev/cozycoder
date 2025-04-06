export declare class TransformedResponse extends Response {
    #private;
    constructor(response: Response, transform: TransformStream);
    /**
     * Some props can't be set through ResponseInit, so we need to proxy them
     */
    get url(): string;
    get redirected(): boolean;
    get type(): ResponseType;
    get statusText(): string;
}
//# sourceMappingURL=transformed-response.d.ts.map