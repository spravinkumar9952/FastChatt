FROM node:14

WORKDIR /usr/src/app

COPY Message/package.json ./

RUN npm install 

# RUN npm install --save-dev nodemon
RUN npm install -g nodemon

COPY ./Message .

EXPOSE 5000
# CMD ["ls"]

CMD ["npm", "start"]
