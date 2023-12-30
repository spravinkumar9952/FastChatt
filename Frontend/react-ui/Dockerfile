FROM node:14

WORKDIR usr/src/app

COPY react-ui/package.json .

RUN npm install

COPY react-ui/. .

EXPOSE 3000

CMD ["npm", "start"]