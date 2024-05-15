FROM node:18.17.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

EXPOSE 3003

CMD ["npm", "start"]