FROM spacedeck/docker-baseimage:latest
ENV NODE_ENV production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
RUN npm install gulp-rev-replace gulp-clean gulp-fingerprint gulp-rev gulp-rev-all gulp-rev-replace
RUN npm install -g --save-dev gulp

COPY app.js Dockerfile Gulpfile.js LICENSE /usr/src/app/
COPY config /usr/src/app/config
COPY helpers /usr/src/app/helpers
COPY locales /usr/src/app/locales
COPY middlewares /usr/src/app/middlewares
COPY models /usr/src/app/models
COPY public /usr/src/app/public
COPY routes /usr/src/app/routes
COPY styles /usr/src/app/styles
COPY views /usr/src/app/views

RUN gulp all
RUN npm cache clean

CMD [ "node", "app.js" ]

EXPOSE 9666

