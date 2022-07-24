FROM node:14.16.1
ENV CONNECTION_STRING=http://46.101.119.134:27017/resume
ENV KEY=prodKey

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD [ "node", "app.js" ]