"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSkeletonSearchPost = isSkeletonSearchPost;
exports.validateSkeletonSearchPost = validateSkeletonSearchPost;
exports.isSkeletonSearchActor = isSkeletonSearchActor;
exports.validateSkeletonSearchActor = validateSkeletonSearchActor;
exports.isSkeletonSearchStarterPack = isSkeletonSearchStarterPack;
exports.validateSkeletonSearchStarterPack = validateSkeletonSearchStarterPack;
exports.isTrendingTopic = isTrendingTopic;
exports.validateTrendingTopic = validateTrendingTopic;
exports.isSkeletonTrend = isSkeletonTrend;
exports.validateSkeletonTrend = validateSkeletonTrend;
exports.isTrendView = isTrendView;
exports.validateTrendView = validateTrendView;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.unspecced.defs';
const hashSkeletonSearchPost = 'skeletonSearchPost';
function isSkeletonSearchPost(v) {
    return is$typed(v, id, hashSkeletonSearchPost);
}
function validateSkeletonSearchPost(v) {
    return validate(v, id, hashSkeletonSearchPost);
}
const hashSkeletonSearchActor = 'skeletonSearchActor';
function isSkeletonSearchActor(v) {
    return is$typed(v, id, hashSkeletonSearchActor);
}
function validateSkeletonSearchActor(v) {
    return validate(v, id, hashSkeletonSearchActor);
}
const hashSkeletonSearchStarterPack = 'skeletonSearchStarterPack';
function isSkeletonSearchStarterPack(v) {
    return is$typed(v, id, hashSkeletonSearchStarterPack);
}
function validateSkeletonSearchStarterPack(v) {
    return validate(v, id, hashSkeletonSearchStarterPack);
}
const hashTrendingTopic = 'trendingTopic';
function isTrendingTopic(v) {
    return is$typed(v, id, hashTrendingTopic);
}
function validateTrendingTopic(v) {
    return validate(v, id, hashTrendingTopic);
}
const hashSkeletonTrend = 'skeletonTrend';
function isSkeletonTrend(v) {
    return is$typed(v, id, hashSkeletonTrend);
}
function validateSkeletonTrend(v) {
    return validate(v, id, hashSkeletonTrend);
}
const hashTrendView = 'trendView';
function isTrendView(v) {
    return is$typed(v, id, hashTrendView);
}
function validateTrendView(v) {
    return validate(v, id, hashTrendView);
}
//# sourceMappingURL=defs.js.map