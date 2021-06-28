<template>
  <div class="q-pa-md row">
    <div bordered :width="250" class="col-2">
      <!-- Left Playlist List-->
      <q-list>
        <q-item
          clickable
          v-for="list in playlists"
          :key="list.title"
          :to="'playlist/' + list.title"
          class="row"
        >
          <q-item-section class="col-auto">
            <q-icon name="navigate_next" size="md" color="primary" />
          </q-item-section>

          <q-item-section class="col-auto">
            <q-item-label class="text-black text-h6 text-left">
              {{ list.title }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- Playlist of currentPlaylist.songs -->
    <div class="q-pa-md col-10">
      <q-table
        :data="currentPlaylist.songs"
        :columns="columns"
        row-key="name"
        virtual-scroll
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        flat
        hide-bottom
      >
        <!-- TOP -->
        <template v-slot:top>
          <div class="text-h5 text-weight-medium">Songs</div>
          <q-space><!-- Rellena el espacio todo lo que pueda --></q-space>
          <q-btn
            class="col-auto"
            color="primary"
            label="Add Song"
            @click="prompt = true"
          />

          <!-- Prompt "Add Song" -->
          <q-dialog v-model="prompt" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Add Your New Song</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input
                  dense
                  v-model="newSong.newName"
                  autofocus
                  @keyup.enter="prompt = false"
                  label="Name"
                />
                <q-input
                  dense
                  v-model="newSong.newAuthor"
                  autofocus
                  @keyup.enter="prompt = false"
                  label="Author"
                />
                <q-input
                  dense
                  v-model="newSong.newAlbum"
                  autofocus
                  @keyup.enter="prompt = false"
                  label="Album"
                />
                <q-input
                  dense
                  v-model="newSong.newDuration"
                  autofocus
                  mask="####"
                  @keyup.enter="prompt = false"
                  label="Duration (sec)"
                />
                <!-- Release_Date de la nueva cancion -->
                <q-input
                  dense
                  filled
                  v-model="newSong.newDate"
                  mask="date"
                  :rules="['date']"
                  label="Release Date"
                  :options="dateOptions"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="newSong.newDate">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </q-card-section>

              <!-- Boton Añade Cancion -->
              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Add Song" @click="addSong" />
                <q-btn flat label="Cancel" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </template>

        <!-- HEADER -->
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="text-orange"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <!-- BODY -->
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="author" :props="props">
              {{ props.row.author }}
            </q-td>
            <q-td key="album" :props="props">
              {{ props.row.album }}
            </q-td>
            <q-td key="duration" :props="props">
              <q-chip :color="props.row.duration > 60 ? 'orange' : 'yellow'">
                {{ minutesFormat(props.row.duration) }}
              </q-chip>
            </q-td>
            <q-td key="release_date" :props="props">
              {{ props.row.release_date }}
            </q-td>
            <!--<q-td key="genres" :props="props">
              <q-chip
                v-for="gen in props.row.genres"
                :key="gen"
                :color="genresColors[gen]"
              >
                {{ genresFormat(gen) }}
              </q-chip>
            </q-td>-->
            <q-td>
              <div class="text-center">
                <!-- BOTON ADD SONG TO PLAYLIST-->
                <q-btn
                  round
                  color="primary"
                  icon="add_task"
                  style="font-size: 12px"
                />
                <q-popup-edit v-model="songPopup">
                  <q-item
                    clickable
                    dense
                    v-for="list in playlists"
                    :key="list.title"
                    class="row"
                  >
                    <q-item-section class="col-auto">
                      <q-icon name="navigate_next" size="md" color="primary" />
                    </q-item-section>

                    <q-item-section class="col-auto">
                      <q-item-label
                        class="text-black text-h6 text-left"
                        @click="addSong2Playlist(props.row, list)"
                        v-close-popup
                      >
                        {{ list.title }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-popup-edit>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PlaylistsComponents from "components/PlaylistsComponent.vue";
import SongsComponents from "components/SongsComponent.vue";
import UsersComponents from "components/UsersComponent.vue";
import { date } from "quasar";
import playlists from "src/store/playlists";
import songs from "src/store/songs";

export default {
  name: "MainLayout",
  components: { PlaylistsComponents, SongsComponents, UsersComponents },

  data() {
    this.genresColors = {
      Flamenco: "purple-14",
      Pop: "light-blue-13",
      Rock: "blue-grey-13",
      Clasica: "green-12",
      Rap: "orange-8"
    };
    return {
      left: true,
      valor: 2,
      seconds: 0,
      minutes: 0,
      prompt: false,
      songPopup: false,
      pagination: {
        rowsPerPage: 0
      },
      today: date.toLocaleString(),
      currentPlaylist: {
        id: null,
        name: "",
        songs: []
      },
      newSong: {
        id: null,
        newName: null,
        newAuthor: "",
        newAlbum: "",
        newDuration: "",
        newDate: ""
        //newGenres: []
      },
      playlists: [],

      columns: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
          grid: true,
          style: "max-width: 120px; min-width: 120px; rows-per-page-label: 1;"
          //hidePagination: true
        },
        {
          name: "author",
          align: "left",
          label: "Author",
          field: "author",
          sortable: true
        },
        {
          name: "album",
          align: "center",
          label: "Album",
          field: "album",
          sortable: true
        },
        {
          name: "duration",
          align: "center",
          label: "Duration",
          field: "duration",
          sortable: true
        },
        {
          name: "release_date",
          align: "center",
          label: "Release Date",
          field: "release_date",
          sortable: true
        },
        /*{
          name: "genres",
          align: "center",
          label: "Genres",
          field: "genres",
          sortable: true
        },*/
        {
          name: "addSong",
          align: "center",
          label: "Add Song",
          field: "",
          sortable: false
        }
        //{ name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        //{ name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ]
    };
  },

  //Se ejecuta todo en el interior de mounted al arrancar la página
  mounted() {
    this.getAllPlaylists();
    this.getAllSongs();
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
    async getAllSongs() {
      this.currentPlaylist.songs = await this.showAllSongs();
    },
    //Para añadir una nueva canción
    async addSong() {
      if (this.newSong.newName != null) {
        await this.insertSong({
          //song: {
          name: this.newSong.newName,
          author: this.newSong.newAuthor,
          album: this.newSong.newAlbum,
          duration: this.newSong.newDuration,
          release_date: date.formatDate(
            this.newSong.newDate,
            "YYYY-MM-DD hh:mm:ss"
          )
        });
        this.currentPlaylist.songs.push({
          name: this.newSong.newName,
          author: this.newSong.newAuthor,
          album: this.newSong.newAlbum,
          duration: this.newSong.newDuration,
          release_date: this.newSong.newDate
          //genres: this.newSong.newGenres
        });
      }
      this.newSong.id = null;
      this.newSong.newName = null;
      this.newSong.newAuthor = "";
      this.newSong.newAlbum = "";
      this.newSong.newDuration = "";
      this.newSong.newDate = "";
      //(this.newSong.newGenres = []),
      this.prompt = false;
      this.getAllSongs();
    },

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
    ]),

    async getAllPlaylists() {
      this.playlists = await this.showAllPlaylists();
    },

    async insertSongIntoPlaylist() {
      if (this.newSong.newName != null) {
        await this.insertSongsInPlaylist({
          id1: this.currentPlaylist.id,
          id2: this.newSong.id
        });
      }
      this.getAllPlaylists();
    },

    // /// /// // // // /// // // /// // ////
    addSong2Playlist(song, list) {
      this.newSongx(song);
      this.currentPlaylist = list;
      this.insertSongIntoPlaylist();
    },

    newSongx(Song) {
      this.newSong.id = Song.id;
      this.newSong.newName = Song.name;
      this.newSong.newAuthor = Song.author;
      this.newSong.newAlbum = Song.album;
      this.newSong.newDuration = Song.duration;
      this.newSong.newDate = Song.release_date;
      //this.newSong.newGenres = Song.genres;
    },

    // UTIL
    //Para cambiar el formato de la duracion a min:sec
    minutesFormat(time) {
      let minutes = Math.floor(time / 60);
      let cero = "";
      time = time - minutes * 60;
      if (time < 10) {
        cero = "0";
      }
      return minutes + ":" + cero + time;
    },

    //Para cambiar el formato de las fechas de las canciones
    dateFormat(newDate) {
      let dateForm = new Date(newDate);
      return date.formatDate(dateForm, "DD-MM-YYYY");
    },

    dateOptions(date) {
      //let n_todat = date.formatDate(this.today, "DD-MM-YYYY");
      //return date <= "2021/06/23";
      return date <= this.today;
    },

    genresFormat(genres) {
      let info = genres.toString();
      return info;
    }
  }
};
/*
      all_songs: [
        {
          name: "Frozen Yogurt",
          author: "Maraca",
          album: "Malas Noches",
          duration: 54,
          release_date: "2002-05-02",
          genres: ["Flamenco", "Pop"]
        },
        {
          name: "Ice cream sandwich",
          author: "Maraca",
          album: "Cielos sin Sol",
          duration: 191,
          release_date: "2002-07-22",
          genres: ["Flamenco", "Pop"]
        },
        {
          name: "Eclair",
          author: "Dulce de Leche",
          album: "Rosas Verdes",
          duration: 146,
          release_date: "2007-05-06",
          genres: ["Flamenco", "Pop"]
        },
        {
          name: "Cupcake",
          author: "Dulce de Leche",
          album: "Rosas Verdes",
          duration: 140,
          release_date: "2000-02-15",
          genres: ["Flamenco", "Pop"]
        },
        {
          name: "Gingerbread",
          author: "Jengibre",
          album: "Sueños",
          duration: 180,
          release_date: "2015-08-20",
          genres: ["Flamenco", "Pop"]
        },
        {
          name: "Jelly bean",
          author: "Jengibre",
          album: "Casos Oscuros",
          duration: 199,
          release_date: "1999-02-12",
          genres: ["Flamenco", "Pop"]
        },
        {
          name: "Lollipop",
          author: "Malpalo",
          album: "Mar Morado",
          duration: 45,
          release_date: "2011-05-30",
          genres: ["Flamenco", "Pop"]
        },
        {
          name: "Honeycomb",
          author: "Ad Mech",
          album: "Sin Piel",
          duration: 156,
          release_date: "2005-04-18",
          genres: ["Flamenco", "Pop"]
        },
        {
          name: "Donut",
          author: "Merengue",
          album: "Pitufos",
          duration: 198,
          release_date: "2009-11-24",
          genres: ["Flamenco", "Pop"]
        },
        {
          name: "KitKat",
          author: "Varios",
          album: "Sin Pausa",
          duration: 256,
          release_date: "2001-09-15",
          genres: ["Flamenco", "Pop"]
        },
        {
          name: "Chistorra",
          author: "Maraca",
          album: "Malas Noches",
          duration: 134,
          release_date: "2002-05-02",
          genres: ["Rock", "Pop"]
        },
        {
          name: "Sandwich",
          author: "Maraca",
          album: "Cielos sin Sol",
          duration: 187,
          release_date: "2002-05-02",
          genres: ["Rock", "Pop"]
        },
        {
          name: "Tortilla",
          author: "Dulce de Leche",
          album: "Rosas Verdes",
          duration: 156,
          release_date: "2002-05-02",
          genres: ["Rock", "Pop"]
        },
        {
          name: "Japón",
          author: "Dulce de Leche",
          album: "Rosas Verdes",
          duration: 144,
          release_date: "2002-05-02",
          genres: ["Rock", "Pop"]
        },
        {
          name: "Salchicha",
          author: "Jengibre",
          album: "Sueños",
          duration: 113,
          release_date: "2002-05-02",
          genres: ["Rock", "Pop"]
        },
        {
          name: "Bocata",
          author: "Jengibre",
          album: "Casos Oscuros",
          duration: 190,
          release_date: "2002-05-02",
          genres: ["Rock", "Pop"]
        },
        {
          name: "Pincho",
          author: "Malpalo",
          album: "Mar Morado",
          duration: 58,
          release_date: "2002-05-02",
          genres: ["Rock", "Pop"]
        },
        {
          name: "Pizza",
          author: "Ad Mech",
          album: "Sin Piel",
          duration: 176,
          release_date: "2002-05-02",
          genres: ["Rock", "Pop"]
        },
        {
          name: "Patata",
          author: "Merengue",
          album: "Pitufos",
          duration: 169,
          release_date: "2002-05-02",
          genres: ["Rock", "Pop"]
        },
        {
          name: "Tomate",
          author: "Varios",
          album: "Sin Pausa",
          duration: 253,
          release_date: "2002-05-02",
          genres: ["Rock", "Pop"]
        }
      ]
      */
</script>
