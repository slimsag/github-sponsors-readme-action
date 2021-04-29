import 'cross-fetch/polyfill'
import {getInput} from '@actions/core'


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

  console.log('data', data)

  return data.json()
}
