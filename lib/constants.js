"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivacyLevel = exports.action = void 0;
// Required action data that gets initialized when running within the GitHub Actions environment.
exports.action = {
    template: '123'
};
var PrivacyLevel;
(function (PrivacyLevel) {
    PrivacyLevel["PUBLIC"] = "PUBLIC";
    PrivacyLevel["PRIVATE"] = "PRIVATE";
})(PrivacyLevel = exports.PrivacyLevel || (exports.PrivacyLevel = {}));
