import 'cross-fetch/polyfill';
export declare function retrieveData(): Promise<Record<string, unknown>>;
export declare function generatePlaceholders(response: any): string;
export declare function generateTemplate(response: any): Promise<void>;
