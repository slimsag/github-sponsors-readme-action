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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTemplate = exports.generatePlaceholders = exports.retrieveData = void 0;
require("cross-fetch/polyfill");
const core_1 = require("@actions/core");
const fs_1 = __importDefault(require("fs"));
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
    const template = core_1.getInput('template');
    console.log('reading file...');
    fs_1.default.readFile(`${template}.template.md`, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace(/replaceme/g, generatePlaceholders(response));
        console.log('writing file...');
        fs_1.default.writeFile(`${template}.md`, result, 'utf8', function (err) {
            if (err)
                return console.log(err);
        });
    });
}
exports.generateTemplate = generateTemplate;
