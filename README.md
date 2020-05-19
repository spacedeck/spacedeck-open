# Spacedeck Open

![Spacedeck 6.0 Screenshot](/public/images/sd6-screenshot.png)

This is the free and open source version of Spacedeck, a web based, real time, collaborative whiteboard application with rich media support. Spacedeck was developed in 6 major releases during Autumn 2011 until the end of 2016 and was originally a commercial SaaS. The developers were Lukas F. Hartmann (mntmn) and Martin Güther (magegu).

The spacedeck.com online service was shut down on May 1st 2018. We decided to open-source Spacedeck to allow educational and other organizations who currently rely on Spacedeck to migrate to a self-hosted or local version.

[MNT Research GmbH](https://mntre.com) has restarted development of Spacedeck Open in 2020.

We appreciate filed issues, pull requests and general discussion.

# Features

- Create virtual whiteboards called *Spaces* with virtually unlimited size
- Drag & drop images, videos and audio from your computer or the web
- Write and format text with full control over fonts, colors and style
- Draw, annotate and highlight with included graphical shapes
- Turn your Space into a zooming presentation
- Collaborate in realtime with teammates, students or friends
- Share Spaces on the web or via email
- Export your work as printable PDF or ZIP (currently being fixed, stay tuned)

# Use Cases

- Education: Virtual classwork with multimedia
- Creative: Mood boards, Brainstorming, Design Thinking
- Visual note taking and planning

# Requirements, Installation

Spacedeck requires:

- Node.js 10.x: Web Server / API. Download: https://nodejs.org
- Graphicsmagick. Download: http://www.graphicsmagick.org/

To run Spacedeck, you only need Node.JS 10.x.

To install all node dependencies, run (do this once):

    npm install

# Configuration

See [config/default.json](config/default.json). Set `storage_local_path` for a local sqlite database or `storage_region`, `storage_bucket`, `storage_cdn` and `storage_endpoint` for AWS S3. `mail_provider` may be one of `console` or `smtp`. Also, omit a trailing `/` for the `endpoint`.

# Run (web server)

    node spacedeck.js

Then open http://localhost:9666 in a web browser.

# Optional Dependencies

For advanced media conversion:

- ffmpeg and ffprobe for video/audio conversion. Download: https://www.ffmpeg.org/download.html
- audiowaveform for audio waveform rendering. Download: https://github.com/bbcrd/audiowaveform
- ghostscript for PDF import. Download: https://www.ghostscript.com/download/gsdnld.html

# Data Storage

By default, media files are uploaded to the ```storage``` folder.
The database is stored in ```database.sqlite``` by default.

# Run with Docker

- configure `config/default.json`
- configure `volumes` section inside `docker-compose.yml`
  - point to `database.sqlite` on the host system
  - `touch database.sqlite` if it not exists
  - point to `storage/` on the host system
  - `mkdir storage/` if it not exists
- start the container with `sudo docker-compose up -f docker-compose.yml -d --build`

# Hacking

To rebuild the frontend CSS styles:

    gulp styles

# License

The Spacedeck logo and brand assets are registered trademarks of Spacedeck GmbH. All rights reserved.

Spacedeck Open source code is released under the GNU Affero General Public License Version 3 (GNU AGPLv3).

    Spacedeck Open - Web-based Collaborative Whiteboard For Rich Media
    Copyright (C) 2011-2018 Lukas F. Hartmann, Martin Güther
    Icons and original CSS design copyright by Thomas Helbig
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
