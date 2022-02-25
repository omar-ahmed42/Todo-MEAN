FROM node:latest
WORKDIR /app/server

ADD package*.json ./
RUN npm install

ADD . .
ENV NODE_PORT 5000
EXPOSE ${NODE_PORT}
CMD node app.js