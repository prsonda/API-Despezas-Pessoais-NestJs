FROM node:18

WORKDIR /app

COPY prisma ./prisma
COPY src ./src

COPY package*.json ./

EXPOSE 3000

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]
