FROM node:latest

WORKDIR /usr/movies/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4001

CMD ["npm", "run", "dev"]