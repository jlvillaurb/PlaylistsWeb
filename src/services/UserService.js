import Vue from "vue";

export default {
    insert(payload) {
        return Vue.prototype.$axios.post(`/users/insert`, payload);
    },
    findUserByName(payload) {
        return Vue.prototype.$axios.get(`/users/login`, payload);
    },
};