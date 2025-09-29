# Simple Dockerfile for Next.js - avoiding npm cache issues
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies without cache
RUN npm install --legacy-peer-deps --no-cache

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]