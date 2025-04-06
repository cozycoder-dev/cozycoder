"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateToEpoch = dateToEpoch;
exports.dateToRelativeSeconds = dateToRelativeSeconds;
function dateToEpoch(date = new Date()) {
    return Math.floor(date.getTime() / 1000);
}
function dateToRelativeSeconds(date) {
    return Math.floor((date.getTime() - Date.now()) / 1000);
}
//# sourceMappingURL=date.js.map