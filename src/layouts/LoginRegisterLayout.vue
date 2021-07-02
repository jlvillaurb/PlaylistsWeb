<template>
  <q-layout view="hHh LpR fFf">
    <q-header bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Mixer
        </q-toolbar-title>
        <div>
          <q-btn
            v-for="l in langOptions"
            class="q-mx-sm"
            size="10px"
            :key="l.value"
            :color="l.value == lang ? 'white' : 'primary'"
            :text-color="l.value == lang ? 'primary' : 'white'"
            @click="changeLanguage(l.value)"
            >{{ l.label }}</q-btn
          >
        </div>
      </q-toolbar>

      <q-tabs class="absolute-center">
        <q-route-tab to="/login" :label="$t('login')" />
        <q-route-tab to="/register" :label="$t('register')" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";
import PlaylistsComponents from "components/PlaylistsComponent.vue";
import SongsComponents from "components/SongsComponent.vue";
import UsersComponents from "components/UsersComponent.vue";

export default {
  name: "MainLayout",
  components: { PlaylistsComponents, SongsComponents, UsersComponents },
  data() {
    return {
      lang: this.$i18n.locale, // Default lang or lang set by user
      langOptions: [
        { value: "en-us", label: "EN" },
        { value: "es", label: "ES" }
      ]
    };
  },

  methods: {
    // MAP ACTIONS LOGIN
    ...mapActions("users", ["setLang"]),

    async changeLanguage(lang) {
      this.lang = lang;
      this.$i18n.locale = lang;
      import(`quasar/lang/${lang}`).then(language => {
        this.$q.lang.set(language.default);
      });
      this.setLang(lang);
    }
  }
};
</script>
