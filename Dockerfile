FROM node:10.16.3 AS builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY src/ ./src
COPY public/ ./public
RUN npm run build

FROM nginx:1.16.1
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/conf.d/
WORKDIR /usr/share/nginx/html

ENTRYPOINT /bin/bash -c "envsubst < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"
