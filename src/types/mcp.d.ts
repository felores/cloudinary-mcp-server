declare module '@modelcontextprotocol/claude-sdk/server/index.js' {
  export class Server {
    constructor(info: { name: string; version: string }, config: { capabilities: { tools: {} } });
    setRequestHandler(schema: any, handler: (request: any) => Promise<any>): void;
    connect(transport: any): Promise<void>;
    close(): Promise<void>;
    onerror: (error: any) => void;
  }
}

declare module '@modelcontextprotocol/claude-sdk/server/stdio.js' {
  export class StdioServerTransport {
    constructor();
  }
}

declare module '@modelcontextprotocol/claude-sdk/types.js' {
  export const CallToolRequestSchema: unique symbol;
  export const ListToolsRequestSchema: unique symbol;
  
  export enum ErrorCode {
    InvalidRequest = 'InvalidRequest',
    MethodNotFound = 'MethodNotFound',
    InternalError = 'InternalError'
  }

  export class McpError extends Error {
    constructor(code: ErrorCode, message: string);
  }
}
