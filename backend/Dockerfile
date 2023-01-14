FROM node:16
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

ENV DEBUG=playground:*
  
USER node

RUN npm run tsc

EXPOSE 3001

CMD npm start