import Vue from "vue";

export default {
    showAllSongs() {
        return Vue.prototype.$axios.get('/songs');
    },
    showSongById(id) {
        return Vue.prototype.$axios.get(`/songs/${id}`);
    },
    insertSong(payload) {
        return Vue.prototype.$axios.post(`/songs`, payload);
    },
    update(payload) {
        return Vue.prototype.$axios.put(`/songs/update`, payload);
    },
    deleteSongById(id) {
        return Vue.prototype.$axios.delete(`/songs/${id}`);
    },

};
