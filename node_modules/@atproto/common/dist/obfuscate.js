"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obfuscateEmail = obfuscateEmail;
exports.obfuscateWord = obfuscateWord;
exports.obfuscateHeaders = obfuscateHeaders;
exports.obfuscateAuthHeader = obfuscateAuthHeader;
exports.obfuscateBasic = obfuscateBasic;
exports.obfuscateBearer = obfuscateBearer;
exports.obfuscateToken = obfuscateToken;
exports.obfuscateJwt = obfuscateJwt;
function obfuscateEmail(email) {
    const [local, domain] = email.split('@');
    return `${obfuscateWord(local)}@${obfuscateWord(domain)}`;
}
function obfuscateWord(word) {
    return `${word.charAt(0)}***${word.charAt(word.length - 1)}`;
}
function obfuscateHeaders(headers) {
    const obfuscatedHeaders = {};
    for (const key in headers) {
        if (key.toLowerCase() === 'authorization') {
            obfuscatedHeaders[key] = obfuscateAuthHeader(headers[key]);
        }
        else if (key.toLowerCase() === 'dpop') {
            obfuscatedHeaders[key] = obfuscateJwt(headers[key]) || 'Invalid';
        }
        else {
            obfuscatedHeaders[key] = headers[key];
        }
    }
    return obfuscatedHeaders;
}
function obfuscateAuthHeader(authHeader) {
    // This is a hot path (runs on every request). Avoid using split() or regex.
    const spaceIdx = authHeader.indexOf(' ');
    if (spaceIdx === -1)
        return 'Invalid';
    const type = authHeader.slice(0, spaceIdx);
    switch (type.toLowerCase()) {
        case 'bearer':
        case 'dpop':
            return `${type} ${obfuscateBearer(authHeader.slice(spaceIdx + 1))}`;
        case 'basic':
            return `${type} ${obfuscateBasic(authHeader.slice(spaceIdx + 1)) || 'Invalid'}`;
        default:
            return `Invalid`;
    }
}
function obfuscateBasic(token) {
    if (!token)
        return null;
    const buffer = Buffer.from(token, 'base64');
    if (!buffer.length)
        return null; // Buffer.from will silently ignore invalid base64 chars
    const authHeader = buffer.toString('utf8');
    const colIdx = authHeader.indexOf(':');
    if (colIdx === -1)
        return null;
    const username = authHeader.slice(0, colIdx);
    return `${username}:***`;
}
function obfuscateBearer(token) {
    return obfuscateJwt(token) || obfuscateToken(token);
}
function obfuscateToken(token) {
    if (token.length >= 12)
        return obfuscateWord(token);
    return token ? '***' : '';
}
function obfuscateJwt(token) {
    const firstDot = token.indexOf('.');
    if (firstDot === -1)
        return null;
    const secondDot = token.indexOf('.', firstDot + 1);
    if (secondDot === -1)
        return null;
    // Expected to be missing
    const thirdDot = token.indexOf('.', secondDot + 1);
    if (thirdDot !== -1)
        return null;
    try {
        const payloadEnc = token.slice(firstDot + 1, secondDot);
        const payloadJson = Buffer.from(payloadEnc, 'base64').toString('utf8');
        const payload = JSON.parse(payloadJson);
        if (typeof payload.sub === 'string')
            return payload.sub;
    }
    catch {
        // Invalid JWT
        return null;
    }
    // Strip the signature
    return token.slice(0, secondDot) + '.obfuscated';
}
//# sourceMappingURL=obfuscate.js.map