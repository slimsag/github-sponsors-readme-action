"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.PrivacyLevel = exports.action = void 0;
const core_1 = require("@actions/core");
const util_1 = require("./util");
// Required action data that gets initialized when running within the GitHub Actions environment.
exports.action = {
    token: core_1.getInput('token'),
    template: !util_1.isNullOrUndefined(core_1.getInput('template'))
        ? core_1.getInput('template')
        : `<a href="https://github.com/{{{ login }}}"><img src="https://github.com/{{{ login }}}.png" width="60px" alt="" /></a>`,
    sponsorshipThreshold: !util_1.isNullOrUndefined(core_1.getInput('sponsorship-threshold'))
        ? parseInt(core_1.getInput('sponsorship-threshold'))
        : 0,
    marker: !util_1.isNullOrUndefined(core_1.getInput('marker'))
        ? core_1.getInput('marker')
        : 'sponsors',
    file: core_1.getInput('file'),
    fallback: !util_1.isNullOrUndefined(core_1.getInput('fallback')) ? core_1.getInput('fallback') : ``,
    organization: !util_1.isNullOrUndefined(core_1.getInput('organization'))
        ? core_1.getInput('organization').toLowerCase() === 'true'
        : false,
};
var PrivacyLevel;
(function (PrivacyLevel) {
    PrivacyLevel["PUBLIC"] = "PUBLIC";
    PrivacyLevel["PRIVATE"] = "PRIVATE";
})(PrivacyLevel = exports.PrivacyLevel || (exports.PrivacyLevel = {}));
/** Status codes for the action. */
var Status;
(function (Status) {
    Status["SUCCESS"] = "success";
    Status["FAILED"] = "failed";
    Status["SKIPPED"] = "skipped";
    Status["RUNNING"] = "running";
})(Status = exports.Status || (exports.Status = {}));
