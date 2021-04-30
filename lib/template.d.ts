import 'cross-fetch/polyfill';
import { ActionInterface, GitHubResponse } from './constants';
export declare function getSponsors(action: ActionInterface): Promise<GitHubResponse>;
export declare function generateTemplate(response: GitHubResponse, action: ActionInterface): string;
export declare function generateFile(response: GitHubResponse, action: ActionInterface): Promise<void>;
