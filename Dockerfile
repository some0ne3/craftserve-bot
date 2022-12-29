FROM node:16-alpine

WORKDIR /usr/src/app
COPY . .

RUN npm ci --omit=dev

CMD [ "node", "index.js" ]