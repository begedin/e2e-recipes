<template>
  <form
    class="add-todo"
    @submit.stop.prevent="addTodo"
  >
    <input
      v-model="newTodo"
      type="text"
      required
      autofocus
      placeholder="New todo"
    />
    <button type="submit">Add</button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useRouter } from 'vue-router';
import { useStore } from '~/src/store';

const store = useStore();
const router = useRouter();
const newTodo = ref('');
const addTodo = async () => {
  await store.createTodo(newTodo.value);
  newTodo.value = '';
  router.push('/');
};
</script>

<style lang="scss" scoped></style>
