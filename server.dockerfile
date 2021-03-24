FROM node:lts-alpine as build

WORKDIR src

COPY . .

RUN npm install \
    && npm run build

ENTRYPOINT [ "node" , "server/server.js" ]
