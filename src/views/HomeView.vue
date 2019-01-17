<template>
  <v-container :id="$vuetify.breakpoint.xsOnly ? 'backgroundMobile' : 'backgroundDesktop'" fill-height fluid/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class HomeView extends Vue {}
</script>

<style scoped>
#backgroundDesktop {
  background-image: url('../assets/photoMenu.jpg') !important;
  background-size: cover !important;
}
#backgroundMobile {
  background-image: url('../assets/photoMenuMobile.jpg') !important;
  background-size: cover !important;
}
</style>
