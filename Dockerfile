FROM node:14

WORKDIR /usr/src/app

COPY package*.json .

RUN yarn install

EXPOSE 8080

RUN yarn prisma init

COPY . .

RUN yarn prisma generate
CMD ["yarn", "start"]
