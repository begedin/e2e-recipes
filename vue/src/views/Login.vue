<template>
  <form
    class="login"
    @submit.prevent="login"
  >
    <label>
      Login
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
    <button type="submit">Login</button>
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
const login = async () => {
  await store.login({ name: name.value, password: password.value });
  router.push('/');
};
</script>

<style lang="scss" scoped></style>
