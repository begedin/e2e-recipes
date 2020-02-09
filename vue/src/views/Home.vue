<template>
  <div class="">

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'home',
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (!vm.$store.state.authenticated) {
        vm.$router.replace('login');
      }
    });
  },
})
export default class Home extends Vue {
}
</script>

<style lang="scss" scoped>

</style>
