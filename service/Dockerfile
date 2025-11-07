# ---- Base Stage ----
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ---- Build Stage ----
FROM base AS build
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:22-alpine AS prod
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package*.json ./

# install only prod dependencies
RUN npm ci --omit=dev

EXPOSE 3000
CMD ["node", "dist/index.js"]
