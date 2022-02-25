FROM node:latest
WORKDIR /app/client
USER 0
ADD package*.json ./
RUN npm install
ADD . .
RUN chgrp -R 0 /app/client && chmod -R g=u /app/client
EXPOSE 4200
USER 0
CMD npm start
