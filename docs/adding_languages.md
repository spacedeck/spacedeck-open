## Adding a new language to Spacedeck Open

To add a new language to Spacedeck Open, follow these steps:

*The steps are illustrated with Spanish (locale 'es') as the new language*

- Include the new locale ('es') in the locale list (./spacedeck.js):
```
    locales: ["en",..., "es"],
```
- Create the new translation file (/locales/**es.js**, a copy of /locales/en.js) and translate the entries.
- Include the javascript for the new translation at the end of /views/spacedeck.ejs:

  ```
    ...
    window.locales.es = {};
    ...
    window.locales.es.translation = <%- include "./../locales/es.js" %>;
  </script>
  ```
- Include a radio button for users to select the new language (/views/partials/account.html)
  ```
    <label class="radio" v-bind:class="{checked: user.prefs_language=='es'}" v-on:click="save_user_language('es')">
      <input type="radio" id="user-preferences_language" name="language" value="es"><span>Español</span>
    </label>
  ```
