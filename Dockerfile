# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install any needed dependencies for the build
RUN npm install

# Copy the rest of the application code to the working directory
COPY src ./src
COPY tsconfig.json ./

# Build the application
RUN npm run build

# Use a smaller base image for the final release
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy built files and package.json to the final image
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# Install only production dependencies
RUN npm install --production

# Environment variables for Cloudinary configuration
ENV CLOUDINARY_CLOUD_NAME=your_cloud_name
ENV CLOUDINARY_API_KEY=your_api_key
ENV CLOUDINARY_API_SECRET=your_api_secret

# Set the command to run the application
ENTRYPOINT ["node", "dist/index.js"]
