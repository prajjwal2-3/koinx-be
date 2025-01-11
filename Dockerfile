FROM node:22.12.0-alpine

WORKDIR /app

COPY . .

RUN npm  install

RUN npm run build

CMD [ "npm","start" ]