<template>
  <form
    class="register"
    @submit.prevent="register"
  >
    <label>
      Name
      <input
        v-model="name"
        type="text"
        required
      />
    </label>
    <label>
      Password
      <input
        v-model="password"
        type="password"
        required
      />
    </label>
    <button type="submit">Register</button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';

const store = useStore();
const router = useRouter();
const name = ref('joe');
const password = ref('password');
const register = async () => {
  await store.register({ name: name.value, password: password.value });
  router.push('/');
};
</script>

<style lang="scss" scoped></style>
