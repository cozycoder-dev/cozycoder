"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const printf_1 = require("../../src/printf");
(0, ava_1.default)('interpolates %b', (t) => {
    t.is((0, printf_1.printf)('%b', true), 'true');
    t.is((0, printf_1.printf)('%b', false), 'false');
    t.is((0, printf_1.printf)('%b', 1), 'true');
    t.is((0, printf_1.printf)('%b', 0), 'false');
});
(0, ava_1.default)('interpolates %B', (t) => {
    t.is((0, printf_1.printf)('%B', true), 'TRUE');
    t.is((0, printf_1.printf)('%B', false), 'FALSE');
    t.is((0, printf_1.printf)('%B', 1), 'TRUE');
    t.is((0, printf_1.printf)('%B', 0), 'FALSE');
});
(0, ava_1.default)('interpolates %c', (t) => {
    t.is((0, printf_1.printf)('%c', 'a'), 'a');
    t.is((0, printf_1.printf)('%c%c', 'a', 'b'), 'ab');
});
(0, ava_1.default)('interpolates %C', (t) => {
    t.is((0, printf_1.printf)('%C', 'a'), 'A');
});
(0, ava_1.default)('interpolates %i', (t) => {
    t.is((0, printf_1.printf)('%i', 123), '123');
});
(0, ava_1.default)('interpolates %i (removes fractional digits)', (t) => {
    t.is((0, printf_1.printf)('%i', 123.567), '123');
});
(0, ava_1.default)('interpolates %d', (t) => {
    t.is((0, printf_1.printf)('%d', 123), '123');
});
(0, ava_1.default)('interpolates %d (removes fractional digits)', (t) => {
    t.is((0, printf_1.printf)('%d', 123.567), '123');
});
(0, ava_1.default)('interpolates %3d', (t) => {
    t.is((0, printf_1.printf)('%3d', 1), '  1');
    t.is((0, printf_1.printf)('%3d', 1234), '1234');
});
(0, ava_1.default)('interpolates %+3d', (t) => {
    t.is((0, printf_1.printf)('%+3d', 1), ' +1');
    t.is((0, printf_1.printf)('%+3d', 1234), '+1234');
});
(0, ava_1.default)('interpolates %+3d (negative number)', (t) => {
    t.is((0, printf_1.printf)('%+3d', -1), ' -1');
    t.is((0, printf_1.printf)('%+3d', -1234), '-1234');
});
(0, ava_1.default)('interpolates %-+3d', (t) => {
    t.is((0, printf_1.printf)('%-+3d', 1), '+1 ');
    t.is((0, printf_1.printf)('%-+3d', 1234), '+1234');
});
(0, ava_1.default)('interpolates %-+3d (negative number)', (t) => {
    t.is((0, printf_1.printf)('%-+3d', -1), '-1 ');
    t.is((0, printf_1.printf)('%-+3d', -1234), '-1234');
});
(0, ava_1.default)('interpolates %-3d', (t) => {
    t.is((0, printf_1.printf)('%-3d', 1), '1  ');
    t.is((0, printf_1.printf)('%-3d', 1234), '1234');
});
(0, ava_1.default)('interpolates %03d', (t) => {
    t.is((0, printf_1.printf)('%03d', 1), '001');
    t.is((0, printf_1.printf)('%03d', 1234), '1234');
});
(0, ava_1.default)('interpolates %e', (t) => {
    t.is((0, printf_1.printf)('%e', 52.8), '5.28e+1');
});
(0, ava_1.default)('interpolates %E', (t) => {
    t.is((0, printf_1.printf)('%E', 52.8), '5.28E+1');
});
(0, ava_1.default)('interpolates %f', (t) => {
    t.is((0, printf_1.printf)('%f', 52.8), '52.8');
});
(0, ava_1.default)('interpolates %.1f', (t) => {
    t.is((0, printf_1.printf)('%.1f', 1.2345), '1.2');
    t.is((0, printf_1.printf)('%.1f', 1.25), '1.3');
});
(0, ava_1.default)('interpolates %5.1f', (t) => {
    t.is((0, printf_1.printf)('%5.1f', 1.2345), '  1.2');
    t.is((0, printf_1.printf)('%5.1f', 1.25), '  1.3');
});
(0, ava_1.default)('interpolates %+5.1f', (t) => {
    t.is((0, printf_1.printf)('%+5.1f', 1.2345), ' +1.2');
    t.is((0, printf_1.printf)('%+5.1f', 1.25), ' +1.3');
});
(0, ava_1.default)('interpolates %+5.1f (negative number)', (t) => {
    t.is((0, printf_1.printf)('%+5.1f', -1.2345), ' -1.2');
    t.is((0, printf_1.printf)('%+5.1f', -1.25), ' -1.3');
});
(0, ava_1.default)('interpolates %-+5.1f', (t) => {
    t.is((0, printf_1.printf)('%-+5.1f', 1.2345), '+1.2 ');
    t.is((0, printf_1.printf)('%-+5.1f', 1.25), '+1.3 ');
});
(0, ava_1.default)('interpolates %-+5.1f (negative number)', (t) => {
    t.is((0, printf_1.printf)('%-+5.1f', -1.2345), '-1.2 ');
    t.is((0, printf_1.printf)('%-+5.1f', -1.25), '-1.3 ');
});
(0, ava_1.default)('interpolates %-5.1f', (t) => {
    t.is((0, printf_1.printf)('%-5.1f', 1.2345), '1.2  ');
    t.is((0, printf_1.printf)('%-5.1f', 1.25), '1.3  ');
});
(0, ava_1.default)('interpolates %05.1f', (t) => {
    t.is((0, printf_1.printf)('%05.1f', 1.2345), '001.2');
    t.is((0, printf_1.printf)('%05.1f', 1.25), '001.3');
});
(0, ava_1.default)('interpolates %o', (t) => {
    t.is((0, printf_1.printf)('%o', 8), '10');
});
(0, ava_1.default)('interpolates %s', (t) => {
    t.is((0, printf_1.printf)('%s', 'foo'), 'foo');
});
(0, ava_1.default)('interpolates %S', (t) => {
    t.is((0, printf_1.printf)('%S', 'foo'), 'FOO');
});
(0, ava_1.default)('interpolates %5s', (t) => {
    t.is((0, printf_1.printf)('%5s', 'foo'), '  foo');
});
(0, ava_1.default)('interpolates %-5s', (t) => {
    t.is((0, printf_1.printf)('%-5s', 'foo'), 'foo  ');
});
(0, ava_1.default)('interpolates %u', (t) => {
    t.is((0, printf_1.printf)('%u', 0), '0');
    t.is((0, printf_1.printf)('%u', 1), '1');
    t.is((0, printf_1.printf)('%u', -1), '4294967295');
});
(0, ava_1.default)('interpolates %x', (t) => {
    t.is((0, printf_1.printf)('%x', 255), 'ff');
});
(0, ava_1.default)('interpolates %5x', (t) => {
    t.is((0, printf_1.printf)('%5x', 255), '   ff');
});
(0, ava_1.default)('%% prints %', (t) => {
    t.is((0, printf_1.printf)('%%'), '%');
});
(0, ava_1.default)('%%s prints %s', (t) => {
    t.is((0, printf_1.printf)('%%s'), '%s');
});
(0, ava_1.default)('%% does not advance value cursor', (t) => {
    t.is((0, printf_1.printf)('%% %s', 'foo'), '% foo');
});
(0, ava_1.default)('\\% prints %', (t) => {
    t.is((0, printf_1.printf)('\\%'), '%');
});
(0, ava_1.default)('\\% does not advance value cursor', (t) => {
    t.is((0, printf_1.printf)('\\% %s', 'foo'), '% foo');
});
(0, ava_1.default)('does not interpolate unbound placeholders', (t) => {
    t.is((0, printf_1.printf)('%s %s %s %s', 'foo'), 'foo %s %s %s');
});
(0, ava_1.default)('%2$s %1$s', (t) => {
    t.is((0, printf_1.printf)('%2$s %1$s', 'bar', 'foo'), 'foo bar');
});
(0, ava_1.default)('%1$.2f', (t) => {
    t.is((0, printf_1.printf)('%1$.2f', 123.456), '123.46');
});
