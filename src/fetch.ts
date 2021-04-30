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

export async function generateTemplate(response: any): Promise<void> {
  try {
    const template = getInput('template')
    const replacedData = ''

    console.log('reading file...')
    await promises.readFile(template, 'utf8', function (err, data) {
      if (err) throw err
      replacedData = data.replace(
        /\<\!\-\-replaceme\-\-\>((.|[\n|\r|\r\n])*?)\<\!\-\-replaceme\-\-\>[\n|\r|\r\n]?(\s+)?/g,
        generatePlaceholders(response)
      )
    })

    await promises.writeFile(template, replacedData)
  } catch (error) {
    throw new Error('Caught an error')
  }
}
