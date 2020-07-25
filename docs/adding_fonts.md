To add fonts to Spacedeck Open, follow these steps:

1. Find the googleapi link for the font and add it to ./styles/type.scss after the "Inter" font that is already there.  Here is a good reference to using (Google Font API)[https://www.webfx.com/blog/web-design/google-font-api-guide/].
2. Add the name of the font to the file ./public/javascripts/spacedeck_sections.js in the "fonts" section found around line 150.  The order of the list here is the order in which fonts will be displayed in the user interface.
3. From the root of your install, do "gulp styles".
4. Restart your server.

