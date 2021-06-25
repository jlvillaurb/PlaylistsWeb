import Vue from 'vue'
import Vuex from 'vuex'

import playlists from './playlists'
import users from './users'
import songs from './songs'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      playlists,
      songs,
      users,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}

/*
// import example from './module-example'
let i18n; // This variable is exported in case we want to use the i18n on files that are not .vue

export default ({ app, store }) => {
  Vue.use(VueI18n); // Tell Vue to use the VueI18n plugin
  // Create a instance of the VueI18n plugin
  i18n = new VueI18n({
    locale: "es", // Default language of the i18n messages on app start
    fallbackLocale: "en-us", // Default language alternative of the i18n messages if the default language hasnt the translate of some message
    messages // Pass a copy to the i18n messages of all registeres messages
  });
  // Check if the store has the lang variable state set to one of the
  // possible languages, and modify the default language and fallback language
  // of the i18n instance created above
  const storedLang = store.getters["playlists/getLang"]; // Get the value of the 'lang' global store variable
  // IF the variable is not null, not empty and has a value included in the registered languages
  if (storedLang && i18n.availableLocales.includes(storedLang)) {
    // Change the default language of the i18n messages
    i18n.locale = storedLang;
    // Change the default language alternative of the i18n messages to the first language founded that is not
    // the stored language (e.g If stored language is 'en-us' and we registered ['en-us', 'es'], the first
    // language different from the stored one is 'es',so the fallbackLocale will be 'es')
    i18n.fallbackLocale = i18n.availableLocales.length
      ? i18n.availableLocales.find(lang => lang != storedLang)
      : storedLang;
    // Change the default Quasar framework language to the stored language. This change will affect
    // utils provided by Quasar, like 'date' class, 'q-table' components, etc.
    import(`quasar/lang/${storedLang}`).then(language => {
      Quasar.lang.set(language.default);
    });
  }

  //Set i18n instance on app (vue instance)
  app.i18n = i18n;
};

export { i18n };
*/