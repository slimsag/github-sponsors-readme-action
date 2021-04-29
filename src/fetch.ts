import 'cross-fetch/polyfill'
import {getInput} from '@actions/core'
import fs from 'fs';


export async function retrieveData(): Promise<Record<string, unknown>> {
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
      }`

  const data = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getInput('token')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query
    })
  })


  return data.json()
}

export async function generatePlaceholders(response) {
  let placeholder = ``

  response.data.viewer.sponsorshipsAsMaintainer.nodes.map(({sponsorEntity}) => {
    placeholder = placeholder += `<a href=""><img src="https://avatars.githubusercontent.com/u/10888441?v=4" /></a> Name is ${sponsorEntity.name}`
  })

  return placeholder;

}

export async function generateTemplate(response): Promise<void> {
  const template = getInput('template');

  console.log('reading file...')
  fs.readFile(`${template}.template.md`, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/replaceme/g, generatePlaceholders(response));
  
    console.log('writing file...')
    fs.writeFile(`${template}.md`, result, 'utf8', function (err) {
       if (err) return console.log(err);
    });
  });
}