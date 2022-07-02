import { setUsers } from "../firebase.js";
import { watch } from "vue";
import { createStore } from "vuex";

export default createStore({
  state: {
    users: [],
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
  },
  actions: {
    setUsers(context) {
      const users = setUsers();
      watch(users, () => {
        context.commit("setUsers", users.value);
      });
      context.commit("setUsers", users.value);
    },
  },
  getters: {
    users(state) {
      return state.users;
    },
  },
  modules: {},
});
