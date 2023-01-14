<template>
  <div class="todo">
    {{todo.title}}
    <button @click="deleteTodo">Delete</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Todo } from '@/store/types';

@Component({ name: 'todo-item' })
export default class TodoItem extends Vue {
  @Prop({ required: true, type: Object as () => Todo }) todo!: Todo

  deleteTodo() {
    this.$store.dispatch('deleteTodo', this.todo);
  }
}
</script>

<style lang="scss" scoped>
.todo {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  column-gap: .5em;
}
</style>
