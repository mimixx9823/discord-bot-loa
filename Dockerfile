FROM node:latest as build
WORKDIR /app

COPY package.json ./
COPY .env ./

RUN npm uninstall -g yarn
RUN corepack enable
RUN yarn set version berry

COPY .yarn ./.yarn
COPY yarn.lock .yarnrc.yml ./
COPY esbuild.config.js ./
COPY src ./src
RUN yarn install
RUN yarn build

CMD [ "node", "./dist/bot.js" ]