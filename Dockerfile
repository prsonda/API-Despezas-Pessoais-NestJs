FROM node:18

WORKDIR /app

COPY prisma ./prisma
COPY src ./src

COPY package*.json ./

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]
