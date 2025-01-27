# Cloudinary MCP Server

This MCP server provides tools for uploading images and videos to Cloudinary through Claude Desktop and compatible MCP clients.

<a href="https://glama.ai/mcp/servers/zjiw1ry8ly"><img width="380" height="200" src="https://glama.ai/mcp/servers/zjiw1ry8ly/badge" alt="Cloudinary Server MCP server" /></a>

## Installation

### Requirements: Node.js

1. Install Node.js (version 18 or higher) and npm from [nodejs.org](https://nodejs.org/)
2. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Install using npx (Recommended)
1. Navigate to the Claude configuration directory:

   - Windows: `C:\Users\NAME\AppData\Roaming\Claude`
   - macOS: `~/Library/Application Support/Claude/`
   
   You can also find these directories inside the Claude Desktop app: Claude Desktop > Settings > Developer > Edit Config

2. Add the following configuration to your MCP settings file:

```json
{
  "mcpServers": {
    "cloudinary": {
      "command": "npx",
      "args": ["@felores/cloudinary-mcp-server"],
      "env": {
        "CLOUDINARY_CLOUD_NAME": "your_cloud_name",
        "CLOUDINARY_API_KEY": "your_api_key",
        "CLOUDINARY_API_SECRET": "your_api_secret"
      }
    }
  }
}
```

3. Make sure to replace the environment variables with your Cloudinary credentials from the [Cloudinary Console](https://console.cloudinary.com/settings/api-keys).

### Developer Installation
If you want to modify the server or contribute to development:

1. Clone the repository:
```bash
git clone https://github.com/felores/cloudinary-mcp-server.git
cd cloudinary-mcp-server
```

2. Install dependencies and build:
```bash
npm install
npm run build
```

## Setup Instructions

1. First, ensure you have a Cloudinary account and get your credentials from the [Cloudinary Console](https://console.cloudinary.com/settings/api-keys):
   - Cloud Name
   - API Key
   - API Secret

2. Add the server configuration to your Claude/Cline MCP settings file:

```json
{
  "mcpServers": {
    "cloudinary": {
      "command": "node",
      "args": ["c:/path/to/cloudinary-mcp-server/dist/index.js"],
      "env": {
        "CLOUDINARY_CLOUD_NAME": "your_cloud_name",
        "CLOUDINARY_API_KEY": "your_api_key",
        "CLOUDINARY_API_SECRET": "your_api_secret"
      }
    }
  }
}
```

For Claude desktop app, edit the configuration file at the appropriate location for your OS.

3. Install dependencies and build the server:
```bash
npm install
npm run build
```

## Available Tools

### upload

Upload images and videos to Cloudinary.

Parameters:
- `file` (required): Path to file, URL, or base64 data URI to upload
- `resource_type` (optional): Type of resource ('image', 'video', or 'raw')
- `public_id` (optional): Custom public ID for the uploaded asset
- `overwrite` (optional): Whether to overwrite existing assets with the same public ID
- `tags` (optional): Array of tags to assign to the uploaded asset

Example usage in Claude/Cline:
```typescript
use_mcp_tool({
  server_name: "cloudinary",
  tool_name: "upload",
  arguments: {
    file: "path/to/image.jpg",
    resource_type: "image",
    public_id: "my-custom-id"
  }
});
