<template>
  <form class="login" @submit.prevent="login">
    <label>
      Login
      <input type="text" required v-model="name" />
    </label>
    <label>
      Password
      <input type="password" required v-model="password" />
    </label>
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'Login' })
export default class Login extends Vue {
  name: string = 'nikola'

  password: string = 'password'

  async login() {
    const { name, password } = this;
    await this.$store.dispatch('login', { name, password });
    if (this.$store.state.authenticated) { this.$router.push('/'); }
  }
}
</script>

<style lang="scss" scoped>

</style>
