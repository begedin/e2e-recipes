<template>
  <div class="todos">
    <h3>Todos</h3>
    <todo-item v-for="todo in todos" :key="todo.id" :todo="todo" />
    <add-todo />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { Todo } from '../store/types';
import TodoItem from './Todos/TodoItem.vue';
import AddTodo from './Todos/AddTodo.vue';

@Component({
  name: 'home',
  components: { AddTodo, TodoItem },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (!vm.$store.state.authenticated) {
        vm.$router.replace('login');
      }
    });
  },
})
export default class Todos extends Vue {
  mounted() { this.$store.dispatch('fetchTodos'); }

  @State(state => state.todos) todos!: Todo[]
}
</script>

<style lang="scss" scoped>
</style>
