"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subsystemLogger = void 0;
const pino_1 = require("pino");
const allSystemsEnabled = !process.env.LOG_SYSTEMS;
const enabledSystems = (process.env.LOG_SYSTEMS || '')
    .replace(',', ' ')
    .split(' ');
const enabledEnv = process.env.LOG_ENABLED;
const enabled = enabledEnv === 'true' || enabledEnv === 't' || enabledEnv === '1';
const level = process.env.LOG_LEVEL || 'info';
const config = {
    enabled,
    level,
};
const rootLogger = process.env.LOG_DESTINATION
    ? (0, pino_1.pino)(config, (0, pino_1.destination)(process.env.LOG_DESTINATION))
    : (0, pino_1.pino)(config);
const subsystems = {};
const subsystemLogger = (name) => {
    if (subsystems[name])
        return subsystems[name];
    const subsystemEnabled = enabled && (allSystemsEnabled || enabledSystems.indexOf(name) > -1);
    // can't disable child loggers, so we just set their level to fatal to effectively turn them off
    subsystems[name] = rootLogger.child({ name }, { level: subsystemEnabled ? level : 'silent' });
    return subsystems[name];
};
exports.subsystemLogger = subsystemLogger;
//# sourceMappingURL=logger.js.map