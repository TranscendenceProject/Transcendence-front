FROM node:14

WORKDIR /app

COPY package.json .
COPY server/server.js .
RUN npm install

CMD ["npm", "start"]
