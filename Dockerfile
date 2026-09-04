FROM node:22-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm i --registry=https://mirror2.chabokan.net/npm/ --verbos

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]