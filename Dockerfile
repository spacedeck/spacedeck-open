FROM spacedeck/docker-baseimage:latest
ENV NODE_ENV production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm cache clean

CMD [ "npm", "start" ]

EXPOSE 9666

