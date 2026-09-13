# Stage 1: Build the application
FROM node:20-slim AS builder

WORKDIR /app

# Install openssl and other potential dependencies for Prisma/native build
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy configuration files
COPY package*.json ./

# Install all dependencies (including devDependencies for building)
RUN npm ci --legacy-peer-deps

# Copy the rest of the application source code
COPY . .

# Generate Prisma client
RUN DATABASE_URL="mysql://dummy" npx prisma generate

# Build the TypeScript project
RUN npm run build

# Stage 2: Production runner
FROM node:20-slim

WORKDIR /app

# Install openssl required by Prisma
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy dependency files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev --legacy-peer-deps

# Copy built code and generated Prisma client from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/src/prisma ./src/prisma
COPY --from=builder /app/prisma.config.js ./prisma.config.js

# Expose backend port
EXPOSE 8000

# Run the production build
CMD ["npm", "run", "start"]
