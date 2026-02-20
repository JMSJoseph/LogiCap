# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copy the local dependency, remove its prepare script, then install deps
COPY custom_digitaljs/ custom_digitaljs/
RUN cd custom_digitaljs \
    && npm pkg delete scripts.prepare \
    && npm install

# Build custom_digitaljs manually (mkdir -p instead of mkdirp)
RUN cd custom_digitaljs && npx webpack --mode production && mkdir -p lib && npx babel src -d lib

# Copy root package files and install deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# SPA fallback: serve index.html for all routes
RUN printf 'server {\n\
    listen 80;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
