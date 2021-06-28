import Vue from "vue";

export default {
  saveUser(payload) {
    return Vue.prototype.$axios.post(`/users`, payload);
  }
};