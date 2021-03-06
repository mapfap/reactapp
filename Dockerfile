FROM node:10-alpine AS builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY src/ ./src
COPY public/ ./public
RUN npm run build

FROM nginx:1-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/conf.d/
WORKDIR /usr/share/nginx/html

ENTRYPOINT /bin/sh -c "envsubst < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"
