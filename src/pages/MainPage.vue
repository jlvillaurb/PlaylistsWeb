<template>
  <div class="q-pa-md row">
    <!-- BUTTON Edit Song-->
    <q-dialog v-model="editPromp" seamless>
      <q-card style="max-width:900px;width:900px;height:220px">
        <q-card-section>
          <div class="text-h6">Edit the Song</div>
        </q-card-section>

        <q-card-section class="row no-wrap">
          <q-input
            dense
            v-model="newSong.name"
            autofocus
            @keyup.enter="editPromp = false"
            :label="$t('tableName')"
            class="col-auto"
          /><q-space></q-space>
          <q-input
            dense
            v-model="newSong.author"
            autofocus
            @keyup.enter="editPromp = false"
            :label="$t('tableAuthor')"
            class="col-auto"
          /><q-space></q-space>
          <q-input
            dense
            v-model="newSong.album"
            autofocus
            @keyup.enter="editPromp = false"
            :label="$t('tableAlbum')"
            class="col-auto"
          /><q-space></q-space>
          <q-input
            dense
            v-model="newSong.duration"
            autofocus
            mask="####"
            @keyup.enter="editPromp = false"
            :label="$t('tableDuration')"
            class="col-auto"
          /><q-space></q-space>
          <q-input
            dense
            filled
            v-model="newSong.release_date"
            mask="date"
            :rules="['date']"
            :label="$t('tableReleaseDate')"
            :options="dateOptions"
            class="col-2"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="newSong.release_date">
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        :label="$t('cancelButton')"
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

        <q-card-actions align="right" class="text-primary">
          <q-space></q-space>
          <q-btn
            flat
            :label="$t('saveButton')"
            @click="updateSongx()"
            v-close-popup
          />
          <q-btn
            flat
            :label="$t('cancelButton')"
            @click="getSongsByPlaylist()"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Left Playlist List-->
    <div bordered :width="250" class="col-2">
      <!-- Prompt Add Playlist -->
      <q-btn
        class="col-auto q-mb-sm"
        style="margin-bottom-sm"
        color="primary"
        label="+ Playlist"
        @click="promptP = true"
      />
      <q-dialog v-model="promptP" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">{{ $t("addPlaylist") }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model="newPlaylist.title"
              autofocus
              @keyup.enter="promptP = false"
              :label="$t('playlistTitle')"
            />
          </q-card-section>

          <!-- Button Add Playlist -->
          <q-card-actions align="right" class="text-primary">
            <q-btn flat :label="$t('addPlaylist')" @click="addPlaylist()" />
            <q-btn flat :label="$t('cancelButton')" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- User Playlist List -->
      <q-list>
        <q-item
          clickable
          v-for="list in playlists"
          :key="list.title"
          @click="changeList(list.title)"
          class="row"
        >
          <q-item-section class="col-auto">
            <q-icon name="navigate_next" size="md" color="primary" />
          </q-item-section>

          <q-item-section class="col-auto">
            <q-item-label
              class="text-black text-h6 text-left"
              :class="
                currentPlaylist.title == list.title
                  ? 'text-black text-h6 text-left text-weight-bolder'
                  : 'text-black text-h6 text-left'
              "
            >
              {{ list.title }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- Main Body of Playlist of currentPlaylist -->
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
          <div class="text-h5 text-weight-medium">
            {{ currentPlaylist.title }}
          </div>
          <q-space><!-- Rellena el espacio todo lo que pueda --></q-space>

          <!-- Prompt Add Song -->
          <q-btn
            class="col-auto"
            color="primary"
            :label="$t('addSongToPlaylist')"
            @click="prompt = true"
          />
          <q-dialog v-model="prompt" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Add Your New Song</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input
                  dense
                  v-model="newSong.name"
                  autofocus
                  @keyup.enter="prompt = false"
                  :label="$t('tableName')"
                />
                <q-input
                  dense
                  v-model="newSong.author"
                  autofocus
                  @keyup.enter="prompt = false"
                  :label="$t('tableAuthor')"
                />
                <q-input
                  dense
                  v-model="newSong.album"
                  autofocus
                  @keyup.enter="prompt = false"
                  :label="$t('tableAlbum')"
                />
                <q-input
                  dense
                  v-model="newSong.duration"
                  autofocus
                  mask="####"
                  @keyup.enter="prompt = false"
                  :label="$t('tableDuration')"
                />
                <!-- Release_Date de la nueva cancion -->
                <q-input
                  dense
                  filled
                  v-model="newSong.release_date"
                  mask="date"
                  :rules="['date']"
                  :label="$t('tableReleaseDate')"
                  :options="dateOptions"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="newSong.release_date">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              :label="$t('cancelButton')"
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
                <q-btn
                  flat
                  :label="$t('addSong')"
                  @click="insertSongIntoPlaylist()"
                />
                <q-btn flat :label="$t('cancelButton')" v-close-popup />
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
              {{ dateFormat(props.row.release_date) }}
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

            <!-- Boton de Edit Song -->
            <q-td>
              <div class="text-center">
                <q-btn
                  round
                  color="primary"
                  icon="create"
                  style="font-size: 12px"
                  @click="editSongx(props.row)"
                />
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
//import { required, alpha, maxLength } from "vuelidate/lib/validators";
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
      promptP: false,
      editPromp: false,
      today: date.toLocaleString(),
      isFirst: true,
      pagination: {
        rowsPerPage: 0
      },
      genresColors: {
        Flamenco: "purple-14",
        Pop: "light-blue-13",
        Rock: "blue-grey-13",
        Clasica: "green-12",
        Rap: "orange-8"
      },

      iSong: null,
      newSong: {
        id: null,
        name: null,
        author: null,
        album: null,
        duration: null,
        release_date: null
        //genres: []
      },

      currentPlaylist: {
        id: null,
        title: null,
        songs: []
      },
      newPlaylist: {
        title: null
      },
      playlists: []
    };
  },

  //Todo en el interior de mounted se ejecura al arrancar la página
  mounted() {
    //Si hay un id de entrada, tomamos ese valor para enseñar la playlist correspondiente
    this.getAllPlaylists();
  },

  computed: {
    columns() {
      return [
        {
          name: "name",
          required: true,
          label: this.$t("tableName"),
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
          label: this.$t("tableAuthor"),
          field: "author",
          sortable: true
        },
        {
          name: "album",
          align: "center",
          label: this.$t("tableAlbum"),
          field: "album",
          sortable: true
        },
        {
          name: "duration",
          align: "center",
          label: this.$t("tableDuration"),
          field: "duration",
          sortable: true
        },
        {
          name: "release_date",
          align: "center",
          label: this.$t("tableReleaseDate"),
          field: "release_date",
          sortable: true
        },
        /*{
          name: "genres",
          align: "center",
          label: "Genres",
          field: "genres",
          sortable: false
        },*/
        {
          name: "editSong",
          align: "center",
          label: this.$t("editSong"),
          field: "",
          sortable: false
        }
        //{ name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        //{ name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ];
    }
  },

  methods: {
    // MAP ACTIONS LOGIN
    ...mapActions("users", ["login", "getUserByName", "setUser"]),

    // MAP ACTIONS SONGS
    ...mapActions("songs", [
      "showAllSongs",
      "showSongById",
      "insertSong",
      "updateSong",
      "deleteSongById"
    ]),
    async insertSongIntoPlaylist() {
      if (this.newSong.name != null) {
        //Añade una nueva canción al listado de
        let response = await this.insertSong({
          name: this.newSong.name,
          author: this.newSong.author,
          album: this.newSong.album,
          duration: this.newSong.duration
          /*release_date: date.formatDate(
            this.newSong.release_date,
            "YYYY-MM-DD hh:mm:ss")*/
        });
        //Añadimos a currenPlaylist.songs
        if (response.status == 200) {
          //En caso de error
          this.currentPlaylist.songs.push({
            name: this.newSong.name,
            author: this.newSong.author,
            album: this.newSong.album,
            duration: this.newSong.duration,
            release_date: this.newSong.release_date
            //genres: this.newSong.newGenres
          });
          this.newSong = response.data;

          //Añade una nueva canción a la playlist
          let response1 = await this.insertSongsInPlaylist({
            id1: this.currentPlaylist.id,
            id2: this.newSong.id
          });
          if (response1.status == 200) {
            //En caso de error
            this.newSong.id = null;
            this.newSong.name = null;
            this.newSong.author = null;
            this.newSong.album = null;
            this.newSong.duration = null;
            this.newSong.release_date = null;
            //this.newSong.newGenres = [];
            this.getAllPlaylists();
          }
        } else {
          console.log("error");
        }
      }
      this.prompt = false;
    },

    async updateSongx() {
      let index = this.currentPlaylist.songs.findIndex(
        item => item.id == this.newSong.id
      );
      if (index > -1) {
        this.currentPlaylist.songs.splice(index, 1);
      }
      let response = await this.updateSong(this.newSong);
      if (response.status == 200) {
        this.currentPlaylist.songs.push({
          id: this.newSong.id,
          name: this.newSong.name,
          author: this.newSong.author,
          album: this.newSong.album,
          duration: this.newSong.duration,
          release_date: this.newSong.release_date
          //genres: this.newSong.genres
        });
        this.getSongsByPlaylist();
      } else {
        console.log("error");
      }
    },

    // MAP ACTIONS
    ...mapActions("playlists", [
      "showAllPlaylists",
      "findPlaylistsByUserLogged",
      "showPlaylistById",
      "insertPlaylist",
      "deletePlaylistById",
      "insertSongsInPlaylist",
      "findSongsFromPlaylistId",
      "changeSongsInPlaylists"
    ]),

    async getAllPlaylists() {
      //this.playlists = await this.showAllPlaylists();
      this.playlists = await this.findPlaylistsByUserLogged();
      if (this.playlists) {
        if (this.isFirst) {
          if (this.$route.params.id) {
            for (let i = 0; i < this.playlists.length; i++) {
              if (this.$route.params.id == this.playlists[i].title) {
                this.currentPlaylist.title = this.$route.params.id;
                break;
              } else {
                this.currentPlaylist.title = "Flamenco";
              }
            }
          } else if (this.playlists.length > 0) {
            this.currentPlaylist.title = this.playlists[0].title;
          } else {
            this.currentPlaylist.title = "No Playlists Created";
          }
          this.isFirst = false;
        }
      }
      this.getSongsByPlaylist();
    },

    //Cargamos las canciones en currentPlaylist y guardamos el id
    async getSongsByPlaylist() {
      if (this.playlists) {
        let selectedPlaylist = this.playlists.find(
          item => item.title == this.currentPlaylist.title
        );
        if (selectedPlaylist) {
          this.currentPlaylist.id = selectedPlaylist.id;
          this.currentPlaylist.songs = await this.findSongsFromPlaylistId(
            selectedPlaylist.id
          );
        }
      }
    },

    async addPlaylist() {
      let response = await this.insertPlaylist({
        title: this.newPlaylist.title
        //user_id: "bac7d3dc-80b4-4295-88e8-c39b4324bb9a" //El de Hector
      });
      if (response.status == 200) {
        this.promptP = false;
        this.getAllPlaylists();
      } else {
        console.log("error");
      }
    },

    async removePlaylist(playlist) {
      this.playlists = await this.deletePlaylistById(playlist.id);
    },

    // // /// /// /// // // // // // // /// /// /// //
    //PAGE FUNCTIONS
    //Para realizar el cambio de playlists
    changeList(title) {
      this.currentPlaylist.title = title;
      this.getAllPlaylists();
    },

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
    dateFormat(release_date) {
      let dateForm = new Date(release_date);
      return date.formatDate(dateForm, "DD-MM-YYYY");
    },

    dateOptions(date) {
      //let n_todat = date.formatDate(this.today, "DD-MM-YYYY");
      return date <= "2021/06/17";
    },

    genresFormat(genres) {
      let info = genres.toString();
      return info;
    },

    editSongx(song) {
      this.saveSong(song);
      this.editPromp = true;
    },

    saveSong(song) {
      this.newSong = song;
    }
  }
};

/*
      playlistsDefault: [
        {
          title: "Flamenco",
          user: "M",
        },
        {
          title: "Rock",
          user: "M",
        },
        {
          title: "Clasica",
          user: "M",
        },
        {
          title: "Rap",
          user: "M",
        }
      ],

      flamenco_list: [
        {
          id: "A65XVbNm870",
          name: "Frozen Yogurt",
          author: "Maraca",
          album: "Malas Noches",
          duration: 54,
          release_date: "2002-05-02",
          genres: ["Flamenco", "Pop"]
        },
        {
          id: "A65XVbNm871",
          name: "Ice cream sandwich",
          author: "Maraca",
          album: "Cielos sin Sol",
          duration: 191,
          release_date: "2002-07-22",
          genres: ["Flamenco", "Pop"]
        },
        {
          id: "A65XVbNm872",
          name: "Eclair",
          author: "Dulce de Leche",
          album: "Rosas Verdes",
          duration: 146,
          release_date: "2007-05-06",
          genres: ["Flamenco", "Pop"]
        },
        {
          id: "A65XVbNm873",
          name: "Cupcake",
          author: "Dulce de Leche",
          album: "Rosas Verdes",
          duration: 140,
          release_date: "2000-02-15",
          genres: ["Flamenco", "Pop"]
        },
        {
          id: "A65XVbNm874",
          name: "Gingerbread",
          author: "Jengibre",
          album: "Sueños",
          duration: 180,
          release_date: "2015-08-20",
          genres: ["Flamenco", "Pop"]
        },
        {
          id: "A65XVbNm875",
          name: "Jelly bean",
          author: "Jengibre",
          album: "Casos Oscuros",
          duration: 199,
          release_date: "1999-02-12",
          genres: ["Flamenco", "Pop"]
        },
        {
          id: "A65XVbNm876",
          name: "Lollipop",
          author: "Malpalo",
          album: "Mar Morado",
          duration: 45,
          release_date: "2011-05-30",
          genres: ["Flamenco", "Pop"]
        },
        {
          id: "A65XVbNm877",
          name: "Honeycomb",
          author: "Ad Mech",
          album: "Sin Piel",
          duration: 156,
          release_date: "2005-04-18",
          genres: ["Flamenco", "Pop"]
        },
        {
          id: "A65XVbNm878",
          name: "Donut",
          author: "Merengue",
          album: "Pitufos",
          duration: 198,
          release_date: "2009-11-24",
          genres: ["Flamenco", "Pop"]
        },
        {
          id: "A65XVbNm879",
          name: "KitKat",
          author: "Varios",
          album: "Sin Pausa",
          duration: 256,
          release_date: "2001-09-15",
          genres: ["Flamenco", "Pop"]
        }
      ],
      rock_list: [
        {
          id: "A65XVbNm860",
          name: "Chistorra",
          author: "Maraca",
          album: "Malas Noches",
          duration: 134,
          release_date: "2002-05-02",
          genres: ["Rock", "Pop"]
        },
        {
          id: "A65XVbNm861",
          name: "Sandwich",
          author: "Maraca",
          album: "Cielos sin Sol",
          duration: 187,
          release_date: "2002-05-02",
          genres: ["Rock", "Pop"]
        },
        {
          id: "A65XVbNm862",
          name: "Tortilla",
          author: "Dulce de Leche",
          album: "Rosas Verdes",
          duration: 156,
          release_date: "2002-05-02",
          genres: ["Rock", "Pop"]
        },
        {
          id: "A65XVbNm863",
          name: "Japón",
          author: "Dulce de Leche",
          album: "Rosas Verdes",
          duration: 144,
          release_date: "2002-05-02",
          genres: ["Rock", "Pop"]
        },
        {
          id: "A65XVbNm864",
          name: "Salchicha",
          author: "Jengibre",
          album: "Sueños",
          duration: 113,
          release_date: "2002-05-02",
          genres: ["Rock", "Pop"]
        },
        {
          id: "A65XVbNm865",
          name: "Bocata",
          author: "Jengibre",
          album: "Casos Oscuros",
          duration: 190,
          release_date: "2002-05-02",
          genres: ["Rock", "Pop"]
        },
        {
          id: "A65XVbNm866",
          name: "Pincho",
          author: "Malpalo",
          album: "Mar Morado",
          duration: 58,
          release_date: "2002-05-02",
          genres: ["Rock", "Pop"]
        },
        {
          id: "A65XVbNm867",
          name: "Pizza",
          author: "Ad Mech",
          album: "Sin Piel",
          duration: 176,
          release_date: "2002-05-02",
          genres: ["Rock", "Pop"]
        },
        {
          id: "A65XVbNm868",
          name: "Patata",
          author: "Merengue",
          album: "Pitufos",
          duration: 169,
          release_date: "2002-05-02",
          genres: ["Rock", "Pop"]
        },
        {
          id: "A65XVbNm869",
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
