export interface ActionInterface {
  /** The template to use. */
  template: string
}
export declare const action: {
  template: string
}
export declare enum PrivacyLevel {
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
