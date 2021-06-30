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
      </q-toolbar>

      <div class="row">
        <q-tabs align="left" class="col-auto">
          <q-route-tab to="./" label="Playlist" />
          <q-route-tab to="/songs" label="Songs" />
          <q-route-tab to="/mixer" label="Mixer" />
        </q-tabs>
        <div class="absolute-bottom-right col-auto q-pa-sm">
          <q-btn
            outline
            style="color: white;"
            label="Log Out"
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
      left: true,
      valor: 2
    };
  },

  methods: {
    // MAP ACTIONS LOGIN
    ...mapActions("users", ["login"]),
    logout() {}
  }
};
</script>
