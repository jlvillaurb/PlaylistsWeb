import Vue from "vue";

export default {
  insertUser(payload) {
    return Vue.prototype.$axios.post(`/users/insert`, payload);
  },
  findUserByName(payload) {
    return Vue.prototype.$axios.get(`/users`, payload);
  },
};