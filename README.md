# Spacedeck Open

This is the free and open source version of Spacedeck, a web based, real time, collaborative whiteboard application with rich media support. Spacedeck was developed in 6 major releases during Autumn 2011 until the end of 2016 and was originally a commercial SaaS. The developers were Lukas F. Hartmann (mntmn) and Martin Güther (magegu). All icons and large parts of the CSS were designed by Thomas Helbig (dergraph).

As we plan to retire the subscription based service at spacedeck.com in late 2017, we decided to open-source Spacedeck to allow educational and other organizations who currently rely on Spacedeck to migrate to a self-hosted version.

Data migration features will be added soon.

We appreciate filed issues, pull requests and general discussion.

# Features

- Create virtual whiteboards called "Spaces" with virtually unlimited size
- Drag & drop images, videos and audio from your computer or the web
- Write and format text with full control over fonts, colors and style
- Draw, annotate and highlight with included graphical shapes
- Turn your Space into a zooming presentation
- Collaborate and chat in realtime with teammates, students or friends
- Share Spaces on the web or via email
- Export your work as printable PDF or ZIP

# Requirements, Installation

Spacedeck uses the following major building blocks:

- Node.js 4.x (Backend / API)
- MongoDB 3.x (Datastore)
- Redis 3.x (Datastore for realtime channels)
- Vue.js (Frontend)

It also has some binary dependencies for media conversion and PDF export:

- imagemagick

Currently, media files are stored in Amazon S3, so you need an Amazon AWS account and have the ```AWS_ACCESS_KEY_ID``` and ```AWS_SECRET_ACCESS_KEY``` environment variables defined. For sending emails, Amazon SES is required.

To install Spacedeck, you need node.js 4.x and a running MongoDB instance. Then, to install all node dependencies, run

    npm install

To rebuild the frontend CSS styles (you need to do this at least once):

    gulp styles

# Run

    export NODE_ENV=development
    npm start

# License

Spacedeck Open is released under the GNU Affero General Public License Version 3 (GNU AGPLv3).

    Spacedeck Open - Web-based Collaborative Whiteboard For Rich Media
    Copyright (C) 2011-2017 Lukas F. Hartmann, Martin Güther, Thomas Helbig
    
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
