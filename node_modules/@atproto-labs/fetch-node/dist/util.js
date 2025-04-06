"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnicastIp = isUnicastIp;
const ipaddr_js_1 = __importDefault(require("ipaddr.js"));
const { IPv4, IPv6 } = ipaddr_js_1.default;
function parseIpHostname(hostname) {
    if (IPv4.isIPv4(hostname)) {
        return IPv4.parse(hostname);
    }
    if (hostname.startsWith('[') && hostname.endsWith(']')) {
        return IPv6.parse(hostname.slice(1, -1));
    }
    return undefined;
}
function isUnicastIp(hostname) {
    const ip = parseIpHostname(hostname);
    return ip ? ip.range() === 'unicast' : undefined;
}
//# sourceMappingURL=util.js.map