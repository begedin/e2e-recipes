
<template>
  <main id="app">
    <nav id="nav">
      <router-link v-if="!$store.state.authenticated" to="/register">Register</router-link>
      <router-link v-if="!$store.state.authenticated" to="/login">Login</router-link>
      <router-link v-if="$store.state.authenticated" to="/">Todos</router-link>
      <button v-if="$store.state.authenticated" @click="logout" type="button">Log Out</button>
    </nav>
    <div class="error" v-if="$store.state.error">{{ $store.state.error }}</div>
    <router-view class="content" />
  </main>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'app' })
export default class App extends Vue {
  async logout() {
    await this.$store.dispatch('logout');
    this.$router.push('/login');
  }
}
</script>
<style lang="scss">
$color1: #f3f3f3;
$color2: #86c4ba;
$color3: #cedebd;
$color4: #411f1f;

html,
body {
  font-size: 1em;
  font-family: sans-serif;
}

@mixin button {
  background: $color2;
  border-radius: 0.2em;
  color: $color1;
  cursor: pointer;
  display: block;
  font-size: 100%;
  font-weight: bold;
  padding: 0.75em;
  text-decoration: none;
  text-transform: uppercase;
  transition-property: background, box-shadow;
  transition: all 0.2s ease;

  &:hover,
  &:active {
    background: $color3;
    color: $color1;
    box-shadow: 0px 7px 20px 5px rgba($color2, 0.3),
      0px 7px 2px -5px rgba($color3, 0.2);
  }
}

main {
  padding: 1em;
  display: grid;
  grid-auto-flow: row;
  justify-content: center;
  align-content: center;
  row-gap: 1em;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.content {
  display: grid;
  grid-auto-flow: row;
  justify-content: center;
  align-content: center;
  row-gap: 1em;
}

nav {
  padding: 0;
  display: grid;
  grid-auto-flow: column;
  column-gap: 1em;
  justify-content: center;

  a {
    @include button;
  }
}

form {
  display: grid;
  grid-auto-flow: row;
  justify-content: center;
  row-gap: 2em;

  label {
    display: grid;
    grid-auto-flow: row;
    justify-content: start;
    row-gap: .5em;
  }

  input,
  button {
    display: block;
  }
}

input,
button {
  appearance: none;
  padding: 0.75em;
}

button {
  @include button;
}

button,
button:hover,
button:active {
  border: none;
}

h3 {
  text-align: center;
  text-transform: uppercase;
}

.error {
  color: $color4;
  font-weight: bold;
}
</style>
