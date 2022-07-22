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
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=builder /app/build /usr/share/nginx/html

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"