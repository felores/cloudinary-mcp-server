# MCP Inspector Guide for LLMs

This guide provides detailed information about using the MCP Inspector tool for testing, debugging, and validating MCP servers.

## 1. Getting Started

### Installation and Basic Usage
```bash
# Run directly without installation
npx mcp-inspector <server-command>

# For NPM/PyPi packages
npx mcp-inspector npx -y @your-package/server-name

# For local development
npx mcp-inspector node path/to/your/server.js
npx mcp-inspector python path/to/your/server.py
```

### Server Connection Setup
1. Select appropriate transport (stdio/SSE)
2. Configure command-line arguments
3. Set required environment variables
4. Test initial connection

## 2. Core Features

### Server Connection Pane
1. Transport Selection:
   - stdio for local servers
   - SSE for network-based servers
   - Custom transport configuration

2. Connection Settings:
   - Command-line arguments
   - Environment variables
   - Connection timeouts

3. Status Monitoring:
   - Connection state
   - Protocol version
   - Capability negotiation

### Resources Tab
1. Resource Listing:
   ```typescript
   // Example resource listing structure
   {
     resources: [
       {
         uri: "custom://resource",
         name: "Resource Name",
         description: "Resource description",
         mimeType: "text/plain"
       }
     ]
   }
   ```

2. Resource Inspection:
   - View metadata
   - Examine content
   - Check MIME types
   - Test resource reading

3. Subscription Testing:
   - Subscribe to updates
   - Monitor changes
   - Test unsubscribe

### Prompts Tab
1. Template Inspection:
   ```typescript
   // Example prompt structure
   {
     name: "prompt-name",
     description: "Prompt description",
     arguments: [
       {
         name: "arg1",
         description: "Argument description",
         required: true
       }
     ]
   }
   ```

2. Testing Features:
   - View available templates
   - Test with custom arguments
   - Preview generated messages
   - Validate responses

### Tools Tab
1. Tool Discovery:
   ```typescript
   // Example tool listing
   {
     tools: [
       {
         name: "tool-name",
         description: "Tool description",
         inputSchema: {
           type: "object",
           properties: {
             // Parameter definitions
           }
         }
       }
     ]
   }
   ```

2. Testing Features:
   - List available tools
   - Validate schemas
   - Test execution
   - Monitor results

### Notifications Pane
1. Message Types:
   - Server logs
   - Error messages
   - Status updates
   - Progress notifications

2. Monitoring:
   - Real-time updates
   - Message filtering
   - Error tracking

## 3. Testing Workflows

### Development Workflow
1. Initial Testing:
   ```bash
   # Start Inspector with development server
   npx mcp-inspector npm run dev
   ```

2. Development Cycle:
   - Make code changes
   - Restart server
   - Test affected features
   - Monitor logs
   - Debug issues

3. Feature Testing:
   - Verify basic functionality
   - Test edge cases
   - Check error handling
   - Validate responses

### Resource Testing
1. Listing Verification:
   - Check resource discovery
   - Validate metadata
   - Test pagination
   - Check updates

2. Content Testing:
   - Read resource content
   - Verify MIME types
   - Test binary data
   - Check encoding

3. Subscription Testing:
   - Subscribe to resources
   - Monitor updates
   - Test unsubscribe
   - Verify notifications

### Tool Testing
1. Discovery Testing:
   - List available tools
   - Verify schemas
   - Check descriptions
   - Validate metadata

2. Execution Testing:
   - Test with valid inputs
   - Try invalid inputs
   - Check error handling
   - Monitor progress
   - Validate results

### Prompt Testing
1. Template Verification:
   - Check available prompts
   - Validate arguments
   - Test descriptions
   - Verify schemas

2. Generation Testing:
   - Test with arguments
   - Check message format
   - Validate content
   - Test error cases

## 4. Debugging

### Common Issues
1. Connection Problems:
   - Check server process
   - Verify transport
   - Monitor initialization
   - Check capabilities

2. Message Errors:
   - Validate formats
   - Check handlers
   - Monitor responses
   - Track errors

3. Resource Issues:
   - Check permissions
   - Verify paths
   - Test content types
   - Monitor updates

### Debugging Tools
1. Console Logging:
   ```typescript
   // Server-side logging
   console.error("Debug message");
   ```

2. Message Inspection:
   - View raw messages
   - Check formatting
   - Track request/response
   - Monitor timing

3. Error Analysis:
   - Stack traces
   - Error codes
   - Response validation
   - Context examination

## 5. Best Practices

### Testing Strategy
1. Systematic Approach:
   - Test core features first
   - Add edge cases
   - Verify error handling
   - Check performance

2. Resource Management:
   - Monitor memory usage
   - Check file handles
   - Verify cleanup
   - Test limits

3. Error Handling:
   - Test all error paths
   - Verify messages
   - Check recovery
   - Monitor cleanup

### Security Testing
1. Input Validation:
   - Test boundaries
   - Try invalid input
   - Check sanitization
   - Verify limits

2. Authentication:
   - Test credentials
   - Check permissions
   - Verify tokens
   - Monitor access

3. Resource Protection:
   - Test access control
   - Check paths
   - Verify isolation
   - Monitor usage

## 6. Performance Testing

### Response Time
1. Operation Timing:
   - Track latency
   - Monitor variance
   - Check thresholds
   - Log outliers

2. Batch Operations:
   - Test concurrent requests
   - Monitor memory
   - Check throughput
   - Verify ordering

### Resource Usage
1. Memory Monitoring:
   - Track allocation
   - Check leaks
   - Monitor peaks
   - Verify cleanup

2. Connection Management:
   - Test connection stability
   - Check timeouts
   - Monitor states
   - Verify cleanup

This guide should be used as a reference when testing and debugging MCP servers using the Inspector tool. Always consider the specific requirements of your server while following these guidelines.