FROM node:12

WORKDIR /app

COPY package.json .
COPY yarn.* .

RUN yarn

COPY . .

CMD yarn dev