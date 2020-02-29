<template>
  <form class="register" @submit.prevent="register">
    <label>
      Name
      <input type="text" required v-model="name" />
    </label>
    <label>
      Password
      <input type="password" required v-model="password" />
    </label>
    <button type="submit">Register</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'Register' })
export default class Register extends Vue {
  name: string = 'nikola'

  password: string = 'password'

  async register() {
    const { name, password } = this;
    await this.$store.dispatch('register', { name, password });
    this.$router.push('/');
  }
}
</script>

<style lang="scss" scoped>
</style>
