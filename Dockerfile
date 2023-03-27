FROM node:lts-alpine
WORKDIR ./src/backend

COPY package*.json ./
RUN npm install
COPY . .

CMD [ "npm", "run", "start" ]
