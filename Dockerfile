FROM node:lts-alpine AS builder
# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install

# Copy app files
COPY .env.staging ./.env
COPY src ./src
COPY public ./public
COPY assets ./assets
COPY vite.config.ts tsconfig.json index.html ./

# Build the app
RUN yarn build




# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]