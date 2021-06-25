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

      <q-tabs align="left">
        <q-route-tab to="./" label="Playlist" />
        <q-route-tab to="/songs" label="Songs" />
        <q-route-tab to="/mixer" label="Mixer" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import PlaylistsComponents from "components/PlaylistsComponent.vue";
import SongsComponents from "components/SongsComponent.vue";
import UsersComponents from "components/UsersComponent.vue";

const listplaylists = [
  {
    title: "Rock",
    user: "M"
  },
  {
    title: "Flamenco",
    user: "L"
  },
  {
    title: "Clasica",
    user: "M"
  },
  {
    title: "Rap",
    user: "J"
  }
];

export default {
  name: "MainLayout",
  components: { PlaylistsComponents, SongsComponents, UsersComponents },
  data() {
    return {
      left: true,
      playlists: listplaylists,
      valor: 2
    };
  }
};
</script>
