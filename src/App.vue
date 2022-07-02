<template>
  <div>
    <crud-app></crud-app>
  </div>
</template>

<script>
import CrudApp from "./components/CrudApp.vue";
import { useStore } from "vuex";
import { stopRealtime } from "./firebase";
import { onUnmounted } from "@vue/runtime-core";
export default {
  components: {
    CrudApp,
  },
  setup() {
    const store = useStore();

    // start realtime updates
    store.dispatch("setUsers");

    // stop realtime updates
    onUnmounted(stopRealtime);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
