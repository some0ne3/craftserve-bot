FROM        --platform=$TARGETOS/$TARGETARCH node:16-alpine

LABEL       org.opencontainers.image.source="https://github.com/some0ne3/craftserve-bot"
LABEL       org.opencontainers.image.licenses=MIT


WORKDIR /usr/src/app
COPY . .

RUN npm ci --omit=dev

CMD [ "node", "index.js" ]