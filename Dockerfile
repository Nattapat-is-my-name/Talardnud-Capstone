# Stage 1: Build the application
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (matching your dev command)
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Build the static files
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the build output from the builder stage
# NOTE: If your project uses Vite, change '/app/build' to '/app/dist'
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]