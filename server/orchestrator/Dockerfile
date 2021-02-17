FROM node:latest

WORKDIR /usr/entertainme/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]