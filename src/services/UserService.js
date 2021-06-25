import Vue from "vue";

export default {
    showAllUsers() {
        return Vue.prototype.$axios.get(``);
    },
    showUsersById(id) {
        return Vue.prototype.$axios.get(`${id}`);
    },
    insertUser(payload) {
        return Vue.prototype.$axios.post(``, payload);
    },
    updateUser(payload) {
        return Vue.prototype.$axios.put(`${id}`, payload);
    },
    deleteUserById(id) {
        return Vue.prototype.$axios.delete(`${id}`);
    },
    insertPlaylist(id, payload) {
        return Vue.prototype.$axios.post(`insert/${id}`, payload);
    },

};