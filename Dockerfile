FROM spacedeck/docker-baseimage:latest
ENV NODE_ENV production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
RUN npm install gulp-rev-replace gulp-clean gulp-fingerprint gulp-rev gulp-rev-all gulp-rev-replace
RUN npm install -g --save-dev gulp

COPY . /usr/src/app
RUN gulp styles
RUN npm cache clean

CMD [ "npm", "start" ]

EXPOSE 9666

