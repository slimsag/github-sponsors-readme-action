"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNullOrUndefined = void 0;
/* Utility function that checks to see if a value is undefined or not. */
exports.isNullOrUndefined = (value) => typeof value === 'undefined' || value === null || value === '';
