export interface ActionInterface {
  /** The template to use. */
  template: string
}

// Required action data that gets initialized when running within the GitHub Actions environment.
export const action = {
  template: '123'
}

export enum PrivacyLevel {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

export interface Sponsor {
  sponsorEntity: {
    name: string | null
    login: string
    url: string
  }
  createdAt: string
  privacyLevel: PrivacyLevel
  tier: {
    monthlyPriceInCents: number
  }
}

export interface SponsorshipsAsMaintainer {
  totalCount: number
  pageInfo: {
    endCursor: string
  }
  nodes: Sponsor[]
}
