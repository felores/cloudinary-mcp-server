# MCP Development Guide for LLMs

This guide provides structured information for LLMs to assist in creating, modifying, and using Model Context Protocol (MCP) servers.

## 1. Core Concepts

### Protocol Overview
- MCP enables standardized communication between LLM applications and integrations
- Uses client-server architecture with JSON-RPC 2.0 message format
- Latest protocol version: 2024-11-05
- Supports stdio and SSE transports

### Key Components
1. **Hosts**: LLM applications that initiate connections (e.g., Claude Desktop)
2. **Clients**: Maintain 1:1 connections with servers
3. **Servers**: Provide context, tools, and prompts to clients
4. **Resources**: File-like data that can be read by clients
5. **Tools**: Functions that can be called by the LLM
6. **Prompts**: Pre-written templates for specific tasks

## 2. Server Implementation Guidelines

### Server Structure
1. Core Server Class:
```typescript
class Server extends Protocol<ServerRequest, ServerNotification, ServerResult> {
    constructor(serverInfo: Implementation, options: ServerOptions)
    // Must implement base protocol methods
}
```

2. Required Capabilities:
```typescript
interface ServerCapabilities {
    experimental?: object;
    logging?: object;
    prompts?: { listChanged?: boolean };
    resources?: { 
        subscribe?: boolean;
        listChanged?: boolean 
    };
    tools?: { listChanged?: boolean };
}
```

### Essential Implementation Steps

1. **Server Initialization**:
```typescript
const server = new Server(
    {
        name: "your-server-name",
        version: "1.0.0"
    },
    {
        capabilities: {
            // Declare supported capabilities
            resources: {},
            tools: {},
            prompts: {}
        }
    }
);
```

2. **Request Handlers**:
```typescript
// Example tool handler
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
        {
            name: "tool-name",
            description: "Tool description",
            inputSchema: {
                type: "object",
                properties: {
                    // Define parameters
                }
            }
        }
    ]
}));
```

3. **Transport Setup**:
```typescript
const transport = new StdioServerTransport();
await server.connect(transport);
```

## 3. Core Features Implementation

### Resources
```typescript
interface Resource {
    uri: string;
    name: string;
    description?: string;
    mimeType?: string;
}

// Handler example
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: [
        {
            uri: "custom://resource",
            name: "Resource Name",
            description: "Resource description"
        }
    ]
}));
```

### Tools
```typescript
interface Tool {
    name: string;
    description?: string;
    inputSchema: {
        type: "object";
        properties?: object;
        required?: string[];
    };
}

// Handler example
server.setRequestHandler(CallToolRequestSchema, async (request) => ({
    content: [
        {
            type: "text",
            text: "Tool execution result"
        }
    ]
}));
```

### Prompts
```typescript
interface Prompt {
    name: string;
    description?: string;
    arguments?: PromptArgument[];
}

// Handler example
server.setRequestHandler(GetPromptRequestSchema, async (request) => ({
    messages: [
        {
            role: "user",
            content: {
                type: "text",
                text: "Prompt template"
            }
        }
    ]
}));
```

## 4. Best Practices

### Error Handling
1. Use appropriate error codes:
```typescript
enum ErrorCode {
    ParseError = -32700,
    InvalidRequest = -32600,
    MethodNotFound = -32601,
    InvalidParams = -32602,
    InternalError = -32603
}
```

2. Tool errors should be in result:
```typescript
{
    isError: true,
    content: [{
        type: "text",
        text: "Error description"
    }]
}
```

### Security Considerations
1. Input Validation:
   - Validate all parameters against schemas
   - Sanitize file paths and system commands
   - Validate URLs and external identifiers
   - Check parameter sizes and ranges

2. Access Control:
   - Implement authentication where needed
   - Use appropriate authorization checks
   - Audit tool usage
   - Rate limit requests

3. Resource Protection:
   - Validate resource paths
   - Monitor resource usage
   - Implement access controls
   - Rate limit requests

### Message Handling
1. Request Processing:
   - Validate inputs thoroughly
   - Use type-safe schemas
   - Handle errors gracefully
   - Implement timeouts

2. Progress Reporting:
   - Use progress tokens for long operations
   - Report progress incrementally
   - Include total progress when known

## 5. Client Integration Guidelines

### Client Configuration
```json
{
    "mcpServers": {
        "server-name": {
            "command": "command-to-run",
            "args": ["arg1", "arg2"],
            "env": {
                "ENV_VAR": "value"
            }
        }
    }
}
```

### Environment Variables
- Server inherits limited environment variables
- Custom variables must be specified in config
- Sensitive data should be in environment variables

## 6. Testing and Debugging

### MCP Inspector Usage
1. Start inspector with server:
```bash
npx mcp-inspector your-server-command
```

2. Features to test:
   - Resource listing and reading
   - Tool execution
   - Prompt generation
   - Error handling
   - Progress reporting

### Common Issues
1. Connection Problems:
   - Check transport configuration
   - Verify server process is running
   - Check for initialization errors

2. Message Handling:
   - Validate message formats
   - Check handler implementations
   - Verify error responses

3. Resource Issues:
   - Check file permissions
   - Validate URI formats
   - Verify content types

## 7. Performance and Scaling

### Best Practices
1. Resource Management:
   - Cache when appropriate
   - Implement cleanup
   - Monitor memory usage

2. Request Handling:
   - Use appropriate timeouts
   - Implement rate limiting
   - Handle concurrent requests

3. Error Recovery:
   - Implement reconnection logic
   - Handle partial failures
   - Clean up resources

## 8. Documentation Requirements

### Server Documentation
1. Capabilities Documentation:
   - List supported features
   - Document configuration options
   - Describe environment variables

2. API Documentation:
   - Document all resources
   - Document all tools
   - Document all prompts
   - Include example usage

3. Error Documentation:
   - List possible error codes
   - Describe error conditions
   - Include recovery steps

### Integration Guide
1. Setup Instructions:
   - Installation steps
   - Configuration options
   - Environment setup

2. Usage Examples:
   - Basic usage patterns
   - Common integrations
   - Error handling examples

## 9. Versioning and Updates

### Version Management
1. Protocol Versioning:
   - Support LATEST_PROTOCOL_VERSION
   - Handle version negotiation
   - Maintain compatibility

2. Server Versioning:
   - Use semantic versioning
   - Document breaking changes
   - Provide migration guides

### Update Handling
1. Capability Updates:
   - Notify clients of changes
   - Handle capability negotiation
   - Maintain backwards compatibility

2. Resource Updates:
   - Handle resource changes
   - Notify subscribed clients
   - Maintain consistency

## 10. Specific Server Types

### Database Servers (like Airtable)
1. Required Capabilities:
   - Resources for data access
   - Tools for data manipulation
   - Prompts for common operations

2. Implementation Focus:
   - Connection management
   - Query handling
   - Data transformation
   - Error handling
   - Rate limiting

3. Security Considerations:
   - API key management
   - Access control
   - Data validation
   - Request sanitization

4. Tools to Implement:
   - List databases/bases
   - Create/modify tables
   - Query data
   - Update records
   - Delete records

5. Resource Structure:
   - Database schema
   - Table contents
   - Query results

6. Error Handling:
   - Connection errors
   - Query errors
   - Rate limit errors
   - Authorization errors

This guide should be used as a reference when assisting with MCP server development. Always consider the specific requirements and constraints of the project while following these guidelines.
