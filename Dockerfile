FROM node:10-alpine3.11

WORKDIR /app

# build audiowaveform from source

RUN apk add git make cmake gcc g++ libmad-dev libid3tag-dev libsndfile-dev gd-dev boost-dev libgd libpng-dev zlib-dev
RUN apk add zlib-static libpng-static boost-static

RUN apk add autoconf automake libtool gettext
RUN wget https://github.com/xiph/flac/archive/1.3.3.tar.gz
RUN tar xzf 1.3.3.tar.gz
RUN cd flac-1.3.3/ && ./autogen.sh
RUN cd flac-1.3.3/ && ./configure --enable-shared=no
RUN cd flac-1.3.3/ && make
RUN cd flac-1.3.3/ && make install

RUN git clone https://github.com/bbc/audiowaveform.git
RUN mkdir audiowaveform/build/
RUN cd audiowaveform/build/ && cmake -D ENABLE_TESTS=0 -D BUILD_STATIC=1 ..
RUN cd audiowaveform/build/ && make
RUN cd audiowaveform/build/ && make install

# install chromium
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# install other requirements

RUN apk add graphicsmagick ffmpeg ffmpeg-dev ghostscript

# install node package

COPY package*.json ./
RUN npm install
COPY . .

# start app

EXPOSE 9666
CMD ["node", "spacedeck.js"]

