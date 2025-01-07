#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// Get Cloudinary config from environment variables
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  throw new Error("Missing required Cloudinary environment variables");
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

class CloudinaryServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "cloudinary-server",
        version: "0.1.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    
    // Error handling
    this.server.onerror = (error) => console.error("[MCP Error]", error);
    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "upload",
          description: "Upload media (images/videos) to Cloudinary. For large files, the upload is processed in chunks and returns a streaming response. The uploaded asset will be available at:\n- HTTP: http://res.cloudinary.com/{cloud_name}/{resource_type}/upload/v1/{public_id}.{format}\n- HTTPS: https://res.cloudinary.com/{cloud_name}/{resource_type}/upload/v1/{public_id}.{format}\nwhere cloud_name='dadljfaoz', resource_type is 'image' or 'video', and format is determined by the file extension.",
          inputSchema: {
            type: "object",
            properties: {
              file: {
                type: "string",
                description: "Path to file, URL, or base64 data URI to upload"
              },
              resource_type: {
                type: "string",
                enum: ["image", "video", "raw"],
                description: "Type of resource to upload. For videos, the upload will return a streaming response as it processes in chunks."
              },
              public_id: {
                type: "string",
                description: "Public ID to assign to the uploaded asset. This will be used in the final URL. If not provided, Cloudinary will generate one."
              },
              overwrite: {
                type: "boolean",
                description: "Whether to overwrite existing assets with the same public ID"
              },
              tags: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "Tags to assign to the uploaded asset"
              }
            },
            required: ["file"]
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name !== "upload") {
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${request.params.name}`
        );
      }

      const args = request.params.arguments as {
        file: string;
        resource_type?: "image" | "video" | "raw";
        public_id?: string;
        overwrite?: boolean;
        tags?: string[];
      };

      try {
        // For videos, show that upload is in progress
        if (args.resource_type === "video") {
          console.error("Starting video upload, this may take a while...");
        }

        const options: any = {
          resource_type: args.resource_type || "auto",
          public_id: args.public_id,
          overwrite: args.overwrite,
          tags: args.tags,
          chunk_size: 20000000 // 20MB chunks
        };

        // Use fs.promises for better async handling
        const fs = require('fs').promises;
        const buffer = await fs.readFile(args.file);
        
        // Upload the file buffer
        const result = await new Promise<UploadApiResponse>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            options,
            (error: Error | undefined, result: UploadApiResponse | undefined) => {
              if (error) {
                reject(error);
                return;
              }
              
              if (!result) {
                reject(new Error("No result received from upload"));
                return;
              }

              resolve(result);
            }
          ).end(buffer);
        });

        console.error("Upload completed successfully!");
        
        // Extract relevant information from result
        const response = {
          public_id: result.public_id,
          version: result.version,
          signature: result.signature,
          format: result.format,
          resource_type: result.resource_type,
          created_at: result.created_at,
          bytes: result.bytes,
          type: result.type,
          url: result.url,
          secure_url: result.secure_url
        };

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response, null, 2)
            }
          ]
        };
      } catch (error) {
        throw new McpError(
          ErrorCode.InternalError,
          `Upload failed: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Cloudinary MCP server running on stdio");
  }
}

const server = new CloudinaryServer();
server.run().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
