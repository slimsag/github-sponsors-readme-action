"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTemplate = exports.generatePlaceholders = exports.retrieveData = void 0;
require("cross-fetch/polyfill");
const core_1 = require("@actions/core");
const fs_1 = require("fs");
function retrieveData() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `query { 
        viewer {
          login
          sponsorshipsAsMaintainer(first: 100, orderBy: {field: CREATED_AT, direction: ASC}, includePrivate: true) {
            totalCount
            pageInfo {
              endCursor
            }
            nodes {
              sponsorEntity {
                ... on User {
                  name
                  login
                  url
                }
              }
              createdAt
              privacyLevel
              tier {
                monthlyPriceInCents
              }
            }
          }
        }
      }`;
        const data = yield fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${core_1.getInput('token')}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                query
            })
        });
        return data.json();
    });
}
exports.retrieveData = retrieveData;
function generatePlaceholders(response) {
    let placeholder = ``;
    response.data.viewer.sponsorshipsAsMaintainer.nodes.map(({ sponsorEntity }) => {
        placeholder = placeholder += `<a href=""><img src="https://avatars.githubusercontent.com/u/10888441?v=4" /></a> Name is ${sponsorEntity.name}`;
    });
    return placeholder;
}
exports.generatePlaceholders = generatePlaceholders;
function generateTemplate(response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const template = core_1.getInput('template');
            console.log('reading file...');
            let data = yield fs_1.promises.readFile(template, 'utf8');
            data = data.replace(/<!-- START COMMENT -->[\s\S]*?<!-- END COMMENT -->/g, generatePlaceholders(response));
            yield fs_1.promises.writeFile(template, data);
        }
        catch (error) {
            throw new Error('Caught an error');
        }
    });
}
exports.generateTemplate = generateTemplate;
