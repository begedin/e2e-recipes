<template>
  <form class="register" @submit.prevent="register">
    <input type="text" required v-model="name" />
    <input type="password" required v-model="password" />
    <button type="submit">Register</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'Register' })
export default class Register extends Vue {
  name: string = 'nikola'

  password: string = 'password'

  register() {
    const { name, password } = this;
    this.$store.dispatch('register', { name, password });
  }
}
</script>

<style lang="scss" scoped>

</style>
