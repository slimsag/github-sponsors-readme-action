export interface ActionInterface {
    /** Deployment token. */
    token: string | null;
    /** The template to use. */
    template: string;
    /** The file to replace the content in. */
    file: string;
    /** The minimum amount sponsored to be included. */
    sponsorshipThreshold: number;
    /** The marker at which the content should be included within. */
    marker: string;
    /** If the user has no sponsors, we can replace it with a fallback. */
    fallback?: string;
}
export declare const action: {
    token: string;
    template: string;
    sponsorshipThreshold: number;
    marker: string;
    file: string;
};
/** Describes the response from the GitHub GraphQL query. */
export interface Sponsor {
    sponsorEntity: {
        name: string | null;
        login: string;
        url: string;
    };
    createdAt: string;
    privacyLevel: PrivacyLevel;
    tier: {
        monthlyPriceInCents: number;
    };
}
export interface SponsorshipsAsMaintainer {
    totalCount: number;
    pageInfo: {
        endCursor: string;
    };
    nodes: Sponsor[];
}
export interface GitHubResponse {
    data: {
        viewer: {
            sponsorshipsAsMaintainer: SponsorshipsAsMaintainer;
        };
    };
}
/** Types for the required action parameters. */
export declare type RequiredActionParameters = Pick<ActionInterface, 'token' | 'file' | 'marker'>;
/** Status codes for the action. */
export declare enum Status {
    SUCCESS = "success",
    FAILED = "failed",
    SKIPPED = "skipped",
    RUNNING = "running"
}
export declare enum PrivacyLevel {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE"
}
export interface Sponsor {
    sponsorEntity: {
        name: string | null;
        login: string;
        url: string;
    };
    createdAt: string;
    privacyLevel: PrivacyLevel;
    tier: {
        monthlyPriceInCents: number;
    };
}
export interface SponsorshipsAsMaintainer {
    totalCount: number;
    pageInfo: {
        endCursor: string;
    };
    nodes: Sponsor[];
}
