#
# ---- Base Node ----
# https://hub.docker.com/_/node/?tab=description
FROM node:21.6.2-bullseye-slim

ARG PUBLIC_API_URL

WORKDIR /home/node/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 80 80

CMD ["node", "./dist/server/entry.mjs"]
