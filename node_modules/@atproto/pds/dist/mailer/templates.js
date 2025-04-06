"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.plcOperation = exports.updateEmail = exports.confirmEmail = exports.deleteAccount = exports.resetPassword = void 0;
var reset_password_1 = require("./templates/reset-password");
Object.defineProperty(exports, "resetPassword", { enumerable: true, get: function () { return __importDefault(reset_password_1).default; } });
var delete_account_1 = require("./templates/delete-account");
Object.defineProperty(exports, "deleteAccount", { enumerable: true, get: function () { return __importDefault(delete_account_1).default; } });
var confirm_email_1 = require("./templates/confirm-email");
Object.defineProperty(exports, "confirmEmail", { enumerable: true, get: function () { return __importDefault(confirm_email_1).default; } });
var update_email_1 = require("./templates/update-email");
Object.defineProperty(exports, "updateEmail", { enumerable: true, get: function () { return __importDefault(update_email_1).default; } });
var plc_operation_1 = require("./templates/plc-operation");
Object.defineProperty(exports, "plcOperation", { enumerable: true, get: function () { return __importDefault(plc_operation_1).default; } });
//# sourceMappingURL=templates.js.map