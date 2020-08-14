## Adding a new language to Spacedeck Open

*Example ilustrated with Spanish (locale 'es') as new language*


To add a new language to Spacedeck Open, follow these steps:

- Including the new locale ('es') at the locale list (./spacedeck.js)
```
    locales: ["en",..., "es"],
```
- Create the new translation file (/locales/**es.js** thar it's a copy of /locales/en.js). and translate the entries.
- Include the javascript for letting Spanish info accesible (at the end of /views/spacedeck.html)

  ```
    ...
    window.locales.es = {};
    ...
    window.locales.es.translation = {% include "./../locales/es.js" %};
  </script>
  ```
- Include a radiobutton for users could seleect the new language (/views/partials/account.html)
  ```
    <label class="radio" v-bind:class="{checked: user.prefs_language=='es'}" v-on:click="save_user_language('es')">
      <input type="radio" id="user-preferences_language" name="language" value="es"><span>Español</span>
    </label>
  ```
