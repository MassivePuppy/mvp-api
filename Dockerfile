FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN apk --no-cache add --virtual builds-deps build-base python

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

COPY ./.env.docker ./.env

EXPOSE 3000

CMD [ "npm", "run", "start" ]