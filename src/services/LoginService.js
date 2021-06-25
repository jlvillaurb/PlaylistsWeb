import Vue from "vue";

export default {
  login(credentials) {
    return Vue.prototype.$axios.post(`/login`, credentials);
  }
};