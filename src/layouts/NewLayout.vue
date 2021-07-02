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
        <div class="q-mr-sm">
          <q-btn
            v-for="l in langOptions"
            class="q-mr-sm"
            :key="l.value"
            :color="l.value == lang ? 'white' : 'primary'"
            :text-color="l.value == lang ? 'primary' : 'white'"
            @click="changeLanguage(l.value)"
            >{{ l.label }}</q-btn
          >
        </div>
      </q-toolbar>

      <div class="row">
        <q-tabs align="true" class="col-auto">
          <q-route-tab to="./" :label="$t('playlists')" />
          <q-route-tab to="/songs" :label="$t('songs')" />
          <q-route-tab to="/mixer" label="Mixer" />
        </q-tabs>
        <div class="absolute-bottom-right col-auto q-pa-sm">
          <q-btn
            outline
            style="color: white;"
            :label="$t('logout')"
            icon="perm_identity"
            @click="logout()"
            to="/login"
          />
        </div>
      </div>
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
    ...mapActions("users", ["setUser", "setLang"]),
    async logout() {
      let newUser = null;
      await this.setUser(newUser);
    },

    async changeLanguage(lang) {
      this.lang = lang;
      this.$i18n.locale = lang;
      this.setLang(newLang);
    }
  }
};
</script>
