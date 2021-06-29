<template>
  <div class="q-pa-md row">
    <div bordered :width="250" class="col-2">
      <template>
        <div class="q-pa-md absolute-center" style="max-width: 400px">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="username"
              label="User *"
              hint="New User Name"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Obligatory Field']"
            />

            <q-input
              filled
              v-model="email"
              type="email"
              label="Email *"
              hint="example@mail.com"
              lazy-rules
              :rules="[
                val => (val !== null && val !== '') || 'Obligatory Field'
              ]"
            />

            <q-input
              filled
              v-model="password"
              label="Password *"
              hint="Over 8 characters"
              lazy-rules
              :rules="[
                val => (val !== null && val !== '') || 'Obligatory Field',
                val =>
                  (val.length > 0 && val.length < 100) ||
                  'Must be over 0 characters'
              ]"
            />
            <q-input
              filled
              v-model="passwordR"
              label="Repeat Password *"
              lazy-rules
              :rules="[
                val => (val !== null && val !== '') || 'Obligatory Field',
                val =>
                  (val.length > 0 && val.length < 100) ||
                  'Must be over 0 characters'
              ]"
            />

            <q-toggle v-model="accept" label="I accept the license and terms" />

            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </div>
      </template>
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
      today: date.toLocaleString(),

      username: null,
      email: null,
      password: null,
      passwordR: null,
      accept: false
    };
  },

  //Se ejecuta todo en el interior de mounted al arrancar la página
  mounted() {},

  //Metodos para cambiar data(), no devuelven valores
  methods: {
    // MAP ACTIONS LOGIN
    ...mapActions("users", ["login", "insertUser", "getUserByName"]),

    async onSubmit() {
      //Insertamos el nuevo usuario
      let response = await this.insertUser({
        name: this.username,
        password: this.password,
        email: this.email
      });
      if (response.status == 200) {
        await this.login({
          username: this.username,
          password: this.password
        });
        this.$router.push({ name: "login" });
      } else {
        console.log("error");
      }
      //this.$router.push({ name: "calendars" });
    },

    onReset() {
      this.username = null;
      this.email = null;
      this.password = null;
      this.passwordR = null;
      this.accept = false;
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
