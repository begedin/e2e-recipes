<template>
  <form class="add-todo" @submit.stop.prevent="addTodo">
    <input type="text" required v-model="newTodo" />
    <button type="submit">Add</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'add-todo' })
export default class AddTodo extends Vue {
  newTodo: string = ''

  async addTodo() {
    await this.$store.dispatch('createTodo', this.newTodo);
    this.newTodo = '';
  }
}
</script>

<style lang="scss" scoped>

</style>
