import 'cross-fetch/polyfill'
import {getInput} from '@actions/core'
import {promises} from 'fs'

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

export function generatePlaceholders(response): string {
  let placeholder = ``

  response.data.viewer.sponsorshipsAsMaintainer.nodes.map(({sponsorEntity}) => {
    placeholder = placeholder += `<a href=""><img src="https://avatars.githubusercontent.com/u/10888441?v=4" /></a> Name is ${sponsorEntity.name}`
  })

  return placeholder
}

export async function generateTemplate(response): Promise<void> {
  try {
    const template = getInput('template')

    console.log('reading file...')
    let data = await promises.readFile(template, 'utf8')

    data = data.replace(
      /<!-- START COMMENT -->[\s\S]*?<!-- END COMMENT -->/g,
      generatePlaceholders(response)
    )

    console.log('replacing contents', data)

    await promises.writeFile(template, data)
  } catch (error) {
    throw new Error('Caught an error')
  }
}
