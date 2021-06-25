import Vue from "vue";

export default {
    showAllPlaylists() {
        return Vue.prototype.$axios.get('/playlists');
    },
    showAllPlaylistsUserLogged(id) {
        return Vue.prototype.$axios.get(`/playlistsuser/${id}`);
    },
    showPlaylistById(id) {
        return Vue.prototype.$axios.get(`/playlists/${id}`);
    },
    updatePlaylist(id, payload) {
        return Vue.prototype.$axios.put(`/playlists/${id}`, payload);
    },
    insertPlaylist(payload) {
        return Vue.prototype.$axios.post('/playlists', payload);
    },
    deletePlaylistById(id) {
        return Vue.prototype.$axios.delete(`/playlists/${id}`);
    },
    findSongsFromPlaylistId(id) {
        return Vue.prototype.$axios.get(`/playlists/${id}/songs`);
    },
    insertSongsInPlaylist(id1, id2) {
        return Vue.prototype.$axios.put(`/playlists/${id1}/song/${id2}`);
    },
    changeSongsInPlaylists(id1, id2) {
        return Vue.prototype.$axios.put(`/playlists/change/${id1}/${id2}`); //`
    },

};
