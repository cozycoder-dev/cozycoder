"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildInterfaceChecker = void 0;
/**
 * This utility allows to create an assertion function that checks if a
 * particular interface is fully implemented by some value.
 *
 * The use of the (rather complex) {@link UnionToTuple} allows to ensure that,
 * at runtime, all the required interface keys are indeed checked, and that
 * future additions to the interface do not result in a false sense of type
 * safety.
 *
 * @note This function should not be made public, as it relies on a quirk of
 * TypeScript to work properly.
 *
 * @example Valid use
 *
 * ```ts
 * const isFoo = buildInterfaceChecker<{ foo: string }>(['foo'])
 * const isFooBar = buildInterfaceChecker<{ foo: string; bar: boolean }>([
 *   'foo',
 *   'bar',
 * ])
 *
 * declare const val: { foo?: string }
 *
 * if (isFoo(val)) {
 *   val // { foo: string }
 * }
 * ```
 *
 * @example Use cases where the runtime keys do not match the interface keys
 *
 * ```ts
 * buildInterfaceChecker<{ foo: string }>([])
 * buildInterfaceChecker<{ foo: string }>(['fee'])
 * buildInterfaceChecker<{ foo: string; bar: string }>(['foo'])
 * buildInterfaceChecker<{ foo: string; bar: string }>(['foo', 'baz'])
 * ```
 */
const buildInterfaceChecker = (keys) => (value) => keys.every((name) => value[name] !== undefined);
exports.buildInterfaceChecker = buildInterfaceChecker;
// </hardcore-mode>
//# sourceMappingURL=type.js.map