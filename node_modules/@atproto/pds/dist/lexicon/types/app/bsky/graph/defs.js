"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFERENCELIST = exports.CURATELIST = exports.MODLIST = void 0;
exports.isListViewBasic = isListViewBasic;
exports.validateListViewBasic = validateListViewBasic;
exports.isListView = isListView;
exports.validateListView = validateListView;
exports.isListItemView = isListItemView;
exports.validateListItemView = validateListItemView;
exports.isStarterPackView = isStarterPackView;
exports.validateStarterPackView = validateStarterPackView;
exports.isStarterPackViewBasic = isStarterPackViewBasic;
exports.validateStarterPackViewBasic = validateStarterPackViewBasic;
exports.isListViewerState = isListViewerState;
exports.validateListViewerState = validateListViewerState;
exports.isNotFoundActor = isNotFoundActor;
exports.validateNotFoundActor = validateNotFoundActor;
exports.isRelationship = isRelationship;
exports.validateRelationship = validateRelationship;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.graph.defs';
const hashListViewBasic = 'listViewBasic';
function isListViewBasic(v) {
    return is$typed(v, id, hashListViewBasic);
}
function validateListViewBasic(v) {
    return validate(v, id, hashListViewBasic);
}
const hashListView = 'listView';
function isListView(v) {
    return is$typed(v, id, hashListView);
}
function validateListView(v) {
    return validate(v, id, hashListView);
}
const hashListItemView = 'listItemView';
function isListItemView(v) {
    return is$typed(v, id, hashListItemView);
}
function validateListItemView(v) {
    return validate(v, id, hashListItemView);
}
const hashStarterPackView = 'starterPackView';
function isStarterPackView(v) {
    return is$typed(v, id, hashStarterPackView);
}
function validateStarterPackView(v) {
    return validate(v, id, hashStarterPackView);
}
const hashStarterPackViewBasic = 'starterPackViewBasic';
function isStarterPackViewBasic(v) {
    return is$typed(v, id, hashStarterPackViewBasic);
}
function validateStarterPackViewBasic(v) {
    return validate(v, id, hashStarterPackViewBasic);
}
/** A list of actors to apply an aggregate moderation action (mute/block) on. */
exports.MODLIST = `${id}#modlist`;
/** A list of actors used for curation purposes such as list feeds or interaction gating. */
exports.CURATELIST = `${id}#curatelist`;
/** A list of actors used for only for reference purposes such as within a starter pack. */
exports.REFERENCELIST = `${id}#referencelist`;
const hashListViewerState = 'listViewerState';
function isListViewerState(v) {
    return is$typed(v, id, hashListViewerState);
}
function validateListViewerState(v) {
    return validate(v, id, hashListViewerState);
}
const hashNotFoundActor = 'notFoundActor';
function isNotFoundActor(v) {
    return is$typed(v, id, hashNotFoundActor);
}
function validateNotFoundActor(v) {
    return validate(v, id, hashNotFoundActor);
}
const hashRelationship = 'relationship';
function isRelationship(v) {
    return is$typed(v, id, hashRelationship);
}
function validateRelationship(v) {
    return validate(v, id, hashRelationship);
}
//# sourceMappingURL=defs.js.map