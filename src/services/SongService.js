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
    updateSong(payload) {
        return Vue.prototype.$axios.put(`/songs/${id}`, payload);
    },
    deleteSongById(id) {
        return Vue.prototype.$axios.delete(`/songs/${id}`);
    },

};
