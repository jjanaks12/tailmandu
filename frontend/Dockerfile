FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (caching layer)
COPY package*.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the Nuxt 3 application
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

# Copy the built output from the builder stage
COPY --from=builder /app/.output ./.output

# Expose the default Nuxt port
EXPOSE 3000

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Run the Nuxt 3 server entrypoint
CMD ["node", ".output/server/index.mjs"]
