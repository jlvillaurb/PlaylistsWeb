<template>
  <div class="q-pa-md row">
    <div bordered :width="250" class="col-2">
      Shit
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PlaylistsComponents from "components/PlaylistsComponent.vue";
import SongsComponents from "components/SongsComponent.vue";
import UsersComponents from "components/UsersComponent.vue";
import { date } from "quasar";

export default {
  name: "MainLayout",
  components: { PlaylistsComponents, SongsComponents, UsersComponents },

  data() {
    return {
      left: true,
      valor: 2,
      seconds: 0,
      minutes: 0,
      prompt: false,
      pagination: {
        rowsPerPage: 0
      },
      today: date.toLocaleString()
    };
  },

  //Se ejecuta todo en el interior de mounted al arrancar la página
  mounted() {
    this.onSubmit();
  },

  //Metodos para cambiar data(), no devuelven valores
  methods: {
    // MAP ACTIONS LOGIN
    ...mapActions("users", ["login"]),

    async onSubmit() {
      await this.login({
        username: "Hector", //this.email,
        password: "1111" //this.password
      });
      //this.$router.push({ name: "playlists" });
    },

    // MAP ACTIONS SONGS
    ...mapActions("songs", [
      "showAllSongs",
      "showSongById",
      "insertSong",
      "updateSongById",
      "deleteSongById"
    ]),

    // MAP ACTIONS PLAYLISTS
    ...mapActions("playlists", [
      "showAllPlaylists",
      "showAllPlaylistsUserLogged",
      "showPlaylistById",
      "insertPlaylist",
      "deletePlaylistById",
      "insertSongsInPlaylist",
      "findSongsFromPlaylistId",
      "changeSongsInPlaylists"
    ])
  }
  // UTIL
  //Para cambiar el formato de la duracion a min:sec
};
</script>
