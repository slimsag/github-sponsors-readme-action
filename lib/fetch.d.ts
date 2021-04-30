import 'cross-fetch/polyfill'
export declare function retrieveData(): Promise<Record<string, unknown>>
export declare function generateTemplate(response: any): string
export declare function generateFile(response: any): Promise<void>
