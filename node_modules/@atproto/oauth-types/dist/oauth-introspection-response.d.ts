import { OAuthAuthorizationDetails } from './oauth-authorization-details.js';
import { OAuthTokenType } from './oauth-token-type.js';
export type OAuthIntrospectionResponse = {
    active: false;
} | {
    active: true;
    scope?: string;
    client_id?: string;
    username?: string;
    token_type?: OAuthTokenType;
    authorization_details?: OAuthAuthorizationDetails;
    aud?: string | [string, ...string[]];
    exp?: number;
    iat?: number;
    iss?: string;
    jti?: string;
    nbf?: number;
    sub?: string;
};
//# sourceMappingURL=oauth-introspection-response.d.ts.map