<template>
  <form class="login" @submit="login">
    <input type="text" required :value="name" @input="name = $event" />
    <input type="email" required :value="email" @input="email = $event" />
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'Login' })
export default class Login extends Vue {

}
</script>

<style lang="scss" scoped>

</style>
