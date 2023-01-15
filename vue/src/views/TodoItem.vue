<template>
  <div class="todo">
    {{ todo.title }}
    <button
      @click="deleteTodo"
      type="button"
    >
      Delete
    </button>
  </div>
</template>

<script lang="ts" setup>
import { Todo } from '~/src/types';
import { useStore } from '~/src/store';

const props = defineProps<{ todo: Todo }>();
const store = useStore();
const deleteTodo = () => {
  store.deleteTodo(props.todo);
};
</script>

<style lang="scss" scoped>
.todo {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  column-gap: 0.5em;
}
</style>
