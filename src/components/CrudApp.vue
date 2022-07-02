<template>
  <div>
    <h1>Users</h1>
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.age }}</td>
          <td><button @click="deleteUser(user.id)">D</button></td>
          <td><button @click="editUser(user)">E</button></td>
        </tr>
      </tbody>
    </table>
    <br />
    <user-form
      v-if="editing"
      mode="edit"
      :user="selectedUser"
      @close-form="editing = false"
    ></user-form>
    <br />
    <user-form mode="add"></user-form>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { deleteUser } from "../firebase.js";
import UserForm from "./UserForm.vue";
import { useStore } from "vuex";
export default {
  components: {
    UserForm,
  },
  setup() {
    const selectedUser = ref(null);
    const editing = ref(false);

    const users = computed(() => useStore().getters.users);

    const editUser = (user) => {
      selectedUser.value = user;
      editing.value = true;
    };

    return { users, selectedUser, editing, editUser, deleteUser };
  },
};
</script>

<style>
table {
  text-align: left;
  margin: 0 auto;
}
</style>
