import Vue from "vue";

export default {
  insertUser(payload) {
    return Vue.prototype.$axios.post(`/users/insert`, payload);
  }
};