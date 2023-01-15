<template>
  <div class="todos">
    <h3>Todos</h3>
    <todo-item
      v-for="todo in store.todos"
      :key="todo.id"
      :todo="todo"
    />
    <add-todo />
  </div>
</template>

<script lang="ts" setup>
import TodoItem from './TodoItem.vue';
import AddTodo from './AddTodo.vue';
import { useStore } from '~/src/store';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
onMounted(() => {
  if (!store.authenticated) {
    router.replace('login');
    return;
  }

  store.fetchTodos();
});
</script>

<style lang="scss" scoped></style>
