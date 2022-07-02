<template>
  <div>
    <h1>{{ this.mode }} user</h1>
    <form @submit.prevent="post">
      <label for="first-name">First name</label>
      <br />
      <input type="text" id="first-name" v-model="userInfo.firstName" />
      <br />
      <br />
      <label for="last-name">Last name</label>
      <br />
      <input type="text" id="last-name" v-model="userInfo.lastName" />
      <br />
      <br />
      <label for="age">Age</label>
      <br />
      <input type="number" id="age" v-model="userInfo.age" />
      <br />
      <br />
      <button v-if="mode === 'add'" type="submit">Add</button>
      <button v-if="mode === 'edit'" type="submit">Edit</button>
    </form>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { addUser, editUser } from "../firebase";
export default {
  props: ["mode", "user"],
  emits: ["close-form"],
  setup(props, ctx) {
    const userInfo = reactive({
      firstName: "",
      lastName: "",
      age: null,
    });

    const post = () => {
      if (props.mode === "add") {
        addUser(userInfo);
      } else {
        editUser(props.user.id, userInfo);
        // close this component
        ctx.emit("close-form");
      }
      emptyForm();
    };

    const emptyForm = () => {
      userInfo.firstName = "";
      userInfo.lastName = "";
      userInfo.age = null;
    };

    onMounted(() => {
      if (props.mode === "edit") {
        userInfo.firstName = props.user.firstName;
        userInfo.lastName = props.user.lastName;
        userInfo.age = props.user.age;
      }
    });

    return {
      userInfo,
      post,
    };
  },
};
</script>

<style scoped>
h1,
button {
  text-transform: capitalize;
}
</style>
