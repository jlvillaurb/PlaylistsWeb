<template>
  <div class="q-pa-md row">
    <div bordered :width="250" class="col-2">
      <template>
        <div class="q-pa-md absolute-center" style="max-width: 400px">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <!--  :to=" userExists  ? 'playlist' : ''"  -->
            <q-input
              filled
              v-model="username"
              :label="$t('user')"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Obligatory Field']"
            />

            <q-input
              filled
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              :label="$t('password')"
              lazy-rules
              :rules="[
                val => (val !== null && val !== '') || 'Obligatory Field'
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <div>
              <q-btn :label="$t('submit')" type="submit" color="primary" />
              <q-btn
                :label="$t('reset')"
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
      password: null,
      isPwd: true,
      userExists: false,
      response: null
    };
  },

  //Se ejecuta todo en el interior de mounted al arrancar la página
  mounted() {
    //this.onSubmit();
  },

  //Metodos para cambiar data(), no devuelven valores
  methods: {
    // MAP ACTIONS LOGIN
    ...mapActions("users", ["login", "getUserByName", "setUser"]),

    async onSubmit() {
      this.userExists = true;
      try {
        let response = await this.login({
          username: this.username,
          password: this.password
        });
        if (response && response.status == 200) {
          this.setUser(response.data.username);
          this.$router.push({ name: "main" });
        } else if (response && response.status == 204) {
          console.log("Credenciales incorrectas");
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    },

    onReset() {
      this.username = null;
      this.password = null;
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
