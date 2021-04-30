import 'cross-fetch/polyfill'
import {getInput} from '@actions/core'
import {promises} from 'fs'
import {PrivacyLevel, Sponsor, SponsorshipsAsMaintainer} from './constants'

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

export function generateTemplate(response): string {
  let placeholder = ``

  const sponsorshipsAsMaintainer: SponsorshipsAsMaintainer =
    response.data.viewer.sponsorshipsAsMaintainer

  sponsorshipsAsMaintainer.nodes
    .filter((user: Sponsor) => user.privacyLevel !== PrivacyLevel.PRIVATE)
    .map(({sponsorEntity}) => {
      placeholder = placeholder += `$<a href="https://github.com/${sponsorEntity.login}"><img src="https://github.com/${sponsorEntity.login}.png" width="60px" alt="" /></a>`
    })

  return placeholder
}

export async function generateFile(response): Promise<void> {
  try {
    const template = getInput('template')
    let data = await promises.readFile(template, 'utf8')

    data = data.replace(
      /(<!-- START COMMENT -->)[\s\S]*?(<!-- END COMMENT -->)/g,
      `$1${generateTemplate(response)}$2`
    )

    console.log('replacing contents', data)

    await promises.writeFile(template, data)
  } catch (error) {
    throw new Error('Caught an error')
  }
}
