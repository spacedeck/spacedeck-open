FROM node:18-alpine

WORKDIR /app

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

