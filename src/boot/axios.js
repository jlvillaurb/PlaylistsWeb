import Vue from 'vue'
import axios from 'axios'

axios.defaults.withCredentials = true;

export default ({ Vue }) => {
  let axiosInstance = axios.create({
    baseURL: "http://localhost:8081/"
  });
  Vue.prototype.$axios = axiosInstance;
};