FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN DATABASE_URL="mysql://dummy" npx prisma generate
RUN npm run build
CMD sh -c "npx prisma db push --accept-data-loss && npm start"
